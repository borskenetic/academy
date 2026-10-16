import StatCounter from './StatCounter'
import Testimonial from './Testimonial'
import Reveal from './Reveal'

const AUDIENCE = [
  { title: 'Students', text: 'Build industry-relevant skills and earn certifications.', icon: 'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5' },
  { title: 'Faculty', text: 'Enhance teaching and stay updated with new skills.', icon: 'M12 14l9-5-9-5-9 5 9 5zM12 14v7M17 11.5v5.5' },
  { title: 'Professionals', text: 'Upskill or reskill to advance your career.', icon: 'M2 7h20v14H2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2' },
  { title: 'Institutions', text: 'Strengthen learning outcomes and employability.', icon: 'M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11' }
]

const STATS = [
  { target: 30000, label: 'Learners Empowered' },
  { target: 550, label: 'Courses Available' },
  { target: 15000, label: 'Certifications Earned' },
  { target: 150, label: 'Academic Partners' }
]

export default function AudienceImpact() {
  return (
    <section className="bg-soft border-t border-line" aria-label="Audience benefits and partner impact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid gap-10 lg:grid-cols-2 items-start">
        <div id="audience">
          <p className="text-teal font-extrabold tracking-widest uppercase text-xs mb-3">Audience</p>
          <h2 className="font-heading font-bold text-navy tracking-tight text-2xl sm:text-3xl md:text-4xl mb-3">
            Who Can Benefit?
          </h2>
          <p className="text-muted mb-6 max-w-lg">
            Skillsoft learning is designed for everyone across the academic and professional journey.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {AUDIENCE.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="h-full">
                <article className="group bg-white border border-line rounded-2xl p-5 sm:p-6 flex gap-4 h-full transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-md">
                  <div
                    className="w-12 h-12 shrink-0 rounded-xl bg-teal-bg text-teal grid place-items-center transition-transform duration-200 group-hover:scale-105 [&_svg]:w-6 [&_svg]:h-6"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d={a.icon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-navy text-lg">{a.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-1">{a.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div id="impact">
          <div className="bg-navy text-white rounded-2xl p-7 md:p-8 shadow-xl">
            <h2 className="font-heading text-white text-xl md:text-2xl font-bold">Our Impact Together</h2>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {STATS.map((s) => (
                <StatCounter key={s.label} target={s.target} label={s.label} />
              ))}
            </div>
            <Testimonial />
          </div>
        </div>
      </div>
    </section>
  )
}