import { useState } from 'react'
import { Link } from '@inertiajs/react'
import CourseRegisterModal from '../components/CourseRegisterModal'
import { findCourse } from '../data/catalog'
import { assignProgramGroup, COURSE_PRICE } from '../data/courseGroups'

const TYPE_LABELS = {
  core: 'Core courses',
  aspire: 'Aspire journeys',
  skillsoft: 'Skillsoft Catalog'
}

export default function CourseDetails({ course: serverCourse = null, type, slug }) {
  const [registering, setRegistering] = useState(false)
  const course = findCourse(type, slug) || serverCourse

  if (!course) {
    return (
      <main className="bg-soft text-ink">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold text-navy">Course not found</h1>
          <p className="mt-3 text-muted">That course is not in the current catalog.</p>
          <Link href="/skillsoft-catalog" className="mt-6 inline-flex min-h-[44px] items-center rounded-lg bg-teal px-6 text-sm font-bold text-white hover:bg-teal-dark">
            Browse the catalog
          </Link>
        </div>
      </main>
    )
  }

  const catalogHref = type === 'skillsoft' ? '/skillsoft-catalog' : '/'
  const outcomes = course.outcomes || []

  return (
    <main className="bg-soft text-ink">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-5 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="font-semibold text-teal hover:underline">Home</Link>
          <span> › </span>
          <Link href={catalogHref} className="font-semibold text-teal hover:underline">
            {TYPE_LABELS[type] || 'Courses'}
          </Link>
          <span> › </span>
          <span className="text-navy">{course.title}</span>
        </nav>
        <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="aspect-[16/6] overflow-hidden bg-soft">
            <img src={course.image || '/course-images/IMG1.jpg'} alt={`${course.title} course illustration`} className="h-full w-full object-cover" />
          </div>
          <div className="p-6 sm:p-9">
            <p className="text-xs font-extrabold uppercase tracking-widest text-teal">{assignProgramGroup(course)}</p>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">{course.title}</h1>
            {course.duration && <p className="mt-3 text-sm font-semibold text-muted">Duration: {course.duration}</p>}
            <p className="mt-2 text-base font-bold text-navy">Price: {COURSE_PRICE}</p>
            <p className="mt-6 max-w-4xl text-base leading-8 text-muted">{course.overview}</p>
            {outcomes.length > 0 && (
              <>
                <h2 className="mt-8 font-heading text-2xl font-bold text-navy">Learning outcomes</h2>
                <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-ink sm:grid-cols-2">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2">
                      <span className="text-teal">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button
              type="button"
              onClick={() => setRegistering(true)}
              className="mt-8 min-h-[48px] rounded-lg bg-teal px-7 py-3 text-sm font-bold text-white hover:bg-teal-dark"
            >
              Apply Now
            </button>
          </div>
        </article>
      </div>
      {registering && <CourseRegisterModal course={course} onClose={() => setRegistering(false)} />}
    </main>
  )
}
