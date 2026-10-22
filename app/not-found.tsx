import Link from "next/link"

import { ChromatogramLine } from "@/components/site/chromatogram-line"
import { Container } from "@/components/site/container"
import { SectionLabel } from "@/components/site/section-label"

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <SectionLabel index="404">Sample not found</SectionLabel>
      <h1 className="mt-6 font-serif text-headline text-balance">
        No peak at this retention time.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <ChromatogramLine className="my-12" height={40} />
      <Link href="/" className="link font-mono text-label uppercase">
        Back to home
      </Link>
    </Container>
  )
}
