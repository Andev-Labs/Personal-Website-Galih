/** A particle target in unit space: x/y in roughly [-1.2, 1.2], z in [-1, 1] for depth. */
export type Point = { x: number; y: number; z: number }

export const variants = [
  { id: "atom", label: "Atom", caption: "the quick tour" },
  { id: "molecule", label: "Molecule", caption: "built to bond" },
  { id: "chromatogram", label: "Chromatogram", caption: "peaks & baselines" },
  { id: "crystal", label: "Crystal", caption: "an ordered lattice" },
] as const

export type VariantId = (typeof variants)[number]["id"]

/** Small deterministic PRNG (mulberry32) so every visit draws the same shapes. */
export function createRandom(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Random = () => number

function gaussian(random: Random) {
  const u = Math.max(random(), 1e-6)
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random())
}

/** Electron cloud: points in a sphere, denser towards the shell. */
function atom(count: number, random: Random): Point[] {
  return Array.from({ length: count }, () => {
    const theta = random() * Math.PI * 2
    const phi = Math.acos(2 * random() - 1)
    const r = 0.35 + 0.65 * Math.pow(random(), 0.45)
    return {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
    }
  })
}

/** Benzene-like ring: six atoms, three substituents, particles along the bonds. */
function molecule(count: number, random: Random): Point[] {
  const ring = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    return { x: Math.cos(a) * 0.62, y: Math.sin(a) * 0.62, r: 0.13 }
  })
  const subs = [0, 2, 4].map((i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    return { x: Math.cos(a) * 1.08, y: Math.sin(a) * 1.08, r: 0.09 }
  })
  const atoms = [...ring, ...subs]
  const bonds: [number, number][] = [
    ...ring.map((_, i) => [i, (i + 1) % 6] as [number, number]),
    [0, 6],
    [2, 7],
    [4, 8],
  ]
  return Array.from({ length: count }, (_, i) => {
    if (i % 10 < 7) {
      const at = atoms[Math.floor(random() * atoms.length)]
      return {
        x: at.x + gaussian(random) * at.r * 0.5,
        y: at.y + gaussian(random) * at.r * 0.5,
        z: gaussian(random) * 0.4,
      }
    }
    const [a, b] = bonds[Math.floor(random() * bonds.length)]
    const t = random()
    return {
      x: atoms[a].x + (atoms[b].x - atoms[a].x) * t + gaussian(random) * 0.015,
      y: atoms[a].y + (atoms[b].y - atoms[a].y) * t + gaussian(random) * 0.015,
      z: 0,
    }
  })
}

const peaks = [
  { at: -0.62, h: 0.55, w: 0.06 },
  { at: -0.18, h: 1.25, w: 0.07 },
  { at: 0.12, h: 0.4, w: 0.05 },
  { at: 0.5, h: 0.85, w: 0.06 },
  { at: 0.86, h: 0.3, w: 0.05 },
]

function signal(x: number) {
  return peaks.reduce((sum, p) => sum + p.h * Math.exp(-0.5 * ((x - p.at) / p.w) ** 2), 0)
}

/** An HPLC trace: the curve, its baseline and a sparse fill under the peaks. */
function chromatogram(count: number, random: Random): Point[] {
  const base = 0.6
  return Array.from({ length: count }, (_, i) => {
    const x = -1.15 + random() * 2.3
    const curve = base - signal(x)
    const kind = i % 20
    if (kind < 12) return { x, y: curve, z: 0.2 }
    if (kind < 16) return { x, y: base + 0.06, z: -0.2 }
    return { x, y: curve + (base - curve) * random(), z: -0.6 }
  })
}

/** A 3×3×3 cubic lattice in isometric projection, nodes plus edges. */
function crystal(count: number, random: Random): Point[] {
  const ry = (35 * Math.PI) / 180
  const rx = (28 * Math.PI) / 180
  const project = (x: number, y: number, z: number): Point => {
    const x1 = x * Math.cos(ry) + z * Math.sin(ry)
    const z1 = -x * Math.sin(ry) + z * Math.cos(ry)
    const y1 = y * Math.cos(rx) - z1 * Math.sin(rx)
    const z2 = y * Math.sin(rx) + z1 * Math.cos(rx)
    return { x: x1, y: y1, z: z2 }
  }
  const s = 0.58
  const nodes: [number, number, number][] = []
  for (const i of [-1, 0, 1])
    for (const j of [-1, 0, 1]) for (const k of [-1, 0, 1]) nodes.push([i, j, k])
  return Array.from({ length: count }, (_, idx) => {
    if (idx % 2 === 0) {
      const [i, j, k] = nodes[Math.floor(random() * nodes.length)]
      return project(
        (i + gaussian(random) * 0.06) * s,
        (j + gaussian(random) * 0.06) * s,
        (k + gaussian(random) * 0.06) * s,
      )
    }
    const [i, j, k] = nodes[Math.floor(random() * nodes.length)]
    const axis = Math.floor(random() * 3)
    const t = random()
    const p: [number, number, number] = [i, j, k]
    if (p[axis] === 1) p[axis] -= t
    else p[axis] += t
    return project(p[0] * s, p[1] * s, p[2] * s)
  })
}

const builders = { atom, molecule, chromatogram, crystal } satisfies Record<
  VariantId,
  (count: number, random: Random) => Point[]
>

export function buildShape(id: VariantId, count: number): Point[] {
  return builders[id](count, createRandom(id.length * 7919 + count))
}
