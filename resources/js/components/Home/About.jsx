const FEATURED_BENEFITS = [
  {
    title: 'Role-based learning paths',
    text: 'Structured career paths that support practical, workplace skills.'
  },
  {
    title: 'Certifications & hands-on practice',
    text: 'Industry-recognized certifications backed by labs and real-world projects.'
  },
  {
    title: 'Learning on any device',
    text: 'Available anytime, anywhere — video, audio, books, labs and practice tests.'
  }
]
const KEY_STRENGTHS = [
  'Extensive course library covering technology, business, leadership, cybersecurity, data, AI, cloud, software development and more.',
  'Industry-aligned learning designed around practical, workplace-relevant skills.',
  'AI and Generative AI learning including AI fundamentals, prompt engineering, data analytics, programming and responsible AI.',
  'Percipio learning platform providing personalized learning paths, assessments and skill development.',
  'Aspire Journeys for structured, role-based career and skill development.',
  'Skill Benchmarking to assess current capabilities and identify skill gaps.',
  'Certifications and learning pathways that can support employability and professional development.',
  'Institution integration can support curriculum enrichment, credit-linked learning, employability programs and industry-oriented skill development.'
]

export default function About() {
  return (
    <section className="bg-white" id="about" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <p className="text-teal font-extrabold tracking-widest uppercase text-xs mb-3">Partnership</p>
          <h2 id="about-heading" className="font-heading font-bold text-navy tracking-tight text-3xl md:text-4xl mb-3 inline-flex flex-wrap items-center gap-2 md:gap-3">
            About
            <img src="/skillsoft_logo.png" alt="Skillsoft" className="h-8 w-auto object-contain md:h-10" />
          </h2>
          <div className="grid gap-4 text-muted leading-relaxed max-w-prose mb-6">
            <p>
              Skillsoft is a global digital learning and workforce development company that helps organizations and universities build job-ready skills through technology-enabled learning.
            </p>
            <div>
              <p className="font-semibold text-navy mb-3">Key strengths:</p>
              <ul className="grid gap-3 text-[0.95rem]">
                {KEY_STRENGTHS.map((s) => (
                  <li key={s} className="flex gap-3 items-start">
                    <span
                      className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-teal text-white grid place-items-center text-sm font-bold"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="h-3 w-3">
                        <path d="M6 12.5l4 4L18 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p>
              Through our partnership with Bodhika, a Skillsoft Authorized Partner, we have extended the Skillsoft-powered learning ecosystem to Area51 in the Philippines, expanding access to world-class digital learning, industry-aligned courses, and workforce skilling solutions.
            </p>
          </div>
          <a
            href="#learning-areas"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-teal px-6 py-3 font-bold text-white transition-all duration-200 hover:bg-teal-dark hover:brightness-105 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Explore Skillsoft Courses
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          </a>
        </div>

        <div id="certifications">
          <div className="bg-navy text-white rounded-2xl p-7 md:p-8 shadow-xl">
            <h2 className="font-heading text-white text-xl md:text-2xl font-bold mb-6">
              What You Get with Skillsoft
            </h2>

            {/* Featured stat — large number with label */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col gap-1">
              <span className="font-heading font-extrabold text-4xl md:text-5xl text-teal-light">22,000+</span>
              <span className="text-slate-300">expert-led courses in technology, business and leadership</span>
            </div>

            <ul className="mt-5 grid gap-4 text-[0.95rem] text-slate-200">
              {FEATURED_BENEFITS.map((b) => (
                <li key={b.title} className="flex gap-3 items-start">
                  <span
                    className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-teal text-white grid place-items-center text-sm font-bold"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                      <path d="M6 12.5l4 4L18 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{b.title}</span>
                    <span className="block text-slate-300 text-sm leading-relaxed">{b.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}