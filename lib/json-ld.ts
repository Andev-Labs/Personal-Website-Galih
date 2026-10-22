import { profile } from "@/content"

import { siteUrl } from "./site"

/** schema.org Person for the home page, serialized safely for an inline script. */
export function personJsonLd() {
  const knowsAbout = Array.from(
    new Set(profile.skills.filter((group) => group.id !== "languages").flatMap((g) => g.items)),
  )

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: "Chemical Analyst & Quality Control Specialist",
    url: siteUrl,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cikarang, Bekasi",
      addressCountry: "ID",
    },
    worksFor: {
      "@type": "Organization",
      name: profile.experience[0].company,
    },
    alumniOf: profile.education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.school,
    })),
    knowsAbout,
    knowsLanguage: ["en", "id"],
    sameAs: [profile.linkedin],
  }

  return JSON.stringify(data).replace(/</g, "\\u003c")
}
