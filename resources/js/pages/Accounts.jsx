import { useState } from 'react'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import AdminSidebar, { useAdminChrome } from '../components/AdminSidebar'

const PAGE_SIZES = [20, 50, 100]
const fieldClass = 'mt-1.5 min-h-[42px] w-full rounded-lg border border-line bg-white px-3 text-sm font-normal text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20'

const emptyForm = {
  name: '',
  email: '',
  role: 'admin',
  institution_code: '',
  password: '',
  password_confirmation: ''
}

function pageWindow(current, last) {
  const start = Math.max(1, current - 2)
  const end = Math.min(last, start + 4)
  const pages = []
  for (let page = Math.max(1, end - 4); page <= end; page += 1) pages.push(page)
  return pages
}

export default function Accounts({
  accounts = [],
  pagination = { current_page: 1, last_page: 1, per_page: 20, total: 0, from: null, to: null },
  filters = { search: '', platform: '', role: '' },
  platforms = {},
  roles = []
}) {
  const { auth, flash } = usePage().props
  const user = auth?.user
  const { sidebarOpen, setSidebarOpen, collapsed, toggleCollapse } = useAdminChrome()
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState(filters.search || '')

  const visit = (overrides) => {
    router.get('/dashboard/accounts', {
      search: filters.search || undefined,
      platform: filters.platform || undefined,
      role: filters.role || undefined,
      per_page: pagination.per_page,
      page: pagination.current_page,
      ...overrides
    }, { preserveState: true, preserveScroll: true, replace: true })
  }

  const pages = pageWindow(pagination.current_page, pagination.last_page)

  return (
    <div className="flex min-h-screen bg-soft text-ink">
      <Head title="Accounts" />
      <AdminSidebar
        user={user}
        open={sidebarOpen}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={toggleCollapse}
      />
      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4">
          <button type="button" onClick={() => setSidebarOpen(true)} aria-label="Open admin navigation" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-navy lg:hidden">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <button type="button" onClick={toggleCollapse} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="hidden h-11 w-11 items-center justify-center rounded-lg border border-line text-navy lg:inline-flex">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <span className="font-heading text-base font-extrabold text-navy">Accounts</span>
        </div>

        <div className="mx-auto w-full max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1.5 text-xs font-extrabold uppercase tracking-widest text-teal">Admin area</p>
              <h1 className="font-heading text-2xl font-bold text-navy sm:text-3xl">Accounts</h1>
              <p className="mt-1 max-w-2xl text-sm text-muted">Login accounts for Academy and every platform. An admin with a platform can sign in on that platform and see only its registrations.</p>
            </div>
            <button type="button" onClick={() => setAdding(true)} className="inline-flex min-h-[44px] items-center rounded-lg bg-teal px-4 text-sm font-bold text-white hover:bg-teal-dark">
              Add account
            </button>
          </header>

          {flash?.success && <p className="mt-4 rounded-lg border border-teal/30 bg-teal-bg px-3 py-2 text-sm font-semibold text-teal-dark">{flash.success}</p>}
          {flash?.error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{flash.error}</p>}

          <section className="mt-6 rounded-2xl border border-line bg-white shadow-sm">
            <form
              className="grid gap-3 border-b border-line px-5 py-4 sm:grid-cols-2 xl:grid-cols-4"
              onSubmit={(event) => {
                event.preventDefault()
                visit({ search: search.trim(), page: 1 })
              }}
            >
              <label className="text-sm font-semibold text-navy xl:col-span-2">
                Search
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name or email" className={fieldClass} />
              </label>
              <label className="text-sm font-semibold text-navy">
                Platform
                <select value={filters.platform || ''} onChange={(event) => visit({ platform: event.target.value, page: 1 })} className={fieldClass}>
                  <option value="">All platforms</option>
                  <option value="academy">Academy</option>
                  {Object.entries(platforms).map(([code, label]) => <option key={code} value={code}>{label}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-navy">
                Role
                <select value={filters.role || ''} onChange={(event) => visit({ role: event.target.value, page: 1 })} className={fieldClass}>
                  <option value="">All roles</option>
                  {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
              </label>
            </form>

            {accounts.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-muted">No accounts match these filters.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-navy text-left text-white">
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Platform</th>
                      <th className="px-4 py-3 font-semibold">Role</th>
                      <th className="px-4 py-3 font-semibold">Created</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account) => (
                      <tr key={account.id} className="border-b border-line last:border-0">
                        <td className="px-4 py-3 font-semibold text-navy">{account.name}{account.id === user?.id ? ' (you)' : ''}</td>
                        <td className="px-4 py-3">{account.email}</td>
                        <td className="px-4 py-3">{account.platform}</td>
                        <td className="px-4 py-3 capitalize">{account.role}</td>
                        <td className="px-4 py-3">{account.created_at}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button type="button" onClick={() => setEditing(account)} className="rounded-lg border border-line px-3 py-1.5 text-xs font-bold text-navy hover:border-teal hover:text-teal">Edit</button>
                            <button
                              type="button"
                              disabled={account.id === user?.id}
                              onClick={() => {
                                if (window.confirm(`Delete ${account.email}?`)) {
                                  router.delete(`/dashboard/accounts/${account.id}`, { preserveScroll: true })
                                }
                              }}
                              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
              <p className="text-sm text-muted">
                {pagination.total === 0 ? 'Showing 0' : `Showing ${pagination.from}–${pagination.to} of ${pagination.total}`}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-navy">
                  Rows
                  <select value={pagination.per_page} onChange={(event) => visit({ per_page: Number(event.target.value), page: 1 })} className="min-h-[40px] rounded-lg border border-line bg-white px-2 text-sm">
                    {PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                </label>
                <button type="button" disabled={pagination.current_page <= 1} onClick={() => visit({ page: pagination.current_page - 1 })} className="inline-flex min-h-[40px] items-center rounded-lg border border-line px-3 text-sm font-bold disabled:opacity-40">Previous</button>
                {pages.map((page) => (
                  <button key={page} type="button" onClick={() => visit({ page })} className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-2 text-sm font-bold ${page === pagination.current_page ? 'border-teal bg-teal text-white' : 'border-line text-navy'}`}>{page}</button>
                ))}
                <button type="button" disabled={pagination.current_page >= pagination.last_page} onClick={() => visit({ page: pagination.current_page + 1 })} className="inline-flex min-h-[40px] items-center rounded-lg border border-line px-3 text-sm font-bold disabled:opacity-40">Next</button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {adding && (
        <AccountModal
          title="Add account"
          platforms={platforms}
          roles={roles}
          onClose={() => setAdding(false)}
          submitLabel="Add account"
          action="/dashboard/accounts"
          method="post"
        />
      )}
      {editing && (
        <AccountModal
          title="Edit account"
          platforms={platforms}
          roles={roles}
          account={editing}
          onClose={() => setEditing(null)}
          submitLabel="Save changes"
          action={`/dashboard/accounts/${editing.id}`}
          method="put"
        />
      )}
    </div>
  )
}

function AccountModal({ title, platforms, roles, account, onClose, submitLabel, action, method }) {
  const form = useForm({
    ...emptyForm,
    name: account?.name || '',
    email: account?.email || '',
    role: account?.role || 'admin',
    institution_code: account?.institution_code || ''
  })

  const submit = (event) => {
    event.preventDefault()
    form.submit(method, action, { preserveScroll: true, onSuccess: () => onClose() })
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-navy/50 p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(event) => event.stopPropagation()} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="font-heading text-xl font-bold text-navy">{title}</h2>
        <p className="mt-1 text-sm text-muted">Leave the platform blank for an Academy admin who can see every school. Choose a platform for an admin who signs in on that school only.</p>
        <label className="mt-4 block text-sm font-semibold text-navy">Name<input value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} className={fieldClass} required /></label>
        {form.errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.name}</p>}
        <label className="mt-3 block text-sm font-semibold text-navy">Email<input type="email" value={form.data.email} onChange={(event) => form.setData('email', event.target.value)} className={fieldClass} required /></label>
        {form.errors.email && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.email}</p>}
        <label className="mt-3 block text-sm font-semibold text-navy">
          Platform
          <select value={form.data.institution_code} onChange={(event) => form.setData('institution_code', event.target.value)} className={fieldClass}>
            <option value="">Academy (all platforms)</option>
            {Object.entries(platforms).map(([code, label]) => <option key={code} value={code}>{label}</option>)}
          </select>
        </label>
        {form.errors.institution_code && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.institution_code}</p>}
        <label className="mt-3 block text-sm font-semibold text-navy">
          Role
          <select value={form.data.role} onChange={(event) => form.setData('role', event.target.value)} className={fieldClass}>
            {roles.map((role) => <option key={role} value={role}>{role}</option>)}
          </select>
        </label>
        {form.errors.role && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.role}</p>}
        <label className="mt-3 block text-sm font-semibold text-navy">
          Password{account ? ' (leave blank to keep the current password)' : ''}
          <input type="password" value={form.data.password} onChange={(event) => form.setData('password', event.target.value)} className={fieldClass} required={!account} autoComplete="new-password" />
        </label>
        <label className="mt-3 block text-sm font-semibold text-navy">
          Confirm password
          <input type="password" value={form.data.password_confirmation} onChange={(event) => form.setData('password_confirmation', event.target.value)} className={fieldClass} required={!account && form.data.password !== ''} autoComplete="new-password" />
        </label>
        {form.errors.password && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.password}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-line px-4 py-2 text-sm font-bold text-navy">Cancel</button>
          <button type="submit" disabled={form.processing} className="rounded-lg bg-teal px-4 py-2 text-sm font-bold text-white hover:bg-teal-dark disabled:opacity-60">{submitLabel}</button>
        </div>
      </form>
    </div>
  )
}
