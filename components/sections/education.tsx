import { Section } from "@/components/site/section"
import { profile } from "@/content"

export function Education() {
  return (
    <Section
      id="education"
      index="05"
      label="Education & Certificates"
      title="Trained as an analyst, then as an engineer."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h3 className="mb-4 font-mono text-label text-muted-foreground uppercase">Education</h3>
          <ol className="border-b border-line-soft">
            {profile.education.map((item) => (
              <li key={item.school} className="reveal border-t border-line-soft py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="font-serif text-3xl leading-tight">{item.school}</p>
                  <p className="font-mono text-label text-muted-foreground tabular-nums">
                    {item.period}
                  </p>
                </div>
                <p className="mt-2">
                  {item.degree} <span className="text-muted-foreground">· GPA {item.gpa}</span>
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.focus.map((focus) => (
                    <li
                      key={focus}
                      className="rounded-full border border-line-soft px-3 py-1 text-sm text-muted-foreground"
                    >
                      {focus}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-5">
          <h3 className="mb-4 font-mono text-label text-muted-foreground uppercase">
            Certificates
          </h3>
          <ol className="border-b border-line-soft">
            {profile.certificates.map((item) => (
              <li
                key={item.title}
                className="reveal grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line-soft py-5"
              >
                <span className="font-mono text-label text-muted-foreground tabular-nums">
                  {item.year}
                </span>
                <span className="text-pretty">{item.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
