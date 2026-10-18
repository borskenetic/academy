/**
 * CSE (Computer Science Engineering) program catalog.
 * Used by /program?p=cse and kept available for /cse-courses.
 */

const CSE_FEATURED_IMAGES = [
  '/course-images/IMG1.jpg',
  '/course-images/IMG2.jpg',
  '/course-images/IMG3.jpg',
  '/course-images/IMG4.jpg',
  '/course-images/IMG5.jpg',
  '/course-images/IMG6.jpg',
  '/course-images/IMG7.jpg',
  '/course-images/IMG8.jpg',
  '/course-images/IMG9.jpg',
  '/course-images/IMG10.jpg',
  '/course-images/IMG11.jpg',
  '/course-images/IMG12.jpg',
  '/course-images/IMG13.jpg',
  '/course-images/IMG14.jpg',
  '/course-images/IMG15.jpg',
  '/course-images/IMG16.jpg',
  '/course-images/IMG17.jpg',
  '/course-images/IMG18.jpg',
  '/course-images/IMG19.jpg',
  '/course-images/IMG20.jpg',
  '/course-images/IMG21.jpg',
  '/course-images/IMG22.jpg',
  '/course-images/IMG23.jpg',
  '/course-images/IMG24.jpg'
]

const featuredBase = [
  'AI for Data Analytics & BI|Data / PE-1',
  'AI for Data Science|Data / Analytics',
  'AI for DevOps|DevOps / AI',
  'AI for Programmers|AI / Coding',
  'AI for Software Engineers|AI / Engineering',
  'Banking and Finance|Business',
  'Business Skills|Professional Skills',
  'C Programming Proficiency|Programming',
  'Cyber Security|Security / PE-4',
  'Data Analysis with R|Data / Additional',
  'Design Thinking|Innovation',
  'FinTech|Business Technology',
  'Generative AI and Prompt Engineering Essentials|GenAI / LLMs',
  'JavaScript Novice to Professional|Web / JavaScript',
  'Learn C#|Programming',
  'Learn Java|Programming',
  'Machine Learning|AI / ML',
  'Mastering Power BI|BI / Visualization',
  'Mobile Development with Android|Mobile / PE-3',
  'NLP & LLMs|AI / Language',
  'Prompt Engineering|GenAI',
  'Python Novice to Python Apprentice|Programming',
  'Software Testing and Software Testing Automation|QA / PE-3',
  'Virtual Reality|Emerging Technology'
]

