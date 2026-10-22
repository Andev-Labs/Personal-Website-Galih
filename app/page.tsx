import { BeyondTheLab } from "@/components/sections/beyond-the-lab"
import { Contact } from "@/components/sections/contact"
import { Education } from "@/components/sections/education"
import { Experience } from "@/components/sections/experience"
import { Expertise } from "@/components/sections/expertise"
import { Hero } from "@/components/sections/hero"
import { SelectedWork } from "@/components/sections/selected-work"
import { Snapshot } from "@/components/sections/snapshot"
import { personJsonLd } from "@/lib/json-ld"

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      <Hero />
      <Snapshot />
      <SelectedWork />
      <Experience />
      <Expertise />
      <Education />
      <BeyondTheLab />
      <Contact />
    </>
  )
}
