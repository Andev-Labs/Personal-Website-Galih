"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export type NavItem = { id: string; label: string }

/** Anchor links with an active-section highlight on the home page. */
export function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!isHome) return
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        // The first section (in page order) inside the reading band wins.
        const current = items.find((item) => visible.has(item.id))
        setActive(current?.id ?? null)
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 1] },
    )
    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [isHome, items])

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const isActive = isHome && active === item.id
        return (
          <li key={item.id}>
            <Link
              href={`/#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative inline-flex h-9 items-center px-2.5 font-mono text-label text-muted-foreground uppercase transition-colors hover:text-foreground",
                "after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform motion-reduce:after:transition-none",
                isActive && "text-foreground after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
