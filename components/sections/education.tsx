import { Container } from "@/components/site/container"
import { SectionHeader } from "@/components/site/section-header"
import { profile } from "@/content"

import { EducationTabs } from "./education-tabs"

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="education-heading"
          index="04"
          eyebrow="Education"
          title="Trained at the bench, then at the plant."
          intro="A diploma in chemical analysis, then a chemical engineering degree earned while working full-time."
        />
        <EducationTabs items={profile.education} />
      </Container>
    </section>
  )
}
