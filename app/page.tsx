import { personJsonLd } from "@/lib/json-ld"

export default function HomePage() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
}
