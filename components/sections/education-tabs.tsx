"use client"

import { useId, useRef, useState, type KeyboardEvent } from "react"

import { GradientPanel } from "@/components/site/gradient-panel"
import { PhotoPlaceholder } from "@/components/site/photo-placeholder"
import { SkillIcon } from "@/components/site/skill-icon"
import type { Profile } from "@/content"
import { cn } from "@/lib/utils"

type EducationItem = Profile["education"][number]

/** Calendly hero-style round icon tabs over a gradient panel with a white card. */
export function EducationTabs({ items }: { items: EducationItem[] }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()
  const item = items[active]

  function select(index: number) {
    const next = (index + items.length) % items.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(items.length - 1),
    }
    const action = keys[event.key]
    if (action) {
      event.preventDefault()
      action()
    }
  }

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Education"
        onKeyDown={onKeyDown}
        className="flex justify-center gap-6 sm:gap-10"
      >
        {items.map((entry, i) => {
          const selected = i === active
          return (
            <button
              key={entry.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${entry.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className="group flex flex-col items-center gap-2 rounded-2xl p-1"
            >
              <span
                className={cn(
                  "inline-flex size-16 items-center justify-center rounded-full border transition-all duration-300 motion-reduce:transition-none",
                  selected
                    ? "border-transparent bg-primary text-primary-foreground shadow-float"
                    : "border-line-soft bg-card text-foreground group-hover:-translate-y-0.5",
                )}
              >
                <SkillIcon name={entry.icon} className="size-7" />
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  selected ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {entry.tab}
              </span>
            </button>
          )
        })}
      </div>

      <GradientPanel className="mt-8 p-3 sm:p-8 lg:p-12">
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          tabIndex={0}
          className="rounded-[1.75rem] bg-card p-3 text-card-foreground shadow-float"
        >
          <div
            key={item.id}
            className="grid animate-in gap-3 duration-500 fade-in-0 slide-in-from-bottom-2 motion-reduce:animate-none md:grid-cols-[1.2fr_1fr]"
          >
            <div className="flex flex-col gap-5 p-4 sm:p-6">
              <p className="font-mono text-label font-medium text-muted-foreground uppercase">
                {item.period}
              </p>
              <h3 className="text-title font-bold">{item.school}</h3>
              <p className="text-lg font-medium">{item.degree}</p>
              <p className="text-pretty text-muted-foreground">{item.blurb}</p>
              <div>
                <p className="text-sm font-medium">Key topics</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {item.focus.map((topic) => (
                    <li key={topic} className="rounded-full bg-muted px-3.5 py-1.5 text-sm">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative min-h-64">
              <PhotoPlaceholder
                label={`${item.school} · ${item.period}`}
                className="absolute inset-0 h-full w-full rounded-[1.4rem]"
              />
              <div className="absolute top-4 right-4 rounded-2xl bg-card px-4 py-3 text-center shadow-float">
                <p className="font-mono text-micro text-muted-foreground uppercase">GPA</p>
                <p className="text-4xl leading-none font-bold tracking-tight">{item.gpa}</p>
              </div>
            </div>
          </div>
        </div>
      </GradientPanel>
    </div>
  )
}
