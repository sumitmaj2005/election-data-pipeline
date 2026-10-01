export interface TeamMember {
  id: string;
  name: string;
  titleRole: string;
  isPlaceholder: boolean;
  avatarPlaceholder: string;
  tasks: string[];
  responsibilities: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "M1",
    name: "Member 1 [Placeholder]",
    titleRole: "Data Ingestion & Text Processing Lead",
    isPlaceholder: true,
    avatarPlaceholder: "M1",
    responsibilities: "Cleaning, text processing, MuRIL dataset prep, drift detection",
    tasks: [
      "Pipeline text cleaning, deduplication, and de-emojification",
      "Preprocessing multilingual Indic scripts (Devanagari, Bengali, Tamil)",
      "MuRIL dataset preparation, token alignment, and stratified splits",
      "Temporal drift detection implementation using Jensen-Shannon divergence",
    ],
    links: {
      github: "https://github.com/adiris123/election-data-pipeline",
      linkedin: "#",
      email: "member1@example.edu",
    },
  },
  {
    id: "M2",
    name: "Member 2 [Placeholder]",
    titleRole: "Translation & Multimodal Lead",
    isPlaceholder: true,
    avatarPlaceholder: "M2",
    responsibilities: "Translation, image captions, error analysis, bot detection",
    tasks: [
      "IndicTrans2 batch translation infrastructure and vernacular mapping",
      "BLIP vision-language model integration for image and meme captioning",
      "Qualitative error analysis across misclassified code-mixed instances",
      "Bot and coordinated behavior detection using Isolation Forest",
    ],
    links: {
      github: "https://github.com/adiris123/election-data-pipeline",
      linkedin: "#",
      email: "member2@example.edu",
    },
  },
  {
    id: "M3",
    name: "Member 3 [Placeholder]",
    titleRole: "Transformer Models & Telemetry Lead",
    isPlaceholder: true,
    avatarPlaceholder: "M3",
    responsibilities: "Sentiment and sarcasm, evaluation, MuRIL fine-tuning, dashboard",
    tasks: [
      "XLM-RoBERTa sentiment analysis and contextual sarcasm disambiguation",
      "Core MuRIL (google/muril-base-cased) multilingual transformer fine-tuning",
      "Macro F1 and per-class evaluation benchmark execution",
      "Interactive Streamlit dashboard development for research demonstration",
    ],
    links: {
      github: "https://github.com/adiris123/election-data-pipeline",
      linkedin: "#",
      email: "member3@example.edu",
    },
  },
  {
    id: "M4",
    name: "Member 4 [Placeholder]",
    titleRole: "Network Graph & Classical Modeling Lead",
    isPlaceholder: true,
    avatarPlaceholder: "M4",
    responsibilities: "Ideology labelling and XGBoost, BiLSTM, inference class, graph analysis",
    tasks: [
      "Rule-based seed ideology labelling and lexicon curation",
      "TF-IDF feature extraction and XGBoost baseline modeling",
      "BiLSTM with attention implementation for multimodal feature fusion",
      "Reusable Python inference engine class and retweet network graph analysis (PageRank & Louvain)",
    ],
    links: {
      github: "https://github.com/adiris123/election-data-pipeline",
      linkedin: "#",
      email: "member4@example.edu",
    },
  },
];
