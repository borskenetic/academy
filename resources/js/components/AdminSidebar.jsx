import { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'

const SIDEBAR_KEY = 'admin-sidebar-collapsed'

function NavLabel({ collapsed, children }) {
  return <span className={collapsed ? 'lg:sr-only' : ''}>{children}</span>
}

export function useAdminChrome() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(SIDEBAR_KEY) === '1'
  })

  const toggleCollapse = () => {
    setCollapsed((current) => {
      const next = !current
      window.localStorage.setItem(SIDEBAR_KEY, next ? '1' : '0')
      return next
    })
  }

  return { sidebarOpen, setSidebarOpen, collapsed, toggleCollapse }
}

export default function AdminSidebar({ user, open, collapsed, onClose, onToggleCollapse }) {
  const path = usePage().url.split('?')[0]
  const item = (href, active) => `flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${collapsed ? 'lg:justify-center lg:px-2' : ''} ${active ? 'bg-teal text-white' : 'font-semibold text-slate-200 hover:bg-white/5 hover:text-white'}`

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-navy/60 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-navy text-white transition-all duration-300 lg:sticky lg:top-0 lg:h-screen lg:max-w-none lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'lg:w-[4.75rem]' : 'lg:w-72'}`}
      >
        <div className={`flex items-center gap-3 border-b border-white/10 px-4 py-4 ${collapsed ? 'lg:flex-col lg:px-2' : ''}`}>
          <a href="/" className="flex min-w-0 flex-1 items-center gap-3" aria-label="Area 51 home">
            <img src="/logo.png" alt="" className="h-10 w-10 shrink-0 rounded-md bg-white object-contain p-0.5" />
            <span className={collapsed ? 'lg:hidden' : ''}>
              <span className="block font-heading text-base font-extrabold tracking-wide">Area 51</span>
              <span className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#7fe7db]">Admin</span>
            </span>
          </a>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-expanded={!collapsed}
            aria-controls="admin-sidebar"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-200 transition-colors hover:bg-white/10 hover:text-white lg:inline-flex"
          >
            <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
          </button>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          <p className={`px-3 pb-1 pt-2 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-400 ${collapsed ? 'lg:sr-only' : ''}`}>Manage</p>
          <Link href="/dashboard" onClick={onClose} title="Inquiries" className={item('/dashboard', path === '/dashboard')}>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true"><path d="M3 3h18v18H3zM3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <NavLabel collapsed={collapsed}>Inquiries</NavLabel>
          </Link>
          <Link href="/dashboard/accounts" onClick={onClose} title="Accounts" className={item('/dashboard/accounts', path.startsWith('/dashboard/accounts'))}>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true"><path d="M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M9.5 11a3 3 0 100-6 3 3 0 000 6zM20 8v6M17 11h6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <NavLabel collapsed={collapsed}>Accounts</NavLabel>
          </Link>
          <a href="/" title="View website" className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/5 hover:text-white ${collapsed ? 'lg:justify-center lg:px-2' : ''}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <NavLabel collapsed={collapsed}>View website</NavLabel>
          </a>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className={`flex items-center gap-3 ${collapsed ? 'lg:justify-center' : ''}`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7b64a] text-sm font-extrabold text-[#0a1d2d]" title={user?.name}>{(user?.name || 'A').charAt(0)}</span>
            <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="truncate text-sm font-bold">{user?.name}</p>
              <p className="truncate text-xs text-slate-300">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.post('/logout')}
            title="Log out"
            className={`mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-bold text-slate-200 transition-colors hover:bg-white/10 hover:text-white ${collapsed ? 'lg:px-2' : ''}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true"><path d="M9 6H6a2 2 0 00-2 2v8a2 2 0 002 2h3M15 16l4-4-4-4M19 12H9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <NavLabel collapsed={collapsed}>Log out</NavLabel>
          </button>
        </div>
      </aside>
    </>
  )
}
