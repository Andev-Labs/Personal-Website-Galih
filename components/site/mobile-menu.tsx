"use client"

import { Download, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

import type { NavItem } from "@/lib/nav"

type MobileMenuProps = {
  items: NavItem[]
  cvPath: string
}

/**
 * Full-screen menu overlay built on the native modal <dialog>: focus is trapped,
 * Esc closes it, and focus returns to the trigger.
 */
export function MobileMenu({ items, cvPath }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const close = () => dialogRef.current?.close()

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClick={(event) => {
          // Clicking the backdrop (the dialog itself, not its content) closes it.
          if (event.target === event.currentTarget) close()
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-3 backdrop:bg-espresso/40 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0 motion-reduce:open:animate-none"
      >
        <div className="mesh flex h-full flex-col rounded-4xl p-6 text-espresso dark:text-bone">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              className="inline-flex size-10 items-center justify-center rounded-full bg-paper text-espresso shadow-card"
            >
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 flex-1">
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={close}
                    className="block rounded-2xl px-3 py-2.5 text-3xl font-bold tracking-tight transition-colors hover:bg-paper/40"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href={cvPath}
              download
              onClick={close}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-paper font-medium text-espresso"
            >
              <Download aria-hidden="true" className="size-4" />
              Download CV
            </a>
            <Link
              href="/#contact"
              onClick={close}
              className="inline-flex h-12 items-center justify-center rounded-full bg-espresso font-medium text-bone"
            >
              Contact me
            </Link>
          </div>
        </div>
      </dialog>
    </>
  )
}
