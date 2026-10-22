import type { CaseStudyInput } from "../schema"

export const incomingMaterialGatekeeping = {
  slug: "incoming-material-gatekeeping",
  number: "02",
  title: "From Dock to Decision: Incoming Material Gatekeeping",
  kicker: "Incoming quality control",
  summary:
    "Every material that enters the plant passes one checkpoint. This is how a request becomes a judgment, a judgment becomes a record, and a non-conformance becomes a debit note and a monthly lesson.",
  seo: {
    title: "From Dock to Decision: Incoming Material Gatekeeping",
    description:
      "Case study: the incoming QC flow from inspection request (FPP) to check sheet, disposition judgment (LPJ), MDR and debit note, and monthly MDR review.",
  },
  meta: {
    role: "Incoming Quality Control Technician",
    company: "PT DMC Technology Indonesia",
    period: "2026 — Present",
    instruments: ["Visual & dimensional inspection", "Pull gauge", "Check sheets"],
    standards: ["Material acceptance criteria", "ISO 9001"],
  },
  tags: ["Incoming QC", "MDR", "Disposition", "Documentation"],
  coverLabel: "FIG. INCOMING INSPECTION",
  context: [
    "On a production line, one non-conforming part can stop a shift. Incoming QC is the last point where it is still cheap to say no.",
    "The challenge is speed with discipline: materials arrive daily, production wants them now, and every decision has to be documented well enough to recover costs from a supplier and to spot patterns over time.",
  ],
  myRole: [
    "I own the day-to-day flow for the materials I inspect: answering inspection requests, judging stock against standards, and writing up anything that fails.",
    "I also assist the Supervisor with special-acceptance cases and the Assistant Manager with the monthly MDR report.",
  ],
  process: [
    {
      label: "FPP request",
      title: "Receive the inspection request",
      detail:
        "A material inspection request (FPP) arrives from the warehouse or production. I confirm the material, lot and quantity, and pull the applicable standard.",
    },
    {
      label: "Check sheet",
      title: "Inspect against a check sheet",
      detail:
        "Routine materials are inspected with check sheets I draft and maintain, so every inspector checks the same points the same way.",
    },
    {
      label: "LPJ judgment",
      title: "Judge and decide disposition",
      detail:
        "For stock in the warehouse or on the line, I judge the material against standard criteria and answer the disposition request (LPJ): accept, reject, or escalate for special acceptance.",
    },
    {
      label: "MDR + debit",
      title: "Record non-conformance",
      detail:
        "Not-good (NG) material goes into the daily feedback report, a Material Discrepancy Report (MDR) and a debit note, so the supplier is informed and the cost is recovered.",
    },
    {
      label: "Monthly MDR",
      title: "Review trends monthly",
      detail:
        "MDRs are consolidated into a monthly report with the Assistant Manager, turning single incidents into supplier trends and improvement actions.",
    },
  ],
  outcome: [
    "A clear, traceable trail from request to decision for every material I inspect.",
    "Faster routine inspections and more consistent judgments, thanks to standardized check sheets.",
    "Non-conformances that end in action — supplier feedback, debit notes and monthly trend review — instead of being quietly reworked.",
  ],
  metrics: [
    { label: "Inspection requests handled per month", value: null },
    { label: "Check sheets drafted", value: null },
  ],
  skills: [
    "Incoming inspection",
    "Disposition judgment",
    "MDR & debit notes",
    "Check sheet design",
    "Supplier quality",
  ],
} satisfies CaseStudyInput
