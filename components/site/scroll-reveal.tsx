"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/**
 * Fades `.reveal` elements in as they scroll into view, in every browser.
 * Content stays visible without JS: the hidden state only applies once this
 * sets `data-reveal` on <html>. Waits for the welcome loader, so elements
 * already on screen animate in when the page appears, not behind it.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-revealed", "")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )

    function observe() {
      document
        .querySelectorAll(".reveal:not([data-revealed])")
        .forEach((element) => observer.observe(element))
    }

    root.dataset.reveal = "on"
    let waitForLoader: MutationObserver | undefined
    if (root.dataset.loader === "open") {
      waitForLoader = new MutationObserver(() => {
        if (root.dataset.loader === "open") return
        waitForLoader?.disconnect()
        observe()
      })
      waitForLoader.observe(root, { attributes: true, attributeFilter: ["data-loader"] })
    } else {
      observe()
    }

    return () => {
      waitForLoader?.disconnect()
      observer.disconnect()
    }
  }, [pathname])

  return null
}
