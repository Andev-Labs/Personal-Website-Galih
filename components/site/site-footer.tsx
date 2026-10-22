import { profile } from "@/content"

import { ChromatogramLine } from "./chromatogram-line"
import { Container } from "./container"

export function SiteFooter() {
  return (
    <footer className="mt-auto pb-10">
      <Container>
        <ChromatogramLine className="mb-8" height={36} />
        <div className="flex flex-col gap-4 font-mono text-label text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {profile.name}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
