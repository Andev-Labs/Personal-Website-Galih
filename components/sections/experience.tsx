import { Container } from "@/components/site/container"
import { SectionHeader } from "@/components/site/section-header"
import { getCaseStudy, profile } from "@/content"

import { ExperienceBackdrop } from "./experience-backdrop"
import type { ExperienceSlide } from "./experience-carousel"

function toSlides(): ExperienceSlide[] {
  return profile.experience.map((role) => {
    const cases = role.caseSlugs.flatMap((slug) => {
      const item = getCaseStudy(slug)
      return item ? [{ slug: item.slug, title: item.title }] : []
    })
    // The mini diagram comes from the role's lead case study when there is one.
    const lead = role.caseSlugs[0] ? getCaseStudy(role.caseSlugs[0]) : undefined
    const flow = lead ? lead.process.map((step) => step.label) : (role.flow ?? [])
    return {
      id: role.id,
      role: role.role,
      company: role.company,
      abbr: role.abbr,
      period: `${role.start} — ${role.end}`,
      startYear: role.start.slice(-4),
      impact: role.impact,
      quote: role.quote,
      instruments: role.instruments,
      flow,
      flowTitle: lead ? lead.kicker : "Lab routine",
      highlights: role.highlights,
      cases,
      backdrop: role.backdrop,
    }
  })
}

export function Experience() {
  return (
    <ExperienceBackdrop slides={toSlides()}>
      <Container>
        <SectionHeader
          id="experience-heading"
          index="03"
          eyebrow="Work experience"
          title="Real labs. Real results."
          className="[&_p]:text-espresso/80 dark:[&_p]:text-bone/80"
        />
      </Container>
    </ExperienceBackdrop>
  )
}
