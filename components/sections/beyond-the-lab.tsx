import { Section } from "@/components/site/section"
import { profile } from "@/content"

export function BeyondTheLab() {
  const { intro, feature, organizations } = profile.beyond

  return (
    <Section
      id="beyond"
      index="06"
      label="Beyond the Lab"
      title="The quiet jobs that keep a group running."
      intro={intro}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <article className="reveal relative overflow-hidden rounded-sm bg-surface p-8 sm:p-10 lg:col-span-5">
          <p className="font-mono text-micro text-muted-foreground uppercase">
            Field note · {feature.year}
          </p>
          <h3 className="mt-6 font-serif text-title text-balance italic">{feature.title}</h3>
          <p className="mt-6 text-pretty text-muted-foreground">{feature.body}</p>
        </article>
        <ol className="lg:col-span-7">
          {organizations.map((org) => (
            <li key={org.org} className="reveal border-t border-line-soft py-6 last:border-b">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{org.org}</h3>
                <p className="font-mono text-micro text-muted-foreground uppercase">{org.short}</p>
              </div>
              <p className="mt-2 text-pretty text-muted-foreground">{org.note}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-label uppercase">
                {org.roles.map((role) => (
                  <li key={`${role.title}-${role.year}`}>
                    <span className="text-muted-foreground tabular-nums">{role.year}</span>{" "}
                    {role.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
