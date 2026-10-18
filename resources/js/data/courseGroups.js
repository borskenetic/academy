/**
 * Area 51 catalog filters. Courses stay in their own skill categories
 * (the shared catalog), rather than an institution's college names.
 */

export const COURSE_PRICE = 'Php 850'

export const PROGRAM_GROUPS = [
  'AI',
  'Data & Analytics',
  'Development',
  'DevOps & Cloud',
  'Cybersecurity',
  'Business & Finance',
  'Business & Leadership',
  'Design & Innovation',
  'Criminology',
  'Nursing',
  'Education',
  'Tourism & Hospitality'
]

export function assignProgramGroups(course) {
  const raw = course?.categories?.length
    ? course.categories
    : [course?.category].filter(Boolean)
  const known = raw.filter((group) => PROGRAM_GROUPS.includes(group))
  if (known.length) return known
  return raw.length ? raw : ['AI']
}

export function assignProgramGroup(course) {
  return assignProgramGroups(course)[0]
}

export function withProgramGroup(course) {
  const categories = assignProgramGroups(course)
  return { ...course, categories, category: categories[0] }
}

export function courseMatchesGroup(course, group) {
  if (!group || group === 'All') return true
  const cats = course?.categories?.length
    ? course.categories
    : [course?.category].filter(Boolean)
  return cats.includes(group)
}
