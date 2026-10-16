import { useEffect, useRef, useState } from 'react'

/**
 * Adds an IntersectionObserver-driven reveal: the element starts hidden and
 * fades/slides in when it enters the viewport (port of the original
 * script.js scroll-reveal behaviour).
 */
export default function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}