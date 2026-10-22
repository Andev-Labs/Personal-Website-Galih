import { Container } from "@/components/site/container"
import { SectionLabel } from "@/components/site/section-label"
import { profile } from "@/content"

export function Snapshot() {
  const [lead, ...paragraphs] = profile.about

  return (
    <section id="profile" aria-labelledby="profile-heading" className="py-16 sm:py-24">
      <Container>
        <h2 id="profile-heading" className="sr-only">
          Recruiter snapshot and profile
        </h2>
        <dl className="reveal grid grid-cols-2 border-y border-line sm:grid-cols-3 lg:grid-cols-5">
          {profile.snapshot.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 border-line-soft px-1 py-5 max-lg:border-b sm:px-5 lg:border-l lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="font-mono text-micro text-muted-foreground uppercase">
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span> ·{" "}
                {item.label}
              </dt>
              <dd className="font-serif text-2xl leading-tight sm:text-3xl">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-8 md:grid-cols-12">
          <SectionLabel index="01" className="reveal self-start md:col-span-3 md:pt-3">
            Profile
          </SectionLabel>
          <div className="reveal md:col-span-9">
            <p className="font-serif text-title text-balance">{lead}</p>
            <div className="mt-8 grid gap-6 text-muted-foreground lg:grid-cols-2">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
