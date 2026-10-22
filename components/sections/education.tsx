import { SectionHeader } from "@/components/site/section-header"
import { profile } from "@/content"

import { EducationBackdrop } from "./education-backdrop"

export function Education() {
  return (
    <EducationBackdrop items={profile.education}>
      <SectionHeader
        id="education-heading"
        index="04"
        eyebrow="Education"
        title="Trained at the bench, then at the plant."
        intro="A diploma in chemical analysis, then a chemical engineering degree earned while working full-time."
        className="[&_p]:text-espresso/80 dark:[&_p]:text-bone/80"
      />
    </EducationBackdrop>
  )
}
