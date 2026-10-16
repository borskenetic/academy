import { useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import SectionLink from '../components/SectionLink'
import { useUI } from '../context/UIContext'

const GROUP_ORDER = ['PE-1', 'PE-2', 'PE-3', 'PE-4', 'PE-5', 'PE-6', 'Additional']

const GROUP_DESC = {
  'PE-1': 'Courses mapped to PE1 subjects.',
  'PE-2': 'Courses mapped to PE-2 subjects.',
  'PE-3': 'Core elective block including development, languages and testing options.',
  'PE-4': 'Advanced electives such as security and cloud.',
  'PE-5': 'Senior-year electives aligned to industry skills.',
  'PE-6': 'Final elective group for advanced specialization.',
  Additional: 'Subjects based on current industry trends and real-world skills.'
}

export function SubjectsGrid({ P }) {
  const groups = GROUP_ORDER.map((g) => {
    const list = P.courses.filter((c) => c[1] === g)
    return { g, list }
  }).filter((x) => x.list.length)

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-12" id="subjects" aria-labelledby="subjects-h">
      <p className="text-teal font-extrabold tracking-widest uppercase text-xs mb-1.5">Elective map</p>
      <h2 id="subjects-h" className="section-title">Subjects for {P.short}</h2>
      <p className="text-muted max-w-[44rem]">
        Seven subject groups. Select a group to jump to its courses below. All professional electives carry 3 credits.
      </p>
      <div className="grid gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ g, list }) => {
          const sem = list[0][2]
          const isAdd = g === 'Additional'
          const badge = isAdd ? 'Optional Learning' : `${list.length} ${list.length > 1 ? 'courses' : 'course'}`
          return (
            <article key={g} className="subject-card bg-white border border-line rounded-2xl p-6 flex flex-col gap-2.5 hover:border-teal hover:shadow-lg transition">
              <h3 className="font-heading text-navy text-lg">{isAdd ? 'Additional Learning' : `Professional Elective - ${g.split('-')[1]}`}</h3>
              <p className="text-[0.92rem] text-muted flex-1">{GROUP_DESC[g]}</p>
              <div className="flex gap-2 flex-wrap text-xs">
                <span className="inline-block bg-teal-bg text-teal-dark font-bold px-3 py-1 rounded-full border border-teal-light/40">{sem}</span>
                <span className={`inline-block font-bold px-3 py-1 rounded-full border ${isAdd ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-teal-bg text-teal-dark border-teal-light/40'}`}>{badge}</span>
              </div>
              <a className="text-teal font-bold text-sm hover:underline" href="#catalog">
                {isAdd ? 'View additional learning' : `View ${g} courses`} →
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function FeaturedGrid({ P }) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-12" id="featured" aria-labelledby="featured-h">
      <p className="text-teal font-extrabold tracking-widest uppercase text-xs mb-1.5">Examples</p>
      <h2 id="featured-h" className="section-title">Featured {P.short} courses</h2>
      <div className="grid gap-4 mt-5 sm:grid-cols-2 lg:grid-cols-4" id="featured-grid">
        {P.featured.map((f) => {
          const [title, tag, image] = f.split('|')
          if (image) {
            return (
              <article key={f} className="featured-item overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:border-teal hover:shadow-md">
                <img className="h-36 w-full object-cover" src={image} alt="" loading="lazy" />
                <div className="px-4 py-3.5">
                  <h3 className="font-heading text-sm font-bold leading-snug text-navy">{title}</h3>
                  <span className="mt-1 block text-xs font-semibold text-muted">{tag}</span>
                </div>
              </article>
            )
          }
          return (
            <div key={f} className="featured-item bg-navy text-teal-bg rounded-[10px] px-4 py-3.5 text-sm font-semibold border border-navyLight">
              {title}
              <span className="block font-normal text-xs text-slate-400 mt-1">{tag}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function ApplyModal({ course, programKey, onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    course_title: course,
    program_key: programKey
  })

  const submit = (event) => {
    event.preventDefault()

    post('/applications', {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        onClose()
      }
    })
  }

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy/60" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl w-[min(94vw,440px)] max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="modal-header"><h2>Apply for course</h2></div>
        <form className="grid gap-3.5 mt-4" onSubmit={submit}>
          <p className="text-sm text-muted">Confirm your application.</p>
          <div className="grid gap-1.5">
            <label className="text-sm font-bold text-navy" htmlFor="apply-name">Full Name</label>
            <input
              className="input"
              id="apply-name"
              type="text"
              required
              placeholder="Enter your full name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <span className="text-xs font-semibold text-red-600">{errors.name}</span>}
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-bold text-navy" htmlFor="apply-email">Email</label>
            <input
              className="input"
              id="apply-email"
              type="email"
              required
              placeholder="name@example.com"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
            {errors.email && <span className="text-xs font-semibold text-red-600">{errors.email}</span>}
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-bold text-navy" htmlFor="apply-course">Course</label>
            <input className="input" id="apply-course" readOnly value={course} />
          </div>
          <button type="submit" className="button button-teal button-full" disabled={processing}>
            {processing ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">×</button>
      </div>
    </div>
  )
}

export function useProgramMeta(P) {
  const groups = {}
  const semSet = {}
  P.courses.forEach((c) => {
    groups[c[1]] = true
    if (c[2] !== 'Any Semester') semSet[c[2]] = true
  })
  const peCount = Object.keys(groups).filter((g) => g.startsWith('PE-')).length
  const hasAdditional = !!groups.Additional
  const semKeys = Object.keys(semSet).sort()
  const semLabel = semKeys.length ? semKeys.join(' / ') : 'Any Semester'
  return { peCount, hasAdditional, semLabel }
}

const FILTER_TAB_BASE =
  'filter-tab whitespace-nowrap border border-teal bg-white text-teal font-bold text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-teal-bg focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2'

export function Catalog({ P, programKey = null }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [applyFor, setApplyFor] = useState(null)

  const semesters = ['All', ...new Set(P.courses.map((c) => c[2]))]

  const filtered = P.courses.filter((c) => {
    const matchesFilter = filter === 'All' || c[2] === filter
    const title = `${c[0]} ${c[5] || ''}`.toLowerCase()
    const matchesQuery = !query.trim() || title.includes(query.trim().toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-12" id="catalog" aria-labelledby="catalog-h">
      <p className="text-teal font-extrabold tracking-widest uppercase text-xs mb-1.5">Full catalog</p>
      <h2 id="catalog-h" className="section-title">Browse {P.short} by semester</h2>
      <p style={{ color: '#536274', maxWidth: '46rem' }}>Filter without page reload. Each card shows duration, credits and course code.</p>

      <div className="flex gap-2.5 flex-wrap my-4 max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:pb-1.5" role="tablist" aria-label="Semester filters">
        {semesters.map((s) => (
          <button key={s} type="button" className={FILTER_TAB_BASE} role="tab" aria-selected={filter === s} onClick={() => setFilter(s)}>
            {s}
          </button>
        ))}
      </div>

      <label className="course-search flex-1 min-w-[220px] flex items-center gap-2 border border-line rounded-[10px] px-3.5 py-2.5 bg-white max-w-md">
        <span aria-hidden="true">🔍</span>
        <input
          type="search"
          className="border-0 outline-none flex-1 text-inherit bg-transparent"
          placeholder="Search courses… e.g. AI, Python"
          aria-label="Search courses"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <div className="grid gap-3.5 mt-5 sm:grid-cols-2 lg:grid-cols-3" id="catalog-grid">
        {filtered.map((c) => {
          const gold = c[1] === 'Additional'
          return (
            <article key={c[0] + c[5]} className="course-card bg-white border border-line rounded-2xl p-5 flex flex-col gap-2.5 hover:border-teal hover:shadow-md transition">
              <h3 className="font-heading text-navy text-base leading-snug">{c[0]}</h3>
              <div className="flex gap-2 flex-wrap text-xs text-muted">
                <span className={`inline-block font-bold px-3 py-1 rounded-full border ${gold ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-teal-bg text-teal-dark border-teal-light/40'}`}>{c[1]}</span>
                <span>{c[2]}</span>
                <span>{c[3]}</span>
                <span>{c[4]}</span>
              </div>
              {c[5] ? (
                <div>
                  <span className="font-mono bg-navy text-white text-xs px-2.5 py-1 rounded-md">{c[5]}</span>
                </div>
              ) : null}
              <div className="flex gap-2.5 mt-1.5 flex-wrap">
                <button type="button" className="button button-teal !px-3.5 !py-2 !text-[0.85rem] !rounded-lg" onClick={() => setApplyFor(c[0])}>
                  Apply Now
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-[10px] mt-4" role="status">
          No courses match this filter + search. Try All or clear search.
        </div>
      )}

      <p style={{ marginTop: '1rem', fontSize: '.85rem', color: '#536274' }}>
        Listed fee per course record: <strong>Rs. 885 incl. GST</strong>.
      </p>

      {applyFor && <ApplyModal course={applyFor} programKey={programKey} onClose={() => setApplyFor(null)} />}
    </section>
  )
}

export function DetailTable({ P }) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-12" id="pe3" aria-labelledby="pe3-h">
      <p className="text-teal font-extrabold tracking-widest uppercase text-xs mb-1.5">Detail block</p>
      <h2 id="pe3-h" className="section-title">{P.detailTitle} ({P.short})</h2>
      <p style={{ color: '#536274', maxWidth: '46rem' }}>{P.detailNote}</p>
      <div className="overflow-x-auto mt-5 border border-line rounded-xl">
        <table className="w-full border-collapse text-[0.92rem] bg-white min-w-[640px]">
          <thead>
            <tr className="bg-navy text-white text-left">
              <th scope="col" className="px-4 py-3.5 text-sm font-semibold">Course</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-semibold">Duration</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-semibold">Credits</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-semibold">Code</th>
            </tr>
          </thead>
          <tbody className="[&_tr:nth-child(even)]:bg-soft">
            {P.detailRows.map((r) => (
              <tr key={r[0]} className="border-t border-line">
                <td className="px-4 py-3">{r[0]}</td>
                <td className="px-4 py-3">{r[1]}</td>
                <td className="px-4 py-3">{r[2]}</td>
                <td className="px-4 py-3"><code>{r[3]}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function SectionHero({ P }) {
  return (
    <section className="relative overflow-hidden text-white bg-gradient-to-br from-navy via-navyLight to-teal-dark py-14" aria-labelledby="page-title">
      <div className="max-w-[1200px] mx-auto px-6 grid gap-10 items-center lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <span className="inline-block bg-teal-light/15 border border-teal-light/50 text-teal-light font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">{P.short} • Skillsoft</span>
          <h1 id="page-title" className="font-heading text-white leading-tight tracking-tight mb-4 text-3xl md:text-5xl">Skillsoft Courses for {P.name}</h1>
          <p className="text-slate-300 text-lg max-w-[38rem] mb-7">
            Explore Skillsoft-powered professional electives and additional learning courses mapped for {P.short} students: {P.tagline}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#catalog" className="button button-teal button-large">View Courses <span aria-hidden="true">→</span></a>
            <SectionLink to="/" hash="learning-areas" className="button button-large border border-white/60 text-white hover:bg-white/10">Explore All Skillsoft Streams</SectionLink>
          </div>
        </div>
        <aside className="bg-white text-ink rounded-2xl p-6 shadow-xl" aria-label="Program summary">
          <h2 className="font-heading text-navy text-lg mb-3">What this guide covers</h2>
          <ul className="grid gap-2.5 text-[0.92rem] text-slate-600 list-none">
            <li><span>✓ Professional Elective groups (PE-1 to PE-6) mapped to Year 3 &amp; Year 4.</span></li>
            <li><span>✓ {P.courses.length} mapped courses with duration, credits and codes.</span></li>
            <li><span>✓ Additional Learning track for industry trends.</span></li>
            <li><span>✓ Listed fee Rs. 885 incl. GST per course.</span></li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export function QuickHighlights({ peCount, hasAdditional, semLabel }) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Quick highlights">
      <div className="bg-soft border border-line rounded-xl px-5 py-4">
        <div className="font-heading font-extrabold text-2xl text-navy">{peCount}</div>
        <div className="text-sm text-muted">Professional Elective Groups</div>
      </div>
      <div className="bg-soft border border-line rounded-xl px-5 py-4">
        <div className="font-heading font-extrabold text-2xl text-navy">{hasAdditional ? '1' : '0'}</div>
        <div className="text-sm text-muted">Additional Learning Track</div>
      </div>
      <div className="bg-soft border border-line rounded-xl px-5 py-4">
        <div className="font-heading font-extrabold text-2xl text-navy">{semLabel.length > 30 ? 'Year 3 & Year 4' : semLabel}</div>
        <div className="text-sm text-muted">Semester Mapping</div>
      </div>
      <div className="bg-soft border border-line rounded-xl px-5 py-4">
        <div className="font-heading font-extrabold text-2xl text-navy">Rs. 885</div>
        <div className="text-sm text-muted">Listed Fee Incl. GST</div>
      </div>
    </div>
  )
}

export default function ProgramPage({ program, programKey }) {
  const P = program
  const meta = P ? useProgramMeta(P) : null

  if (!P || !meta) {
    return (
      <main>
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
          Unknown program.&nbsp;
          <Link style={{ color: '#007D79' }} href="/">Back to streams</Link>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="max-w-[1200px] mx-auto px-6 pt-4 text-sm text-muted" aria-label="Breadcrumb">
        <Link className="text-teal font-semibold hover:underline" href="/">Home</Link>
        <span> › </span>
        <SectionLink to="/" hash="learning-areas" className="text-teal font-semibold hover:underline">Skillsoft Streams</SectionLink>
        <span> › </span>
        <span>{P.short}</span>
      </div>

      <SectionHero P={P} />
      <QuickHighlights peCount={meta.peCount} hasAdditional={meta.hasAdditional} semLabel={meta.semLabel} />
      <SubjectsGrid P={P} />
      <FeaturedGrid P={P} />
      <Catalog P={P} programKey={programKey} />
      <DetailTable P={P} />
      <div style={{ height: '1rem' }}></div>
    </main>
  )
}
