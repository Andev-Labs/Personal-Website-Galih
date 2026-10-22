"use client"

import { useState, type CSSProperties, type ReactNode } from "react"

import { ExperienceCarousel, type ExperienceSlide } from "./experience-carousel"

type BackdropStyle = CSSProperties & Record<`--xp-${string}`, string>

/**
 * Owns the active slide so the whole section background follows it. Only the
 * per-role colors are set here; `.experience-backdrop` transitions them.
 */
export function ExperienceBackdrop({
  slides,
  children,
}: {
  slides: ExperienceSlide[]
  children: ReactNode
}) {
  const [active, setActive] = useState(0)
  const { light, dark } = slides[active].backdrop
  const style: BackdropStyle = {
    "--xp-top-light": light.top,
    "--xp-mid-light": light.mid,
    "--xp-mesh-light": light.mesh,
    "--xp-top-dark": dark.top,
    "--xp-mid-dark": dark.mid,
    "--xp-mesh-dark": dark.mesh,
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="experience-backdrop overflow-hidden py-16 sm:py-24"
      style={style}
    >
      {children}
      <div className="mx-auto mt-12 max-w-[96rem] px-3 sm:px-5">
        <ExperienceCarousel slides={slides} active={active} onActiveChange={setActive} />
      </div>
    </section>
  )
}
