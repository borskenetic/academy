export default function CtaBanner() {
  return (
    <section className="bg-gradient-to-br from-teal to-navy" aria-labelledby="cta-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid gap-6 items-center text-center lg:grid-cols-[auto_1fr_auto] lg:text-left">
        <div aria-hidden="true" className="hidden lg:block">
          <svg viewBox="0 0 100 100" className="w-20 h-20">
            <rect x="15" y="25" width="70" height="50" rx="6" fill="#007D79" opacity="0.15" />
            <rect x="22" y="32" width="56" height="36" rx="4" fill="#007D79" opacity="0.25" />
            <path d="M50 15 L70 30 L70 55 C70 70 50 82 50 82 C50 82 30 70 30 55 L30 30 Z" fill="#007D79" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <h2 id="cta-title" className="text-white font-heading text-2xl sm:text-3xl md:text-4xl mb-2 font-bold">
            Empowering Futures Through Skillsoft
          </h2>
          <p className="text-teal-light/90 max-w-[32rem] mx-auto lg:mx-0">
            Skillsoft opens doors to new skills, certifications and career opportunities.
          </p>
        </div>
        <div className="lg:justify-self-end">
          <a
            href="#learning-areas"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3 font-bold text-navy transition-all duration-200 hover:bg-yellow-500 hover:brightness-105 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Start Learning with Skillsoft
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}