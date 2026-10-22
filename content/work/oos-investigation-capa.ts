import type { CaseStudyInput } from "../schema"

export const oosInvestigationCapa = {
  slug: "oos-investigation-capa",
  number: "03",
  title: "When Results Go Out of Spec: OOS Investigation & CAPA",
  kicker: "Investigation",
  summary:
    "An out-of-specification result is a question, not a verdict. This is the structured path from a failing number to a confirmed root cause and actions that keep it from happening again.",
  seo: {
    title: "When Results Go Out of Spec: OOS Investigation & CAPA",
    description:
      "Case study: a GMP pharmaceutical OOS investigation — lab assessment, root cause analysis, and corrective and preventive actions (CAPA).",
  },
  meta: {
    role: "Quality Control Analyst",
    company: "PT Sakafarma Laboratories",
    period: "2023 — 2026",
    instruments: ["HPLC", "UV-Vis", "ICP-OES", "Titration", "Empower 3"],
    standards: ["GMP (CPOB)", "Good Laboratory Practice", "Data integrity — ALCOA+"],
  },
  tags: ["OOS", "CAPA", "Root cause", "GMP"],
  coverLabel: "FIG. OOS → CAPA",
  context: [
    "In a pharmaceutical QC lab, an out-of-specification (OOS) result cannot simply be retested away. GMP requires a documented investigation to decide whether the result reflects a lab error or a real problem with the product.",
    "Getting it wrong either way is costly: release a bad batch, or reject a good one.",
  ],
  myRole: [
    "I supported the QC Supervisor through OOS investigations: reviewing my own and colleagues' analytical work, reconstructing what happened at the bench, and drafting the investigation record.",
    "I also helped develop the corrective and preventive actions (CAPA) that came out of each investigation.",
  ],
  process: [
    {
      label: "Report",
      title: "Report the OOS immediately",
      detail:
        "Stop, keep everything — solutions, glassware, raw data — and inform the Supervisor. Nothing is discarded or re-run before the investigation starts.",
    },
    {
      label: "Lab check",
      title: "Assess the laboratory work",
      detail:
        "Check the obvious first: calculations, instrument performance and system suitability, standard and reagent preparation, sample handling, and the chromatography data in the CDS.",
    },
    {
      label: "Root cause",
      title: "Find the root cause",
      detail:
        "If no clear lab error is found, the investigation widens to manufacturing. Tools like fishbone diagrams and 5-Why help separate the cause from its symptoms.",
    },
    {
      label: "CAPA",
      title: "Define corrective & preventive actions",
      detail:
        "Corrective actions fix this case; preventive actions change the procedure, training or control so the same failure is less likely anywhere else.",
    },
    {
      label: "Verify",
      title: "Check effectiveness",
      detail: "Follow up on each action and confirm it actually worked before the CAPA is closed.",
    },
  ],
  outcome: [
    "Investigations documented to GMP expectations, with conclusions backed by raw data rather than assumptions.",
    "CAPAs that targeted root causes in method execution and lab practice, not just the single failing result.",
    "A sharper habit across the team: check, document and escalate early.",
  ],
  metrics: [
    { label: "OOS investigations supported", value: null },
    { label: "CAPAs closed as effective", value: null },
  ],
  skills: [
    "OOS investigation",
    "Root cause analysis",
    "CAPA development",
    "Data review",
    "GMP documentation",
  ],
} satisfies CaseStudyInput
