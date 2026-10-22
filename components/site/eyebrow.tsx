import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type EyebrowProps = ComponentProps<"p"> & {
  index?: string
}

/** Small mono eyebrow, e.g. `01 · PROFESSIONAL SUMMARY`. */
export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-label font-medium text-muted-foreground uppercase",
        className,
      )}
      {...props}
    >
      {index ? (
        <>
          <span className="text-foreground tabular-nums">{index}</span>
          <span aria-hidden="true">·</span>
        </>
      ) : null}
      <span>{children}</span>
    </p>
  )
}
