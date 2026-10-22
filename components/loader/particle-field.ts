import { buildShape, createRandom, type Point, type VariantId } from "./shapes"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  /** Target in unit space. */
  target: Point
  /** Drawn radius, derived from size and depth. */
  radius: number
  /** Alpha bucket, derived from depth. */
  bucket: number
  /** ms before this particle starts converging. */
  delay: number
}

type FieldOptions = {
  canvas: HTMLCanvasElement
  /** Element whose box defines the atom's center and radius. */
  anchor: HTMLElement
  color: string
  reducedMotion: boolean
}

export type ParticleField = {
  setVariant: (id: VariantId) => void
  burst: () => void
  destroy: () => void
}

// Entrance timeline (ms)
const CONVERGE_AT = 300
const NUCLEUS_AT = 1100
const ORBITS_AT = 1400
const ORBIT_DRAW = 600
const ELECTRONS_AT = 2000

const ORBIT_ANGLES = [0, Math.PI / 3, (2 * Math.PI) / 3]
const ALPHA_BUCKETS = 4

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const easeOutBack = (t: number) => {
  const c = 1.9
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2
}
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

/**
 * Canvas 2D particle field for the loading screen: a dot "electron cloud" with a
 * nucleus and three orbits, morphing between shapes. No dependencies; the loop
 * pauses while the tab is hidden and never runs under reduced motion.
 */
