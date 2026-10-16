import { useEffect, useMemo, useState } from 'react'
import { Link } from '@inertiajs/react'

const hasLink = (url) => url && url !== '#'
const coursePage = (c) => (hasLink(c.page) ? c.page : null)

/**
 * "Explore by skill" groups. Each group uses ONLY real Skillsoft domain
 * names (SKILLSOFT_DOMAINS) from the data, grouped under the real catalog
 * categories. Tapping a chip pre-filters the catalog for that category.
 */
const EXPLORE_GROUPS = [
  {
    title: 'AI & Machine Learning',
    cat: 'AI',
    chips: ['Gen AI Basics', 'AI & ML Algorithms - I', 'Applied ML']
  },
  {
    title: 'Technology & Development',
    cat: 'Development',
    chips: ['Programming for Problem Solving', 'Object-Oriented Programming using C++', 'Java Programming', 'Blockchain Basics', 'Blockchain Applications - I', 'Blockchain Applications - II']
  },
  {
    title: 'Data & Analytics',
    cat: 'Data & Analytics',
    chips: ['Data Science Fundamentals', 'Data Analysis with Python', 'Data Visualization with R', 'Data Science Applications', 'Business Analytics Foundations', 'Business Analytics Tools', 'Visual Analytics and Reporting']
  },
  {
    title: 'Business, Finance & Leadership',
    cat: 'Business & Finance',
    chips: ['Fintech Foundations', 'Fintech Risk Management', 'Communication', 'Negotiation', 'Foundations of Project Management', 'Entrepreneurship Basics', 'Innovative Businesses', 'Strategic Innovation', 'Qualitative Research', 'Quantitative Research', 'Fundamentals of Psychology']
  },
  {
    title: 'Marketing & Design',
    cat: 'Design & Innovation',
    chips: ['Foundations of Digital Marketing - I', 'Foundations of Digital Marketing - II', 'Introduction to Social Media Marketing', 'Social Media Management', 'Advertising and Campaign Management', 'Design Thinking Overview', 'User Experience Research and Design', 'Graphic Design Elements for Non-Designers', 'Graphic Design', 'Video Content Development', 'Multimedia Content Creation']
  }
]

const focusCls =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal'



