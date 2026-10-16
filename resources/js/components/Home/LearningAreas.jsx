import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { LEARNING_AREAS } from './learningData'

function Tile({ cat, selected, onSelect, decorative }) {
  const isSel = selected === cat.key
  return (
    <button
      type="button"
      onClick={() => onSelect(cat.key)}
      aria-pressed={isSel}
      tabIndex={decorative ? -1 : 0}
      className={`group flex w-40 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border bg-white px-4 py-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/70 hover:shadow-md sm:w-52 lg:w-56 ${isSel ? 'border-teal ring-1 ring-teal/25' : 'border-line'}`}
    >
      <span className={`grid h-12 w-12 place-items-center text-teal transition-transform duration-200 group-hover:scale-110 ${isSel ? 'scale-110' : ''}`}>
        <cat.Icon className="h-11 w-11" />
      </span>
      <span className={`text-sm font-semibold transition-colors duration-200 ${isSel ? 'text-navy' : 'text-navy/80'}`}>{cat.label}</span>
    </button>
  )
}

export default function LearningAreas() {
  const [selected, setSelected] = useState(LEARNING_AREAS[0].key)
  const cat = LEARNING_AREAS.find((c) => c.key === selected) || LEARNING_AREAS[0]

  return (
    <section className="bg-soft border-y border-line py-12 sm:py-16 lg:py-20" aria-labelledby="learning-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-2 text-teal font-extrabold uppercase tracking-widest text-xs">Programs</p>
        <h2 id="learning-heading" className="font-heading text-navy font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl mb-3">
          Learn Across In-Demand Areas
        </h2>
        <p className="mx-auto max-w-2xl text-muted">Explore skills across technology, business, leadership, and emerging fields.</p>
      </div>

      {/* Continuous logo loop (full bleed) */}
      <div className="marquee mt-8 overflow-hidden" aria-label="Learning areas">
        <div className="marquee-track flex w-max gap-4 sm:gap-5">
          <div className="flex gap-4 pr-4 sm:gap-5 sm:pr-5">
            {LEARNING_AREAS.map((c) => (
              <Tile key={c.key} cat={c} selected={selected} onSelect={setSelected} />
            ))}
          </div>
          <div className="flex gap-4 pr-4 sm:gap-5 sm:pr-5" aria-hidden="true">
            {LEARNING_AREAS.map((c) => (
              <Tile key={`dup-${c.key}`} cat={c} selected={selected} onSelect={setSelected} decorative />
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic details panel */}
      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-6 shadow-[0_16px_40px_-28px_rgba(7,23,53,0.35)] sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/[0.08] text-teal sm:grid">
              <cat.Icon className="h-7 w-7" />
            </span>
            <div>
              <p className="mb-1 text-teal font-bold uppercase tracking-widest text-xs">{cat.tag}</p>
              <h3 className="font-heading text-navy text-xl sm:text-2xl font-bold">{cat.label}</h3>
              <p className="mt-2 leading-relaxed text-muted">{cat.desc}</p>
              <p className="mt-4 text-sm font-semibold text-navy">Example topics</p>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {cat.topics.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-ink">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-teal" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="shrink-0">
            <Link href={cat.href} className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-teal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-teal-dark">
              Explore Courses
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}