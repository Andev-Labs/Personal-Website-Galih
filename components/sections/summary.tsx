import { Container } from "@/components/site/container"
import { GradientPanel } from "@/components/site/gradient-panel"
import { SectionHeader } from "@/components/site/section-header"
import { profile } from "@/content"

import { CountUp } from "./count-up"

export function Summary() {
  const { summary } = profile
  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="about-heading"
          index="01"
          eyebrow="Professional summary"
          title={summary.title}
        />
        <div className="reveal mx-auto mt-8 max-w-3xl space-y-5 text-center text-lg text-pretty text-muted-foreground">
          {summary.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <GradientPanel className="mt-12 p-3 sm:p-5">
          <dl className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {summary.stats.map((stat) => (
              <div
                key={stat.label}
                className="reveal flex min-h-56 flex-col justify-between gap-6 rounded-3xl bg-card p-6 shadow-card"
              >
                <dt className="font-mono text-label font-medium text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="flex flex-col gap-3">
                  {stat.count ? (
                    <span className="text-stat font-bold tracking-[-0.04em]">
                      <CountUp to={stat.count} suffix={stat.suffix} />
                    </span>
                  ) : (
                    <span className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance">
                      {stat.value}
                    </span>
                  )}
                  <span className="text-sm text-pretty text-muted-foreground">{stat.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </GradientPanel>
      </Container>
    </section>
  )
}
