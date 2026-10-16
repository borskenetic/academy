import { useState } from 'react'
import { useForm } from '@inertiajs/react'

const fields = [
  ['first_name', 'First Name', 'text'],
  ['last_name', 'Last Name', 'text'],
  ['institution_name', 'Institution Full Name', 'text'],
  ['roll_no', 'ID No.', 'text'],
  ['course_program', 'Course/Program', 'text'],
  ['year_of_study', 'Year of Study', 'text'],
  ['email', 'Email', 'email'],
  ['mobile_number', 'Mobile Number', 'tel']
]

function ErrorText({ message }) {
  return message ? <p className="mt-1 text-xs font-semibold text-red-600">{message}</p> : null
}

export default function CourseEnrollmentModal({ course, onClose, startAt = 'details' }) {
  const [step, setStep] = useState(startAt)
  const form = useForm({
    first_name: '',
    last_name: '',
    name: '',
    institution_name: '',
    address: '',
    roll_no: '',
    course_program: '',
    year_of_study: '',
    course_title: course.title,
    email: '',
    mobile_number: '',
    program_key: null
  })

  const openRegistration = () => setStep('registration')
  const submit = (event) => {
    event.preventDefault()
    form.transform((data) => ({
      ...data,
      name: `${data.first_name} ${data.last_name}`.trim()
    }))
    form.post('/applications', {
      preserveScroll: true,
      onSuccess: () => setStep('success')
    })
  }

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="course-modal-title">
      <div className="absolute inset-0 bg-navy/60" onClick={onClose} aria-hidden="true" />
      <div className="relative max-h-[92vh] w-[min(94vw,760px)] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
        <button type="button" onClick={onClose} aria-label="Close course details" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-soft text-xl leading-none text-navy hover:bg-line">&times;</button>

        {step === 'details' && (
          <div>
            <img src={course.image || '/course-images/IMG1.jpg'} alt="Skillsoft" className="mb-5 h-9 w-auto object-contain" />
            <p className="text-xs font-extrabold uppercase tracking-widest text-teal">{course.category || 'Aspire Journey'}</p>
            <h2 id="course-modal-title" className="mt-2 pr-8 font-heading text-2xl font-bold text-navy">{course.title}</h2>
            {course.duration && <p className="mt-2 text-sm font-semibold text-muted">Duration: {course.duration}</p>}
            <p className="mt-5 leading-relaxed text-muted">{course.overview || course.desc}</p>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Learning outcomes</h3>
            {course.outcomes?.length ? (
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-ink sm:grid-cols-2">
                {course.outcomes.map((outcome) => <li key={outcome} className="flex gap-2"><span className="text-teal">✓</span><span>{outcome}</span></li>)}
              </ul>
            ) : <p className="mt-3 text-sm text-muted">Learning outcomes will be provided with the course materials.</p>}
            <button type="button" onClick={openRegistration} className="mt-7 inline-flex min-h-[46px] items-center rounded-lg bg-teal px-6 py-3 text-sm font-bold text-white hover:bg-teal-dark">Apply Now</button>
          </div>
        )}

        {step === 'registration' && (
          <form onSubmit={submit} noValidate>
            <img src="/skillsoft_logo.png" alt="Skillsoft" className="mb-4 h-9 w-auto object-contain" />
            <p className="text-xs font-extrabold uppercase tracking-widest text-teal">Course registration</p>
            <h2 id="course-modal-title" className="mt-2 pr-8 font-heading text-2xl font-bold text-navy">{course.title}</h2>
            <p className="mt-3 rounded-xl border border-teal/20 bg-teal/5 p-3 text-sm font-semibold text-teal-dark">Email address is mandatory to issue the software licenses.</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map(([name, label, type]) => (
                <label key={name} className="block text-sm font-semibold text-navy">
                  {label}
                  <input type={type} value={form.data[name]} onChange={(event) => form.setData(name, event.target.value)} className="mt-1.5 min-h-[44px] w-full rounded-lg border border-line px-3 text-sm font-normal outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" required />
                  <ErrorText message={form.errors[name]} />
                </label>
              ))}
              <label className="block text-sm font-semibold text-navy sm:col-span-2">
                Address
                <textarea value={form.data.address} onChange={(event) => form.setData('address', event.target.value)} className="mt-1.5 min-h-[82px] w-full rounded-lg border border-line px-3 py-2 text-sm font-normal outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" required />
                <ErrorText message={form.errors.address} />
              </label>
            </div>

            {form.errors.course_title && <ErrorText message={form.errors.course_title} />}
            <button type="submit" disabled={form.processing} className="mt-6 inline-flex min-h-[46px] items-center rounded-lg bg-teal px-6 py-3 text-sm font-bold text-white hover:bg-teal-dark disabled:cursor-wait disabled:opacity-60">
              {form.processing ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="py-10 text-center">
            <img src="/skillsoft_logo.png" alt="Skillsoft" className="mx-auto mb-6 h-10 w-auto object-contain" />
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/10 text-3xl text-teal">✓</div>
            <h2 id="course-modal-title" className="mt-5 font-heading text-2xl font-bold text-navy">Registration successful</h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">Your registration for {course.title} has been submitted. Our team will contact you using the details provided.</p>
            <button type="button" onClick={onClose} className="mt-7 inline-flex min-h-[44px] items-center rounded-lg bg-teal px-6 py-3 text-sm font-bold text-white hover:bg-teal-dark">Done</button>
          </div>
        )}
      </div>
    </div>
  )
}
