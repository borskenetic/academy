/**
 * Area 51 catalog filters. Courses stay in their own skill categories
 * (the shared catalog), rather than an institution's college names.
 */


/** AI courses appear under every catalog filter / program group. */
function isAllFilterCourse(course) {
  if (!course) return false
  if (course.category === 'AI') return true
  if (Array.isArray(course.categories) && course.categories.includes('AI')) return true

  const title = String(course.title || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

  if (/^ai\b/.test(title)) return true
  if (title.includes('generative ai')) return true
  if (title.includes('machine learning')) return true
  if (title.includes('deep learning')) return true
  if (title.includes('prompt engineering')) return true
  if (/\bnlp\b/.test(title) || title.includes('llms')) return true
  return false
}


export const SKILLSOFT_CATEGORIES = [
  'AI',
  'Data & Analytics',
  'Development',
  'DevOps & Cloud',
  'Cybersecurity',
  'Business & Finance',
  'Design & Innovation'
]

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
  if (isAllFilterCourse(course)) return [...SKILLSOFT_CATEGORIES]
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
