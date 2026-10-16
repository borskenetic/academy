import Reveal from './Reveal'

const FEATURES = [
  {
    title: 'Global Leader',
    text: 'A global leader in digital learning and workforce development.',
    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'
  },
  {
    title: 'High-Quality Content',
    text: 'Thousands of expert-led courses across technology, business and leadership.',
    icon: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z'
  },
  {
    title: 'Industry Recognition',
    text: 'Certifications valued by employers worldwide.',
    icon: 'M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5l8-3zM9 12l2 2 4-4'
  },
  {
    title: 'Trusted by Millions',
    text: 'Used by organizations and learners in over 160 countries.',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75'
  },
  {
    title: 'Career Impact',
    text: 'Learn in-demand skills and achieve your career goals faster.',
    icon: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6'
  }
]

export default function TrustBar() {
  return (
    <section className="bg-white" aria-label="Key highlights of Skillsoft partnership">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* One unified feature/statistics strip — 5 equal cells */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-line/60 bg-white border border-line/70 rounded-2xl shadow-[0_20px_50px_-30px_rgba(7,23,53,0.25)] overflow-hidden">
          {FEATURES.map((f, i) => {
            const isLast = i === FEATURES.length - 1
            return (
              <Reveal
                as="article"
                key={f.title}
                delay={i * 80}
                className={`flex flex-col items-center text-center gap-3.5 rounded-2xl bg-soft lg:bg-transparent px-4 py-6 sm:px-5 lg:px-6 lg:py-9 lg:rounded-none ${isLast ? 'col-span-2 lg:col-auto' : ''}`}
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-full bg-navy/[0.05] text-teal [&_svg]:h-7 [&_svg]:w-7 lg:[&_svg]:h-8 lg:[&_svg]:w-8"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24">
                    <path d={f.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-heading font-bold text-navy tracking-tight text-base">{f.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mt-1.5">{f.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}