import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white shadow-lg transition-all duration-200 hover:bg-teal-dark hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}