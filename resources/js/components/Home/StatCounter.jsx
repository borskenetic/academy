import { useEffect, useRef, useState } from 'react'

/**
 * Animated statistic counter matching the original script.js behaviour:
 * counts up when the element scrolls into view, formatting >=1000 as "K+".
 */
export default function StatCounter({ target, suffix = '+', label }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      setValue(target)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            const step = target / 60
            let cur = 0
            const timer = setInterval(() => {
              cur = Math.min(cur + step, target)
              setValue(cur)
              if (cur >= target) clearInterval(timer)
            }, 18)
          }
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  const display = target >= 1000 ? `${(value / 1000).toFixed(0)}K+` : `${Math.floor(value)}${suffix}`

  return (
    <div ref={ref} className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 text-center">
      <span className="stat-number font-heading font-extrabold text-3xl md:text-4xl text-teal-light block tracking-tight">{display}</span>
      <span className="mt-1 block text-xs sm:text-sm text-slate-300 leading-snug">{label}</span>
    </div>
  )
}