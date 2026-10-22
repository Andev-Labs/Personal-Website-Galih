"use client"

import { useEffect, useRef, useState } from "react"

import { closeLoader, isLoaderOpen } from "@/lib/loader"
import { cn } from "@/lib/utils"

import { createParticleField, type ParticleField } from "./particle-field"

const HEADLINE = ["Welcome", "to", "Galih's", "Portfolio."]
/** Time on screen before entering the site: the atom entrance runs ~2.4s. */
const AUTO_ENTER_MS = 3200
const AUTO_ENTER_REDUCED_MS = 1200
const EXIT_MS = 650

/**
 * Loading screen shown on every full page load: a short welcome, the particle
 * atom assembling itself, then it bursts and the portfolio appears on its own.
 * The markup is always server-rendered and hidden by CSS; `loaderScript` reveals
 * it before first paint, so server and client HTML always match.
 */
export function LabLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<ParticleField | null>(null)
  const closingRef = useRef(false)
  const [leaving, setLeaving] = useState(false)

  function enter() {
    if (closingRef.current) return
    closingRef.current = true
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    fieldRef.current?.burst()
    setLeaving(true)
    window.setTimeout(
      () => {
        fieldRef.current?.destroy()
        fieldRef.current = null
        const hadFocus = dialogRef.current?.contains(document.activeElement) ?? false
        closeLoader()
        if (hadFocus) document.getElementById("main")?.focus({ preventScroll: true })
      },
      reducedMotion ? 0 : EXIT_MS,
    )
  }

  useEffect(() => {
    if (!isLoaderOpen()) return
    const canvas = canvasRef.current
    const anchor = anchorRef.current
    if (!canvas || !anchor) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    fieldRef.current = createParticleField({ canvas, anchor, color: "#2b211d", reducedMotion })
    // Focus the dialog itself (no ring); Tab reaches "Skip intro".
    dialogRef.current?.focus({ preventScroll: true })

    const timer = window.setTimeout(enter, reducedMotion ? AUTO_ENTER_REDUCED_MS : AUTO_ENTER_MS)
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") enter()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("keydown", onKeyDown)
      fieldRef.current?.destroy()
      fieldRef.current = null
    }
  }, [])

  return (
    <div className="lab-loader-root">
      <div
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby="lab-loader-title"
        className={cn(
          "lab-loader fixed inset-0 z-[60] flex-col overflow-hidden bg-loader text-espresso transition-opacity duration-500 outline-none motion-reduce:transition-none",
          leaving && "pointer-events-none opacity-0",
        )}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        />

        <div className="relative flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-8">
          <p className="text-xl font-bold tracking-tight sm:text-2xl">Galih</p>
          <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase">
            <span aria-hidden="true" className="size-2 rounded-full bg-espresso" />
            Open to opportunities
          </p>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col items-center px-5 pt-[6vh] text-center sm:pt-[7vh]">
          <p className="font-mono text-xs tracking-[0.22em] uppercase">
            ( Chemical analyst · Quality control )
          </p>
          <h2
            id="lab-loader-title"
            className="mt-3 max-w-5xl text-[clamp(2.5rem,1rem+6vw,6.25rem)] leading-[0.95] font-extrabold tracking-[-0.06em] text-balance"
          >
            {HEADLINE.map((word, i) => (
              <span
                key={word}
                className="lab-loader-word inline-block"
                style={{ animationDelay: `${300 + i * 110}ms` }}
              >
                {word}
                {i < HEADLINE.length - 1 ? " " : null}
              </span>
            ))}
          </h2>

          <div ref={anchorRef} aria-hidden="true" className="min-h-0 w-full max-w-sm flex-1" />

          <p role="status" className="font-mono text-sm tracking-[0.3em] uppercase">
            Loading the lab
          </p>
          <div
            aria-hidden="true"
            className="mt-4 mb-6 h-1 w-40 overflow-hidden rounded-full bg-espresso/15"
          >
            <div
              className="lab-loader-progress h-full origin-left rounded-full bg-espresso"
              style={{ animationDuration: `${AUTO_ENTER_MS}ms` }}
            />
          </div>
        </div>

        <div className="relative flex justify-center px-3 pb-6 sm:pb-8">
          <button
            type="button"
            onClick={enter}
            className="border-b border-espresso pb-0.5 font-mono text-xs tracking-[0.2em] uppercase"
          >
            Skip intro →
          </button>
        </div>
      </div>
    </div>
  )
}
