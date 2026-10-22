"use client"

import { useEffect, useRef } from "react"

type CountUpProps = {
  to: number
  suffix?: string
  /** ms */
  duration?: number
}

/**
 * Renders the final value on the server (so it's correct without JS and for
 * crawlers), then counts up from 0 the first time it scrolls into view. The
 * animated text is hidden from screen readers, which get the static value.
 */
export function CountUp({ to, suffix = "", duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          el.textContent = `${Math.round(eased * to)}${suffix}`
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        el.textContent = `0${suffix}`
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to, suffix, duration])

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {to}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </>
  )
}
