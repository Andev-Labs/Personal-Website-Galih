import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { Summary } from "@/components/sections/summary"
import { personJsonLd } from "@/lib/json-ld"

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      <Hero />
      <Summary />
      <Skills />
    </>
  )
}
