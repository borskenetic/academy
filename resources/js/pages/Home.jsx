import Hero from '../components/Home/Hero'
import TrustBar from '../components/Home/TrustBar'
import About from '../components/Home/About'
import AudienceImpact from '../components/Home/AudienceImpact'
import CtaBanner from '../components/Home/CtaBanner'
import AspireJourneys from '../components/AspireJourneys'
import CoreSkillsoftCourses from '../components/Home/CoreSkillsoftCourses'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <About />
      <CoreSkillsoftCourses />
      <AspireJourneys />
      <AudienceImpact />
      <CtaBanner />
    </main>
  )
}
