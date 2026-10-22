import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { DuotoneImage } from "@/components/site/duotone-image"
import { Section } from "@/components/site/section"
import { caseStudies, profile } from "@/content"

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Topics">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line px-3 py-1 font-mono text-micro text-muted-foreground uppercase"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

export function SelectedWork() {
  const [featured, ...others] = caseStudies

  return (
    <Section
      id="work"
      index="02"
      label="Selected Work"
      title="Five cases, from the dock to the data."
      intro="Each case is drawn from real responsibilities and generalized to protect employer confidentiality."
    >
      <ol className="border-b border-line">
        <li className="reveal border-t border-line">
          <article className="grid gap-8 py-8 md:grid-cols-12 md:gap-8 md:py-10">
            <div className="md:col-span-5 lg:col-span-6">
              <DuotoneImage
                src={featured.cover.src}
                alt={featured.cover.alt}
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 40vw, 100vw"
                className="aspect-[4/3] rounded-sm"
              />
            </div>
            <div className="flex flex-col md:col-span-7 lg:col-span-6">
              <p className="font-mono text-label text-muted-foreground uppercase">
                <span className="text-foreground">{featured.number}</span> — {featured.kicker} ·{" "}
                {featured.meta.period}
              </p>
              <h3 className="mt-4 font-serif text-title text-balance">
                <Link
                  href={`/work/${featured.slug}`}
                  className="decoration-line decoration-1 underline-offset-[0.18em] hover:underline"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-5 text-pretty text-muted-foreground">{featured.summary}</p>
              <div className="mt-6">
                <Tags tags={featured.tags} />
              </div>
              <Link
                href={`/work/${featured.slug}`}
                className="link mt-auto inline-flex items-center gap-1.5 pt-8 font-mono text-label uppercase"
                aria-label={`Read case: ${featured.title}`}
              >
                Read case
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </article>
        </li>
        {others.map((item) => (
          <li key={item.slug} className="reveal border-t border-line">
            <Link
              href={`/work/${item.slug}`}
              className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-6 transition-colors hover:bg-surface sm:grid-cols-[4rem_1fr_14rem_auto] sm:px-3"
            >
              <span className="font-mono text-label text-muted-foreground tabular-nums">
                {item.number}
              </span>
              <span className="font-serif text-2xl leading-tight text-balance sm:text-3xl">
                {item.title}
              </span>
              <span className="col-start-2 font-mono text-micro text-muted-foreground uppercase sm:col-start-3 sm:row-start-1">
                {item.kicker} · {item.meta.period}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="col-start-3 row-start-1 size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground motion-reduce:transition-none sm:col-start-4"
              />
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-prose font-mono text-micro text-muted-foreground uppercase">
        {profile.confidentiality}
      </p>
    </Section>
  )
}
