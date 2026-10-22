"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { AtomIcon } from "./atom-icon"

/** Floating button that appears after the first screen and scrolls back to the top. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
    document.getElementById("main")?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "group fixed right-4 bottom-4 z-30 inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-float transition-all duration-300 motion-reduce:transition-none sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <AtomIcon className="size-6 transition-transform duration-700 group-hover:rotate-180 motion-reduce:transition-none" />
      <span className="sr-only">Back to top</span>
    </button>
  )
}
