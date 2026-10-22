import type { CSSProperties } from "react"

import type { Backdrop } from "@/content"

type BackdropStyle = CSSProperties & Record<`--backdrop-${string}`, string>

/**
 * Inline variables for a `.tinted-backdrop` section or a `.tinted-mesh` panel.
 * Its registered colors transition whenever these change, so swapping the
 * active item fades the background.
 */
export function backdropStyle({ light, dark }: Backdrop): BackdropStyle {
  return {
    "--backdrop-top-light": light.top,
    "--backdrop-mid-light": light.mid,
    "--backdrop-mesh-light": light.mesh,
    "--backdrop-top-dark": dark.top,
    "--backdrop-mid-dark": dark.mid,
    "--backdrop-mesh-dark": dark.mesh,
  }
}
