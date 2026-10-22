"use client"

import { useState, type ReactNode } from "react"

import { backdropStyle } from "@/lib/backdrop"

import { ExperienceCarousel, type ExperienceSlide } from "./experience-carousel"

/** Owns the active slide so the whole section background follows it. */
export function ExperienceBackdrop({
  slides,
  children,
}: {
  slides: ExperienceSlide[]
  children: ReactNode
}) {
  const [active, setActive] = useState(0)

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="tinted-backdrop overflow-hidden py-16 sm:py-24"
      style={backdropStyle(slides[active].backdrop)}
    >
      {children}
      <div className="mx-auto mt-12 max-w-[96rem] px-3 sm:px-5">
        <ExperienceCarousel slides={slides} active={active} onActiveChange={setActive} />
      </div>
    </section>
  )
}
