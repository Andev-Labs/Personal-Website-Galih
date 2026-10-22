import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Eyebrow } from "./eyebrow"

type SectionHeaderProps = {
  id: string
  index?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: "center" | "left"
  className?: string
}

/** Eyebrow + bold, tight headline + optional intro. `id` labels the parent section. */
export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "reveal flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl",
        className,
      )}
    >
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-headline font-bold text-balance">
        {title}
      </h2>
      {intro ? (
        <p className="max-w-prose text-lg text-pretty text-muted-foreground">{intro}</p>
      ) : null}
    </header>
  )
}
