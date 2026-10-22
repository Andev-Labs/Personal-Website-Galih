import { Download } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content"
import { cn } from "@/lib/utils"

import { Container } from "./container"
import { NavLinks, type NavItem } from "./nav-links"
import { ThemeToggle } from "./theme-toggle"

const navItems: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-2xl leading-none tracking-tight"
          aria-label={`${profile.name}, home`}
        >
          {profile.monogram}
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks items={navItems} />
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={profile.cvPath}
            download
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-4")}
          >
            <Download aria-hidden="true" />
            <span>
              <span className="sr-only sm:not-sr-only">Download </span>CV
            </span>
          </a>
        </div>
      </Container>
      <nav aria-label="Primary" className="border-t border-line-soft md:hidden">
        <Container className="overflow-x-auto">
          <NavLinks items={navItems} className="-mx-2.5 justify-between" />
        </Container>
      </nav>
    </header>
  )
}
