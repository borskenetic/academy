import { Link, usePage } from '@inertiajs/react'
import { useUI } from '../context/UIContext'

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="underline-offset-4 transition-colors hover:text-[#7fe7db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe7db]"
    >
      {children}
    </a>
  )
}

function FooterColumn({ title, className = '', children }) {
  return (
    <div className={className}>
      <h4 className="mb-5 text-xl font-bold text-white">{title}</h4>
      {children}
    </div>
  )
}

function ContactDetails() {
  return (
    <div className="space-y-4 text-base text-slate-200 max-w-full overflow-hidden">
      <div className="flex items-start gap-3">
        <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f7b64a] text-sm font-bold text-[#0a1d2d]" aria-hidden="true">●</span>
        <p className="break-words leading-relaxed">
          <span className="block font-bold text-white">AREA 51</span>
          <span className="block">Area 51 Information Technology Services</span>
          <span className="block">2nd Floor, Zamoras Building,</span>
          <span className="block">Glodo St. San Francisco, Panabo City, Davao del Norte</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f7b64a] text-sm font-bold text-[#0a1d2d]" aria-hidden="true">☎</span>
        <a href="tel:+639177621021" className="break-all underline-offset-4 transition-colors hover:text-[#7fe7db]">+63 917 762 1021</a>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f7b64a] text-sm font-bold text-[#0a1d2d]" aria-hidden="true">✉</span>
        <a href="mailto:inquiry@area51.ph" className="break-all underline-offset-4 transition-colors hover:text-[#7fe7db]">inquiry@area51.ph</a>
      </div>
    </div>
  )
}

function MobileAccordion({ title, children }) {
  return (
    <details className="group border-b border-white/10 py-3">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe7db] [&::-webkit-details-marker]:hidden">
        {title}
        <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-slate-300 transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
          <path d="M5.5 8 10 12.5 14.5 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="pt-3 pb-1">{children}</div>
    </details>
  )
}

function HomeFooter() {
  const { showToast } = useUI()

  return (
    <footer className="bg-[#0a1d2d] text-slate-200" id="footer">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] xl:gap-14">
          {/* Area 51 brand — always visible */}
          <div>
            <img
              src="/footterlogo.png"
              alt="Area 51 logo"
              className="w-auto max-w-[180px]"
            />
            <img
              src="/partnerslogo.jpg"
              alt="Area 51 partners"
              className="mt-4 w-auto max-w-[220px]"
            />
          
            <div className="mt-6 flex gap-3" id="social-links">
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a1d2d] text-sm font-bold shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe7db]">f</a>
              <a href="#" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a1d2d] text-sm font-bold shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe7db]">in</a>
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a1d2d] text-sm font-bold shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe7db]">◎</a>
            </div>
          </div>

          {/* Desktop columns */}
          <FooterColumn title="Useful links" className="hidden lg:block">
            <ul className="space-y-3 text-base text-slate-300">
              <li><FooterLink href="#">Home</FooterLink></li>
              <li><FooterLink href="#about">About Us</FooterLink></li>
              <li><FooterLink href="#learning-areas">Our Courses</FooterLink></li>
              <li><FooterLink href="#footer">Contact Us</FooterLink></li>
            </ul>
          </FooterColumn>

          <FooterColumn title="More" className="hidden lg:block">
            <ul className="space-y-3 text-base text-slate-300">
              <li><FooterLink href="#">Terms &amp; Conditions</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Help</FooterLink></li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact Us" className="hidden lg:block">
            <ContactDetails />
          </FooterColumn>

          {/* Mobile accordions (hidden on desktop) */}
          <div className="lg:hidden">
            <MobileAccordion title="Useful links">
              <ul className="space-y-3 text-base text-slate-300">
                <li><FooterLink href="#">Home</FooterLink></li>
                <li><FooterLink href="#about">About Us</FooterLink></li>
                <li><FooterLink href="#learning-areas">Our Courses</FooterLink></li>
                <li><FooterLink href="#footer">Contact Us</FooterLink></li>
              </ul>
            </MobileAccordion>
            <MobileAccordion title="More">
              <ul className="space-y-3 text-base text-slate-300">
                <li><FooterLink href="#">Terms &amp; Conditions</FooterLink></li>
                <li><FooterLink href="#">Privacy Policy</FooterLink></li>
                <li><FooterLink href="#">Help</FooterLink></li>
              </ul>
            </MobileAccordion>
            <MobileAccordion title="Contact Us">
              <ContactDetails />
            </MobileAccordion>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-sm text-slate-300">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Area 51. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#" className="hover:text-[#7fe7db]">Privacy Policy</a>
              <span aria-hidden="true">|</span>
              <a href="#" className="hover:text-[#7fe7db]">Terms of Use</a>
              <span aria-hidden="true">|</span>
              <a href="#" className="hover:text-[#7fe7db]">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SubFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div>
          <h4 style={{ marginBottom: '.6rem', color: '#fff' }}>Area 51</h4>
          <p style={{ color: '#9FB2C8', fontSize: '.9rem', maxWidth: '22rem' }}>CSE Skillsoft guide — PE-1 to PE-6 plus additional learning.</p>
          <p style={{ marginTop: '.8rem' }}><Link href="/" style={{ color: '#36D1C4', fontWeight: 700 }}>Back to Skillsoft home</Link></p>
        </div>
        <div>
          <h4 style={{ marginBottom: '.6rem', color: '#fff' }}>On this page</h4>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '.35rem', fontSize: '.9rem', color: '#CBD8E6' }}>
            <li><a href="#subjects">Subjects for CSE</a></li>
            <li><a href="#featured">Featured courses</a></li>
            <li><a href="#catalog">Semester catalog</a></li>
            <li><a href="#pe3">PE-3 details</a></li>
            <li><Link href="/skillsoft-catalog">Skillsoft Catalog</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">© 2026 Area 51. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Footer() {
  const { url } = usePage()
  const pathname = url.split('?')[0].split('#')[0]
  // Public course landing pages (e.g. /courses/aspire/<slug>) share the same
  // full footer as the landing page; only internal pages get the compact one.
  const isLanding = pathname === '/' || pathname.startsWith('/courses/')
  return isLanding ? <HomeFooter /> : <SubFooter />
}