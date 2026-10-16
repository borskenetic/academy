// Soft atmospheric navy -> transparent dissolve (100% -> 80% -> 50% -> 25% -> 0%)
const DISSOLVE = 'linear-gradient(to right, #071735 0%, #071735 44%, rgba(7,23,53,0.82) 50%, rgba(7,23,53,0.52) 54%, rgba(7,23,53,0.26) 57%, rgba(7,23,53,0) 60%)'

// Readability overlay for small screens (image stays visible as a tinted backdrop
// beneath the stacked content so it feels integrated rather than a flat backdrop)
const MOBILE = 'linear-gradient(to top, rgba(7,23,53,0.94) 0%, rgba(7,23,53,0.86) 42%, rgba(7,23,53,0.72) 70%, rgba(7,23,53,0.45) 100%)'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-navy text-white"
      aria-labelledby="hero-title"
    >
      {/* Full-bleed background photograph - continues underneath the navy */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_laptop.png"
          alt="Modern laptop on a desk with a professional learning platform on screen"
          className="h-full w-full object-cover object-center"
          loading="eager"
          sizes="100vw"
        />
      </div>

      {/* Desktop: dark navy on the left fades to transparent over the image (no hard edge) */}
      <div
        className="absolute inset-0 z-[1] hidden lg:block"
        style={{ backgroundImage: DISSOLVE }}
        aria-hidden="true"
      />

      {/* Mobile: subtle vertical navy overlay keeps the text readable while the image shows below */}
      <div
        className="absolute inset-0 z-[1] lg:hidden"
        style={{ backgroundImage: MOBILE }}
        aria-hidden="true"
      />

      {/* Content - left column, kept on the opaque part of the navy */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-teal-light font-semibold text-xs tracking-[0.22em] uppercase mb-5">
            <span className="block w-8 h-px bg-teal-light" aria-hidden="true" />
            Our Learning Partner
          </p>

          <h1
            id="hero-title"
            className="font-heading text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight mb-5"
          >
            Learn. Certify.
            <br />
            Build Your Career.
          </h1>

          <p className="font-heading text-white text-lg md:text-2xl font-semibold leading-snug mb-3">
            Global learning content. Industry-recognized certifications.
          </p>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-[34rem] mb-8">
            Area 51 has partnered with Skillsoft to bring world-class
            digital learning content to students, faculty and professionals.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#core-skillsoft-courses"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-teal px-6 py-3 font-bold text-white transition-all duration-200 hover:bg-teal-dark hover:brightness-105 active:scale-[0.98] shadow-[0_10px_30px_-8px_rgba(0,125,121,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light"
            >
              Explore Skillsoft Courses
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}