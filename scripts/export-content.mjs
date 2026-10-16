#!/usr/bin/env node
/**
 * Exports the front-end content modules into `database/data/*.json` so the
 * Laravel seeders can populate rows that are identical to the data the React
 * views rendered before the backend was introduced.
 *
 * Usage: node scripts/export-content.mjs   (then: php artisan db:seed)
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { PROGRAM_KEYS, PROGRAMS } from '../resources/js/data/programsData.js'
import { CSE } from '../resources/js/data/cseProgram.js'
import { SKILLSOFT_COURSES, SKILLSOFT_DOMAINS } from '../resources/js/data/skillsoftCatalog.js'
import { ASPIRE_IMAGES, ASPIRE_JOURNEYS } from '../resources/js/data/aspireJourneys.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'database', 'data')
mkdirSync(outDir, { recursive: true })

const write = (name, payload) => {
  const file = join(outDir, `${name}.json`)
  writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(`wrote ${file} (${payload.length} records)`)
}

// "Title|Tag" or "Title|Tag|/image.jpg" -> parts
const parseFeatured = (entry) => {
  const [title, tag, image] = String(entry).split('|')
  return { title, tag: tag || null, image: image || null }
}

const withImages = (items, images) => items.map((item, i) => (images[i] ? `${item}|${images[i]}` : item))

const programPayload = (key, p, { isCse = false, featured } = {}) => ({
  key,
  name: p.name,
  short: p.short,
  tagline: p.tagline || null,
  detail_title: p.detailTitle || null,
  detail_note: p.detailNote || null,
  is_cse: isCse,
  featured: (featured || p.featured || []).map(parseFeatured),
  details: (p.detailRows || []).map(([title, duration, credits, code]) => ({
    title,
    duration,
    credits,
    code: code || null
  })),
  courses: (p.courses || []).map(([title, group_code, semester, duration, credits, code]) => ({
    title,
    group_code,
    semester,
    duration,
    credits,
    code: code || null
  }))
})

// CSE featured cards carry the same IMG1..IMG24 treatment the component applied at runtime.
const cseImages = Array.from({ length: 24 }, (_, i) => `/course-images/IMG${i + 1}.jpg`)

const programs = PROGRAM_KEYS.map((key, i) => ({ sort: i, ...programPayload(key, PROGRAMS[key]) }))
programs.push({
  sort: programs.length,
  ...programPayload('cse', CSE, { isCse: true, featured: withImages(CSE.featured, cseImages) })
})

const tracks = SKILLSOFT_COURSES.map((c, i) => ({
  slug: c.slug,
  title: c.title,
  category: c.category,
  duration: c.duration || null,
  page_url: c.page || null,
  apply_url: c.apply || null,
  overview: c.overview || null,
  image: c.image || null,
  outcomes: c.outcomes || [],
  sort: i
}))

const slugByTitle = new Map(SKILLSOFT_COURSES.map((c) => [c.title.toLowerCase(), c.slug]))

const journeys = ASPIRE_JOURNEYS.map((j, i) => ({
  title: j.title,
  category: j.category,
  description: j.desc || null,
  image: ASPIRE_IMAGES[i % ASPIRE_IMAGES.length],
  track_slug: slugByTitle.get(j.title.toLowerCase()) || null,
  sort: i
}))

const domains = SKILLSOFT_DOMAINS.map((name, sort) => ({ name, sort }))

write('programs', programs)
write('tracks', tracks)
write('journeys', journeys)
write('domains', domains)
