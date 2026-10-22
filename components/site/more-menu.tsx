"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useId, useRef, useState } from "react"

import type { NavItem } from "@/lib/nav"
import { cn } from "@/lib/utils"

/** "More" disclosure: a button that reveals a short list of section links. */
export function MoreMenu({ items, active }: { items: NavItem[]; active: string | null }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          (open || active) && "bg-muted text-foreground",
        )}
      >
        More
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-4 transition-transform motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      <ul
        id={listId}
        hidden={!open}
        className="absolute top-full right-0 mt-3 w-56 rounded-2xl border border-line-soft bg-popover p-2 text-popover-foreground shadow-float"
      >
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setOpen(false)}
              className="flex h-10 items-center rounded-xl px-3 text-sm font-medium transition-colors hover:bg-muted aria-[current]:bg-muted"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
