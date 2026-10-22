import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type GradientPanelProps = ComponentProps<"div"> & {
  /** Slow "breathing" drift of the mesh. Off automatically for reduced motion. */
  breathe?: boolean
}

/** Calendly-style rounded panel: nude mesh gradient with cream vertical stripes. */
export function GradientPanel({ breathe = true, className, ...props }: GradientPanelProps) {
  return <div className={cn("mesh rounded-4xl", breathe && "mesh-breathe", className)} {...props} />
}
