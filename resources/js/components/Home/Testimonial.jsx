import { useEffect, useRef, useState } from 'react'

const TESTIMONIALS = [
  {
    text: '“ Skillsoft’s content has helped me gain practical skills and confidence to apply my knowledge in real-world situations. ”',
    author: '- Area 51 Learner'
  },
  {
    text: '“ The learning paths made it much easier to connect certification preparation with the exact skills needed for my next role. ”',
    author: '- Certification Learner'
  },
  {
    text: '“ Flexible formats let our learners continue professional development alongside demanding academic schedules. ”',
    author: '- Institution Partner'
  },
  {
    text: '“ I earned two cloud certifications in four months. The structured labs and assessments made all the difference. ”',
    author: '- Working Professional'
  }
]

export default function Testimonial() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 8000)
  }

  useEffect(() => {
    startAuto()
    return () => clearInterval(timerRef.current)
  }, [])

  const select = (i) => {
    setIndex(i)
    startAuto()
  }

  const current = TESTIMONIALS[index]

  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-5">
      <blockquote aria-live="polite">
        <p className="text-slate-200 leading-relaxed">{current.text}</p>
        <cite className="block mt-2 text-sm text-teal-light not-italic font-semibold">{current.author}</cite>
      </blockquote>
      <div className="flex gap-2 mt-4" aria-label="Testimonial pagination">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot w-2.5 h-2.5 rounded-full ${i === index ? 'is-active bg-teal-light' : 'bg-white/30'}`}
            onClick={() => select(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}