import { useEffect, useMemo, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { CATALOG_COURSES, courseDetailPath } from '../data/catalog'
import { SKILLSOFT_CATEGORIES, courseMatchesGroup } from '../data/courseGroups'

const CATEGORIES = SKILLSOFT_CATEGORIES

const focusCls =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal'

function ChipButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-[40px] shrink-0 items-center rounded-full border px-3.5 text-sm font-bold transition-all duration-200 ${focusCls} ${active ? 'border-teal/40 bg-teal-bg text-teal-dark' : 'border-line bg-white text-navy hover:border-teal/60 hover:text-teal'}`}
    >
      {label}
    </button>
  )
}

function CourseCard({ course }) {
  const detailPath = courseDetailPath(course)
  const tags = (course.categories?.length ? course.categories : [course.category]).filter(Boolean)

  return (
    <Link
      id={course.slug}
      href={detailPath}
      className="group scroll-mt-24 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left shadow-[0_12px_30px_rgba(17,24,39,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-teal hover:shadow-[0_24px_48px_rgba(0,91,92,0.14)]"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image || '/course-images/IMG1.jpg'}
          alt={`${course.title} course illustration`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex w-fit max-w-full items-center rounded-full bg-teal/10 px-2.5 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-teal"
            >
              <span className="truncate">{tag}</span>
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-bold leading-snug text-navy line-clamp-2">{course.title}</h3>
        {course.duration ? <p className="text-sm text-muted">{course.duration}</p> : null}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{course.overview}</p>
        <span className="mt-1 inline-flex items-center self-start text-sm font-bold text-teal transition-colors group-hover:text-teal-dark">
          View Course
        </span>
      </div>
    </Link>
  )
}

function FilterSheet({ open, onClose, active, onApply, counts }) {
  const options = ['All', ...CATEGORIES]
  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end transition-all duration-300 ${open ? 'visible bg-navy/40 backdrop-blur-sm' : 'invisible pointer-events-none bg-transparent'}`}
      {...(!open ? { inert: '' } : {})}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter courses"
        className={`mx-auto mb-0 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border-t border-line bg-white p-5 shadow-2xl transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-navy">Filters</h2>
          <button type="button" onClick={onClose} aria-label="Close filters" className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-navy transition-colors hover:bg-soft hover:text-teal ${focusCls}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mt-3 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-teal">Category</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onApply(opt)}
              aria-pressed={active === opt}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors ${focusCls} ${active === opt ? 'border-teal bg-teal text-white' : 'border-line bg-white text-navy hover:border-teal/50 hover:text-teal'}`}
            >
              <span className="flex-1 text-left">{opt}</span>
              <span className={`text-xs ${active === opt ? 'text-white/80' : 'text-muted'}`}>{counts[opt] || 0}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SkillsoftCatalogPage({ cat = 'All' }) {
  const { url } = usePage()
  const paramCat = new URLSearchParams(url.split('?')[1] || '').get('cat') || (cat !== 'All' ? cat : null)
  const initialCat = paramCat && CATEGORIES.includes(paramCat) ? paramCat : 'All'

  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState(initialCat)
  const [sort, setSort] = useState('default')
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    if (paramCat && CATEGORIES.includes(paramCat)) setActiveCat(paramCat)
    else if (!paramCat) setActiveCat('All')
  }, [paramCat])

  const setCat = (group) => {
    setActiveCat(group)
    router.get('/skillsoft-catalog', group === 'All' ? {} : { cat: group }, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    })
  }

  const counts = useMemo(() => {
    const map = { All: CATALOG_COURSES.length }
    for (const group of CATEGORIES) {
      map[group] = CATALOG_COURSES.filter((course) => courseMatchesGroup(course, group)).length
    }
    return map
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = CATALOG_COURSES.filter((course) => {
      if (!courseMatchesGroup(course, activeCat)) return false
      if (!q) return true
      const tags = (course.categories || [course.category]).filter(Boolean).join(' ')
      const hay = [course.title, course.overview, course.category, tags, ...(course.outcomes || [])].join(' ').toLowerCase()
      return q.split(/\s+/).every((word) => hay.includes(word))
    })
    if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [query, activeCat, sort])

  return (
    <main className="bg-soft text-ink">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12 sm:pb-14">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link className="font-semibold text-teal hover:underline" href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Skillsoft Catalog</span>
        </div>

        <div className="mt-6 sticky top-[64px] z-40 border-b border-line bg-soft/95 backdrop-blur-md lg:static lg:border-0 lg:bg-transparent">
          <div className="px-3 sm:px-4 lg:px-0">
            <label className="relative block flex-1">
              <span className="sr-only">Search Skillsoft courses</span>
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true">
                <path d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses by title, category, or skill…"
                className="min-h-[46px] w-full rounded-xl border border-line bg-white pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/25"
              />
            </label>

            <div className="mt-3 space-y-2.5">
              <div className="hidden w-full flex-wrap gap-2 lg:flex" role="group" aria-label="Filter courses by category">
                {['All', ...CATEGORIES].map((group) => (
                  <ChipButton key={group} label={group} active={activeCat === group} onClick={() => setCat(group)} />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSheetOpen(true)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-bold text-navy transition-colors hover:border-teal/50 hover:text-teal lg:hidden"
                >
                  Filter{activeCat !== 'All' ? ` · ${activeCat}` : ''}
                </button>

                <div className="ml-auto flex items-center gap-2">
                  <span className="inline-flex whitespace-nowrap items-center rounded-full border border-line bg-soft px-3 py-1 text-xs font-bold text-muted">
                    {visible.length} of {CATALOG_COURSES.length}
                  </span>
                  <label className="sr-only" htmlFor="catalog-sort">Sort courses</label>
                  <div className="relative inline-flex">
                    <select
                      id="catalog-sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="h-10 cursor-pointer appearance-none rounded-lg border border-line bg-white pl-3 pr-8 text-sm font-semibold text-ink"
                    >
                      <option value="default">Sort: Default</option>
                      <option value="az">Sort: A–Z</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section aria-label="Course results">
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-2xl font-bold text-navy">Available courses</h2>
            <p className="inline-flex items-center rounded-full border border-teal/30 bg-teal-bg px-3 py-1 text-sm font-bold text-teal">
              Showing {visible.length} of {CATALOG_COURSES.length} courses
            </p>
          </div>
          {activeCat !== 'All' && (
            <p className="mt-2 text-sm text-muted">
              Filtered to <span className="font-semibold text-navy">{activeCat}</span>
              {query.trim() ? <span> · matching “{query.trim()}”</span> : null}
            </p>
          )}

          <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((course) => (
              <CourseCard key={`${course.type || 'skillsoft'}-${course.slug}`} course={course} />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="mt-5 rounded-2xl border border-line bg-white p-10 text-center">
              <h3 className="mt-3 font-heading text-lg font-bold text-navy">No courses match your search or filter</h3>
              <p className="mt-1 text-sm text-muted">Try a different category or clear your search term.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCat('All')
                }}
                className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-teal bg-white px-5 text-sm font-bold text-teal transition-colors hover:bg-teal-bg"
              >
                Clear search &amp; filters
              </button>
            </div>
          )}
        </section>
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        active={activeCat}
        onApply={(group) => {
          setCat(group)
          setSheetOpen(false)
        }}
        counts={counts}
      />
    </main>
  )
}
