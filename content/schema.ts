import { z } from "zod"

const nonEmpty = z.string().trim().min(1)

const seoSchema = z.object({
  title: nonEmpty.max(70),
  description: nonEmpty.max(170),
})

/**
 * A metric slot stays hidden until `value` is confirmed by Galih.
 * Never fill `value` with an estimate.
 */
const metricSlotSchema = z.object({
  label: nonEmpty,
  value: nonEmpty.nullable(),
})

const iconSchema = z.enum([
  "flask",
  "beaker",
  "shield",
  "monitor",
  "languages",
  "graduation",
  "atom",
])

export const profileSchema = z.object({
  name: nonEmpty,
  shortName: nonEmpty,
  monogram: nonEmpty.max(4),
  role: nonEmpty,
  location: nonEmpty,
  email: z.email(),
  linkedin: z.url(),
  cvPath: z.string().startsWith("/"),
  seo: seoSchema,
  hero: z.object({
    badge: nonEmpty,
    headline: nonEmpty,
    tagline: nonEmpty,
    statement: nonEmpty,
    instruments: z.array(nonEmpty).min(3).max(8),
    floating: z.array(nonEmpty).min(2).max(4),
  }),
  summary: z.object({
    title: nonEmpty,
    paragraphs: z.array(nonEmpty).min(1),
    /**
     * Only figures backed by the CV. `count` drives the count-up; leave it out
     * for non-numeric stats.
     */
    stats: z
      .array(
        z.object({
          value: nonEmpty,
          count: z.number().int().positive().optional(),
          suffix: z.string().default(""),
          label: nonEmpty,
          note: nonEmpty,
        }),
      )
      .length(4),
  }),
  skills: z
    .array(
      z.object({
        id: nonEmpty,
        icon: iconSchema,
        title: nonEmpty,
        blurb: nonEmpty,
        items: z.array(nonEmpty).min(1),
      }),
    )
    .min(3),
  experience: z
    .array(
      z.object({
        id: nonEmpty,
        role: nonEmpty,
        company: nonEmpty,
        /** Used on the carousel side pills. */
        abbr: nonEmpty.max(10),
        location: nonEmpty,
        start: nonEmpty,
        end: nonEmpty,
        sector: nonEmpty,
        impact: nonEmpty.max(48),
        quote: nonEmpty,
        instruments: z.array(nonEmpty).min(1).max(6),
        /** Fallback mini process when the role has no case study. */
        flow: z.array(nonEmpty.max(18)).min(3).max(5).optional(),
        highlights: z.array(nonEmpty).min(1),
        caseSlugs: z.array(nonEmpty).default([]),
      }),
    )
    .min(1),
  education: z
    .array(
      z.object({
        id: nonEmpty,
        tab: nonEmpty,
        icon: iconSchema,
        school: nonEmpty,
        degree: nonEmpty,
        period: nonEmpty,
        gpa: nonEmpty,
        blurb: nonEmpty,
        focus: z.array(nonEmpty).min(1),
      }),
    )
    .min(1),
  certificates: z
    .array(z.object({ title: nonEmpty, year: nonEmpty, category: nonEmpty, body: nonEmpty }))
    .min(1),
  activities: z.object({
    intro: nonEmpty,
    items: z
      .array(
        z.object({
          org: nonEmpty,
          short: nonEmpty,
          roles: z.array(z.object({ title: nonEmpty, year: nonEmpty })).min(1),
          note: nonEmpty,
        }),
      )
      .min(1),
  }),
  contact: z.object({
    headline: nonEmpty,
    body: nonEmpty,
  }),
  confidentiality: nonEmpty,
})

export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  number: z.string().regex(/^\d{2}$/),
  title: nonEmpty,
  kicker: nonEmpty,
  summary: nonEmpty,
  seo: seoSchema,
  meta: z.object({
    role: nonEmpty,
    company: nonEmpty,
    period: nonEmpty,
    instruments: z.array(nonEmpty).min(1),
    standards: z.array(nonEmpty).min(1),
  }),
  tags: z.array(nonEmpty).min(2).max(5),
  /** Mono caption shown on the gradient placeholder that stands in for a photo. */
  coverLabel: nonEmpty.max(40),
  context: z.array(nonEmpty).min(1),
  myRole: z.array(nonEmpty).min(1),
  process: z
    .array(
      z.object({
        label: nonEmpty.max(18),
        title: nonEmpty,
        detail: nonEmpty,
      }),
    )
    .min(3)
    .max(5),
  outcome: z.array(nonEmpty).min(1),
  metrics: z.array(metricSlotSchema).default([]),
  skills: z.array(nonEmpty).min(3),
})

export type Profile = z.infer<typeof profileSchema>
export type CaseStudy = z.infer<typeof caseStudySchema>
export type CaseStudyInput = z.input<typeof caseStudySchema>
export type ProfileInput = z.input<typeof profileSchema>
