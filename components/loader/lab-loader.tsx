"use client"

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"

import { LOADER_STORAGE_KEY } from "@/lib/loader"
import { cn } from "@/lib/utils"

import { createParticleField, type ParticleField } from "./particle-field"
import { variants } from "./shapes"
import { VariantThumb } from "./variant-thumb"

const HEADLINE = ["This", "lab", "is", "awake."]
const EXIT_MS = 650

/**
 * First-visit loading screen ("This lab is awake."), modelled on cloudstudio.es.
 * The markup is always server-rendered and hidden by CSS; `loaderScript` reveals
 * it before first paint, so server and client HTML always match.
 */
export function LabLoader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const enterRef = useRef<HTMLButtonElement>(null)
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([])
  const fieldRef = useRef<ParticleField | null>(null)
  const closingRef = useRef(false)
  const firstTypeRef = useRef(true)

  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState<string>(variants[0].label)
  const [leaving, setLeaving] = useState(false)

  const variant = variants[active]

  // Boot: only when the head script opened the loader for this visit.
  useEffect(() => {
    const html = document.documentElement
    if (html.dataset.loader !== "open") return
    const root = rootRef.current
    const canvas = canvasRef.current
    const anchor = anchorRef.current
    if (!root || !canvas || !anchor) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    fieldRef.current = createParticleField({
      canvas,
      anchor,
      color: "#2b211d",
      reducedMotion,
    })
    enterRef.current?.focus({ preventScroll: true })

    return () => {
      fieldRef.current?.destroy()
      fieldRef.current = null
    }
  }, [])

  // Type the variant label out, letter by letter.
  useEffect(() => {
    const label = variants[active].label
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(label)
      return
    }
    let i = 0
    setTyped("")
    // The first label waits for the entrance animation to reach it.
    const startDelay = firstTypeRef.current ? 1900 : 60
    firstTypeRef.current = false
    let timer = window.setTimeout(function tick() {
      i += 1
      setTyped(label.slice(0, i))
      if (i < label.length) timer = window.setTimeout(tick, 70)
    }, startDelay)
    return () => window.clearTimeout(timer)
  }, [active])

  function select(index: number, focus = false) {
    const next = (index + variants.length) % variants.length
    setActive(next)
    fieldRef.current?.setVariant(variants[next].id)
    if (focus) radioRefs.current[next]?.focus()
  }

  function close() {
    if (closingRef.current) return
    closingRef.current = true
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    try {
      sessionStorage.setItem(LOADER_STORAGE_KEY, "1")
    } catch {
      // Storage unavailable: the loader simply shows again next visit.
    }
    fieldRef.current?.burst()
    setLeaving(true)
    window.setTimeout(
      () => {
        fieldRef.current?.destroy()
        fieldRef.current = null
        // Releases the scroll lock and un-hides the page behind (see globals.css).
        delete document.documentElement.dataset.loader
        window.scrollTo(0, 0)
        document.getElementById("main")?.focus({ preventScroll: true })
      },
      reducedMotion ? 0 : EXIT_MS,
    )
  }

  // Global keys: Esc skips, ←/→ switch variants.
  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (document.documentElement.dataset.loader !== "open" || closingRef.current) return
      if (event.key === "Escape") {
        event.preventDefault()
        close()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        select(active + 1)
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        select(active - 1)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  })

  function onRadioKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!delta) return
    event.preventDefault()
    // Handled here so the window listener doesn't switch twice.
    event.stopPropagation()
    select(active + delta, true)
  }

  return (
    <div className="lab-loader-root">
      <div
        ref={rootRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-loader-title"
        aria-describedby="lab-loader-desc"
        className={cn(
          "lab-loader fixed inset-0 z-[60] flex-col overflow-hidden bg-loader text-espresso transition-opacity duration-500 motion-reduce:transition-none",
          leaving && "pointer-events-none opacity-0",
        )}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        />

        <div className="relative flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-8">
          <p className="text-xl font-bold tracking-tight sm:text-2xl">
            galih.qc<span className="text-cocoa">*</span>
          </p>
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
            className="mt-3 text-[clamp(2.75rem,1rem+7vw,7rem)] leading-[0.95] font-extrabold tracking-[-0.06em]"
          >
            {HEADLINE.map((word, i) => (
              <span
                key={word}
                className="lab-loader-word inline-block"
                style={{ animationDelay: `${1500 + i * 110}ms` }}
              >
                {word}
                {i < HEADLINE.length - 1 ? " " : null}
              </span>
            ))}
          </h2>

          <div ref={anchorRef} aria-hidden="true" className="min-h-0 w-full max-w-sm flex-1" />

          <p
            aria-live="polite"
            className="min-h-[1.5em] font-mono text-xl font-bold tracking-[0.4em] uppercase sm:text-2xl"
          >
            <span className="sr-only">Shape: </span>
            {typed}
          </p>
          <p id="lab-loader-desc" className="mt-2 mb-6 font-mono text-sm tracking-[0.12em]">
            {variant.caption}
          </p>
        </div>

        <div className="lab-loader-bar relative flex flex-col items-center gap-4 px-3 pb-5 sm:pb-8">
          <div className="flex items-center gap-1.5 rounded-full bg-espresso p-2 shadow-float sm:gap-2 sm:p-2.5">
            <button
              type="button"
              onClick={() => select(active - 1)}
              className="hidden size-11 items-center justify-center rounded-full bg-loader text-espresso sm:inline-flex"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
              <span className="sr-only">Previous shape</span>
            </button>
            <div
              role="radiogroup"
              aria-label="Particle shape"
              onKeyDown={onRadioKeyDown}
              className="flex items-center gap-1 sm:gap-1.5"
            >
              {variants.map((item, i) => {
                const checked = i === active
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      radioRefs.current[i] = el
                    }}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    aria-label={item.label}
                    tabIndex={checked ? 0 : -1}
                    onClick={() => select(i)}
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-full transition-all duration-300 motion-reduce:transition-none sm:size-12",
                      checked
                        ? "scale-105 bg-loader text-espresso"
                        : "bg-[#8c7a6c] text-espresso/80 hover:bg-[#a8917f]",
                    )}
                  >
                    <VariantThumb id={item.id} className="size-7" />
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={() => select(active + 1)}
              className="hidden size-11 items-center justify-center rounded-full bg-loader text-espresso sm:inline-flex"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
              <span className="sr-only">Next shape</span>
            </button>
            <span aria-hidden="true" className="mx-1 hidden h-8 w-px bg-bone/25 sm:block" />
            <button
              ref={enterRef}
              type="button"
              onClick={close}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-loader px-4 font-bold whitespace-nowrap text-espresso sm:h-12 sm:px-6 sm:text-lg"
            >
              Enter the lab
              <ArrowRight
                aria-hidden="true"
                className="size-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </button>
          </div>
          <button
            type="button"
            onClick={close}
            className="border-b border-espresso pb-0.5 font-mono text-xs tracking-[0.2em] uppercase"
          >
            Skip · explore yourself →
          </button>
        </div>

        <p
          aria-hidden="true"
          className="absolute right-10 bottom-8 hidden font-mono text-xs tracking-[0.2em] uppercase lg:block"
        >
          ← / → to switch
        </p>
      </div>
    </div>
  )
}
