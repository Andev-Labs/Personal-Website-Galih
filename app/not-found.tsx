import Link from "next/link"

import { ChromatogramLine } from "@/components/site/chromatogram-line"
import { Container } from "@/components/site/container"
import { Eyebrow } from "@/components/site/eyebrow"

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center sm:py-32">
      <Eyebrow index="404">Sample not found</Eyebrow>
      <h1 className="mt-4 text-headline font-bold text-balance">No peak at this retention time.</h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <ChromatogramLine className="my-12" height={40} />
      <Link
        href="/"
        className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground"
      >
        Back to home
      </Link>
    </Container>
  )
}
