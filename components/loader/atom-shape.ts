/** A particle target in unit space: x/y in roughly [-1.2, 1.2], z in [-1, 1] for depth. */
export type Point = { x: number; y: number; z: number }

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

/** Electron cloud: points in a sphere, denser towards the shell. */
export function buildAtom(count: number): Point[] {
  const random = createRandom(count)
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
