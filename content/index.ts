import { z } from "zod"

import { profileInput } from "./profile"
import { caseStudySchema, profileSchema } from "./schema"
import { incomingMaterialGatekeeping } from "./work/incoming-material-gatekeeping"
import { methodTransferValidation } from "./work/method-transfer-validation"
import { oosInvestigationCapa } from "./work/oos-investigation-capa"
import { ppwrPackagingCompliance } from "./work/ppwr-packaging-compliance"
import { qccGenbaImprovement } from "./work/qcc-genba-improvement"

// Parsed at module load, so invalid content fails `next build`.
export const profile = profileSchema.parse(profileInput)

export const caseStudies = z
  .array(caseStudySchema)
  .refine((items) => new Set(items.map((item) => item.slug)).size === items.length, {
    message: "Case study slugs must be unique",
  })
  .parse([
    ppwrPackagingCompliance,
    incomingMaterialGatekeeping,
    oosInvestigationCapa,
    methodTransferValidation,
    qccGenbaImprovement,
  ])
  .sort((a, b) => a.number.localeCompare(b.number))

const knownSlugs = new Set(caseStudies.map((item) => item.slug))
for (const role of profile.experience) {
  for (const slug of role.caseSlugs) {
    if (!knownSlugs.has(slug)) {
      throw new Error(`Experience "${role.id}" links to unknown case study "${slug}"`)
    }
  }
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug)
}

export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((item) => item.slug === slug)
  const count = caseStudies.length
  return {
    previous: caseStudies[(index - 1 + count) % count],
    next: caseStudies[(index + 1) % count],
  }
}

export type { Backdrop, CaseStudy, Profile } from "./schema"
