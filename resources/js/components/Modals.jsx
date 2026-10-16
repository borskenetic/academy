import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { useUI } from '../context/UIContext'
import { RegisterForm } from './AuthForms'

// Search dialog backed by the real Skillsoft catalog (source: Content-Mapping workbook).
const POPULAR = ['Python', 'AI', 'Data', 'Cybersecurity', 'DevOps', 'Machine Learning']

function ModalShell({ children, onClose, width }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy/60" onClick={onClose} aria-hidden="true" />
      <div className={`relative bg-white rounded-2xl ${width} max-h-[90vh] overflow-y-auto shadow-2xl p-6`}>
        {children}
        <button
          className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-soft hover:bg-line text-xl leading-none"
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

function SearchModal({ onClose }) {
  const { showToast } = useUI()
  const { catalog } = usePage().props
  const SKILLSOFT_COURSES = catalog || []
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)

  const runSearch = (term) => {
    const q = (term || '').trim().toLowerCase()
    setQuery(term || '')
    if (!q) {
      setResults([])
      setSearched(false)
      return
    }
    const words = q.split(/\s+/)
    const out = SKILLSOFT_COURSES.filter((c) => {
      const hay = [c.title, c.overview, c.category, ...(c.outcomes || [])].join(' ').toLowerCase()
      return words.every((w) => hay.includes(w))
    }).slice(0, 8)
    setResults(out)
    setSearched(true)
    if (out.length) showToast(`Found ${out.length} course${out.length > 1 ? 's' : ''} for “${term}”.`)
  }

  return (
    <ModalShell width="w-[min(94vw,560px)]" onClose={onClose}>
      <h2 className="font-heading font-bold text-navy text-lg">Search Skillsoft Courses &amp; Certifications</h2>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault()
          runSearch(query)
        }}
      >
        <div className="flex items-center gap-2 border border-line rounded-xl p-2 pl-3">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted shrink-0">
            <path d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Cybersecurity, AWS, Python..."
            autoComplete="off"
            className="flex-1 min-w-0 outline-none text-sm"
          />
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-bold bg-teal text-white hover:bg-teal-dark">
            Search
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
          <span className="text-muted">Popular Searches:</span>
          {POPULAR.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => runSearch(term)}
              className="px-3 py-1.5 rounded-full border border-line text-xs font-bold hover:border-teal hover:text-teal"
            >
              {term}
            </button>
          ))}
        </div>
      </form>
      <div className="mt-4 grid gap-2.5">
        {searched && results.length === 0 && (
          <p className="text-sm text-muted">No courses match “{query}”. Try “Python”, “AI”, “Data”, or “Security”.</p>
        )}
        {results.map((course) => (
          <Link
            key={course.slug}
            href={'/skillsoft-catalog#' + course.slug}
            onClick={onClose}
            className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-2.5 text-sm transition-colors hover:border-teal hover:bg-teal-bg"
          >
            <span>
              <span className="block font-semibold text-navy">{course.title}</span>
              <span className="block text-xs text-muted">{course.category} · {course.duration}</span>
            </span>
            <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-teal">View</span>
          </Link>
        ))}
      </div>
    </ModalShell>
  )
}

function RegisterModal({ onClose }) {
  return (
    <ModalShell width="w-[min(94vw,440px)]" onClose={onClose}>
      <RegisterForm onDone={onClose} />
    </ModalShell>
  )
}

export default function Modals() {
  const { activeModal, closeModal } = useUI()
  if (!activeModal) return null
  if (activeModal === 'search') return <SearchModal onClose={closeModal} />
  if (activeModal === 'register') return <RegisterModal onClose={closeModal} />
  return null
}