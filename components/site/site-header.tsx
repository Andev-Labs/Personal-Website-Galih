import { Download } from "lucide-react"
import Link from "next/link"

import { profile } from "@/content"
import { moreNav, primaryNav } from "@/lib/nav"

import { MobileMenu } from "./mobile-menu"
import { NavLinks } from "./nav-links"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-3 rounded-full border border-line-soft bg-card/85 pr-3 pl-5 shadow-card backdrop-blur-md">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          aria-label={`${profile.name}, home`}
        >
          Galih
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks items={primaryNav} more={moreNav} />
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={profile.cvPath}
            download
            className="hidden h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:bg-muted sm:inline-flex"
          >
            <Download aria-hidden="true" className="size-4" />
            Download CV
          </a>
          <Link
            href="/#contact"
            className="hidden h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 lg:inline-flex"
          >
            Contact
          </Link>
          <MobileMenu
            items={[...primaryNav, ...moreNav, { id: "contact", label: "Contact" }]}
            cvPath={profile.cvPath}
          />
        </div>
      </div>
    </header>
  )
}
