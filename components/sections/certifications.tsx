import { Container } from "@/components/site/container"
import { PhotoPlaceholder } from "@/components/site/photo-placeholder"
import { SectionHeader } from "@/components/site/section-header"
import { profile } from "@/content"

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-16 sm:py-24"
    >
      <Container>
        <SectionHeader
          id="certifications-heading"
          index="05"
          eyebrow="Certifications & training"
          title="Always calibrating."
          intro="Training that keeps both the instruments and the analyst in spec."
        />
        <ul className="reveal-stagger mt-12 grid gap-5 md:grid-cols-3">
          {profile.certificates.map((item) => (
            <li
              key={item.title}
              className="reveal flex flex-col overflow-hidden rounded-3xl bg-card p-2.5 shadow-card"
            >
              <PhotoPlaceholder className="aspect-[16/10] w-full rounded-[1.25rem]" />
              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <p className="flex items-center gap-2 text-xs font-medium">
                  <span className="rounded-md bg-muted px-2 py-1">{item.category}</span>
                  <span className="font-mono text-muted-foreground">{item.year}</span>
                </p>
                <h3 className="text-xl leading-snug font-bold tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="text-sm text-pretty text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