export function createParticleField({
  canvas,
  anchor,
  color,
  reducedMotion,
}: FieldOptions): ParticleField {
  const ctx = canvas.getContext("2d")
  if (!ctx) return { setVariant: () => {}, burst: () => {}, destroy: () => {} }

  const small = window.innerWidth < 640
  const count = small ? 150 : 260
  const random = createRandom(42)

  let width = 0
  let height = 0
  let cx = 0
  let cy = 0
  let radius = 100

  let variant: VariantId = "atom"
  let atomness = 1
  let elapsed = reducedMotion ? 10_000 : 0
  let bursting = false
  let burstTime = 0
  let frame = 0
  let last = 0

  const pointer = { x: -9999, y: -9999, active: false }
  const tilt = { x: 0, y: 0 }

  function measure() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    const box = anchor.getBoundingClientRect()
    cx = box.left + box.width / 2
    cy = box.top + box.height / 2
    radius = Math.max(40, Math.min(box.width, box.height) / 2) * 0.78
  }

  measure()

  const targets = buildShape("atom", count)
  const particles: Particle[] = targets.map((target) => {
    const settled = reducedMotion
    return {
      x: settled ? cx + target.x * radius : random() * width,
      y: settled ? cy + target.y * radius : random() * height,
      vx: 0,
      vy: 0,
      target,
      radius: 0,
      bucket: 0,
      delay: random() * 450,
    }
  })
  const sizes = particles.map(() => 0.9 + random() * random() * 3.2)

  function applyDepth() {
    particles.forEach((p, i) => {
      const depth = (p.target.z + 1) / 2
      p.radius = sizes[i] * (0.7 + depth * 0.5)
      p.bucket = Math.min(ALPHA_BUCKETS - 1, Math.floor(depth * ALPHA_BUCKETS))
    })
  }
  applyDepth()

  function targetPosition(p: Particle) {
    const depth = (p.target.z + 1) / 2
    return {
      x: cx + p.target.x * radius + tilt.x * (6 + depth * 18),
      y: cy + p.target.y * radius + tilt.y * (6 + depth * 18),
    }
  }

  function step(dt: number) {
    const k = 0.0022 * dt
    const damping = Math.pow(bursting ? 0.97 : 0.86, dt / 16.67)
    for (const p of particles) {
      if (bursting) {
        p.x += p.vx * (dt / 16.67)
        p.y += p.vy * (dt / 16.67)
        p.vx *= damping
        p.vy *= damping
        continue
      }
      if (elapsed < CONVERGE_AT + p.delay) {
        // Scattered phase: a gentle drift.
        p.x += Math.sin((elapsed + p.delay * 10) / 600) * 0.15
        continue
      }
      const t = targetPosition(p)
      p.vx += (t.x - p.x) * k
      p.vy += (t.y - p.y) * k
      if (pointer.active) {
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < 80 * 80 && d2 > 0.01) {
          const force = (1 - Math.sqrt(d2) / 80) * 0.9
          const d = Math.sqrt(d2)
          p.vx += (dx / d) * force
          p.vy += (dy / d) * force
        }
      }
      p.vx *= damping
      p.vy *= damping
      p.x += p.vx * (dt / 16.67)
      p.y += p.vy * (dt / 16.67)
    }
  }

  function ellipsePath(angle: number, progress: number) {
    const ox = cx + tilt.x * 10
    const oy = cy + tilt.y * 10
    ctx!.beginPath()
    ctx!.ellipse(
      ox,
      oy,
      radius * 1.18,
      radius * 0.4,
      angle,
      -Math.PI / 2,
      -Math.PI / 2 + Math.PI * 2 * progress,
    )
  }

  function draw() {
    ctx!.clearRect(0, 0, width, height)
    const fadeIn = reducedMotion ? 1 : clamp(elapsed / 400)
    const fadeOut = bursting ? clamp(1 - burstTime / 650) : 1
    ctx!.fillStyle = color
    ctx!.strokeStyle = color

    // Batched into a few alpha buckets: one path + one fill per bucket.
    for (let bucket = 0; bucket < ALPHA_BUCKETS; bucket++) {
      ctx!.globalAlpha = (0.35 + ((bucket + 0.5) / ALPHA_BUCKETS) * 0.65) * fadeIn * fadeOut
      ctx!.beginPath()
      for (const p of particles) {
        if (p.bucket !== bucket) continue
        ctx!.moveTo(p.x + p.radius, p.y)
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      }
      ctx!.fill()
    }

    if (atomness < 0.01) return
    const a = atomness * fadeOut

    // Orbits, drawn in one after another.
    ORBIT_ANGLES.forEach((angle, i) => {
      const progress = easeOutCubic(clamp((elapsed - ORBITS_AT - i * 120) / ORBIT_DRAW))
      if (progress <= 0) return
      ctx!.globalAlpha = 0.5 * a
      ctx!.lineWidth = 1.4
      ellipsePath(angle, progress)
      ctx!.stroke()
    })

    // Electrons
    const electrons = clamp((elapsed - ELECTRONS_AT) / 400)
    if (electrons > 0) {
      ORBIT_ANGLES.forEach((angle, i) => {
        const theta = elapsed / (1100 + i * 260) + i * 2.1
        const ex = Math.cos(theta) * radius * 1.18
        const ey = Math.sin(theta) * radius * 0.4
        const x = cx + tilt.x * 10 + ex * Math.cos(angle) - ey * Math.sin(angle)
        const y = cy + tilt.y * 10 + ex * Math.sin(angle) + ey * Math.cos(angle)
        ctx!.globalAlpha = electrons * a
        ctx!.beginPath()
        ctx!.arc(x, y, Math.max(4, radius * 0.045), 0, Math.PI * 2)
        ctx!.fill()
      })
    }

    // Nucleus pop
    const pop = clamp((elapsed - NUCLEUS_AT) / 450)
    if (pop > 0) {
      ctx!.globalAlpha = a
      ctx!.beginPath()
      ctx!.arc(
        cx + tilt.x * 14,
        cy + tilt.y * 14,
        radius * 0.15 * Math.max(0, easeOutBack(pop)),
        0,
        Math.PI * 2,
      )
      ctx!.fill()
    }
    ctx!.globalAlpha = 1
  }

  function loop(now: number) {
    const dt = Math.min(50, last ? now - last : 16.67)
    last = now
    elapsed += dt
    if (bursting) burstTime += dt

    const target = variant === "atom" ? 1 : 0
    atomness += (target - atomness) * Math.min(1, dt / 160)

    const goal = pointer.active
      ? {
          x: clamp((pointer.x - cx) / (width / 2), -1, 1),
          y: clamp((pointer.y - cy) / (height / 2), -1, 1),
        }
      : { x: 0, y: 0 }
    tilt.x += (goal.x - tilt.x) * Math.min(1, dt / 220)
    tilt.y += (goal.y - tilt.y) * Math.min(1, dt / 220)

    step(dt)
    draw()
    if (bursting && burstTime > 700) return
    frame = requestAnimationFrame(loop)
  }

  function start() {
    if (reducedMotion || frame) return
    last = 0
    frame = requestAnimationFrame(loop)
  }

  function stop() {
    cancelAnimationFrame(frame)
    frame = 0
  }

  function settle() {
    for (const p of particles) {
      p.x = cx + p.target.x * radius
      p.y = cy + p.target.y * radius
    }
  }

  function onResize() {
    measure()
    if (reducedMotion) {
      settle()
      draw()
    }
  }

  function onPointerMove(event: PointerEvent) {
    pointer.x = event.clientX
    pointer.y = event.clientY
    pointer.active = event.pointerType === "mouse"
  }

  function onPointerLeave() {
    pointer.active = false
  }

  function onVisibility() {
    if (document.hidden) stop()
    else start()
  }

  window.addEventListener("resize", onResize)
  document.addEventListener("visibilitychange", onVisibility)
  if (!reducedMotion) {
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onPointerLeave)
  }

  if (reducedMotion) draw()
  else start()

  return {
    setVariant(id) {
      if (id === variant) return
      variant = id
      const next = buildShape(id, count)
      particles.forEach((p, i) => {
        p.target = next[i]
        p.delay = 0
        if (!reducedMotion) {
          // A little kick so the morph feels alive.
          p.vx += (random() - 0.5) * 6
          p.vy += (random() - 0.5) * 6
        }
      })
      applyDepth()
      if (reducedMotion) {
        atomness = id === "atom" ? 1 : 0
        settle()
        draw()
      }
    },
    burst() {
      if (reducedMotion || bursting) return
      bursting = true
      for (const p of particles) {
        const dx = p.x - cx
        const dy = p.y - cy
        const d = Math.hypot(dx, dy) || 1
        const speed = 10 + random() * 16
        p.vx = (dx / d) * speed
        p.vy = (dy / d) * speed
      }
      start()
    },
    destroy() {
      stop()
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("pointerleave", onPointerLeave)
    },
  }
}
