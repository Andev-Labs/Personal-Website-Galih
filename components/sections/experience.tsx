import { ChevronDown } from "lucide-react"
import Link from "next/link"

import { Section } from "@/components/site/section"
import { caseStudies, profile, type Profile } from "@/content"

type Role = Profile["experience"][number]

function yearOf(value: string) {
  return value.match(/\d{4}/)?.[0] ?? value
}

function RoleBody({ role }: { role: Role }) {
  const cases = caseStudies.filter((item) => role.caseSlugs.includes(item.slug))
  return (
    <>
      <p className="text-lg text-pretty">{role.summary}</p>
      <ul className="mt-5 space-y-3 text-muted-foreground">
        {role.highlights.map((highlight) => (
          <li key={highlight} className="relative pl-6 text-pretty">
            <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-3 bg-line" />
            {highlight}
          </li>
        ))}
      </ul>
      {cases.length > 0 ? (
        <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 font-mono text-label uppercase">
          <span className="text-muted-foreground">Related cases</span>
          {cases.map((item) => (
            <Link key={item.slug} href={`/work/${item.slug}`} className="link">
              {item.number}
              <span className="sr-only"> — {item.title}</span>
            </Link>
          ))}
        </p>
      ) : null}
    </>
  )
}

function RoleHeading({ role, as: Heading }: { role: Role; as: "h3" | "span" }) {
  return (
    <>
      <Heading className="block font-serif text-2xl leading-tight sm:text-3xl">{role.role}</Heading>
      <span className="mt-1 block text-muted-foreground">
        {role.company} · {role.location}
      </span>
    </>
  )
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      label="Experience"
      title="Six years across the lab and the line."
    >
      {/* Desktop: sticky year index beside each role */}
      <ol className="hidden md:block">
        {profile.experience.map((role) => (
          <li
            key={role.id}
            className="reveal grid grid-cols-12 gap-8 border-t border-line-soft py-12"
          >
            <div className="col-span-3">
              <div className="sticky top-28">
                <p className="font-serif text-5xl leading-none tabular-nums">
                  {yearOf(role.start)}
                </p>
                <p className="mt-3 font-mono text-label text-muted-foreground uppercase">
                  {role.start} — {role.end}
                </p>
                <p className="mt-1 font-mono text-micro text-muted-foreground uppercase">
                  {role.sector}
                </p>
              </div>
            </div>
            <article className="col-span-9 max-w-3xl">
              <header className="mb-6">
                <RoleHeading role={role} as="h3" />
              </header>
              <RoleBody role={role} />
            </article>
          </li>
        ))}
      </ol>

      {/* Mobile: native accordion, works without JavaScript */}
      <ol className="border-b border-line-soft md:hidden">
        {profile.experience.map((role, i) => (
          <li key={role.id} className="border-t border-line-soft">
            <details className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block font-mono text-micro text-muted-foreground uppercase">
                    {role.start} — {role.end} · {role.sector}
                  </span>
                  <span className="mt-2 block">
                    <RoleHeading role={role} as="span" />
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="mt-6 size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <div className="pb-8">
                <RoleBody role={role} />
              </div>
            </details>
          </li>
        ))}
      </ol>
    </Section>
  )
}
