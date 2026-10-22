import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/site/container"
import { GradientPanel } from "@/components/site/gradient-panel"
import { PhotoPlaceholder } from "@/components/site/photo-placeholder"
import { profile } from "@/content"
import { cn } from "@/lib/utils"

const floatPositions = [
  "top-[14%] left-[6%] sm:left-[14%]",
  "right-[6%] bottom-[22%] sm:right-[14%]",
  "bottom-[10%] left-[10%] max-sm:hidden sm:left-[20%]",
]

export function Hero() {
  const { hero } = profile
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-14 pb-10 sm:pt-20">
      <Container className="flex flex-col items-center text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-card px-3.5 py-1.5 text-sm font-medium shadow-card">
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cocoa/60 motion-reduce:animate-none dark:bg-nude/60" />
            <span className="relative inline-flex size-2 rounded-full bg-cocoa dark:bg-nude" />
          </span>
          {hero.badge}
        </p>
        <h1 id="hero-heading" className="mt-6 max-w-5xl text-display font-bold text-balance">
          {hero.headline}
        </h1>
        <p className="mt-5 font-mono text-label font-medium text-muted-foreground uppercase">
          {hero.tagline}
        </p>
        <p className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
          {hero.statement}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={profile.cvPath}
            download
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download aria-hidden="true" className="size-4" />
            Download CV
          </a>
          <Link
            href="/#contact"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-card px-6 font-medium transition-colors hover:bg-muted"
          >
            Contact me
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </Container>

      <Container className="mt-14 sm:mt-16">
        <GradientPanel className="relative flex h-[26rem] items-end justify-center overflow-hidden px-6 pt-10 sm:h-[34rem]">
          <PhotoPlaceholder
            label="Portrait · coming soon"
            className="h-[88%] w-[min(22rem,72%)] rounded-b-none border-x-8 border-t-8 border-paper/60 shadow-float dark:border-espresso/40"
          />
          {hero.floating.map((item, i) => (
            <span
              key={item}
              aria-hidden="true"
              className={cn(
                "absolute rounded-2xl bg-card px-4 py-2.5 text-sm font-bold tracking-tight shadow-float",
                floatPositions[i],
              )}
            >
              {item}
            </span>
          ))}
        </GradientPanel>
      </Container>
    </section>
  )
}
