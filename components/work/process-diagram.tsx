import type { CaseStudy } from "@/content"

type Step = CaseStudy["process"][number]

type ProcessDiagramProps = {
  id: string
  title: string
  steps: Step[]
}

function describe(steps: Step[]) {
  return steps.map((step, i) => `Step ${i + 1}: ${step.title}`).join(". ")
}

const pad = (n: number) => String(n).padStart(2, "0")

/** Horizontal "lab procedure" rail for wide screens. */
function HorizontalDiagram({ id, title, steps }: ProcessDiagramProps) {
  const width = 1000
  const height = 190
  const left = 70
  const right = width - 70
  const railY = 78
  const gap = (right - left) / (steps.length - 1)
  const ticks = Array.from({ length: Math.floor((right - left) / 20) + 1 }, (_, i) => left + i * 20)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${id}-h-title ${id}-h-desc`}
      className="hidden w-full text-foreground md:block"
    >
      <title id={`${id}-h-title`}>{title}</title>
      <desc id={`${id}-h-desc`}>{describe(steps)}</desc>

      {/* Bench rail with measurement ticks */}
      <g className="text-line" stroke="currentColor">
        <line x1={left} x2={right} y1={railY} y2={railY} strokeWidth={1} />
        {ticks.map((x, i) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={railY + 30}
            y2={railY + 30 + (i % 5 === 0 ? 8 : 4)}
            strokeWidth={1}
          />
        ))}
        <line x1={left} x2={right} y1={railY + 30} y2={railY + 30} strokeWidth={0.75} />
      </g>

      {steps.map((step, i) => {
        const x = left + i * gap
        return (
          <g key={step.label}>
            <text
              x={x}
              y={28}
              textAnchor="middle"
              className="fill-muted-foreground font-mono"
              fontSize={11}
              letterSpacing="0.14em"
            >
              STEP {pad(i + 1)}
            </text>
            <line
              x1={x}
              x2={x}
              y1={38}
              y2={railY - 22}
              className="stroke-line"
              strokeDasharray="2 3"
            />
            <circle
              cx={x}
              cy={railY}
              r={22}
              className="fill-background stroke-foreground"
              strokeWidth={1.25}
            />
            <text
              x={x}
              y={railY + 4.5}
              textAnchor="middle"
              className="fill-foreground font-mono"
              fontSize={13}
            >
              {pad(i + 1)}
            </text>
            <text
              x={x}
              y={railY + 70}
              textAnchor="middle"
              className="fill-foreground font-mono uppercase"
              fontSize={12.5}
              letterSpacing="0.08em"
            >
              {step.label.toUpperCase()}
            </text>
            {i < steps.length - 1 ? (
              <path
                d={`M${x + gap / 2 - 5} ${railY - 5} l6 5 l-6 5`}
                fill="none"
                className="stroke-foreground"
                strokeWidth={1.25}
              />
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}

/** Vertical rail for narrow screens, so labels stay legible. */
function VerticalDiagram({ id, title, steps }: ProcessDiagramProps) {
  const width = 320
  const rowHeight = 72
  const top = 30
  const height = top + rowHeight * (steps.length - 1) + 40
  const cx = 30

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${id}-v-title ${id}-v-desc`}
      className="mx-auto block w-full max-w-sm text-foreground md:hidden"
    >
      <title id={`${id}-v-title`}>{title}</title>
      <desc id={`${id}-v-desc`}>{describe(steps)}</desc>
      <line
        x1={cx}
        x2={cx}
        y1={top}
        y2={top + rowHeight * (steps.length - 1)}
        className="stroke-line"
        strokeWidth={1}
      />
      {steps.map((step, i) => {
        const y = top + i * rowHeight
        return (
          <g key={step.label}>
            <circle
              cx={cx}
              cy={y}
              r={18}
              className="fill-background stroke-foreground"
              strokeWidth={1.25}
            />
            <text
              x={cx}
              y={y + 4.5}
              textAnchor="middle"
              className="fill-foreground font-mono"
              fontSize={12}
            >
              {pad(i + 1)}
            </text>
            <line
              x1={cx + 24}
              x2={cx + 44}
              y1={y}
              y2={y}
              className="stroke-line"
              strokeDasharray="2 3"
            />
            <text
              x={cx + 54}
              y={y - 3}
              className="fill-muted-foreground font-mono"
              fontSize={10}
              letterSpacing="0.14em"
            >
              STEP {pad(i + 1)}
            </text>
            <text
              x={cx + 54}
              y={y + 15}
              className="fill-foreground font-mono"
              fontSize={14}
              letterSpacing="0.06em"
            >
              {step.label.toUpperCase()}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/**
 * Process diagram generated from the case study steps. Each SVG carries its own
 * title/description; the detailed steps follow as an ordered list in the page.
 */
export function ProcessDiagram(props: ProcessDiagramProps) {
  return (
    <figure className="rounded-3xl bg-card px-4 py-6 shadow-card sm:px-8 sm:py-8">
      <HorizontalDiagram {...props} />
      <VerticalDiagram {...props} />
      <figcaption className="mt-4 font-mono text-micro text-muted-foreground uppercase">
        Fig. — {props.title}
      </figcaption>
    </figure>
  )
}
