import type { VariantId } from "./shapes"

/** Tiny dot-drawn icons for the shape picker. Decorative. */
export function VariantThumb({ id, className }: { id: VariantId; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      {id === "atom" ? (
        <g fill="none" stroke="currentColor" strokeWidth={1.4}>
          <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" />
          <ellipse cx="16" cy="16" rx="13" ry="5" />
          <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
        </g>
      ) : null}
      {id === "molecule" ? (
        <g fill="currentColor" stroke="currentColor" strokeWidth={1.2}>
          <polygon points="16,6 24.7,11 24.7,21 16,26 7.3,21 7.3,11" fill="none" />
          {[
            [16, 6],
            [24.7, 11],
            [24.7, 21],
            [16, 26],
            [7.3, 21],
            [7.3, 11],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" stroke="none" />
          ))}
        </g>
      ) : null}
      {id === "chromatogram" ? (
        <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
          <path d="M3 25 H29" opacity={0.5} />
          <path d="M3 24 C7 24 8 18 9 18 C10 18 11 24 13 24 C14 24 15 6 16.5 6 C18 6 18.5 24 20 24 C21 24 22 14 23 14 C24 14 25 24 29 24" />
        </g>
      ) : null}
      {id === "crystal" ? (
        <g fill="currentColor" stroke="currentColor" strokeWidth={1.1}>
          <path
            d="M16 4 L27 10 L27 22 L16 28 L5 22 L5 10 Z M16 16 L27 10 M16 16 L5 10 M16 16 V28"
            fill="none"
          />
          {[
            [16, 4],
            [27, 10],
            [27, 22],
            [16, 28],
            [5, 22],
            [5, 10],
            [16, 16],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2" stroke="none" />
          ))}
        </g>
      ) : null}
    </svg>
  )
}
