import { Container } from "@/components/site/container"
import { SectionHeader } from "@/components/site/section-header"
import { SkillIcon } from "@/components/site/skill-icon"
import { profile } from "@/content"
import { cn } from "@/lib/utils"

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="skills-heading"
          index="02"
          eyebrow="Skills & competencies"
          title="Easy analysis ahead."
          intro="Classical chemistry, modern instruments and the quality systems that keep both honest."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {profile.skills.map((group, i) => (
            <li
              key={group.id}
              className={cn(
                "reveal flex flex-col gap-5 rounded-4xl bg-surface p-6 sm:p-8",
                // Instruments get the wide card; the rest share the grid.
                i === 0 ? "md:col-span-2 lg:col-span-4" : "lg:col-span-2",
              )}
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-card shadow-card">
                <SkillIcon name={group.icon} className="size-6" />
              </span>
              <div>
                <h3 className="text-title font-bold">{group.title}</h3>
                <p className="mt-2 text-pretty text-muted-foreground">{group.blurb}</p>
              </div>
              <ul aria-label={group.title} className="mt-auto flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-card px-3.5 py-1.5 text-sm font-medium shadow-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
