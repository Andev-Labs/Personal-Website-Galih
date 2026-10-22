export type NavItem = { id: string; label: string }

export const primaryNav: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
]

/** Grouped under "More" in the header. */
export const moreNav: NavItem[] = [
  { id: "certifications", label: "Certifications" },
  { id: "activities", label: "Activities" },
]
