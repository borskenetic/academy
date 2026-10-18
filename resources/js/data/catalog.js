import { ASPIRE_JOURNEYS, CORE_COURSES } from './currentCatalog'
import { DEPARTMENT_COURSES } from './departmentCourses'
import { DESIGN_INNOVATION_COURSES } from './designInnovationCourses'
import { CSE_CATALOG_COURSES, cseTitleCoveredBy } from './platformCse'
import { SKILLSOFT_COURSES } from './skillsoftCatalog'
import { withProgramGroup } from './courseGroups'

const legacySlugs = new Set(CORE_COURSES.map((course) => course.slug))

const BASE_CATALOG = [
  ...CORE_COURSES,
  ...DEPARTMENT_COURSES,
  ...DESIGN_INNOVATION_COURSES,
  ...SKILLSOFT_COURSES.filter((course) => !legacySlugs.has(course.slug))
]

const CSE_NEW_COURSES = CSE_CATALOG_COURSES.filter(
  (cse) => !BASE_CATALOG.some((existing) => cseTitleCoveredBy(existing.title, cse.title))
)

export const CATALOG_COURSES = [
  ...CSE_NEW_COURSES,
  ...BASE_CATALOG
].map(withProgramGroup)

const SKILLSOFT_LOOKUP = [
  ...SKILLSOFT_COURSES,
  ...DEPARTMENT_COURSES,
  ...DESIGN_INNOVATION_COURSES,
  ...CSE_CATALOG_COURSES
]

export function findCourse(type, slug) {
  if (!slug) return null
  if (type === 'core') return CORE_COURSES.find((item) => item.slug === slug) || null
  if (type === 'aspire') return ASPIRE_JOURNEYS.find((item) => item.slug === slug) || null
  if (type === 'skillsoft') return SKILLSOFT_LOOKUP.find((item) => item.slug === slug) || null
  return null
}

export function courseDetailPath(course) {
  if (!course?.slug) return null
  if (course.type === 'core') return `/courses/core/${course.slug}`
  if (course.type === 'aspire') return `/courses/aspire/${course.slug}`
  return `/courses/skillsoft/${course.slug}`
}
