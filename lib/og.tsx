import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }

const colors = {
  bone: "#F6F1EB",
  sand: "#EADFD3",
  clay: "#B08D7A",
  cocoa: "#6B4F43",
  espresso: "#2B211D",
}

// Read once at module load so image routes stay statically prerendered.
const serif = await readFile(join(process.cwd(), "assets/InstrumentSerif-Regular.ttf"))

/** A small chromatogram trace as an SVG path, matching the site motif. */
function trace(width: number, height: number) {
  const peaks = [
    { at: 0.19, h: 0.55, w: 0.006 },
    { at: 0.41, h: 0.92, w: 0.007 },
    { at: 0.47, h: 0.26, w: 0.004 },
    { at: 0.63, h: 0.68, w: 0.006 },
    { at: 0.84, h: 0.4, w: 0.008 },
  ]
  const points: string[] = []
  for (let x = 0; x <= width; x += 4) {
    const t = x / width
    const signal = peaks.reduce((sum, p) => {
      const d = (t - p.at) / p.w
      return sum + p.h * Math.exp(-0.5 * d * d)
    }, 0)
    points.push(`${x === 0 ? "M" : "L"}${x} ${(height - 2 - signal * (height - 6)).toFixed(1)}`)
  }
  return points.join("")
}

type OgCardProps = {
  label: string
  title: string
  footer: string
}

export async function renderOgCard({ label, title, footer }: OgCardProps) {
  const traceWidth = 1040
  const traceHeight = 90

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        background: colors.bone,
        color: colors.espresso,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: colors.cocoa,
        }}
      >
        <span>{label}</span>
        <span style={{ fontFamily: "Instrument Serif", fontSize: 40, letterSpacing: 0 }}>KGM</span>
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "Instrument Serif",
          fontSize: title.length > 48 ? 76 : 96,
          lineHeight: 1,
          letterSpacing: -1,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <svg width={traceWidth} height={traceHeight} viewBox={`0 0 ${traceWidth} ${traceHeight}`}>
          <path
            d={trace(traceWidth, traceHeight)}
            fill="none"
            stroke={colors.clay}
            strokeWidth={2}
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: colors.cocoa,
          }}
        >
          {footer}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }],
    },
  )
}

export async function renderMonogram(size: number) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.espresso,
        color: colors.bone,
        fontFamily: "Instrument Serif",
        fontSize: size * 0.42,
        letterSpacing: -size * 0.01,
        borderRadius: size * 0.2,
      }}
    >
      KGM
    </div>,
    {
      width: size,
      height: size,
      fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }],
    },
  )
}
