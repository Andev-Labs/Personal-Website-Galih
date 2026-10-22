import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import { Container } from "@/components/site/container"
import { Eyebrow } from "@/components/site/eyebrow"
import { GradientPanel } from "@/components/site/gradient-panel"
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
      <h2
        id={id}
        className="flex items-center gap-2 self-start font-mono text-label font-medium text-muted-foreground uppercase md:col-span-3 md:pt-1"
      >
        <span className="text-foreground">{index}</span>
        <span aria-hidden="true">·</span>
        {label}
      </h2>
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
          href="/#experience"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to experience
        </Link>

        <header className="mx-auto mt-12 flex max-w-4xl flex-col items-center text-center">
          <Eyebrow index={item.number}>{item.kicker}</Eyebrow>
          <h1 className="mt-4 text-headline font-bold text-balance">{item.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
            {item.summary}
          </p>
        </header>

        <dl className="mt-12 grid grid-cols-1 rounded-3xl border border-line-soft bg-card px-6 shadow-card sm:grid-cols-2 lg:grid-cols-5">
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

        <GradientPanel
          aria-hidden="true"
          className="mt-8 flex aspect-[16/9] flex-col justify-between p-6 text-espresso sm:aspect-[21/9] sm:p-10 dark:text-bone"
        >
          <span className="self-start rounded-full bg-paper/70 px-3 py-1 font-mono text-micro uppercase dark:bg-espresso/50">
            {item.coverLabel}
          </span>
          <span className="max-w-3xl text-[clamp(1.75rem,1rem+3vw,3.5rem)] leading-none font-bold tracking-[-0.04em] text-balance">
            {item.meta.company}
          </span>
        </GradientPanel>

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
                  <h3 className="mt-2 text-xl font-bold tracking-tight">{step.title}</h3>
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
                  className="rounded-full border border-line-soft bg-card px-3.5 py-1.5 text-sm"
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

        <nav aria-label="More case studies" className="mt-16 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/work/${previous.slug}`}
            rel="prev"
            className="group flex flex-col gap-3 rounded-3xl bg-card p-6 shadow-card transition-transform hover:-translate-y-0.5 motion-reduce:transition-none sm:p-8"
          >
            <span className="inline-flex items-center gap-2 font-mono text-micro text-muted-foreground uppercase">
              <ArrowLeft aria-hidden="true" className="size-4" /> Previous · {previous.number}
            </span>
            <span className="text-xl font-bold tracking-tight text-balance">{previous.title}</span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            rel="next"
            className="group flex flex-col gap-3 rounded-3xl bg-card p-6 text-right shadow-card transition-transform hover:-translate-y-0.5 motion-reduce:transition-none sm:p-8"
          >
            <span className="inline-flex items-center justify-end gap-2 font-mono text-micro text-muted-foreground uppercase">
              Next · {next.number} <ArrowRight aria-hidden="true" className="size-4" />
            </span>
            <span className="text-xl font-bold tracking-tight text-balance">{next.title}</span>
          </Link>
        </nav>
      </Container>
    </article>
  )
}
