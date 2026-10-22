import { Section } from "@/components/site/section"
import { profile } from "@/content"

export function Expertise() {
  return (
    <Section
      id="expertise"
      index="04"
      label="Expertise"
      title="Methods, instruments and the systems around them."
    >
      <div className="grid border border-line md:grid-cols-3">
        {profile.expertise.map((group, i) => (
          <section
            key={group.title}
            aria-labelledby={`expertise-${i}`}
            className="reveal flex flex-col gap-6 border-line p-6 max-md:not-first:border-t sm:p-8 md:not-first:border-l"
          >
            <header>
              <p className="font-mono text-micro text-muted-foreground uppercase tabular-nums">
                {String.fromCharCode(65 + i)} / {String(profile.expertise.length).padStart(2, "0")}
              </p>
              <h3 id={`expertise-${i}`} className="mt-3 font-serif text-3xl leading-tight">
                {group.title}
              </h3>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">{group.blurb}</p>
            </header>
            {group.sets.map((set) => (
              <div key={set.label ?? group.title}>
                {set.label ? (
                  <h4 className="mb-3 font-mono text-label text-muted-foreground uppercase">
                    {set.label}
                  </h4>
                ) : null}
                <ul className="flex flex-wrap gap-2">
                  {set.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line-soft bg-surface px-2.5 py-1.5 font-mono text-xs"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </Section>
  )
}
