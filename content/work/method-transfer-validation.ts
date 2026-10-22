import type { CaseStudyInput } from "../schema"

export const methodTransferValidation = {
  slug: "method-transfer-validation",
  number: "04",
  title: "Moving Methods, Keeping Precision: Method Transfer & Validation",
  kicker: "Analytical methods",
  summary:
    "A method is only as good as its results in a new lab, on a different instrument, in someone else's hands. This is how an analytical method is transferred and validated for routine use.",
  seo: {
    title: "Moving Methods, Keeping Precision: Method Transfer & Validation",
    description:
      "Case study: analytical method transfer and validation on HPLC, ICP-OES and UV-Vis in a GMP pharmaceutical QC lab, following ICH Q2.",
  },
  meta: {
    role: "Quality Control Analyst",
    company: "PT Sakafarma Laboratories",
    period: "2023 — 2026",
    instruments: ["HPLC", "ICP-OES", "UV-Vis", "Empower 3"],
    standards: ["ICH Q2 — validation", "GMP (CPOB)", "Good Laboratory Practice"],
  },
  tags: ["Method transfer", "Validation", "HPLC", "ICP-OES"],
  cover: {
    src: "/images/pipette.jpg",
    alt: "A gloved analyst pipetting samples into a rack of test tubes",
  },
  context: [
    "When a product, a method or an instrument changes, the lab has to prove the method still works there — with the same reliability as the original lab. That proof is method transfer and validation.",
    "It covers chromatographic assays on HPLC, elemental analysis on ICP-OES and spectrophotometric methods on UV-Vis, each with its own sources of error.",
  ],
  myRole: [
    "I executed the laboratory work: preparing standards and samples, running the protocol experiments, processing data in Empower 3, and comparing results against acceptance criteria.",
    "When results didn't meet criteria, I helped trace the reason — column, preparation, instrument settings — before anything was repeated.",
  ],
  process: [
    {
      label: "Protocol",
      title: "Agree the protocol",
      detail:
        "Define what will be tested, how many replicates, and the acceptance criteria — before a single sample is prepared.",
    },
    {
      label: "Suitability",
      title: "Confirm system suitability",
      detail:
        "Make sure the instrument is fit for the run: resolution, tailing and repeatability on HPLC; calibration and recovery on ICP-OES and UV-Vis.",
    },
    {
      label: "Experiments",
      title: "Run the validation parameters",
      detail:
        "Specificity, linearity, accuracy, precision (repeatability and intermediate precision), and where relevant LOD/LOQ and robustness.",
    },
    {
      label: "Compare",
      title: "Compare against criteria",
      detail:
        "For a transfer, results are compared with the sending lab's; for a validation, with the protocol's acceptance criteria. Deviations are investigated, not averaged away.",
    },
    {
      label: "Report",
      title: "Report and release for routine use",
      detail:
        "Results are compiled into a report that supports approving the method for routine testing.",
    },
  ],
  outcome: [
    "Methods approved for routine use on the receiving lab's instruments, backed by complete validation data.",
    "Fewer surprises in routine testing, because the weak points of each method were found during validation, not during release.",
    "Hands-on depth across three instrument families and the data review behind them.",
  ],
  metrics: [
    { label: "Methods transferred or validated", value: null },
  ],
  skills: [
    "Method validation (ICH Q2)",
    "HPLC",
    "ICP-OES",
    "UV-Vis spectrophotometry",
    "Chromatography data review",
  ],
} satisfies CaseStudyInput
