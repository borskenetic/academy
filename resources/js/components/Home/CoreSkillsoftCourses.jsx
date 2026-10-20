import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { CORE_COURSES } from '../../data/currentCatalog'
import { assignProgramGroup } from '../../data/courseGroups'

export default function CoreSkillsoftCourses() {
  const [visible, setVisible] = useState(8)
  const [query, setQuery] = useState('')
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const filtered = CORE_COURSES.filter((course) => {
    const text = [course.title, assignProgramGroup(course), course.overview, ...(course.outcomes || [])].join(' ').toLowerCase()
    return terms.every((term) => text.includes(term))
  })
  const shown = filtered.slice(0, visible)

  return (
    <section id="core-skillsoft-courses" className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="core-courses-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-teal">Core Skillsoft Courses</p>
        <h2 id="core-courses-heading" className="font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl">Build practical skills for today&apos;s work</h2>
        <p className="mt-3 max-w-2xl text-muted">Explore the current Skillsoft curriculum across AI, technology, data, cloud, business, and leadership.</p>

        <label className="relative mt-6 block max-w-xl">
          <span className="sr-only">Search core Skillsoft courses</span>
          <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisible(8) }} placeholder="Search core Skillsoft courses..." className="min-h-[46px] w-full rounded-xl border border-line bg-white px-4 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/25" />
        </label>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((course) => (
            <Link key={course.slug} href={`/courses/core/${course.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-teal/60 hover:shadow-lg">
              <div className="aspect-[16/9] overflow-hidden bg-soft">
                <img src={course.image} alt={`${course.title} course illustration`} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="w-fit rounded-full bg-teal/[0.08] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-teal">{assignProgramGroup(course)}</span>
                <h3 className="mt-3 font-heading text-sm font-bold leading-snug text-navy sm:text-base">{course.title}</h3>
                <span className="mt-auto pt-4 text-sm font-bold text-teal">View description →</span>
              </div>
            </Link>
          ))}
        </div>

        {!shown.length && <div className="mt-8 rounded-2xl border border-line bg-soft p-10 text-center text-muted">No core courses match your search.</div>}
        {filtered.length > visible && (
          <div className="mt-8 text-center">
            <button type="button" onClick={() => setVisible(filtered.length)} className="rounded-xl border border-teal bg-white px-6 py-3 text-sm font-bold text-teal hover:bg-teal hover:text-white">View More Core Courses</button>
          </div>
        )}
      </div>
    </section>
  )
}
