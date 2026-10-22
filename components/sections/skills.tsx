import { Container } from "@/components/site/container"
import { SectionHeader } from "@/components/site/section-header"
import { SkillIcon } from "@/components/site/skill-icon"
import { profile, type Profile } from "@/content"
import { cn } from "@/lib/utils"

type SkillGroup = Profile["skills"][number]

/**
 * Two stacks of roughly equal height on large screens, so no card has to
 * stretch to match a taller neighbour: the long Instruments list sits over
 * Quality, the three shorter groups stack beside them.
 */
const COLUMNS = [
  ["instruments", "quality"],
  ["analysis", "systems", "languages"],
]

function SkillCard({ group, fill }: { group: SkillGroup; fill: boolean }) {
  return (
    <li
      className={cn(
        "reveal flex flex-col gap-4 rounded-4xl bg-surface p-6 sm:p-7",
        // The last card of a stack absorbs the small height difference.
        fill && "lg:flex-1",
      )}
    >
      <div className="flex items-center gap-4">
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-card shadow-card">
          <SkillIcon name={group.icon} className="size-6" />
        </span>
        <h3 className="text-title font-bold">{group.title}</h3>
      </div>
      <p className="text-pretty text-muted-foreground">{group.blurb}</p>
      <ul aria-label={group.title} className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full bg-card px-3.5 py-1.5 text-sm font-medium shadow-xs"
          >
            {item}
          </li>
        ))}
      </ul>
    </li>
  )
}

export function Skills() {
  // A group missing from COLUMNS still renders, at the end of the last stack.
  const placed = new Set(COLUMNS.flat())
  const unplaced = profile.skills.filter((group) => !placed.has(group.id))
  const columns = COLUMNS.map((ids, i) => [
    ...ids.flatMap((id) => profile.skills.filter((group) => group.id === id)),
    ...(i === COLUMNS.length - 1 ? unplaced : []),
  ])

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="skills-heading"
          index="02"
          eyebrow="Skills & competencies"
          title="Easy analysis ahead."
          intro="Classical chemistry, modern instruments and the quality systems that keep both honest."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {columns.map((column, i) => (
            <ul key={i} className="reveal-stagger flex flex-col gap-4">
              {column.map((group, j) => (
                <SkillCard key={group.id} group={group} fill={j === column.length - 1} />
              ))}
            </ul>
          ))}
        </div>
      </Container>
    </section>
  )
}
