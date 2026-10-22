import type { CaseStudyInput } from "../schema"

export const ppwrPackagingCompliance = {
  slug: "ppwr-packaging-compliance",
  number: "01",
  title: "Preparing for PPWR: Packaging Compliance Readiness",
  kicker: "Regulatory readiness",
  summary:
    "Helping a manufacturer get its packaging ready for the EU's new Packaging and Packaging Waste Regulation — mapping every packaging material, collecting evidence, and closing the gaps before they reach a customer audit.",
  seo: {
    title: "Preparing for PPWR: Packaging Compliance Readiness",
    description:
      "Case study: mapping packaging materials, supplier evidence and gaps to prepare a manufacturer for the EU Packaging and Packaging Waste Regulation (PPWR).",
  },
  meta: {
    role: "Incoming QC Technician — project support",
    company: "PT DMC Technology Indonesia",
    period: "2026",
    instruments: ["Material declarations", "Supplier documentation", "Inspection records"],
    standards: ["EU PPWR — Regulation (EU) 2025/40", "ISO 9001"],
  },
  tags: ["Regulatory", "Packaging", "Supplier evidence", "Gap analysis"],
  cover: {
    src: "/images/bottles.jpg",
    alt: "Sample vials beside an automated laboratory dispenser",
  },
  context: [
    "The EU Packaging and Packaging Waste Regulation (PPWR) replaces a directive with one regulation that applies directly in every EU member state. It tightens rules on substances in packaging, recyclability, labelling and the documentation a manufacturer must be able to show.",
    "For a manufacturer shipping into the EU, that means every packaging component — not just the product — needs a traceable story: what it is made of, who supplied it, and the evidence that it complies.",
  ],
  myRole: [
    "I supported the Assistant Manager leading the readiness project, bringing an incoming-inspection view: I know which materials arrive, from whom, and what evidence already sits in our records.",
    "My part was the groundwork — building the material inventory, requesting and checking supplier declarations, and flagging gaps early so they could be resolved before anyone outside the company asked.",
  ],
  process: [
    {
      label: "Inventory",
      title: "Map every packaging material",
      detail:
        "Listed each packaging component in scope — primary, secondary and transport packaging — with its material type and supplier, using incoming inspection records as the source of truth.",
    },
    {
      label: "Requirements",
      title: "Translate the regulation into checks",
      detail:
        "Broke the regulation down into checks a material can pass or fail: restricted substances, recyclability, labelling and the declarations required for each material type.",
    },
    {
      label: "Evidence",
      title: "Collect supplier declarations",
      detail:
        "Requested compliance declarations and test evidence from suppliers, then checked each document against the material it claims to cover.",
    },
    {
      label: "Gap review",
      title: "Flag gaps and follow up",
      detail:
        "Recorded missing, expired or mismatched evidence in a gap list and followed up with each supplier until the item was resolved or escalated.",
    },
    {
      label: "File",
      title: "Build an audit-ready file",
      detail:
        "Organized the evidence per material so the compliance position can be shown quickly to a customer or auditor — and kept current as materials change.",
    },
  ],
  outcome: [
    "A single, structured view of packaging compliance: every in-scope material mapped to its supplier and evidence.",
    "Gaps surfaced and owned before they became customer findings, giving management a clear picture of what was left to close.",
    "Incoming inspection now doubles as an early warning: a new or changed packaging material is checked for PPWR evidence at the dock.",
  ],
  metrics: [
    { label: "Packaging materials mapped", value: null },
    { label: "Supplier declarations collected", value: null },
  ],
  skills: [
    "Regulatory interpretation",
    "Supplier communication",
    "Document control",
    "Gap analysis",
    "Cross-functional support",
  ],
} satisfies CaseStudyInput
