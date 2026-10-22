import { profile } from "@/content"

import { AtomIcon } from "./atom-icon"
import { Container } from "./container"

export function SiteFooter() {
  return (
    <footer className="mt-auto pt-6 pb-10">
      <Container>
        <div className="flex flex-col gap-4 border-t border-line-soft pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2">
            <AtomIcon className="size-4" />© {profile.name} · {profile.location}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-medium">
            <li>
              <a className="hover:text-foreground" href={`mailto:${profile.email}`}>
                Email
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground"
                href={profile.linkedin}
                rel="me noreferrer"
                target="_blank"
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a className="hover:text-foreground" href={profile.cvPath} download>
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
