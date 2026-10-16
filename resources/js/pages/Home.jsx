import Hero from '../components/Home/Hero'
import TrustBar from '../components/Home/TrustBar'
import About from '../components/Home/About'
import LearningAreas from '../components/Home/LearningAreas'
import AudienceImpact from '../components/Home/AudienceImpact'
import CtaBanner from '../components/Home/CtaBanner'
import AspireJourneys from '../components/AspireJourneys'
import CoreSkillsoftCourses from '../components/Home/CoreSkillsoftCourses'

export default function Home({ coreTracks = [], journeys = [] }) {
  return (
    <main>
      <Hero />
      <TrustBar />
      <About />
      <LearningAreas />
      <CoreSkillsoftCourses tracks={coreTracks} />
      <AspireJourneys journeys={journeys} />
      <AudienceImpact />
      <CtaBanner />
    </main>
  )
}
