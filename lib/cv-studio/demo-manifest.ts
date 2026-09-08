export type DemoVariant = "named" | "anonymous";
export type DemoFormat = "docx" | "pdf";

export type DemoAsset = {
  fileName: string;
  mimeType: string;
};

export type DemoCandidate = {
  id: string;
  name: string;
  role: string;
  source: {
    fileName: string;
    sha256: string;
  };
  named: Record<DemoFormat, DemoAsset>;
  anonymous: Record<DemoFormat, DemoAsset>;
};

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const PDF_MIME = "application/pdf";

export const demoCandidates = [
  {
    id: "marieke",
    name: "Marieke van Dijk",
    role: "Senior Controller",
    source: {
      fileName: "01_BronCV_Marieke_van_Dijk.docx",
      sha256: "3d66a39d4bfeb1c95e6895ea0ab0af419b55981a5f747944282883cddf8caedd",
    },
    named: {
      docx: { fileName: "04_Bluefin_Marieke_van_Dijk.docx", mimeType: DOCX_MIME },
      pdf: { fileName: "05_Bluefin_Marieke_van_Dijk.pdf", mimeType: PDF_MIME },
    },
    anonymous: {
      docx: { fileName: "06_Bluefin_Marieke_van_Dijk_ANONIEM.docx", mimeType: DOCX_MIME },
      pdf: { fileName: "07_Bluefin_Marieke_van_Dijk_ANONIEM.pdf", mimeType: PDF_MIME },
    },
  },
  {
    id: "thomas",
    name: "Thomas de Boer",
    role: "Financial Controller / Business Controller",
    source: {
      fileName: "02_BronCV_Thomas_de_Boer.pdf",
      sha256: "c960ac67392aff6ba7255d962201b0363d7db8e92829a6af97e45eef0306e369",
    },
    named: {
      docx: { fileName: "08_Bluefin_Thomas_de_Boer.docx", mimeType: DOCX_MIME },
      pdf: { fileName: "09_Bluefin_Thomas_de_Boer.pdf", mimeType: PDF_MIME },
    },
    anonymous: {
      docx: { fileName: "10_Bluefin_Thomas_de_Boer_ANONIEM.docx", mimeType: DOCX_MIME },
      pdf: { fileName: "11_Bluefin_Thomas_de_Boer_ANONIEM.pdf", mimeType: PDF_MIME },
    },
  },
  {
    id: "sophie",
    name: "Sophie Jansen",
    role: "Business Controller",
    source: {
      fileName: "03_BronCV_Sophie_Jansen.docx",
      sha256: "78a14a6b10b9f95da030afcda2300067d8f7f7de87d3be4c4663860deff818c9",
    },
    named: {
      docx: { fileName: "12_Bluefin_Sophie_Jansen.docx", mimeType: DOCX_MIME },
      pdf: { fileName: "13_Bluefin_Sophie_Jansen.pdf", mimeType: PDF_MIME },
    },
    anonymous: {
      docx: { fileName: "14_Bluefin_Sophie_Jansen_ANONIEM.docx", mimeType: DOCX_MIME },
      pdf: { fileName: "15_Bluefin_Sophie_Jansen_ANONIEM.pdf", mimeType: PDF_MIME },
    },
  },
] as const satisfies readonly DemoCandidate[];

export type DemoCandidateId = (typeof demoCandidates)[number]["id"];

export function getDemoCandidate(candidateId: string) {
  return demoCandidates.find((candidate) => candidate.id === candidateId);
}

export function resolveCandidateIdBySourceHash(sha256: string) {
  return demoCandidates.find((candidate) => candidate.source.sha256 === sha256.toLowerCase())?.id ?? null;
}

export function isDemoVariant(value: string): value is DemoVariant {
  return value === "named" || value === "anonymous";
}

export function isDemoFormat(value: string): value is DemoFormat {
  return value === "docx" || value === "pdf";
}

export function getDemoOutputAsset(candidateId: string, variant: string, format: string) {
  const candidate = getDemoCandidate(candidateId);
  if (!candidate || !isDemoVariant(variant) || !isDemoFormat(format)) return null;
  return candidate[variant][format];
}
