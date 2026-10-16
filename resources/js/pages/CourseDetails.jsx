import { useState } from 'react'
import CourseEnrollmentModal from '../components/CourseEnrollmentModal'

export default function CourseDetails({ course }) {
  const [enrollmentOpen, setEnrollmentOpen] = useState(false)

  return (
    <main className="bg-soft text-ink">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="aspect-[16/6] overflow-hidden bg-soft">
            <img src={course.image || '/course-images/IMG1.jpg'} alt={`${course.title} course illustration`} className="h-full w-full object-cover" />
          </div>
          <div className="p-6 sm:p-9">
            <p className="text-xs font-extrabold uppercase tracking-widest text-teal">{course.category}</p>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">{course.title}</h1>
            {course.duration && <p className="mt-3 text-sm font-semibold text-muted">Duration: {course.duration}</p>}
            <p className="mt-6 max-w-4xl text-base leading-8 text-muted">{course.overview}</p>

            <h2 className="mt-8 font-heading text-2xl font-bold text-navy">Learning outcomes</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-ink sm:grid-cols-2">
              {course.outcomes.map((outcome) => <li key={outcome} className="flex gap-2"><span className="text-teal">✓</span><span>{outcome}</span></li>)}
            </ul>

            <button type="button" onClick={() => setEnrollmentOpen(true)} className="mt-8 inline-flex min-h-[48px] items-center rounded-lg bg-teal px-7 py-3 text-sm font-bold text-white hover:bg-teal-dark">
              Apply Now
            </button>
          </div>
        </article>
      </div>
      {enrollmentOpen && <CourseEnrollmentModal course={course} startAt="registration" onClose={() => setEnrollmentOpen(false)} />}
    </main>
  )
}
