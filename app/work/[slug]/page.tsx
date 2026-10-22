import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import { Container } from "@/components/site/container"
import { DuotoneImage } from "@/components/site/duotone-image"
import { SectionLabel } from "@/components/site/section-label"
import { ProcessDiagram } from "@/components/work/process-diagram"
import { caseStudies, getAdjacentCaseStudies, getCaseStudy, profile } from "@/content"

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const item = getCaseStudy(slug)
  if (!item) return {}
  return {
    title: item.seo.title,
    description: item.seo.description,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      type: "article",
      title: item.seo.title,
      description: item.seo.description,
      url: `/work/${item.slug}`,
    },
  }
}

function Block({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  const id = label.toLowerCase().replace(/\s+/g, "-")
  return (
    <section
      aria-labelledby={id}
      className="reveal grid gap-6 border-t border-line-soft py-12 md:grid-cols-12 md:gap-8"
    >
      <SectionLabel as="h2" id={id} index={index} className="self-start md:col-span-3 md:pt-1">
        {label}
      </SectionLabel>
      <div className="md:col-span-9">{children}</div>
    </section>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-2xl space-y-5 text-lg text-pretty">
      {items.map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}
    </div>
  )
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params
  const item = getCaseStudy(slug)
  if (!item) notFound()

  const { previous, next } = getAdjacentCaseStudies(item.slug)
  const confirmedMetrics = item.metrics.filter(
    (metric): metric is { label: string; value: string } => metric.value !== null,
  )

  const meta = [
    { label: "Role", value: item.meta.role },
    { label: "Company", value: item.meta.company },
    { label: "Period", value: item.meta.period },
    { label: "Instruments & tools", value: item.meta.instruments.join(" · ") },
    { label: "Standards", value: item.meta.standards.join(" · ") },
  ]

  return (
    <article className="pt-8 pb-16 sm:pt-12">
      <Container>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-label text-muted-foreground uppercase hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All work
        </Link>

        <header className="mt-10 grid gap-8 md:grid-cols-12">
          <SectionLabel index={item.number} className="self-start md:col-span-3 md:pt-4">
            {item.kicker}
          </SectionLabel>
          <div className="md:col-span-9">
            <h1 className="font-serif text-headline text-balance">{item.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
              {item.summary}
            </p>
          </div>
        </header>

        <dl className="mt-12 grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-5">
          {meta.map((entry) => (
            <div
              key={entry.label}
              className="border-line-soft py-4 pr-4 not-last:border-b sm:even:pl-4 lg:border-b-0 lg:pl-4 lg:not-first:border-l lg:first:pl-0"
            >
              <dt className="font-mono text-micro text-muted-foreground uppercase">
                {entry.label}
              </dt>
              <dd className="mt-2 text-sm text-pretty">{entry.value}</dd>
            </div>
          ))}
        </dl>

        <DuotoneImage
          src={item.cover.src}
          alt={item.cover.alt}
          priority
          sizes="(min-width: 1216px) 1120px, 100vw"
          className="mt-12 aspect-[16/9] rounded-sm sm:aspect-[21/9]"
        />

        <div className="mt-8">
          <Block index="A" label="Context">
            <Paragraphs items={item.context} />
          </Block>

          <Block index="B" label="My role">
            <Paragraphs items={item.myRole} />
          </Block>

          <Block index="C" label="Process">
            <ProcessDiagram
              id={`process-${item.slug}`}
              title={`Process: ${item.title}`}
              steps={item.process}
            />
            <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {item.process.map((step, i) => (
                <li key={step.label} className="border-t border-line-soft pt-4">
                  <p className="font-mono text-micro text-muted-foreground uppercase">
                    Step {String(i + 1).padStart(2, "0")} · {step.label}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">{step.title}</h3>
                  <p className="mt-2 text-pretty text-muted-foreground">{step.detail}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block index="D" label="Outcome">
            {confirmedMetrics.length > 0 ? (
              <dl className="mb-8 grid gap-6 sm:grid-cols-2">
                {confirmedMetrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col-reverse gap-1">
                    <dt className="font-mono text-micro text-muted-foreground uppercase">
                      {metric.label}
                    </dt>
                    <dd className="font-serif text-5xl">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <ul className="max-w-2xl space-y-4 text-lg">
              {item.outcome.map((outcome) => (
                <li key={outcome} className="relative pl-7 text-pretty">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.75em] left-0 h-px w-4 bg-line"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </Block>

          <Block index="E" label="Skills demonstrated">
            <ul className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-sm border border-line-soft bg-surface px-3 py-1.5 font-mono text-xs"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <p className="mt-4 border-t border-line-soft pt-6 font-mono text-micro text-muted-foreground uppercase">
          {profile.confidentiality}
        </p>

        <nav
          aria-label="More case studies"
          className="mt-16 grid gap-px border-y border-line sm:grid-cols-2"
        >
          <Link
            href={`/work/${previous.slug}`}
            rel="prev"
            className="group flex flex-col gap-3 py-8 transition-colors hover:bg-surface sm:pr-8"
          >
            <span className="inline-flex items-center gap-2 font-mono text-micro text-muted-foreground uppercase">
              <ArrowLeft aria-hidden="true" className="size-4" /> Previous · {previous.number}
            </span>
            <span className="font-serif text-2xl leading-tight text-balance">{previous.title}</span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            rel="next"
            className="group flex flex-col gap-3 border-line-soft py-8 text-right transition-colors hover:bg-surface max-sm:border-t sm:border-l sm:pl-8"
          >
            <span className="inline-flex items-center justify-end gap-2 font-mono text-micro text-muted-foreground uppercase">
              Next · {next.number} <ArrowRight aria-hidden="true" className="size-4" />
            </span>
            <span className="font-serif text-2xl leading-tight text-balance">{next.title}</span>
          </Link>
        </nav>
      </Container>
    </article>
  )
}