export const CSE_PROGRAM = {
  name: 'Computer Science Engineering',
  short: 'CSE',
  tagline: 'AI, data, software development, cyber security, cloud, mobile and emerging technologies across Year 3 and Year 4.',
  detailTitle: 'Professional Elective 3 Courses',
  detailNote: 'Year 3 Semester 2 detail with duration, credits and course code.',
  featured: featuredBase.map((item, index) => (
    CSE_FEATURED_IMAGES[index] ? `${item}|${CSE_FEATURED_IMAGES[index]}` : item
  )),
  detailRows: [
    ['Full Stack Development', '51 hours 01 minutes', '3 Credits', 'CS631PE'],
    ['Scripting Languages', '53 hours 23 minutes', '3 Credits', 'CS633PE'],
    ['Mobile Development', '48 hours 59 minutes', '3 Credits', 'CS634PE'],
    ['Android Development with Kotlin', '56 hours 47 minutes', '3 Credits', 'CS634PE'],
    ['iOS Development with Swift', '53 hours 23 minutes', '3 Credits', 'CS634PE'],
    ['Software Testing and Automation', '54 hours 17 minutes', '3 Credits', 'CS635PE']
  ],
  courses: [
    ['Artificial Intelligence', 'PE-1', 'Year 3 Semester 1', '45h 14m', '3 Credits', 'CS611PE'],
    ['AI for Data Analytics & BI', 'PE-1', 'Year 3 Semester 1', '45h 42m', '3 Credits', 'CS612PE'],
    ['AI for Data Science', 'PE-2', 'Year 3 Semester 1', '48h 15m', '3 Credits', 'CS621PE'],
    ['AI for DevOps', 'PE-2', 'Year 3 Semester 1', '49h 01m', '3 Credits', 'CS622PE'],
    ['Full Stack Development', 'PE-3', 'Year 3 Semester 2', '51h 01m', '3 Credits', 'CS631PE'],
    ['Scripting Languages', 'PE-3', 'Year 3 Semester 2', '53h 23m', '3 Credits', 'CS633PE'],
    ['Mobile Development', 'PE-3', 'Year 3 Semester 2', '48h 59m', '3 Credits', 'CS634PE'],
    ['Android Development with Kotlin', 'PE-3', 'Year 3 Semester 2', '56h 47m', '3 Credits', 'CS634PE'],
    ['iOS Development with Swift', 'PE-3', 'Year 3 Semester 2', '53h 23m', '3 Credits', 'CS634PE'],
    ['Software Testing and Automation', 'PE-3', 'Year 3 Semester 2', '54h 17m', '3 Credits', 'CS635PE'],
    ['Cyber Security', 'PE-4', 'Year 4 Semester 1', '52h 10m', '3 Credits', 'CS641PE'],
    ['Cloud Computing', 'PE-4', 'Year 4 Semester 1', '45h 18m', '3 Credits', 'CS642PE'],
    ['Machine Learning', 'PE-5', 'Year 4 Semester 1', '50h 20m', '3 Credits', 'CS651PE'],
    ['Cloud Security', 'PE-5', 'Year 4 Semester 1', '48h 50m', '3 Credits', 'CS652PE'],
    ['AI for Programmers', 'PE-6', 'Year 4 Semester 2', '49h 30m', '3 Credits', 'CS661PE'],
    ['AI for Software Engineers', 'PE-6', 'Year 4 Semester 2', '48h 33m', '3 Credits', 'CS662PE'],
    ['Generative AI and Prompt Engineering Essentials', 'Additional', 'Any Semester', '46h 40m', 'Optional Learning', ''],
    ['Learn Java', 'Additional', 'Any Semester', '47h 55m', 'Optional Learning', ''],
    ['Mastering Power BI', 'Additional', 'Any Semester', '45h 00m', 'Optional Learning', ''],
    ['Python Novice to Python Apprentice', 'Additional', 'Any Semester', '44h 30m', 'Optional Learning', ''],
    ['NLP & LLMs', 'Additional', 'Any Semester', '48h 12m', 'Optional Learning', ''],
    ['Data Analysis with R', 'Additional', 'Any Semester', '50h 38m', 'Optional Learning', ''],
    ['JavaScript Novice to Professional', 'Additional', 'Any Semester', '48h 21m', 'Optional Learning', '']
  ]
}

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function categoryFromTag(tag = '') {
  const t = tag.toLowerCase()
  if (t.includes('business') || t.includes('professional')) return 'Business & Leadership'
  if (t.includes('innovation')) return 'Design & Innovation'
  if (t.includes('data') || t.includes('analytics') || t.includes('bi') || t.includes('visualization')) return 'Data & Analytics'
  if (t.includes('security')) return 'Cybersecurity'
  if (t.includes('devops') || t.includes('cloud')) return 'DevOps & Cloud'
  if (t.includes('ai') || t.includes('genai') || t.includes('ml') || t.includes('llm')) return 'AI'
  return 'Development'
}

const durationByTitle = Object.fromEntries(
  CSE_PROGRAM.courses.map(([title, , , duration]) => [title.toLowerCase(), duration])
)

/** Featured + catalog CSE titles as Skillsoft-catalog entries (for View Courses). */
export const CSE_CATALOG_COURSES = (() => {
  const byTitle = new Map()

  for (const item of CSE_PROGRAM.featured) {
    const [title, tag, image] = item.split('|')
    byTitle.set(title.toLowerCase(), {
      slug: slugify(title),
      title,
      category: categoryFromTag(tag),
      duration: durationByTitle[title.toLowerCase()] || '',
      detailsReady: true,
      overview: 'Area 51 Computer Science Engineering microcredential.',
      outcomes: [],
      image: image || '/course-images/IMG1.jpg'
    })
  }

  for (const [title, , , duration] of CSE_PROGRAM.courses) {
    const key = title.toLowerCase()
    if (byTitle.has(key)) {
      if (duration) byTitle.get(key).duration = duration
      continue
    }
    byTitle.set(key, {
      slug: slugify(title),
      title,
      category: 'Development',
      duration: duration || '',
      detailsReady: true,
      overview: 'Area 51 Computer Science Engineering microcredential.',
      outcomes: [],
      image: `/course-images/IMG${(byTitle.size % 24) + 1}.jpg`
    })
  }

  return [...byTitle.values()]
})()

/** True when a CSE title is already represented by an existing catalog course. */
export function cseTitleCoveredBy(existingTitle, cseTitle) {
  const norm = (t) => t
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/business intelligence/g, 'bi')
    .replace(/cyber\s*security/g, 'cybersecurity')
    .replace(/software testing and software testing automation/g, 'software testing and automation')
    .replace(/^introduction to /, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

  const a = norm(existingTitle)
  const b = norm(cseTitle)
  if (a === b) return true
  if (a.includes(b) || b.includes(a)) {
    // Avoid matching bare "python" / "c" to longer CSE titles
    const shorter = a.length <= b.length ? a : b
    return shorter.split(' ').length >= 2
  }
  return false
}
