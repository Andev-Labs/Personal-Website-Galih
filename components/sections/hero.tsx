import { ArrowDown, Download } from "lucide-react"
import Link from "next/link"

import { ArchImage } from "@/components/site/arch-image"
import { ChromatogramLine } from "@/components/site/chromatogram-line"
import { Container } from "@/components/site/container"
import { SectionLabel } from "@/components/site/section-label"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content"
import { cn } from "@/lib/utils"

export function Hero() {
  const [firstName, ...rest] = profile.hero.headline.split(" ")
  const lastNames = rest.join(" ")

  return (
    <section aria-labelledby="hero-heading" className="pt-10 pb-6 sm:pt-16">
      <Container>
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7 lg:col-span-8">
            <SectionLabel>{profile.hero.label}</SectionLabel>
            <h1 id="hero-heading" className="mt-6 font-serif text-display text-balance">
              <span className="block">{firstName}</span>
              <span className="block italic">{lastNames}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-pretty text-muted-foreground sm:text-xl">
              {profile.hero.statement}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/#work"
                className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6 text-base")}
              >
                View Work
                <ArrowDown aria-hidden="true" />
              </Link>
              <a
                href={profile.cvPath}
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full border-line bg-transparent px-6 text-base",
                )}
              >
                <Download aria-hidden="true" />
                Download CV
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs md:col-span-5 md:max-w-none lg:col-span-4">
            <ArchImage
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              priority
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 40vw, 320px"
            />
            <p className="mt-4 flex justify-between font-mono text-micro text-muted-foreground uppercase">
              <span>Fig. 01</span>
              <span>{profile.location}</span>
            </p>
          </div>
        </div>
        <ChromatogramLine variant="hero" height={96} draw showLabels className="mt-14 sm:mt-20" />
      </Container>
    </section>
  )
}
