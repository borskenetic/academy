import CourseEnrollmentModal from './CourseEnrollmentModal'
import { useEffect, useState } from 'react'

export default function CourseDetailsPanel({ course, onClose }) {
  const [enrollmentOpen, setEnrollmentOpen] = useState(false)

  useEffect(() => {
    document.getElementById('selected-course-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [course])

  return (
    <article id="selected-course-details" className="mt-8 scroll-mt-24 rounded-2xl border border-teal/20 bg-soft p-5 sm:p-7" aria-labelledby="selected-course-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-teal">Course details</p>
          <h3 id="selected-course-title" className="mt-2 font-heading text-2xl font-bold text-navy">{course.title}</h3>
          <p className="mt-2 text-sm font-semibold text-muted">{course.category}{course.duration ? ` · ${course.duration}` : ''}</p>
        </div>
        <button type="button" onClick={onClose} className="self-start rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold text-muted hover:border-teal hover:text-teal">Close details</button>
      </div>
      <p className="mt-5 max-w-4xl leading-relaxed text-muted">{course.overview || course.desc}</p>
      <h4 className="mt-6 font-heading text-lg font-bold text-navy">Learning outcomes</h4>
      {course.outcomes?.length ? (
        <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-ink sm:grid-cols-2">
          {course.outcomes.map((outcome) => <li key={outcome} className="flex gap-2"><span className="text-teal">✓</span><span>{outcome}</span></li>)}
        </ul>
      ) : <p className="mt-3 text-sm text-muted">Learning outcomes will be provided with the course materials.</p>}
      <button type="button" onClick={() => setEnrollmentOpen(true)} className="mt-7 inline-flex min-h-[46px] items-center rounded-lg bg-teal px-6 py-3 text-sm font-bold text-white hover:bg-teal-dark">Apply Now</button>
      {enrollmentOpen && <CourseEnrollmentModal course={course} startAt="registration" onClose={() => setEnrollmentOpen(false)} />}
    </article>
  )
}
