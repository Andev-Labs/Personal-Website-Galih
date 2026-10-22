"use client"

import { ArrowRight, ChevronDown, Pause, Play } from "lucide-react"
import Link from "next/link"
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react"

import { GradientPanel } from "@/components/site/gradient-panel"
import type { Backdrop } from "@/content"
import { cn } from "@/lib/utils"

export type ExperienceSlide = {
  id: string
  role: string
  company: string
  abbr: string
  period: string
  startYear: string
  impact: string
  quote: string
  instruments: string[]
  flow: string[]
  flowTitle: string
  highlights: string[]
  cases: { slug: string; title: string }[]
  backdrop: Backdrop
}

const SWIPE_THRESHOLD = 48

/** Vertical side pill. Shrinks with distance from the active card. */
function SidePill({
  slide,
  distance,
  side,
  onSelect,
}: {
  slide: ExperienceSlide
  distance: number
  side: "left" | "right"
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative shrink-0 rounded-[1.75rem] bg-card p-1.5 shadow-card transition-transform hover:-translate-y-1 motion-reduce:transition-none",
        distance === 1 ? "h-72 w-20" : "h-52 w-16",
      )}
    >
      {/* Connector stub to the neighbour, like the Calendly reference */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 h-6 w-3 -translate-y-1/2 bg-card",
          side === "left" ? "-right-3" : "-left-3",
        )}
      />
      <span className="mesh flex h-full w-full flex-col items-center justify-between rounded-[1.4rem] py-4 text-espresso dark:text-bone">
        <span className="font-mono text-micro font-medium">{slide.startYear}</span>
        <span className="text-sm font-bold tracking-tight [writing-mode:vertical-rl]">
          {slide.abbr}
        </span>
      </span>
      <span className="sr-only">
        Show {slide.company}, {slide.period}
      </span>
    </button>
  )
}

function MiniProcess({ title, steps }: { title: string; steps: string[] }) {
  return (
    <figure className="rounded-2xl bg-paper/70 p-4 dark:bg-espresso/50">
      <figcaption className="font-mono text-micro font-medium uppercase">{title}</figcaption>
      <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs font-medium shadow-xs">
              <span className="font-mono text-micro text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="h-px w-2.5 bg-espresso/40 dark:bg-bone/40" />
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  )
}

