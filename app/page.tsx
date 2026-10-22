import { Activities } from "@/components/sections/activities"
import { Certifications } from "@/components/sections/certifications"
import { Contact } from "@/components/sections/contact"
import { Education } from "@/components/sections/education"
import { Experience } from "@/components/sections/experience"
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
      <Experience />
      <Education />
      <Certifications />
      <Activities />
      <Contact />
    </>
  )
}
