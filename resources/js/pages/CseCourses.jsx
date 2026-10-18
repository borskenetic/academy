import { Link } from '@inertiajs/react'
import {
  SectionHero,
  QuickHighlights,
  SubjectsGrid,
  FeaturedGrid,
  Catalog,
  DetailTable,
  useProgramMeta
} from './ProgramPage'
import AspireJourneys from '../components/AspireJourneys'

export default function CseCourses({ program: CSE, journeys = [] }) {
  const meta = useProgramMeta(CSE)

  return (
    <main>
      <div className="max-w-[1200px] mx-auto px-6 pt-4 text-sm text-muted" aria-label="Breadcrumb">
        <Link className="text-teal font-semibold hover:underline" href="/">Home</Link>
        <span> › </span>
        <Link href="/skillsoft-catalog" className="text-teal font-semibold hover:underline">Skillsoft Streams</Link>
        <span> › </span>
        <span>Computer Science Engineering</span>
      </div>

      <SectionHero P={CSE} />
      <QuickHighlights peCount={meta.peCount} hasAdditional={meta.hasAdditional} semLabel={meta.semLabel} />
      <AspireJourneys journeys={journeys} />
      <SubjectsGrid P={CSE} />
      <FeaturedGrid P={CSE} />
      <Catalog P={CSE} programKey="cse" />
      <DetailTable P={CSE} />
      <div style={{ height: '1rem' }}></div>
    </main>
  )
}
