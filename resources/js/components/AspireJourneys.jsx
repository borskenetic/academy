import { useState } from 'react'
import { Link } from '@inertiajs/react'
import Reveal from './Home/Reveal'
import { ASPIRE_JOURNEYS } from '../data/currentCatalog'

const CATEGORIES = ['All', 'Technology & Developer Journeys', 'Innovation, Digital & Leadership Journeys']

export default function AspireJourneys() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(8)
  const searched = query.trim().toLowerCase()
  const filtered = ASPIRE_JOURNEYS.filter((journey) =>
    (active === 'All' || journey.category === active) &&
    (!searched || [journey.title, journey.overview].join(' ').toLowerCase().includes(searched))
  )

  const resetVisible = (callback) => (value) => {
    callback(value)
    setVisible(8)
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="aspire-journeys" aria-labelledby="aspire-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-widest text-teal">Aspire journeys</p>
        <h2 id="aspire-heading" className="mt-2 font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl">Role-based Skillsoft learning paths</h2>
        <p className="mt-2 max-w-2xl text-muted">Follow the current technology, innovation, digital, and leadership pathways.</p>

        <div className="mt-6 grid gap-3">
          <input type="search" value={query} onChange={(event) => resetVisible(setQuery)(event.target.value)} placeholder="Search learning paths…" className="min-h-[44px] w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/25" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button key={category} type="button" onClick={() => resetVisible(setActive)(category)} className={`min-h-[44px] shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${active === category ? 'border-teal bg-teal text-white' : 'border-line bg-white text-navy hover:border-teal'}`}>{category}</button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.slice(0, visible).map((journey, index) => (
            <Reveal key={journey.slug} delay={(index % 4) * 70} className="h-full">
              <Link href={`/courses/aspire/${journey.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-teal/60 hover:shadow-lg">
                <div className="aspect-[16/9] overflow-hidden bg-soft">
                  <img src={journey.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                  <span className="mb-2 w-fit rounded-full bg-teal/[0.08] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-teal">{journey.category}</span>
                  <h3 className="font-heading text-sm font-bold leading-snug text-navy sm:text-base">{journey.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {!filtered.length && <div className="mt-6 rounded-2xl border border-line bg-soft p-10 text-center text-muted">No learning paths match your search or filter.</div>}
        {filtered.length > visible && <div className="mt-8 text-center"><button type="button" onClick={() => setVisible(filtered.length)} className="rounded-xl border border-teal px-6 py-3 text-sm font-bold text-teal hover:bg-teal hover:text-white">View All Learning Paths</button></div>}
      </div>
    </section>
  )
}
