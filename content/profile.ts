import type { ProfileInput } from "./schema"

/** All copy is taken from Galih's CV. Never add figures the CV can't back up. */
export const profileInput = {
  name: "Khrisanty Galih Mestikasari",
  shortName: "Galih",
  monogram: "KGM",
  role: "Chemical Analyst · Quality Control",
  location: "Cikarang, Bekasi — Indonesia",
  email: "galih.khrisanty@gmail.com",
  // Placeholder until the real profile URL is confirmed.
  linkedin: "https://www.linkedin.com/",
  cvPath: "/cv.pdf",
  seo: {
    title: "Khrisanty Galih Mestikasari — Chemical Analyst & QC Specialist",
    description:
      "Chemical Analyst and Quality Control specialist with 6+ years in pharma and manufacturing. HPLC, GC, ICP-OES, GMP and ISO 17025. Based in Cikarang, Bekasi.",
  },
  hero: {
    badge: "Open to opportunities",
    headline: "Hi, I'm Khrisanty Galih Mestikasari.",
    tagline: "Chemical Analyst · Quality Control",
    statement:
      "Six years of keeping results honest — from pharmaceutical QC labs to incoming material inspection. I turn samples, specs and data into decisions a plant can trust.",
    floating: ["HPLC ✓", "ISO 17025", "GMP · GLP"],
  },
  summary: {
    title: "Quality you can trace, from sample to decision.",
    paragraphs: [
      "Goal-oriented Chemical Analyst and Quality Control specialist with more than six years across pharmaceutical and manufacturing quality. My work sits where data meets decisions: inspecting incoming materials, transferring and validating analytical methods, and closing quality issues through MDR and CAPA — always within ISO and GMP discipline.",
      "I'm equally at home with a burette and an HPLC, and I like small, steady improvements: QCC projects, routine Genba, and check sheets that make the next inspection easier than the last. Most recently I moved from pharmaceutical testing into incoming material inspection and support for EU Packaging and Packaging Waste Regulation (PPWR) readiness.",
    ],
    stats: [
      {
        value: "6+",
        count: 6,
        suffix: "+",
        label: "years",
        note: "In pharmaceutical and manufacturing quality since 2019.",
      },
      {
        value: "4",
        count: 4,
        label: "companies",
        note: "DMC Technology, Sakafarma, Kalbe Farma and Sucofindo.",
      },
      {
        value: "12+",
        count: 12,
        suffix: "+",
        label: "instruments",
        note: "From pH meters and viscometers to HPLC, UPLC, GC and ICP-OES.",
      },
      {
        value: "ISO 17025 · GMP · GLP",
        label: "standards",
        note: "Plus ISO 9001 and ISO 14001 from analytical training at IPB.",
      },
    ],
  },
  skills: [
    {
      id: "instruments",
      icon: "flask",
      title: "Instruments",
      blurb: "Hands-on with the instruments a modern QC lab runs on.",
      items: [
        "High-Performance Liquid Chromatography (HPLC)",
        "Ultra-Performance Liquid Chromatography (UPLC)",
        "Gas Chromatography (GC)",
        "Inductively Coupled Plasma OES (ICP-OES)",
        "Atomic Absorption Spectroscopy (AAS)",
        "UV-Vis Spectrophotometry",
        "Fourier-Transform Infrared (FTIR)",
        "Thin-Layer Chromatography (TLC)",
        "Total Organic Carbon (TOC) analyzer",
        "pH meter",
        "Viscometer",
        "Densitometer",
        "Pull gauge",
      ],
    },
    {
      id: "analysis",
      icon: "beaker",
      title: "Analysis & Laboratory",
      blurb: "Classical chemistry and instrumental methods, chosen to fit the question.",
      items: [
        "Gravimetry",
        "Titrimetry",
        "Physical testing",
        "Qualitative & quantitative analysis",
        "Stability testing",
        "Method transfer & validation",
        "Instrument calibration",
        "Reagent & standard preparation",
        "Incoming material inspection",
      ],
    },
    {
      id: "quality",
      icon: "shield",
      title: "Quality & Compliance",
      blurb: "The frameworks every result has to stand up to.",
      items: [
        "GMP",
        "GLP",
        "ISO 9001",
        "ISO 14001",
        "ISO/IEC 17025",
        "CAPA",
        "OOS investigation",
        "MDR",
        "EU PPWR",
        "QCC & Genba",
      ],
    },
    {
      id: "systems",
      icon: "monitor",
      title: "Systems & Software",
      blurb: "Where the data lives and how it gets reported.",
      items: ["Oracle", "Empower 3 (CDS)", "Microsoft Office", "Canva"],
    },
    {
      id: "languages",
      icon: "languages",
      title: "Languages",
      blurb: "Reports, SOPs and supplier emails in either language.",
      items: ["Indonesian — native", "English — spoken & written"],
    },
  ],
  experience: [
    {
      id: "dmc",
      role: "Incoming Quality Control Technician",
      company: "PT DMC Technology Indonesia",
      abbr: "DMC",
      location: "Cikarang, Bekasi",
      start: "Jul 2026",
      end: "Present",
      sector: "Manufacturing",
      impact: "Incoming quality, end to end",
      quote:
        "Every material that enters the plant passes my checkpoint — from inspection request to judgment, MDR and debit note.",
      instruments: ["Visual & dimensional", "Pull gauge", "Check sheets"],
      highlights: [
        "Inspect incoming materials and answer material inspection requests (FPP), drafting check sheets that make routine materials faster to judge.",
        "Judge stock material in the warehouse or on the production floor against standard criteria to resolve disposition requests (LPJ).",
        "Document non-conforming (NG) material in daily feedback, Material Discrepancy Reports (MDR) and debit notes, and help compile the monthly MDR report.",
        "Support special-acceptance decisions for discrepant or urgently needed material, with a full investigation behind every call.",
        "Support the Assistant Manager on the company's readiness project for the EU Packaging and Packaging Waste Regulation (PPWR).",
        "Run routine Genba walks to find and fix quality issues where they start.",
      ],
      caseSlugs: ["incoming-material-gatekeeping", "ppwr-packaging-compliance"],
      // Clay-rose
      backdrop: {
        light: { top: "#c9a08a", mid: "#e8c9b8", mesh: "#c9a08a" },
        dark: { top: "#5c4238", mid: "#45332c", mesh: "#6e4f43" },
      },
    },
    {
      id: "sakafarma",
      role: "Quality Control Analyst",
      company: "PT Sakafarma Laboratories",
      abbr: "SKF",
      location: "Cikarang, Bekasi",
      start: "Jul 2023",
      end: "Jun 2026",
      sector: "Pharmaceutical",
      impact: "Release and stability testing under GMP",
      quote:
        "Raw materials, semi-finished goods and stability samples — tested, transferred and validated so every release decision holds up.",
      instruments: ["HPLC", "ICP-OES", "UV-Vis", "Titrimetry"],
      highlights: [
        "Tested raw materials, semi-finished goods and stability samples with titrimetric methods, UV-Vis spectrophotometry, HPLC and ICP-OES.",
        "Ran routine, non-routine and special samples, including analytical method transfer and validation work on new or modified procedures.",
        "Drafted study protocols for Quality Control Circle (QCC) projects focused on process optimization and lab efficiency.",
        "Supported the Supervisor in Out-of-Specification (OOS) investigations and the resulting Corrective and Preventive Actions (CAPA).",
      ],
      caseSlugs: ["oos-investigation-capa", "method-transfer-validation", "qcc-genba-improvement"],
      // Blush
      backdrop: {
        light: { top: "#cda39c", mid: "#eed3cd", mesh: "#cba099" },
        dark: { top: "#5e3f3d", mid: "#46302f", mesh: "#6e4846" },
      },
    },
    {
      id: "kalbe",
      role: "Quality Control Analyst",
      company: "PT Kalbe Farma Tbk",
      abbr: "KLBF",
      location: "Cikarang, Bekasi",
      start: "Dec 2019",
      end: "Jun 2023",
      sector: "Pharmaceutical",
      impact: "Data that feeds release decisions",
      quote:
        "Three and a half years of stability and in-process testing at one of Indonesia's largest pharmaceutical manufacturers.",
      instruments: ["HPLC", "GC", "AAS", "FTIR"],
      flow: ["Prepare", "Calibrate", "Analyse", "Interpret", "Report"],
      highlights: [
        "Performed qualitative and quantitative analysis of stability and semi-finished products.",
        "Applied gravimetric and titrimetric methods alongside AAS, GC, FTIR and HPLC on routine, non-routine and special samples.",
        "Prepared reagents, solutions and reference standards, and performed instrument calibration.",
        "Interpreted analytical data and compiled reports that fed directly into quality release decisions.",
      ],
      caseSlugs: [],
      // Sand
      backdrop: {
        light: { top: "#c9a67e", mid: "#ecdcc6", mesh: "#c9a47a" },
        dark: { top: "#59452f", mid: "#433526", mesh: "#6a5238" },
      },
    },
    {
      id: "sucofindo",
      role: "Laboratory Analyst (Intern)",
      company: "PT Sucofindo — Services Laboratory",
      abbr: "SCI",
      location: "Cilegon, Banten",
      start: "Feb 2019",
      end: "May 2019",
      sector: "Testing services",
      impact: "Where the lab work started",
      quote:
        "An environmental testing internship: water quality and waste characterization in a commercial testing laboratory.",
      instruments: ["UV-Vis", "AAS", "Gravimetry"],
      flow: ["Sample", "Prepare", "Measure", "Report"],
      highlights: [
        "Assessed water quality using UV-Vis spectrophotometry, gravimetric and titrimetric methods.",
        "Characterized waste samples by atomic absorption spectroscopy (AAS).",
      ],
      caseSlugs: [],
      // Taupe
      backdrop: {
        light: { top: "#bfab9e", mid: "#e0d5cb", mesh: "#bfab9e" },
        dark: { top: "#4f443e", mid: "#3a312d", mesh: "#5e514a" },
      },
    },
  ],
  education: [
    {
      id: "jayabaya",
      tab: "Bachelor's",
      icon: "graduation",
      school: "Jayabaya University",
      degree: "Bachelor's (S1), Chemical Engineering",
      period: "2022 — 2024",
      gpa: "3.59",
      blurb:
        "Earned while working full-time as a QC analyst, moving from the bench to the process.",
      focus: [
        "Chemical process design",
        "Material & energy balances",
        "Environmental & safety engineering",
      ],
      // Rose-taupe
      backdrop: {
        light: { top: "#c9a19f", mid: "#ead4d1", mesh: "#c79e9b" },
        dark: { top: "#563d3f", mid: "#40302f", mesh: "#674a4c" },
      },
    },
    {
      id: "ipb",
      tab: "Diploma",
      icon: "atom",
      school: "IPB University",
      degree: "Diploma (D3), Chemical Analysis",
      period: "2016 — 2019",
      gpa: "3.37",
      blurb: "The analytical foundation: wet chemistry, instruments and the standards behind them.",
      focus: [
        "Calibration",
        "Conventional & instrumental analysis",
        "ISO 9001, ISO 14001, ISO/IEC 17025",
      ],
      // Sand-clay
      backdrop: {
        light: { top: "#cfa888", mid: "#efdccb", mesh: "#cca586" },
        dark: { top: "#5b4434", mid: "#443428", mesh: "#6c5240" },
      },
    },
  ],
  certificates: [
    {
      title: "Preventive Maintenance for Laboratory Equipment",
      year: "2019",
      category: "Public training",
      body: "Keeping laboratory instruments reliable between calibrations, so results stay trustworthy.",
    },
    {
      title: "ISO 14001 & ISO/IEC 17025 Competency Certification",
      year: "2017",
      category: "Certification",
      body: "Introduction and implementation of ISO for competency certification in the world of work.",
    },
    {
      title: "Hatchling Conservation and Release",
      year: "2017",
      category: "Conservation",
      body: "Patient, careful work with a living outcome — a reminder that protocols protect something real.",
    },
  ],
  activities: {
    intro:
      "Outside the lab I've usually ended up holding the books, the minutes or the first-aid kit.",
    items: [
      {
        org: "Chemical Analysis Student Cooperative",
        short: "KOKIM",
        roles: [
          { title: "Staff", year: "2016" },
          { title: "Treasurer", year: "2017" },
          { title: "Staff", year: "2018" },
        ],
        note: "Three years running a student cooperative at IPB University, including a year keeping its books.",
      },
      {
        org: "SMA Negeri 3 Magelang Journalism",
        short: "BUJEL",
        roles: [{ title: "Staff", year: "2014" }],
        note: "Reporting and writing for the school publication.",
      },
      {
        org: "SMA Negeri 3 Magelang Red Cross Youth",
        short: "PMR",
        roles: [{ title: "Secretary", year: "2014" }],
        note: "Keeping the records for the school's youth first-aid unit.",
      },
    ],
  },
  contact: {
    headline: "Let's work together.",
    body: "Hiring for QC, QA or laboratory roles in pharma or manufacturing? Email is the fastest way to reach me, or use LinkedIn.",
  },
  confidentiality:
    "Case studies are generalized to protect employer confidentiality: no supplier names, product names or internal data are shown.",
} satisfies ProfileInput
