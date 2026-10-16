import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Reveal from './Home/Reveal'

// Filters mirror the catalog categories so the journeys section stays aligned
// with the Skillsoft mapping-workbook tracks (Part B 1-27).
const JOURNEY_CATEGORIES = [
  'All',
  'AI',
  'Data & Analytics',
  'Development',
  'DevOps & Cloud',
  'Cybersecurity',
  'Business & Finance',
  'Design & Innovation'
]

const INITIAL_VISIBLE = 8

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 min-h-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
        active
          ? 'border-teal bg-teal text-white shadow-sm'
          : 'border-line bg-white text-navy hover:border-teal/70 hover:bg-teal/5'
      } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal`}
    >
      {children}
    </button>
  )
}

export default function AspireJourneys({ journeys = [] }) {
  const { categories } = usePage().props
  const CATEGORIES = (categories && categories.length ? categories : JOURNEY_CATEGORIES).filter((c) =>
    JOURNEY_CATEGORIES.includes(c)
  )

  const [activeCat, setActiveCat] = useState('All')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(INITIAL_VISIBLE)

  const q = query.trim().toLowerCase()
  const filtered = journeys.filter((p) => {
    const inCat = activeCat === 'All' || p.category === activeCat
    const inSearch = !q || p.title.toLowerCase().includes(q)
    return inCat && inSearch
  })

  const selectCat = (cat) => {
    setActiveCat(cat)
    setVisible(INITIAL_VISIBLE)
  }

  const changeQuery = (value) => {
    setQuery(value)
    setVisible(INITIAL_VISIBLE)
  }

  const shown = filtered.slice(0, visible)
  const hasMore = filtered.length > visible

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="aspire-journeys" aria-labelledby="aspire-journeys-h">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-teal font-extrabold tracking-widest uppercase text-xs mb-1.5">Aspire journeys</p>
          <h2 id="aspire-journeys-h" className="font-heading text-navy font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
            Role-based Skillsoft learning paths
          </h2>
          <p className="text-muted mt-2 leading-relaxed">
            Follow practical, role-based pathways designed to support workplace skills and certification preparation.
          </p>
        </div>

        {/* Search + filters */}
        <div className="mb-6 flex flex-col gap-3">
          <label className="relative block w-full">
            <span className="sr-only">Search learning paths</span>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true">
              <path d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
              placeholder="Search learning paths…"
              className="w-full min-h-[44px] rounded-xl border border-line bg-white pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/25"
            />
          </label>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:flex-wrap" role="group" aria-label="Filter learning paths by category">
            {CATEGORIES.map((c) => (
              <FilterChip key={c} active={activeCat === c} onClick={() => selectCat(c)}>
                {c}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Cards */}
        {shown.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {shown.map((p, i) => (
                <Reveal key={p.title} delay={(i % 4) * 70} className="h-full">
                  <Link
                    href={`/courses/aspire/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/60 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    <div className="overflow-hidden aspect-[16/9] bg-soft">
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                      <span className="mb-2 inline-flex w-fit rounded-full bg-teal/[0.08] px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-teal">
                        {p.category}
                      </span>
                      <h3 className="font-heading text-sm sm:text-base font-bold leading-snug text-navy">{p.title}</h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setVisible(filtered.length)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-teal bg-white px-6 py-3 text-sm font-bold text-teal transition-all duration-200 hover:bg-teal hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  View All Learning Paths
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d="M12 5v14M5 12l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-line bg-soft p-10 text-center text-muted">
            No learning paths match your search or filter.
          </div>
        )}
      </div>
    </section>
  )
}
