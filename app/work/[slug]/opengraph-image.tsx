import { caseStudies, getCaseStudy, profile } from "@/content"
import { ogSize, renderOgCard } from "@/lib/og"

export const alt = "Case study by Khrisanty Galih Mestikasari"
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getCaseStudy(slug)
  return renderOgCard({
    label: item ? `Case ${item.number} — ${item.kicker}` : "Case study",
    title: item?.title ?? profile.name,
    footer: `${profile.name} · ${profile.role}`,
  })
}
