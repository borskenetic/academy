import { usePage } from '@inertiajs/react'
import Header from './Header'
import Footer from './Footer'
import Modals from './Modals'
import Toasts from './Toasts'
import ScrollTop from './ScrollTop'
import useScrollToHash from '../hooks/useScrollToHash'

/**
 * Persistent Inertia layout: the header, footer, modals and toasts stay mounted
 * between page visits, exactly like the old react-router <Outlet /> shell.
 *
 * The admin area (/dashboard) opts out of the marketing chrome entirely - the
 * admin page renders its own full-screen sidebar interface.
 */
export default function Layout({ children }) {
  useScrollToHash()

  const { url } = usePage()
  const pathname = url.split('?')[0].split('#')[0]

  if (pathname.startsWith('/dashboard')) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <Modals />
      <Toasts />
      <ScrollTop />
    </>
  )
}
