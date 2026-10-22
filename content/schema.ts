import { z } from "zod"

const nonEmpty = z.string().trim().min(1)

const seoSchema = z.object({
  title: nonEmpty.max(70),
  description: nonEmpty.max(170),
})

const imageSchema = z.object({
  src: z.string().startsWith("/images/"),
  alt: nonEmpty,
})

/**
 * A metric slot stays hidden until `value` is confirmed by Galih.
 * Never fill `value` with an estimate.
 */
const metricSlotSchema = z.object({
  label: nonEmpty,
  value: nonEmpty.nullable(),
})

export const profileSchema = z.object({
  name: nonEmpty,
  shortName: nonEmpty,
  monogram: nonEmpty.max(4),
  role: nonEmpty,
  location: nonEmpty,
  email: z.email(),
  linkedin: z.url(),
  cvPath: z.string().startsWith("/"),
  portrait: imageSchema,
  seo: seoSchema,
  hero: z.object({
    label: nonEmpty,
    headline: nonEmpty,
    statement: nonEmpty,
  }),
  snapshot: z.array(z.object({ label: nonEmpty, value: nonEmpty })).min(3),
  about: z.array(nonEmpty).min(1),
  experience: z
    .array(
      z.object({
        id: nonEmpty,
        role: nonEmpty,
        company: nonEmpty,
        location: nonEmpty,
        start: nonEmpty,
        end: nonEmpty,
        sector: nonEmpty,
        summary: nonEmpty,
        highlights: z.array(nonEmpty).min(1),
        caseSlugs: z.array(nonEmpty).default([]),
      }),
    )
    .min(1),
  expertise: z
    .array(
      z.object({
        title: nonEmpty,
        blurb: nonEmpty,
        sets: z
          .array(
            z.object({
              label: nonEmpty.optional(),
              items: z.array(nonEmpty).min(1),
            }),
          )
          .min(1),
      }),
    )
    .length(3),
  education: z
    .array(
      z.object({
        school: nonEmpty,
        degree: nonEmpty,
        period: nonEmpty,
        gpa: nonEmpty,
        focus: z.array(nonEmpty).min(1),
      }),
    )
    .min(1),
  certificates: z.array(z.object({ title: nonEmpty, year: nonEmpty })).min(1),
  beyond: z.object({
    intro: nonEmpty,
    feature: z.object({ title: nonEmpty, year: nonEmpty, body: nonEmpty }),
    organizations: z
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
  cover: imageSchema,
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
