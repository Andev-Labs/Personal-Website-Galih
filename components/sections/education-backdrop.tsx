"use client"

import { useState, type ReactNode } from "react"

import { Container } from "@/components/site/container"
import type { Profile } from "@/content"
import { backdropStyle } from "@/lib/backdrop"

import { EducationTabs } from "./education-tabs"

/** Owns the active tab so the whole section background follows it. */
export function EducationBackdrop({
  items,
  children,
}: {
  items: Profile["education"]
  children: ReactNode
}) {
  const [active, setActive] = useState(0)

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="tinted-backdrop py-16 sm:py-24"
      style={backdropStyle(items[active].backdrop)}
    >
      <Container>
        {children}
        <EducationTabs items={items} active={active} onActiveChange={setActive} />
      </Container>
    </section>
  )
}
