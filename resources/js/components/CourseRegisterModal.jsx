import { useState } from 'react'

const INSTITUTION = { code: 'area51', name: 'Area 51' }

const initialForm = {
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  gender: '',
  education_level: '',
  roll_no: '',
  course_program: '',
  year_of_study: '',
  address: '',
  category: 'Student'
}

function Field({ name, label, type = 'text', value, error, onChange, children, ...inputProps }) {
  const className = `mt-1.5 min-h-[44px] w-full rounded-lg border px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-teal/20 ${error ? 'border-red-500' : 'border-line focus:border-teal'}`
  return (
    <label className="block text-sm font-semibold text-navy">
      {label}
      {children || <input name={name} type={type} value={value} onChange={onChange} className={className} required {...inputProps} />}
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  )
}

function fieldErrors(data) {
  if (!data?.errors || typeof data.errors !== 'object') return {}
  return Object.fromEntries(
    Object.entries(data.errors).map(([key, value]) => [key, Array.isArray(value) ? value[0] : String(value)])
  )
}

export default function CourseRegisterModal({ course, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!course) return null

  const change = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }))
    setErrors((current) => ({ ...current, [target.name]: undefined }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setErrors({})
    setMessage('')
    setSubmitting(true)
    try {
      const response = await fetch('/api/skillsoft-leads', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          email: form.email.trim().toLowerCase(),
          name: `${form.first_name} ${form.last_name}`.trim(),
          full_name: `${form.first_name} ${form.last_name}`.trim(),
          phone: form.mobile_number,
          institution: INSTITUTION.code,
          institution_code: INSTITUTION.code,
          institution_name: INSTITUTION.name,
          college_name: INSTITUTION.name,
          course_title: course.title,
          course_slug: course.slug || '',
          course_type: course.type || 'skillsoft',
          course_url: (course.page && course.page !== '#') ? course.page : `${window.location.origin}${window.location.pathname}`
        })
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setErrors(fieldErrors(data))
        setMessage(data.message || 'Registration could not be submitted. Please check the form and try again.')
        return
      }
      setSuccess(true)
    } catch {
      setMessage('Registration could not be submitted. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="registration-title">
      <div className="absolute inset-0 bg-navy/60" onClick={onClose} aria-hidden="true" />
      <div className="relative max-h-[92vh] w-[min(94vw,700px)] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
        <button type="button" onClick={onClose} aria-label="Close registration" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-soft text-xl text-navy hover:bg-line">&times;</button>
        {success ? (
          <div className="py-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/10 text-3xl text-teal">✓</div>
            <h2 id="registration-title" className="mt-5 font-heading text-2xl font-bold text-navy">Registration successful</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">Your registration for {course.title} was submitted. The Area 51 team will contact you using the details provided.</p>
            <button type="button" onClick={onClose} className="mt-7 rounded-lg border border-line px-6 py-3 text-sm font-bold text-navy hover:border-teal hover:text-teal">Done</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <img src="/skillsoft_logo.png" alt="Skillsoft" className="mb-4 h-9 w-auto object-contain" />
            <p className="text-xs font-extrabold uppercase tracking-widest text-teal">Enrollment registration</p>
            <h2 id="registration-title" className="mt-2 pr-8 font-heading text-2xl font-bold text-navy">{course.title}</h2>
            <p className="mt-3 rounded-xl border border-teal/20 bg-teal/5 p-3 text-sm text-teal-dark">Registration is for Area 51. Any email address is accepted.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field name="first_name" label="First Name" value={form.first_name} error={errors.first_name || errors.name} onChange={change} />
              <Field name="last_name" label="Last Name" value={form.last_name} error={errors.last_name} onChange={change} />
              <Field name="email" label="Email" type="email" value={form.email} error={errors.email} onChange={change} placeholder="name@email.com" />
              <Field name="mobile_number" label="Mobile Number" type="tel" value={form.mobile_number} error={errors.mobile_number || errors.phone} onChange={change} />
              <Field name="gender" label="Gender" value={form.gender} error={errors.gender} onChange={change}>
                <select name="gender" value={form.gender} onChange={change} className="mt-1.5 min-h-[44px] w-full rounded-lg border border-line bg-white px-3 text-sm font-normal" required>
                  <option value="">Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </Field>
              <Field name="education_level" label="Education Level" value={form.education_level} error={errors.education_level} onChange={change}>
                <select name="education_level" value={form.education_level} onChange={change} className="mt-1.5 min-h-[44px] w-full rounded-lg border border-line bg-white px-3 text-sm font-normal" required>
                  <option value="">Select...</option>
                  <option>High School / SHS</option>
                  <option>Undergraduate</option>
                  <option>Graduate</option>
                  <option>Postgraduate</option>
                  <option>Doctorate</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field name="roll_no" label="ID No." value={form.roll_no} error={errors.roll_no} onChange={change} />
              <Field name="course_program" label="Course/Program" value={form.course_program} error={errors.course_program} onChange={change} />
              <Field name="year_of_study" label="Year of Study" value={form.year_of_study} error={errors.year_of_study} onChange={change} />
              <Field name="category" label="I am a" value={form.category} error={errors.category || errors.applicant_category} onChange={change}>
                <select name="category" value={form.category} onChange={change} className="mt-1.5 min-h-[44px] w-full rounded-lg border border-line bg-white px-3 text-sm font-normal" required>
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Working Professional</option>
                  <option>Alumni</option>
                  <option>Other</option>
                </select>
              </Field>
              <label className="block text-sm font-semibold text-navy sm:col-span-2">
                Address
                <textarea name="address" value={form.address} onChange={change} className={`mt-1.5 min-h-[82px] w-full rounded-lg border px-3 py-2 text-sm font-normal outline-none ${errors.address ? 'border-red-500' : 'border-line focus:border-teal'}`} required />
                {errors.address && <span className="mt-1 block text-xs font-semibold text-red-600">{errors.address}</span>}
              </label>
            </div>
            {message && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{message}</p>}
            <button type="submit" disabled={submitting} className="mt-6 min-h-[46px] rounded-lg bg-teal px-6 py-3 text-sm font-bold text-white hover:bg-teal-dark disabled:cursor-wait disabled:opacity-60">
              {submitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