function ChipButton({ label, active, onClick, tone = 'light' }) {
  const activeCls = tone === 'dark'
    ? 'border-teal bg-teal text-white shadow-sm'
    : 'border-teal/40 bg-teal-bg text-teal-dark'
  const idleCls = 'border-line bg-white text-navy hover:border-teal/60 hover:text-teal'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-[40px] shrink-0 items-center rounded-full border px-3.5 text-sm font-bold transition-all duration-200 ${focusCls} ${active ? activeCls : idleCls}`}
    >
      {label}
    </button>
  )
}
function CourseCard({ course }) {
  const page = coursePage(course)
  const cardBody = (
    <>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={`${course.title} course illustration`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <span className="inline-flex w-fit items-center rounded-full bg-teal/10 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-teal">
          {course.category}
        </span>
        <h3 className="font-heading text-lg font-bold leading-snug text-navy line-clamp-2">{course.title}</h3>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-teal" aria-hidden="true">
            <path d="M12 3v15l4 0 4-5 0-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {course.duration}
        </p>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{course.overview}</p>
      </div>
    </>
  )
  const linkBody = (
    <span className="mt-1 inline-flex items-center gap-1.5 self-start text-sm font-bold text-teal transition-colors group-hover:text-teal-dark">
      View Details &amp; Apply
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M4 12h15M5 8l9 0 -4 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )

  if (page) {
    return (
      <a
        href={`/courses/core/${course.slug}`}
        id={course.slug}
        aria-label={`View ${course.title}`}
        className="group scroll-mt-24 flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_30px_rgba(17,24,39,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-teal hover:shadow-[0_24px_48px_rgba(0,91,92,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        {cardBody}
        {linkBody}
      </a>
    )
  }
  return (
    <article
      id={course.slug}
      className="scroll-mt-24 flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-line bg-white shadow-[0_12px_30px_rgba(17,24,39,0.04)]"
    >
      <img src={course.image} alt={`${course.title} course illustration`} loading="lazy" className="aspect-video w-full rounded-xl object-cover object-center" />
      <div className="flex flex-col gap-2 p-4">
        <span className="inline-flex w-fit items-center rounded-full bg-teal/10 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-teal">
          {course.category}
        </span>
        <h3 className="font-heading text-lg font-bold leading-snug text-navy line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted">{course.duration}</p>
        <a href={`/courses/core/${course.slug}`} className="mt-1 inline-flex w-fit items-center rounded-lg border border-teal bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-teal hover:bg-teal-bg">
          View Details &amp; Apply
        </a>
      </div>
    </article>
  )
}
function FilterSheet({ open, onClose, active, onApply, counts, categories }) {
  const options = ['All', ...categories]
  return (
    <div
      className={`fixed inset-0 z-[70] transition-all duration-300 ${open ? 'visible bg-navy/40 backdrop-blur-sm' : 'invisible pointer-events-none bg-transparent'}`}
      {...(!open ? { inert: '' } : {})}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter courses"
        className={`mx-auto mb-0 w-full max-w-lg rounded-t-2xl border-t border-line bg-white p-5 shadow-2xl transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-navy">Filters</h2>
          <button type="button" onClick={onClose} aria-label="Close filters" className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-navy transition-colors hover:bg-soft hover:text-teal ${focusCls}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mt-3 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-teal">Domain</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onApply(opt)}
              aria-pressed={active === opt}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors ${focusCls} ${active === opt ? 'border-teal bg-teal text-white' : 'border-line bg-white text-navy hover:border-teal/50 hover:text-teal'}`}
            >
              <span className={`h-4 w-4 shrink-0 rounded-full border ${active === opt ? 'border-teal bg-teal-dark' : 'border-muted bg-white'}`} aria-hidden="true" />
              <span className="flex-1 text-left">{opt}</span>
              <span className="text-xs text-muted">{counts[opt]}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className={`inline-flex min-h-[44px] items-center rounded-lg border border-line bg-white px-4 text-sm font-bold text-muted transition-colors hover:bg-soft ${focusCls}`}>
            Cancel
          </button>
          <button type="button" onClick={onClose} className={`inline-flex min-h-[44px] items-center rounded-lg bg-teal px-5 text-sm font-bold text-white transition-colors hover:bg-teal-dark ${focusCls}`}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
export default function SkillsoftCatalogPage({
  tracks: SKILLSOFT_COURSES,
  domains: SKILLSOFT_DOMAINS,
  categories: SKILLSOFT_CATEGORIES,
  cat = 'All'
}) {
  const CATEGORIES = SKILLSOFT_CATEGORIES.filter((c) => c !== 'All')

  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState(cat)
  const [sort, setSort] = useState('default')
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    setActiveCat(cat)
  }, [cat])

  const counts = useMemo(() => {
    const map = { All: SKILLSOFT_COURSES.length }
    for (const c of CATEGORIES) map[c] = SKILLSOFT_COURSES.filter((x) => x.category === c).length
    return map
  }, [SKILLSOFT_COURSES, SKILLSOFT_CATEGORIES])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = SKILLSOFT_COURSES.filter((c) => {
      const inCat = activeCat === 'All' || c.category === activeCat
      if (!inCat) return false
      if (!q) return true
      const hay = [c.title, c.overview, c.category, ...(c.outcomes || [])].join(' ').toLowerCase()
      return q.split(/\s+/).every((w) => hay.includes(w))
    })
    if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [query, activeCat, sort, SKILLSOFT_COURSES])

  const setCat = (c) => setActiveCat(c)

  return (
    <main className="bg-soft text-ink">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12 sm:pb-14">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link className="font-semibold text-teal hover:underline" href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Skillsoft Catalog</span>
        </div>

        
{/* Search + filter + sort controls (sticky on mobile) */}
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

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <div className="hidden shrink-0 gap-2 overflow-x-auto pb-1 lg:flex no-scrollbar" role="group" aria-label="Filter courses by category">
                {SKILLSOFT_CATEGORIES.map((c) => (
                  <ChipButton key={c} label={c} active={activeCat === c} onClick={() => setCat(c)} />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-bold text-navy transition-colors hover:border-teal/50 hover:text-teal lg:hidden"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-teal" aria-hidden="true">
                  <path d="M4 4h16v13h-16 3v-13M6 13h12v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Filter{activeCat !== 'All' ? ` · ${activeCat}` : ''}
              </button>

              <div className="ml-auto flex items-center gap-2">
                <span className="inline-flex whitespace-nowrap items-center rounded-full border border-line bg-soft px-3 py-1 text-xs font-bold text-muted">
                  {visible.length} of {SKILLSOFT_COURSES.length}
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
                  <svg viewBox="0 0 20 20" className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true">
                    <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
{/* Results header */}
        <section aria-label="Course results">
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-2xl font-bold text-navy">Available courses</h2>
            <p className="inline-flex items-center rounded-full border border-teal/30 bg-teal-bg px-3 py-1 text-sm font-bold text-teal">
              Showing {visible.length} of {SKILLSOFT_COURSES.length} courses
            </p>
          </div>
          {activeCat !== 'All' && (
            <p className="mt-2 text-sm text-muted">
              Filtered to <span className="font-semibold text-navy">{activeCat}</span>
              {query.trim() ? <span> · matching “{query.trim()}”</span> : null}
            </p>
          )}

          {/* Responsive grid */}
          <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="mt-5 rounded-2xl border border-line bg-white p-10 text-center">
              <p className="text-2xl" aria-hidden="true">🔍</p>
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

        {/* Explore by skill */}
        <section className="mt-12 rounded-[24px] border border-line bg-white p-6 md:p-8" aria-label="Explore courses by skill">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-teal">Explore by skill</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-navy">Find courses by the skills you want to develop</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            Content families behind the Skillsoft tracks, grouped by domain. Select a skill to browse its catalog category.
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {EXPLORE_GROUPS.map((group) => (
              <div key={group.title} className="rounded-xl border border-line bg-soft/60 p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-fit items-center rounded-full bg-teal/10 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-teal">
                    {group.cat}
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy">{group.title}</h3>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.chips.map((chip) => (
                    <li key={chip}>
                      <Link
                        href={`/skillsoft-catalog?cat=${encodeURIComponent(group.cat)}`}
                        className="inline-flex min-h-[36px] items-center rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-teal/50 hover:bg-teal-bg hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                        title={chip}
                      >
                        {chip}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted">
            {SKILLSOFT_DOMAINS.length} mapped Skillsoft content domains behind {SKILLSOFT_COURSES.length} tracks.
          </p>
        </section>
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        active={activeCat}
        onApply={(c) => {
          setCat(c)
          setSheetOpen(false)
        }}
        counts={counts}
        categories={CATEGORIES}
      />
    </main>
  )
}