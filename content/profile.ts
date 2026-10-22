import type { ProfileInput } from "./schema"

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
  portrait: {
    src: "/images/portrait.jpg",
    alt: "Portrait of Khrisanty Galih Mestikasari",
  },
  seo: {
    title: "Khrisanty Galih Mestikasari — Chemical Analyst & QC Specialist",
    description:
      "Chemical Analyst and Quality Control specialist with 6+ years in pharma and manufacturing. HPLC, GC, ICP-OES, GMP and ISO 17025. Based in Cikarang, Bekasi.",
  },
  hero: {
    label: "Chemical Analyst · Quality Control",
    headline: "Khrisanty Galih Mestikasari",
    statement:
      "Six years of keeping results honest — from pharmaceutical QC labs to incoming material inspection. I turn samples, specs and data into decisions a plant can trust.",
  },
  snapshot: [
    { label: "Experience", value: "6+ years" },
    { label: "Industries", value: "Pharma & Manufacturing" },
    { label: "Standards", value: "GMP · ISO 17025" },
    { label: "Instruments", value: "HPLC · GC · ICP-OES" },
    { label: "Based in", value: "Cikarang, Bekasi" },
  ],
  about: [
    "I'm a Chemical Analyst and Quality Control specialist with more than six years across pharmaceutical and manufacturing quality. My work sits where data meets decisions: inspecting incoming materials, transferring and validating analytical methods, and closing quality issues through MDR and CAPA.",
    "I'm equally at home with a burette and an HPLC — conventional wet chemistry and instrumental analysis (HPLC, GC, UV-Vis, AAS, ICP-OES) — always within GMP and ISO discipline. I hold a D3 in Chemical Analysis from IPB University and a Bachelor's in Chemical Engineering from Jayabaya University, earned while working full-time.",
    "Most recently I moved from pharmaceutical testing into incoming material inspection and packaging compliance, supporting readiness for the EU Packaging and Packaging Waste Regulation (PPWR). I like small, steady improvements: QCC projects, routine Genba, and check sheets that make the next inspection easier than the last.",
  ],
  experience: [
    {
      id: "dmc",
      role: "Incoming Quality Control Technician",
      company: "PT DMC Technology Indonesia",
      location: "Cikarang, Bekasi",
      start: "Jul 2026",
      end: "Present",
      sector: "Manufacturing",
      summary:
        "Gatekeeping incoming materials so only conforming parts reach the warehouse and the line.",
      highlights: [
        "Inspect incoming materials and answer material inspection requests (FPP), drafting check sheets that make routine materials faster to judge.",
        "Judge stock material in the warehouse or on the production floor against standard criteria to resolve disposition requests (LPJ).",
        "Document non-conforming (NG) material in daily feedback, Material Discrepancy Reports (MDR) and debit notes, and help compile the monthly MDR report.",
        "Support special-acceptance decisions for discrepant or urgently needed material, with a full investigation behind every call.",
        "Support the Assistant Manager on the company's readiness project for the EU Packaging and Packaging Waste Regulation (PPWR).",
        "Run routine Genba walks to find and fix quality issues where they start.",
      ],
      caseSlugs: ["ppwr-packaging-compliance", "incoming-material-gatekeeping"],
    },
    {
      id: "sakafarma",
      role: "Quality Control Analyst",
      company: "PT Sakafarma Laboratories",
      location: "Cikarang, Bekasi",
      start: "Jul 2023",
      end: "Jun 2026",
      sector: "Pharmaceutical",
      summary:
        "Qualitative and quantitative release and stability testing in a GMP pharmaceutical QC lab.",
      highlights: [
        "Tested raw materials, semi-finished goods and stability samples with titrimetric methods, UV-Vis spectrophotometry, HPLC and ICP-OES.",
        "Ran routine, non-routine and special samples, including analytical method transfer and validation work on new or modified procedures.",
        "Drafted study protocols for Quality Control Circle (QCC) projects focused on process optimization and lab efficiency.",
        "Supported the Supervisor in Out-of-Specification (OOS) investigations and the resulting Corrective and Preventive Actions (CAPA).",
      ],
      caseSlugs: ["oos-investigation-capa", "method-transfer-validation", "qcc-genba-improvement"],
    },
    {
      id: "kalbe",
      role: "Quality Control Analyst",
      company: "PT Kalbe Farma Tbk",
      location: "Cikarang, Bekasi",
      start: "Dec 2019",
      end: "Jun 2023",
      sector: "Pharmaceutical",
      summary:
        "Three and a half years of stability and in-process testing at one of Indonesia's largest pharmaceutical manufacturers.",
      highlights: [
        "Performed qualitative and quantitative analysis of stability and semi-finished products.",
        "Applied gravimetric and titrimetric methods alongside AAS, GC, FTIR and HPLC on routine, non-routine and special samples.",
        "Prepared reagents, solutions and reference standards, and performed instrument calibration.",
        "Interpreted analytical data and compiled reports that fed directly into quality release decisions.",
      ],
      caseSlugs: [],
    },
    {
      id: "sucofindo",
      role: "Laboratory Analyst (Intern)",
      company: "PT Sucofindo — Services Laboratory",
      location: "Cilegon, Banten",
      start: "Feb 2019",
      end: "May 2019",
      sector: "Testing services",
      summary: "Environmental testing internship in a commercial testing laboratory.",
      highlights: [
        "Assessed water quality using UV-Vis spectrophotometry, gravimetric and titrimetric methods.",
        "Characterized waste samples by atomic absorption spectroscopy (AAS).",
      ],
      caseSlugs: [],
    },
  ],
  expertise: [
    {
      title: "Quality Systems",
      blurb: "The frameworks every result has to stand up to.",
      sets: [
        {
          items: [
            "Good Manufacturing Practice (GMP)",
            "Good Laboratory Practice (GLP)",
            "ISO/IEC 17025",
            "ISO 9001",
            "ISO 14001",
            "OOS investigation & CAPA",
            "Material Discrepancy Report (MDR)",
            "Method transfer & validation",
            "EU PPWR readiness",
            "QCC & Genba",
          ],
        },
      ],
    },
    {
      title: "Analytical Methods",
      blurb: "Classical chemistry and modern instruments, chosen to fit the question.",
      sets: [
        {
          label: "Conventional",
          items: ["Gravimetry", "Titrimetry", "Physical testing"],
        },
        {
          label: "Instrumental",
          items: [
            "HPLC",
            "UPLC",
            "GC",
            "ICP-OES",
            "AAS",
            "UV-Vis",
            "FTIR",
            "TLC",
            "TOC analyzer",
            "pH meter",
            "Viscometer",
            "Densitometer",
            "Pull gauge",
          ],
        },
      ],
    },
    {
      title: "Tools",
      blurb: "Where the data lives and how it gets reported.",
      sets: [
        {
          items: [
            "Empower 3 (CDS)",
            "Oracle",
            "Microsoft Office",
            "Canva",
            "English — spoken & written",
          ],
        },
      ],
    },
  ],
  education: [
    {
      school: "Jayabaya University",
      degree: "Bachelor's (S1), Chemical Engineering",
      period: "2022 — 2024",
      gpa: "3.59",
      focus: [
        "Chemical process design",
        "Material & energy balances",
        "Environmental & safety engineering",
      ],
    },
    {
      school: "IPB University",
      degree: "Diploma (D3), Chemical Analysis",
      period: "2016 — 2019",
      gpa: "3.37",
      focus: [
        "Calibration",
        "Conventional & instrumental analysis",
        "ISO 9001, ISO 14001, ISO/IEC 17025",
      ],
    },
  ],
  certificates: [
    {
      title: "Public Training: Preventive Maintenance for Laboratory Equipment",
      year: "2019",
    },
    {
      title:
        "Introduction and Implementation of ISO for Competency Certification (ISO 14001 & ISO/IEC 17025)",
      year: "2017",
    },
    { title: "Hatchling Conservation and Release", year: "2017" },
  ],
  beyond: {
    intro:
      "Outside the lab I've always ended up holding the books, the minutes or the first-aid kit — the quiet jobs that keep a group running.",
    feature: {
      title: "Hatchling Conservation & Release",
      year: "2017",
      body: "A hands-on conservation program caring for and releasing hatchlings — patient, careful work with a living outcome. It's still the reminder I carry into QC: protocols exist to protect something real.",
    },
    organizations: [
      {
        org: "Chemical Analysis Student Cooperative",
        short: "KOKIM · IPB University",
        roles: [
          { title: "Staff", year: "2016" },
          { title: "Treasurer", year: "2017" },
          { title: "Staff", year: "2018" },
        ],
        note: "Three years running a student cooperative, including a year keeping its books.",
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
    headline: "Let's talk quality.",
    body: "Hiring for QC, QA or laboratory roles in pharma or manufacturing? Email is the fastest way to reach me.",
  },
  confidentiality:
    "Case studies are generalized to protect employer confidentiality: no supplier names, product names or internal data are shown.",
} satisfies ProfileInput
