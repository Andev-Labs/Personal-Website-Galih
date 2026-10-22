import type { CaseStudyInput } from "../schema"

export const qccGenbaImprovement = {
  slug: "qcc-genba-improvement",
  number: "05",
  title: "Small Loops, Real Gains: QCC & Genba Improvement",
  kicker: "Continuous improvement",
  summary:
    "Improvement rarely starts in a meeting room. Across a pharmaceutical lab and a manufacturing plant, I've used Quality Control Circles and routine Genba to turn small daily frictions into lasting fixes.",
  seo: {
    title: "Small Loops, Real Gains: QCC & Genba Improvement",
    description:
      "Case study: Quality Control Circle (QCC) projects and routine Genba walks used for continuous improvement in pharma and manufacturing quality control.",
  },
  meta: {
    role: "QC Analyst / Incoming QC Technician",
    company: "PT Sakafarma Laboratories · PT DMC Technology Indonesia",
    period: "2023 — Present",
    instruments: ["PDCA", "Pareto chart", "Fishbone diagram", "5-Why", "Check sheets"],
    standards: ["GMP (CPOB)", "ISO 9001"],
  },
  tags: ["QCC", "Genba", "PDCA", "Lab efficiency"],
  coverLabel: "FIG. QCC · GENBA",
  context: [
    "Quality problems often hide in routine: a step that takes longer than it should, a form that gets filled in differently by every shift, a recurring defect everyone has learned to live with.",
    "Quality Control Circles (QCC) give a small team a structured way to tackle one such problem. Genba — going to the actual place where work happens — makes sure the problem is seen first-hand, not described from memory.",
  ],
  myRole: [
    "At Sakafarma I drafted and developed study protocols for QCC projects focused on process optimization and laboratory efficiency.",
    "At DMC I run routine Genba walks to observe incoming quality issues where they start, and feed what I see back into inspection standards.",
  ],
  process: [
    {
      label: "Genba",
      title: "Go and see",
      detail:
        "Observe the process where it happens. Note what actually occurs, not what the procedure says should occur.",
    },
    {
      label: "Define",
      title: "Pick one problem",
      detail:
        "Use data and a Pareto view to choose the problem worth solving first, and write it down as a measurable target.",
    },
    {
      label: "Root cause",
      title: "Analyze the cause",
      detail:
        "Fishbone diagrams and 5-Why sessions with the people who do the work, until the cause is specific enough to act on.",
    },
    {
      label: "Trial",
      title: "Trial a countermeasure",
      detail:
        "Run the change on a small scale, check the result against the target, and adjust — the Do and Check of PDCA.",
    },
    {
      label: "Standardize",
      title: "Make it the new normal",
      detail:
        "Update the procedure, check sheet or training so the improvement survives the next shift change.",
    },
  ],
  outcome: [
    "QCC study protocols that gave each project a clear problem statement, method and target from day one.",
    "Improvements in lab workflow and efficiency that were written into standards rather than left as habits.",
    "Genba findings that fed directly into clearer inspection standards and check sheets.",
  ],
  metrics: [
    { label: "QCC projects contributed to", value: null },
    { label: "Time saved per analysis or inspection", value: null },
  ],
  skills: [
    "QCC facilitation",
    "Genba observation",
    "PDCA",
    "Root cause analysis",
    "Process standardization",
  ],
} satisfies CaseStudyInput
