import { cn } from "@/lib/utils"

type Peak = {
  /** Retention position, 0–1 across the width. */
  at: number
  /** Peak height, 0–1 of the available height. */
  height: number
  /** Peak width (standard deviation), 0–1 of the width. */
  width: number
  label?: string
}

const WIDTH = 1200
const STEP = 4

const presets = {
  hero: [
    { at: 0.08, height: 0.12, width: 0.004 },
    { at: 0.19, height: 0.55, width: 0.006, label: "HPLC" },
    { at: 0.24, height: 0.18, width: 0.005 },
    { at: 0.41, height: 0.92, width: 0.007, label: "GC" },
    { at: 0.47, height: 0.26, width: 0.004 },
    { at: 0.63, height: 0.68, width: 0.006, label: "ICP-OES" },
    { at: 0.71, height: 0.1, width: 0.004 },
    { at: 0.84, height: 0.4, width: 0.008, label: "UV-Vis" },
  ],
  divider: [
    { at: 0.32, height: 0.35, width: 0.005 },
    { at: 0.36, height: 0.85, width: 0.004 },
    { at: 0.6, height: 0.2, width: 0.006 },
  ],
} satisfies Record<string, Peak[]>

function buildPath(peaks: Peak[], height: number) {
  const baseline = height - 1.5
  const amplitude = height - 4
  const points: string[] = []
  for (let x = 0; x <= WIDTH; x += STEP) {
    const t = x / WIDTH
    let signal = 0
    for (const peak of peaks) {
      const d = (t - peak.at) / peak.width
      signal += peak.height * Math.exp(-0.5 * d * d)
    }
    // Deterministic detector noise, so server and client render the same path.
    const noise = Math.sin(x * 0.9) * 0.25 + Math.sin(x * 0.37) * 0.2
    const y = baseline - signal * amplitude + noise
    points.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(2)}`)
  }
  return points.join("")
}

type ChromatogramLineProps = {
  variant?: keyof typeof presets
  height?: number
  /** Animate the stroke drawing in (disabled for reduced motion via CSS). */
  draw?: boolean
  showLabels?: boolean
  className?: string
}

/**
 * Thin HPLC-style trace, used as the hero signature and as a section divider.
 * Decorative: hidden from assistive technology.
 */
export function ChromatogramLine({
  variant = "divider",
  height = 48,
  draw = false,
  showLabels = false,
  className,
}: ChromatogramLineProps) {
  const peaks: Peak[] = presets[variant]
  const d = buildPath(peaks, height)

  return (
    <div aria-hidden="true" className={cn("relative w-full text-line", className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        preserveAspectRatio="none"
        className="block w-full overflow-visible"
        style={{ height }}
        focusable="false"
      >
        <path
          d={d}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={cn(draw && "draw-line")}
        />
      </svg>
      {showLabels
        ? peaks
            .filter((peak) => peak.label)
            .map((peak) => (
              <span
                key={peak.label}
                className="absolute -translate-x-1/2 font-mono text-micro text-muted-foreground uppercase"
                style={{
                  left: `${peak.at * 100}%`,
                  bottom: `${peak.height * (height - 4) + 10}px`,
                }}
              >
                {peak.label}
              </span>
            ))
        : null}
    </div>
  )
}
