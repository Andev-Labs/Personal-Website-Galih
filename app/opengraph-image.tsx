import { profile } from "@/content"
import { ogSize, renderOgCard } from "@/lib/og"

export const alt = `${profile.name} — ${profile.role}`
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOgCard({
    label: profile.role,
    title: profile.name,
    footer: "6+ years · Pharma & Manufacturing · GMP · ISO 17025",
  })
}
