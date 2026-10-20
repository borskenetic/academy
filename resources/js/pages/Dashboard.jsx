import { useEffect, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AdminSidebar, { useAdminChrome } from '../components/AdminSidebar'

const PAGE_SIZES = [20, 50, 100]

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
              <Detail label="ID No." value={inquiry.roll_no} />
              <Detail label="Course/Program" value={inquiry.course_program} />
              <Detail label="Year of study" value={inquiry.year_of_study} />
              <Detail label="Address" value={inquiry.address} />
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

function queryParams(filters, pagination, overrides = {}) {
  const next = {
    search: filters.search || '',
    institution: filters.institution || '',
    status: filters.status || '',
    from: filters.from || '',
    to: filters.to || '',
    per_page: pagination.per_page || 20,
    page: pagination.current_page || 1,
    ...overrides
  }
  return Object.fromEntries(
    Object.entries(next).filter(([key, value]) => {
      if (value === '' || value === null || value === undefined) return false
      if (key === 'per_page' && Number(value) === 20) return false
      if (key === 'page' && Number(value) === 1) return false
      return true
    })
  )
}

function exportHref(filters) {
  const params = new URLSearchParams(queryParams(filters, { per_page: 20, current_page: 1 }))
  const query = params.toString()
  return query ? `/dashboard/export?${query}` : '/dashboard/export'
}

function pageWindow(current, last) {
  const start = Math.max(1, current - 2)
  const end = Math.min(last, start + 4)
  const pages = []
  for (let page = Math.max(1, end - 4); page <= end; page += 1) pages.push(page)
  return pages
}

const fieldClass = 'mt-1.5 min-h-[42px] w-full rounded-lg border border-line bg-white px-3 text-sm font-normal text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20'

export default function Dashboard({
  inquiries = [],
  stats = {},
  pagination = { current_page: 1, last_page: 1, per_page: 20, total: 0, from: null, to: null },
  filters = { search: '', institution: '', status: '', from: '', to: '' },
  institutions = [],
  statuses = []
}) {
  const { auth } = usePage().props
  const user = auth?.user
  const { sidebarOpen, setSidebarOpen, collapsed, toggleCollapse } = useAdminChrome()
  const [expanded, setExpanded] = useState(() => new Set())
  const [search, setSearch] = useState(filters.search || '')

  useEffect(() => {
    setSearch(filters.search || '')
  }, [filters.search])

  const toggleRow = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const visit = (overrides) => {
    router.get('/dashboard', queryParams(filters, pagination, overrides), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      only: ['inquiries', 'pagination', 'filters']
    })
  }

  const pages = pageWindow(pagination.current_page, pagination.last_page)
  const downloadUrl = exportHref(filters)

  return (
    <div className="flex min-h-screen bg-soft text-ink">
      <Head title="Admin Dashboard" />
      <AdminSidebar
        user={user}
        open={sidebarOpen}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={toggleCollapse}
      />

      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open admin navigation"
            aria-controls="admin-sidebar"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-navy transition-colors hover:border-teal hover:text-teal lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <button
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!collapsed}
            aria-controls="admin-sidebar"
            className="hidden h-11 w-11 items-center justify-center rounded-lg border border-line text-navy transition-colors hover:border-teal hover:text-teal lg:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <span className="sr-only">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
          </button>
          <span className="font-heading text-base font-extrabold text-navy">Course Inquiries</span>
        </div>

        <div className="mx-auto w-full max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <header>
            <p className="mb-1.5 text-xs font-extrabold uppercase tracking-widest text-teal">Admin area</p>
            <h1 className="font-heading text-2xl font-bold text-navy sm:text-3xl">Course Inquiries</h1>
            <p className="mt-1 text-sm text-muted">
              Signed in as <strong className="text-navy">{user?.name}</strong> ({user?.email})
              <span className="ml-2 inline-block rounded-full border border-line bg-white px-2.5 py-0.5 text-xs font-bold capitalize text-muted">admin</span>
            </p>
          </header>

          <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Inquiry statistics">
            <StatCard label="Total inquiries" value={stats.total ?? pagination.total} />
            <StatCard label="Submitted" value={stats.submitted ?? 0} />
            <StatCard label="New today" value={stats.new_today ?? 0} />
          </section>

          <section className="mt-6 rounded-2xl border border-line bg-white shadow-sm" aria-labelledby="inquiries-h">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
              <h2 id="inquiries-h" className="font-heading text-lg font-bold text-navy">All inquiries</h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-muted">{pagination.total} matching</span>
                <a
                  href={downloadUrl}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-navy px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-navy/90 ${pagination.total === 0 ? 'pointer-events-none opacity-50' : ''}`}
                  aria-disabled={pagination.total === 0}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M12 4v10m0 0l-4-4m4 4l4-4M5 18h14" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Download CSV
                </a>
              </div>
            </div>

            <form
              className="grid gap-3 border-b border-line px-5 py-4 sm:grid-cols-2 xl:grid-cols-6"
              onSubmit={(event) => {
                event.preventDefault()
                visit({ search: search.trim(), page: 1 })
              }}
            >
              <label className="block text-xs font-extrabold uppercase tracking-wider text-muted sm:col-span-2">
                Search
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Name, email, course, ID no."
                  className={fieldClass}
                />
              </label>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-muted">
                Institution
                <select
                  value={filters.institution || ''}
                  onChange={(event) => visit({ institution: event.target.value, page: 1 })}
                  className={fieldClass}
                >
                  <option value="">All institutions</option>
                  {institutions.map((code) => (
                    <option key={code} value={code}>{code.toUpperCase()}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-muted">
                Status
                <select
                  value={filters.status || ''}
                  onChange={(event) => visit({ status: event.target.value, page: 1 })}
                  className={fieldClass}
                >
                  <option value="">All statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status} className="capitalize">{status}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-muted">
                From
                <input
                  type="date"
                  value={filters.from || ''}
                  onChange={(event) => visit({ from: event.target.value, page: 1 })}
                  className={fieldClass}
                />
              </label>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-muted">
                To
                <input
                  type="date"
                  value={filters.to || ''}
                  onChange={(event) => visit({ to: event.target.value, page: 1 })}
                  className={fieldClass}
                />
              </label>
              <div className="flex flex-wrap items-end gap-2 sm:col-span-2 xl:col-span-6">
                <button type="submit" className="inline-flex min-h-[42px] items-center rounded-lg bg-teal px-4 py-2 text-sm font-bold text-white hover:bg-teal-dark">
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    router.get('/dashboard', {}, { preserveScroll: true, replace: true })
                  }}
                  className="inline-flex min-h-[42px] items-center rounded-lg border border-line px-4 py-2 text-sm font-bold text-navy hover:border-teal hover:text-teal"
                >
                  Clear
                </button>
              </div>
            </form>

            {inquiries.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-muted">
                {pagination.total === 0 && !filters.search && !filters.institution && !filters.status && !filters.from && !filters.to
                  ? 'No inquiries yet. Applications submitted through the site will appear here.'
                  : 'No inquiries match these filters.'}
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

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
              <p className="text-sm text-muted">
                {pagination.total === 0
                  ? 'Showing 0'
                  : `Showing ${pagination.from}–${pagination.to} of ${pagination.total}`}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-navy">
                  Rows
                  <select
                    value={pagination.per_page}
                    onChange={(event) => visit({ per_page: Number(event.target.value), page: 1 })}
                    className="min-h-[40px] rounded-lg border border-line bg-white px-2 text-sm font-semibold"
                  >
                    {PAGE_SIZES.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => visit({ page: pagination.current_page - 1 })}
                  disabled={pagination.current_page <= 1}
                  className="inline-flex min-h-[40px] items-center rounded-lg border border-line px-3 text-sm font-bold text-navy hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                {pages.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => visit({ page })}
                    aria-current={page === pagination.current_page ? 'page' : undefined}
                    className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-2 text-sm font-bold ${page === pagination.current_page ? 'border-teal bg-teal text-white' : 'border-line text-navy hover:border-teal hover:text-teal'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => visit({ page: pagination.current_page + 1 })}
                  disabled={pagination.current_page >= pagination.last_page}
                  className="inline-flex min-h-[40px] items-center rounded-lg border border-line px-3 text-sm font-bold text-navy hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
