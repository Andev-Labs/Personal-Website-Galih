import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Container } from "./container"
import { SectionLabel } from "./section-label"

type SectionProps = {
  id: string
  index: string
  label: string
  title: ReactNode
  intro?: ReactNode
  className?: string
  children: ReactNode
}

/** Home section shell: specimen label, serif heading, optional intro. */
export function Section({ id, index, label, title, intro, className, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-16 sm:py-20", className)}>
      <Container>
        <header className="reveal mb-12 grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
          <SectionLabel index={index} className="self-start md:col-span-3 md:pt-4">
            {label}
          </SectionLabel>
          <div className="md:col-span-9">
            <h2 id={headingId} className="font-serif text-headline text-balance">
              {title}
            </h2>
            {intro ? (
              <p className="mt-5 max-w-prose text-lg text-pretty text-muted-foreground">{intro}</p>
            ) : null}
          </div>
        </header>
        {children}
      </Container>
    </section>
  )
}
