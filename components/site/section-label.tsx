import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type SectionLabelProps = ComponentProps<"p"> & {
  index?: string
}

/** Mono "specimen label", e.g. `01 — EXPERIENCE`. */
export function SectionLabel({ index, className, children, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-label text-muted-foreground uppercase",
        className,
      )}
      {...props}
    >
      {index ? (
        <>
          <span className="text-foreground tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line" />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  )
}
