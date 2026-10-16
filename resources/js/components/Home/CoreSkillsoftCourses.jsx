import { useState } from 'react'
import { Link } from '@inertiajs/react'

function CourseCard({ course }) {
  return (
    <Link href={`/courses/core/${course.slug}`} className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/60 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
      <div className="aspect-[16/9] overflow-hidden bg-soft">
        <img
          src={course.image || '/course-images/IMG1.jpg'}
          alt={`${course.title} course illustration`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex w-fit rounded-full bg-teal/[0.08] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-teal">{course.category}</span>
          <span className="shrink-0 text-xs font-semibold text-muted">{course.duration || 'Self-paced'}</span>
        </div>
        <h3 className="mt-3 font-heading text-base font-bold leading-snug text-navy sm:text-lg">{course.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{course.overview}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-left text-sm font-bold text-teal transition-colors group-hover:text-teal-dark">
          View description
          <span aria-hidden="true">-&gt;</span>
        </span>
      </div>
    </Link>
  )
}

export default function CoreSkillsoftCourses({ tracks = [] }) {
  const [visible, setVisible] = useState(8)
  const [query, setQuery] = useState('')
  const search = query.trim().toLowerCase()
  const filtered = tracks.filter((course) => {
    if (!search) return true
    const haystack = [course.title, course.category, course.overview, ...(course.outcomes || [])]
      .join(' ')
      .toLowerCase()
    return search.split(/\s+/).every((term) => haystack.includes(term))
  })
  const shown = filtered.slice(0, visible)
  const hasMore = filtered.length > visible

  return (
    <section id="core-skillsoft-courses" className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="core-courses-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-teal">Core Skillsoft Courses</p>
            <h2 id="core-courses-heading" className="font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl">
              Build practical skills for today&apos;s work
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Explore the core Skillsoft curriculum across AI, technology, data, cloud, business, and leadership.
            </p>
          </div>
        </div>

        <label className="relative mt-6 block max-w-xl">
          <span className="sr-only">Search core Skillsoft courses</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true">
            <path d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setVisible(8)
            }}
            placeholder="Search core Skillsoft courses..."
            className="min-h-[46px] w-full rounded-xl border border-line bg-white pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/25"
          />
        </label>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((course) => <CourseCard key={course.slug} course={course} />)}
        </div>

        {shown.length === 0 && (
          <div className="mt-8 rounded-2xl border border-line bg-soft p-10 text-center text-muted">
            No core Skillsoft courses match your search.
          </div>
        )}

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisible(tracks.length)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-teal bg-white px-6 py-3 text-sm font-bold text-teal transition-all duration-200 hover:bg-teal hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              View More Core Courses
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}