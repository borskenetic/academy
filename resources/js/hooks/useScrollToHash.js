import { useEffect } from 'react'
import { router } from '@inertiajs/react'

/**
 * On every Inertia navigation, scroll to the target section if the URL has a
 * hash, otherwise return to the top. This keeps the original same-page anchor
 * behaviour, and also handles cross-page anchors such as
 * `/skillsoft-catalog#<slug>` used by the Aspire journey cards.
 */
export default function useScrollToHash() {
  useEffect(() => {
    const scroll = () => {
      const hash = window.location.hash

      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }

      const id = hash.replace('#', '')
      // Wait two frames so the destination content is mounted on the new page.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      })
    }

    scroll()

    const off = router.on('navigate', () => window.setTimeout(scroll, 0))

    return () => {
      if (typeof off === 'function') off()
    }
  }, [])
}
