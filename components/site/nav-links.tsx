"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import type { NavItem } from "@/lib/nav"
import { cn } from "@/lib/utils"

import { MoreMenu } from "./more-menu"

/** Pill anchor links with an active-section highlight on the home page. */
export function NavLinks({ items, more }: { items: NavItem[]; more: NavItem[] }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!isHome) return
    const all = [...items, ...more]
    const sections = all
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // The first section (in page order) inside the reading band wins.
        setActive(all.find((item) => visible.has(item.id))?.id ?? null)
      },
      { rootMargin: "-35% 0px -55% 0px" },
    )
    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [isHome, items, more])

  const moreActive = isHome && more.some((item) => item.id === active)

  return (
    <ul className="flex items-center gap-0.5">
      {items.map((item) => {
        const isActive = isHome && active === item.id
        return (
          <li key={item.id}>
            <Link
              href={`/#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
      <li>
        <MoreMenu items={more} active={moreActive ? active : null} />
      </li>
    </ul>
  )
}
