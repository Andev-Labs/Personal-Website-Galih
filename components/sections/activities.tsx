import { Container } from "@/components/site/container"
import { GradientPanel } from "@/components/site/gradient-panel"
import { SectionHeader } from "@/components/site/section-header"
import { profile } from "@/content"

export function Activities() {
  const { activities } = profile
  return (
    <section id="activities" aria-labelledby="activities-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="activities-heading"
          index="06"
          eyebrow="Other activities"
          title="Beyond the lab."
          intro={activities.intro}
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {activities.items.map((item) => (
            <li
              key={item.org}
              className="reveal flex flex-col gap-5 rounded-4xl bg-surface p-2.5 pb-6"
            >
              <GradientPanel
                breathe={false}
                aria-hidden="true"
                className="flex aspect-[4/3] items-end rounded-[1.6rem] p-5 text-espresso dark:text-bone"
              >
                <span className="text-[clamp(2.5rem,1.8rem+2vw,3.5rem)] leading-none font-bold tracking-[-0.05em]">
                  {item.short}
                </span>
              </GradientPanel>
              <div className="flex flex-col gap-2 px-4">
                <h3 className="text-lg leading-snug font-bold tracking-tight text-balance">
                  {item.org}
                </h3>
                <ul aria-label="Roles" className="flex flex-wrap gap-1.5">
                  {item.roles.map((role) => (
                    <li
                      key={`${role.title}-${role.year}`}
                      className="rounded-md bg-card px-2 py-1 text-xs font-medium"
                    >
                      {role.title} · {role.year}
                    </li>
                  ))}
                </ul>
                <p className="mt-1 text-sm text-pretty text-muted-foreground">{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
