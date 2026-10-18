import { useEffect, useRef, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { useUI } from '../context/UIContext'
import SectionLink from './SectionLink'
import { SKILLSOFT_CATEGORIES } from '../data/courseGroups'

// Section anchors live on the landing page. Every nav entry uses SectionLink
// (not a raw `#hash`) so it also works from /program, /cse-courses,
// /skillsoft-catalog and /courses/{type}/{slug}. useScrollToHash() in Layout
// performs the scroll after the Inertia visit lands on "/".
const LEARN_ITEMS = [
  { label: 'All Learning Areas', hash: 'learning-areas' },
  { label: 'Technology & Development', hash: 'technology' },
  { label: 'Data & Analytics', hash: 'data' },
  { label: 'Cybersecurity', hash: 'cybersecurity' },
  { label: 'AI & Emerging Tech', hash: 'ai' }
]

const SUPPORT_ITEMS = [
  { label: 'Help Center', hash: 'footer' },
  { label: 'Contact Support', hash: 'footer' },
  { label: 'System Requirements', hash: 'footer' },
  { label: 'FAQs', hash: 'footer' }
]

function BrandMark() {
  return <img src="/logo.png" className="h-full w-full object-contain" alt="Area 51 logo" />
}

function TopLink({ hash, children }) {
  return (
    <SectionLink
      to="/"
      hash={hash}
      className="inline-flex items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
    >
      {children}
    </SectionLink>
  )
}

function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        {label}
        <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-xl border border-line bg-white p-2 shadow-xl">
          {items.map((i) => (
            <SectionLink
              key={i.hash}
              to="/"
              hash={i.hash}
              onClick={() => setOpen(false)}
              className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-soft hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              {i.label}
            </SectionLink>
          ))}
        </div>
      )}
    </div>
  )
}

const navLinkCls =
  'inline-flex items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold ' +
  'transition-colors hover:bg-soft hover:text-teal ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal'

const mobileLinkCls =
  'flex min-h-[44px] items-center rounded-lg px-3 text-base font-semibold text-ink ' +
  'transition-colors hover:bg-soft hover:text-teal ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal'

function MobileNav({ open, user, activeCategory }) {
  const sections = [
    { label: 'For Institutions', hash: 'audience' },
    { label: 'About', hash: 'about' },
    { label: 'Support', hash: 'footer' }
  ]

  return (
    <div
      id="mobile-nav"
      className={`xl:hidden overflow-y-auto bg-white transition-all duration-300 ease-in-out ${open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}
      aria-hidden={!open}
      {...(!open ? { inert: '' } : {})}
    >
      <nav className="px-4 sm:px-6" aria-label="Mobile navigation">
        <div className="grid gap-0.5 border-t border-line">
          <p className="px-3 pb-1 pt-3 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">Skillsoft Courses</p>
          <Link href="/skillsoft-catalog" className={mobileLinkCls}>All courses</Link>
          {SKILLSOFT_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/skillsoft-catalog?cat=${encodeURIComponent(category)}`}
              className={`${mobileLinkCls} ${activeCategory === category ? 'bg-soft text-navy' : ''}`}
            >
              {category}
            </Link>
          ))}
          {sections.map((l) => (
            <SectionLink key={l.hash} to="/" hash={l.hash} className={mobileLinkCls}>
              {l.label}
            </SectionLink>
          ))}
          <Link
            href={user ? '/dashboard' : '/login'}
            className="my-2 flex min-h-[44px] items-center justify-center rounded-lg bg-teal px-4 text-base font-bold text-white transition-colors hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            {user ? 'Dashboard' : 'Login'}
          </Link>
        </div>
      </nav>
    </div>
  )
}

