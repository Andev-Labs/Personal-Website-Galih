import {
  Beaker,
  FlaskConical,
  GraduationCap,
  Languages,
  MonitorCog,
  ShieldCheck,
  type LucideProps,
} from "lucide-react"

import type { Profile } from "@/content"

import { AtomIcon } from "./atom-icon"

type IconName = Profile["skills"][number]["icon"]

const icons = {
  flask: FlaskConical,
  beaker: Beaker,
  shield: ShieldCheck,
  monitor: MonitorCog,
  languages: Languages,
  graduation: GraduationCap,
  atom: AtomIcon,
} satisfies Record<IconName, React.ComponentType<LucideProps>>

export function SkillIcon({ name, ...props }: LucideProps & { name: IconName }) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" {...props} />
}
