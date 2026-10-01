export interface DataSource {
  id: string;
  name: string;
  sourceType: string;
  frequency: string;
  languages: string[];
  description: string;
  pipelineScript?: string;
  recordCount: string;
  isPlaceholderCount: boolean;
}

export interface LabelClass {
  id: string;
  party: string;
  stance: string;
  description: string;
  exampleSnippet: string;
  color: string;
}

export const dataSources: DataSource[] = [
  {
    id: "kaggle-india-votes",
    name: "Kaggle IndiaVotes2024 Tweets",
    sourceType: "Historical Archive",
    frequency: "Static Baseline (Apr-Jun 2024)",
    languages: ["Hindi", "Hinglish", "Bengali", "Tamil", "English"],
    description: "Core archival tweet corpus covering political discourse, campaign announcements, hashtags, and public reactions during the 7 phases of the 2024 Indian General Elections.",
    pipelineScript: "merge_election_data.py",
    recordCount: "35,000+ posts",
    isPlaceholderCount: true,
  },
  {
    id: "rss-news",
    name: "National & Regional Daily News (RSS)",
    sourceType: "RSS Aggregator",
    frequency: "Continuous Daily Ingestion",
    languages: ["Hindi", "English", "Bengali"],
    description: "Automated collector monitoring editorial headlines and news articles across prominent Indian media outlets (The Hindu, Indian Express, Dainik Jagran, Anandabazar Patrika).",
    pipelineScript: "collect_daily.py",
    recordCount: "12,000+ articles",
    isPlaceholderCount: true,
  },
  {
    id: "reddit-collector",
    name: "Reddit Political Discussions",
    sourceType: "Reddit API / Streaming",
    frequency: "Daily Ingestion",
    languages: ["English", "Hinglish"],
    description: "Long-form discussion threads from major community subreddits (r/india, r/IndiaSpeaks, r/unitedstatesofindia) capturing code-mixed political arguments.",
    pipelineScript: "collect_daily.py",
    recordCount: "8,500+ threads",
    isPlaceholderCount: true,
  },
  {
    id: "ec-results",
    name: "2024 Lok Sabha Ground Truth",
    sourceType: "Constituency Election Data",
    frequency: "Official Final Count",
    languages: ["English", "Official Records"],
    description: "Official Election Commission constituency-level data spanning all 543 Parliamentary Constituencies with winning candidate names, victory margins, and vote shares.",
    pipelineScript: "merge_election_data.py",
    recordCount: "543 Constituencies",
    isPlaceholderCount: false,
  },
];

export const labelClasses: LabelClass[] = [
  {
    id: "pro_bjp",
    party: "BJP",
    stance: "Pro",
    description: "Expresses support, praise, or alignment with Bharatiya Janata Party policies, leadership, or initiatives.",
    exampleSnippet: "Modi ji ne infrastructure aur digital payment me lajawab kaam kiya hai.",
    color: "#f97316",
  },
  {
    id: "anti_bjp",
    party: "BJP",
    stance: "Anti",
    description: "Expresses criticism, opposition, or dissent towards BJP governance, decisions, or rhetoric.",
    exampleSnippet: "Unemployment and inflation are reaching record highs under this regime.",
    color: "#ea580c",
  },
  {
    id: "pro_congress",
    party: "Congress",
    stance: "Pro",
    description: "Expresses support or alignment with Indian National Congress leaders or manifesto promises.",
    exampleSnippet: "Congress NYAY scheme will directly empower the working class households.",
    color: "#3b82f6",
  },
  {
    id: "anti_congress",
    party: "Congress",
    stance: "Anti",
    description: "Expresses criticism, opposition, or critique of Congress policies, past record, or leadership.",
    exampleSnippet: "Decades of corruption and nepotism ruined basic public infrastructure.",
    color: "#1d4ed8",
  },
  {
    id: "pro_aap",
    party: "AAP",
    stance: "Pro",
    description: "Expresses support for Aam Aadmi Party governance models, notably Delhi/Punjab schools and clinics.",
    exampleSnippet: "Mohalla clinics aur free electricity model har state ko follow karna chahiye.",
    color: "#06b6d4",
  },
  {
    id: "anti_aap",
    party: "AAP",
    stance: "Anti",
    description: "Expresses criticism or opposition to AAP policies, controversies, or administration.",
    exampleSnippet: "Liquor policy scam exposed the real face of their so-called honesty.",
    color: "#0891b2",
  },
  {
    id: "pro_tmc",
    party: "TMC",
    stance: "Pro",
    description: "Expresses support for All India Trinamool Congress in West Bengal and regional welfare schemes.",
    exampleSnippet: "Kanyashree and Lakshmir Bhandar have uplifted millions of women in Bengal.",
    color: "#10b981",
  },
  {
    id: "anti_tmc",
    party: "TMC",
    stance: "Anti",
    description: "Expresses opposition to TMC political dominance, law and order, or governance.",
    exampleSnippet: "Violence during local civic polls undermines grassroots democratic institutions.",
    color: "#059669",
  },
  {
    id: "neutral",
    party: "Neutral / Non-partisan",
    stance: "Neutral",
    description: "Factual reporting, voter awareness guidelines, neutral administrative announcements, or non-ideological queries.",
    exampleSnippet: "Phase 4 polling records 67.2% overall voter turnout across 96 constituencies.",
    color: "#64748b",
  },
];

export const classDistributionPlaceholder = [
  { name: "Pro-BJP", count: 7200, percentage: 18.0, isPlaceholder: true },
  { name: "Anti-BJP", count: 6800, percentage: 17.0, isPlaceholder: true },
  { name: "Pro-Congress", count: 5200, percentage: 13.0, isPlaceholder: true },
  { name: "Anti-Congress", count: 4800, percentage: 12.0, isPlaceholder: true },
  { name: "Pro-AAP", count: 2800, percentage: 7.0, isPlaceholder: true },
  { name: "Anti-AAP", count: 2400, percentage: 6.0, isPlaceholder: true },
  { name: "Pro-TMC", count: 2100, percentage: 5.2, isPlaceholder: true },
  { name: "Anti-TMC", count: 1900, percentage: 4.8, isPlaceholder: true },
  { name: "Neutral", count: 6800, percentage: 17.0, isPlaceholder: true },
];

export const languageDistributionPlaceholder = [
  { language: "Hindi (Devanagari)", code: "hi", count: 14500, percentage: 36.2, isPlaceholder: true },
  { language: "Hinglish (Code-Mixed)", code: "hi-en", count: 12800, percentage: 32.0, isPlaceholder: true },
  { language: "English", code: "en", count: 7200, percentage: 18.0, isPlaceholder: true },
  { language: "Bengali", code: "bn", count: 3200, percentage: 8.0, isPlaceholder: true },
  { language: "Tamil", code: "ta", count: 2300, percentage: 5.8, isPlaceholder: true },
];