function SkillsoftCoursesDropdown({ activeCategory = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`${navLinkCls} gap-1 ${activeCategory ? 'text-teal' : ''}`}
      >
        Skillsoft Courses
        <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-[70] mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-xl">
          <p className="px-3 pb-1 pt-2 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-slate-400">Browse by category</p>
          {SKILLSOFT_CATEGORIES.map((category) => {
            const active = activeCategory === category
            return (
              <Link
                key={category}
                href={`/skillsoft-catalog?cat=${encodeURIComponent(category)}`}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`mt-0.5 flex min-h-[40px] items-center rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${active ? 'bg-soft text-navy' : 'text-navy hover:bg-soft'}`}
              >
                {category}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ProgramsDropdown({ current = '' }) {
  const { categories } = usePage().props
  const headerCats = (categories || []).filter((c) => c !== 'All')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`${navLinkCls} ${current === '/program' || current === '/cse-courses' ? 'text-teal' : ''}`}
      >
        Programs
        <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-[70] mt-2 w-72 rounded-xl border border-line bg-white p-3 shadow-xl">
          <p className="px-3 pb-1 pt-1 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-muted">Curated programs</p>
          <Link href="/program" onClick={() => setOpen(false)} className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
            Skillsoft Programs
          </Link>
          <Link href="/cse-courses" onClick={() => setOpen(false)} className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
            CSE Courses
          </Link>
          <p className="mt-2 px-3 pb-1 pt-1 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-muted">Browse by category</p>
          {headerCats.map((c) => (
            <Link
              key={c}
              href={`/skillsoft-catalog?cat=${encodeURIComponent(c)}`}
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-soft hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              {c}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function HomeHeader() {
  const { openModal } = useUI()
  const { url, props } = usePage()
  const user = props.auth?.user
  const pathname = url.split('?')[0].split('#')[0]
  const activeCategory = pathname === '/skillsoft-catalog'
    ? (new URLSearchParams(url.split('?')[1] || '').get('cat') || '')
    : ''
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/90 backdrop-blur-md shadow-[0_1px_3px_rgba(7,23,53,0.04)]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3 sm:gap-4 md:h-[72px] lg:h-20 lg:gap-6">
          {/* Brand / logo */}
          <a href="/" aria-label="Area 51 Home" className="flex shrink-0 min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="h-10 w-10 shrink-0 lg:h-12 lg:w-12">
              <BrandMark />
            </div>
            <div className="block min-w-0 leading-tight">
              <span className="block whitespace-nowrap font-heading text-[15px] font-extrabold tracking-wide text-navy sm:text-base lg:text-lg">Area 51</span>
              <span className="block whitespace-nowrap text-[0.5rem] font-bold tracking-[0.14em] text-teal sm:text-[0.62rem] sm:tracking-[0.18em] lg:text-[0.65rem]">INFORMATION TECHNOLOGY</span>
              <span className="block whitespace-nowrap text-[0.68rem] font-medium text-navy">Services</span>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav className="ml-2 hidden items-center gap-1 xl:flex 2xl:ml-6" id="site-nav" aria-label="Main navigation">
            <TopLink hash="home"> Home</TopLink>
            <SkillsoftCoursesDropdown activeCategory={activeCategory} />
            <TopLink hash="audience">For Institutions</TopLink>
            <TopLink hash="about">About</TopLink>
            <NavDropdown label="Support" items={SUPPORT_ITEMS} />
          </nav>

          {/* Desktop actions */}
          <div className="ml-auto hidden shrink-0 items-center gap-2.5 xl:flex">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy transition-all duration-200 hover:border-teal hover:bg-soft hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              onClick={() => openModal('search')}
              aria-label="Open search dialog"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
                <path d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
            <Link
              href={user ? '/dashboard' : '/login'}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-teal px-5 text-sm font-bold text-white transition-colors hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              {user ? 'Dashboard' : 'Login'}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="ml-auto flex shrink-0 items-center gap-2 xl:hidden sm:gap-2.5">
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-navy transition-colors hover:bg-soft hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileNav open={mobileOpen} user={user} activeCategory={activeCategory} />
    </header>
  )
}

/**
 * One navigation for every route. The landing header is the only header, so
 * /program, /cse-courses, /skillsoft-catalog and /courses/{type}/{slug} all
 * render exactly this nav (previously a separate SubHeader was used).
 */
export default function Header() {
  return <HomeHeader />
}