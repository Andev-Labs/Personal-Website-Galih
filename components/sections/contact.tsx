import { ArrowUpRight, Download } from "lucide-react"

import { ChromatogramLine } from "@/components/site/chromatogram-line"
import { Container } from "@/components/site/container"
import { SectionLabel } from "@/components/site/section-label"
import { profile } from "@/content"

import { CopyEmailButton } from "./copy-email-button"

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 sm:py-28">
      <Container>
        <div className="reveal rounded-sm bg-surface px-6 py-14 sm:px-12 sm:py-20">
          <SectionLabel index="07">Contact</SectionLabel>
          <h2 id="contact-heading" className="mt-8 font-serif text-display text-balance">
            {profile.contact.headline}
          </h2>
          <p className="mt-8 max-w-xl text-lg text-pretty text-muted-foreground">
            {profile.contact.body}
          </p>

          <ChromatogramLine className="my-12" height={40} />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-micro text-muted-foreground uppercase">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 block font-serif text-3xl break-all decoration-line decoration-1 underline-offset-[0.15em] hover:underline sm:text-5xl"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <CopyEmailButton email={profile.email} />
              <a
                href={profile.linkedin}
                target="_blank"
                rel="me noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 font-mono text-label uppercase transition-colors hover:bg-background"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={profile.cvPath}
                download
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 font-mono text-label text-primary-foreground uppercase transition-opacity hover:opacity-90"
              >
                <Download aria-hidden="true" className="size-4" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
