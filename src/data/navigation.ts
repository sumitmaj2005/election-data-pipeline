export interface NavItem {
  name: string;
  path: string;
  description: string;
}

export const navigationLinks: NavItem[] = [
  { name: "Home", path: "/", description: "Overview, quick classifier, and project summary" },
  { name: "Live Demo", path: "/demo", description: "Interactive client-side rule-based classifier" },
  { name: "Pipeline", path: "/pipeline", description: "Four prototypes from baseline to graph analysis" },
  { name: "Results", path: "/results", description: "Benchmark F1 metrics, ablations, and confusion matrix" },
  { name: "Data", path: "/data", description: "Datasets, distributions, and 2024 Lok Sabha constituency table" },
  { name: "Team", path: "/team", description: "Investigators, responsibilities, and contributions" },
  { name: "Progress", path: "/progress", description: "Deliverable checklist and milestone tracking" },
  { name: "About / Ethics", path: "/about", description: "Academic purpose, limitations, and ethical safeguards" },
];
