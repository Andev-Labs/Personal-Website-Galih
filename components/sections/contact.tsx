import { ArrowUpRight, Download, MapPin } from "lucide-react"

import { Container } from "@/components/site/container"
import { Eyebrow } from "@/components/site/eyebrow"
import { GradientPanel } from "@/components/site/gradient-panel"
import { profile } from "@/content"

import { CopyEmailButton } from "./copy-email-button"

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 sm:py-24">
      <Container>
        <GradientPanel className="grid gap-8 p-3 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-14">
          <div className="order-2 rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-float sm:p-8 lg:order-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 block text-xl font-bold tracking-tight break-all hover:underline sm:text-2xl"
            >
              {profile.email}
            </a>
            <div className="mt-5">
              <CopyEmailButton email={profile.email} />
            </div>
            <ul className="mt-8 divide-y divide-line-soft border-t border-line-soft">
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="me noreferrer"
                  className="flex items-center justify-between py-4 font-medium hover:text-link"
                >
                  LinkedIn
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.cvPath}
                  download
                  className="flex items-center justify-between py-4 font-medium hover:text-link"
                >
                  Download CV (PDF)
                  <Download aria-hidden="true" className="size-5" />
                </a>
              </li>
            </ul>
          </div>
          <div className="order-1 px-3 pt-6 text-espresso sm:px-0 sm:pt-0 lg:order-2 dark:text-bone">
            <Eyebrow className="text-espresso/80 dark:text-bone/80">Contact</Eyebrow>
            <h2 id="contact-heading" className="mt-4 text-headline font-bold text-balance">
              {profile.contact.headline}
            </h2>
            <p className="mt-5 max-w-md text-lg text-pretty">{profile.contact.body}</p>
            <p className="mt-6 inline-flex items-center gap-2 font-medium">
              <MapPin aria-hidden="true" className="size-5" />
              {profile.location}
            </p>
          </div>
        </GradientPanel>
      </Container>
    </section>
  )
}
