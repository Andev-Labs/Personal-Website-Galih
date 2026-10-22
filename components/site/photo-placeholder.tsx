import { cn } from "@/lib/utils"

type PhotoPlaceholderProps = {
  /** Mono caption, e.g. `PORTRAIT · COMING SOON`. Decorative. */
  label?: string
  className?: string
}

/**
 * Nude gradient that stands in for a photo. Swap it for `next/image` once a
 * real photo exists; the slot keeps its aspect ratio so nothing shifts.
 */
export function PhotoPlaceholder({ label, className }: PhotoPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate flex items-end overflow-hidden rounded-3xl",
        "bg-[radial-gradient(70%_60%_at_30%_25%,var(--blush),transparent_70%),radial-gradient(60%_60%_at_80%_80%,var(--rose-taupe),transparent_70%),linear-gradient(160deg,var(--sand),var(--clay))]",
        "dark:bg-[radial-gradient(70%_60%_at_30%_25%,#5a4036,transparent_70%),radial-gradient(60%_60%_at_80%_80%,#624440,transparent_70%),linear-gradient(160deg,#3d2e28,#6e4f43)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,var(--stripe)_1.5rem,transparent_3rem)]" />
      {label ? (
        <span className="relative m-4 rounded-full bg-paper/70 px-3 py-1 font-mono text-micro text-espresso uppercase backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  )
}