export function ExperienceCarousel({
  slides,
  active,
  onActiveChange,
}: {
  slides: ExperienceSlide[]
  active: number
  onActiveChange: (index: number) => void
}) {
  const [direction, setDirection] = useState<1 | -1>(1)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const pointerStart = useRef<number | null>(null)

  const count = slides.length
  const slide = slides[active]
  const paused = userPaused || hovered || focused

  function go(index: number, dir?: 1 | -1) {
    const next = (index + count) % count
    if (next === active) return
    setDirection(dir ?? (next > active ? 1 : -1))
    onActiveChange(next)
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      go(active + 1, 1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      go(active - 1, -1)
    }
  }

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") pointerStart.current = event.clientX
  }

  function onPointerUp(event: PointerEvent<HTMLElement>) {
    const start = pointerStart.current
    pointerStart.current = null
    if (start === null) return
    const delta = event.clientX - start
    if (Math.abs(delta) < SWIPE_THRESHOLD) return
    if (delta < 0) go(active + 1, 1)
    else go(active - 1, -1)
  }

  const left = [active - 2, active - 1].filter((i) => i >= 0)
  const right = [active + 1, active + 2].filter((i) => i < count)
  const lead = slide.cases[0]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Work experience"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      <div className="grid items-center gap-3 lg:grid-cols-[1fr_minmax(0,58rem)_1fr]">
        <div className="hidden items-center justify-end gap-3 lg:flex">
          {left.map((i) => (
            <SidePill
              key={slides[i].id}
              slide={slides[i]}
              distance={active - i}
              side="left"
              onSelect={() => go(i, -1)}
            />
          ))}
        </div>

        <div
          role="group"
          aria-roledescription="slide"
          aria-label={`${active + 1} of ${count}: ${slide.company}`}
          aria-live={paused ? "polite" : "off"}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="touch-pan-y rounded-[2rem] bg-card p-2.5 text-card-foreground shadow-float sm:p-3"
        >
          <div
            key={slide.id}
            className={cn(
              "grid animate-in gap-3 duration-500 fade-in-0 motion-reduce:animate-none md:grid-cols-2 md:gap-4",
              direction === 1 ? "slide-in-from-right-6" : "slide-in-from-left-6",
            )}
          >
            <div className="flex flex-col gap-6 p-4 sm:p-6">
              <h3 className="text-title font-bold text-balance">{slide.impact}</h3>
              <blockquote className="text-lg leading-relaxed font-medium text-pretty sm:text-xl">
                &ldquo;{slide.quote}&rdquo;
              </blockquote>
              <ul aria-label="Role details" className="flex flex-wrap gap-1.5">
                {[slide.role, slide.company, slide.period].map((tag) => (
                  <li key={tag} className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    {tag}
                  </li>
                ))}
              </ul>
              <details className="group/details rounded-2xl border border-line-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  Responsibilities
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform group-open/details:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <ul className="space-y-2.5 px-4 pb-4 text-sm text-pretty text-muted-foreground">
                  {slide.highlights.map((item) => (
                    <li key={item} className="relative pl-4">
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-clay"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
              {lead ? (
                <div className="mt-auto flex flex-col gap-1.5">
                  <Link
                    href={`/work/${lead.slug}`}
                    className="group/link inline-flex items-center gap-2 self-start font-medium text-link"
                  >
                    Read case study
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover/link:translate-x-0.5 motion-reduce:transition-none"
                    />
                    <span className="sr-only">: {lead.title}</span>
                  </Link>
                  {slide.cases.length > 1 ? (
                    <p className="text-sm text-muted-foreground">
                      Also:{" "}
                      {slide.cases.slice(1).map((item, i) => (
                        <span key={item.slug}>
                          {i > 0 ? " · " : null}
                          <Link href={`/work/${item.slug}`} className="link">
                            {item.title}
                          </Link>
                        </span>
                      ))}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <GradientPanel
              breathe={false}
              className="flex min-h-80 flex-col justify-between gap-6 rounded-[1.5rem] p-5 text-espresso sm:p-7 dark:text-bone"
            >
              <div>
                <p className="font-mono text-micro font-medium uppercase opacity-80">
                  {slide.startYear} · {slide.abbr}
                </p>
                <p className="mt-3 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-none font-bold tracking-[-0.04em] text-balance">
                  {slide.company}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <ul aria-label="Instruments and tools" className="flex flex-wrap gap-1.5">
                  {slide.instruments.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-paper/80 px-3 py-1 font-mono text-xs font-medium text-espresso"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {slide.flow.length > 0 ? (
                  <MiniProcess title={slide.flowTitle} steps={slide.flow} />
                ) : null}
              </div>
            </GradientPanel>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {right.map((i) => (
            <SidePill
              key={slides[i].id}
              slide={slides[i]}
              distance={i - active}
              side="right"
              onSelect={() => go(i, 1)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <ol className="flex items-center gap-1.5">
          {slides.map((item, i) => {
            const isActive = i === active
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={isActive ? "true" : undefined}
                  className="flex h-6 items-center"
                >
                  <span
                    className={cn(
                      "relative block h-1.5 overflow-hidden rounded-full bg-espresso/20 transition-all duration-300 motion-reduce:transition-none dark:bg-bone/25",
                      isActive ? "w-14" : "w-1.5",
                    )}
                  >
                    {isActive ? (
                      <span
                        // Restart the 6s fill on every slide; it drives autoplay.
                        key={slide.id}
                        onAnimationEnd={() => go(active + 1, 1)}
                        className="absolute inset-0 origin-left animate-progress rounded-full bg-espresso motion-reduce:animate-none motion-reduce:bg-espresso/70 dark:bg-bone"
                        style={{ animationPlayState: paused ? "paused" : "running" }}
                      />
                    ) : null}
                  </span>
                  <span className="sr-only">
                    Show slide {i + 1} of {count}: {item.company}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        <button
          type="button"
          onClick={() => setUserPaused((value) => !value)}
          className="inline-flex size-9 items-center justify-center rounded-full bg-card shadow-card motion-reduce:hidden"
        >
          {userPaused ? (
            <Play aria-hidden="true" className="size-3.5" />
          ) : (
            <Pause aria-hidden="true" className="size-3.5" />
          )}
          <span className="sr-only">{userPaused ? "Start autoplay" : "Pause autoplay"}</span>
        </button>
      </div>
    </section>
  )
}
