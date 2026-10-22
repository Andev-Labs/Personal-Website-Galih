import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { DuotoneImage } from "./duotone-image"

/** Arch-framed portrait with a hairline offset frame. */
export function ArchImage({ className, ...props }: ComponentProps<typeof DuotoneImage>) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 -translate-y-3 rounded-t-full border border-line"
      />
      <DuotoneImage className="aspect-[3/4] rounded-t-full" {...props} />
    </div>
  )
}
