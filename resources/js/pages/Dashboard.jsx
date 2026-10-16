import { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'

const STATUS_STYLES = {
  submitted: 'bg-teal-bg text-teal-dark border-teal-light/40'
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold capitalize ${STATUS_STYLES[status] || 'border-line bg-soft text-muted'}`}>
      {status}
    </span>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1 font-heading text-3xl font-bold text-navy">{value}</p>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-extrabold uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink">{value || '—'}</dd>
    </div>
  )
}

function Sidebar({ user, open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-navy/60 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-navy text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <a href="/" className="flex items-center gap-3 border-b border-white/10 px-6 py-5" aria-label="Area 51 home">
          <img src="/logo.png" alt="" className="h-10 w-10 rounded-md bg-white object-contain p-0.5" />
          <span>
            <span className="block font-heading text-base font-extrabold tracking-wide">Area 51</span>
            <span className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#7fe7db]">Admin</span>
          </span>
        </a>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          <p className="px-3 pb-1 pt-2 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-400">Manage</p>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex min-h-[44px] items-center gap-3 rounded-lg bg-teal px-3 py-2 text-sm font-bold text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M3 3h18v18H3zM3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Inquiries
          </Link>
          <a href="/" className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/5 hover:text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            View website
          </a>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7b64a] text-sm font-extrabold text-[#0a1d2d]">{(user?.name || 'A').charAt(0)}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{user?.name}</p>
              <p className="truncate text-xs text-slate-300">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.post('/logout')}
            className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-bold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}
function InquiryRow({ inquiry, expanded, onToggle }) {
  const applicant = [inquiry.first_name, inquiry.last_name].filter(Boolean).join(' ') || inquiry.name
  const institutionCode = inquiry.institution_code?.toUpperCase()

  return (
    <>
      <tr className="border-t border-line">
        <td className="px-4 py-3 text-xs font-bold text-muted">#{inquiry.id}</td>
        <td className="px-4 py-3">
          <p className="font-bold text-navy">{applicant}</p>
          <p className="text-xs text-muted">{inquiry.email}</p>
        </td>
        <td className="px-4 py-3">
          {institutionCode && (
            <span className="inline-flex rounded-full border border-teal/30 bg-teal-bg px-2.5 py-1 text-xs font-extrabold text-teal-dark">
              {institutionCode}
            </span>
          )}
          <p className="mt-1 max-w-[180px] text-xs text-muted">{inquiry.institution_name || '—'}</p>
        </td>
        <td className="px-4 py-3">
          <p className="font-semibold text-ink">{inquiry.course_title}</p>
          {inquiry.source_page && <p className="text-xs text-muted">via {inquiry.source_page}</p>}
        </td>
        <td className="px-4 py-3 text-muted">{inquiry.program || '—'}</td>
        <td className="px-4 py-3"><StatusBadge status={inquiry.status} /></td>
        <td className="px-4 py-3 text-muted">{inquiry.submitted_at}</td>
        <td className="px-2 py-3">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Hide' : 'Show'} details for ${applicant}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-soft hover:text-teal"
          >
            <svg viewBox="0 0 20 20" className={`h-5 w-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} aria-hidden="true">
              <path d="M5.5 8 10 12.5 14.5 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-t border-line bg-soft/70">
          <td colSpan={8} className="px-4 py-4 sm:px-6">
            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              <Detail label="Mobile number" value={inquiry.mobile_number} />
              <Detail label="Institution" value={inquiry.institution_name} />
              <Detail label="Applicant category" value={inquiry.applicant_category} />
              <Detail label="Gender" value={inquiry.gender} />
              <Detail label="Education level" value={inquiry.education_level} />
              <Detail label="Roll no." value={inquiry.roll_no} />
              <Detail label="Eligibility / PRN" value={inquiry.eligibility_prn} />
              <Detail label="Year of study" value={inquiry.year_of_study} />
              <Detail label="Address" value={inquiry.address} />
              <Detail label="Pincode" value={inquiry.pincode} />
              <Detail label="Course slug" value={inquiry.course_slug} />
              <Detail label="Source page" value={inquiry.source_page} />
              <Detail label="Source origin" value={inquiry.source_origin} />
              {inquiry.course_url && (
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-wider text-muted">Course URL</dt>
                  <dd className="mt-0.5">
                    <a className="break-all text-sm font-semibold text-teal hover:underline" href={inquiry.course_url} target="_blank" rel="noreferrer">
                      {inquiry.course_url}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </td>
        </tr>
      )}
    </>
  )
}
export default function Dashboard({ inquiries = [], stats = {} }) {
  const { auth } = usePage().props
  const user = auth?.user
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expanded, setExpanded] = useState(() => new Set())

  const toggleRow = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex min-h-screen bg-soft text-ink">
      <Head title="Admin Dashboard" />
      <Sidebar user={user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-w-0 flex-1">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open admin navigation"
            aria-controls="admin-sidebar"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-navy transition-colors hover:border-teal hover:text-teal"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <span className="font-heading text-base font-extrabold text-navy">Admin Dashboard</span>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <header>
            <p className="mb-1.5 text-xs font-extrabold uppercase tracking-widest text-teal">Admin area</p>
            <h1 className="font-heading text-2xl font-bold text-navy sm:text-3xl">Course Inquiries</h1>
            <p className="mt-1 text-sm text-muted">
              Signed in as <strong className="text-navy">{user?.name}</strong> ({user?.email})
              <span className="ml-2 inline-block rounded-full border border-line bg-white px-2.5 py-0.5 text-xs font-bold capitalize text-muted">admin</span>
            </p>
          </header>

          <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Inquiry statistics">
            <StatCard label="Total inquiries" value={stats.total ?? inquiries.length} />
            <StatCard label="Submitted" value={stats.submitted ?? 0} />
            <StatCard label="New today" value={stats.new_today ?? 0} />
          </section>

          <section className="mt-6 rounded-2xl border border-line bg-white shadow-sm" aria-labelledby="inquiries-h">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
              <h2 id="inquiries-h" className="font-heading text-lg font-bold text-navy">All inquiries</h2>
              <span className="text-xs font-bold text-muted">{inquiries.length} total</span>
            </div>

            {inquiries.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-muted">
                No inquiries yet. Applications submitted through the site will appear here.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-navy text-left text-white">
                      <th scope="col" className="px-4 py-3 font-semibold">ID</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Applicant</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Institution</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Course</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Program</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Submitted</th>
                      <th scope="col" className="w-10 px-2 py-3"><span className="sr-only">Details</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <InquiryRow
                        key={inquiry.id}
                        inquiry={inquiry}
                        expanded={expanded.has(inquiry.id)}
                        onToggle={() => toggleRow(inquiry.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
