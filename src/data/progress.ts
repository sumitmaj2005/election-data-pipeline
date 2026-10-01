export interface DeliverableItem {
  id: string;
  category: string;
  title: string;
  description: string;
  owner: string;
  defaultCompleted: boolean;
}

export const initialDeliverables: DeliverableItem[] = [
  // Data Collection & Ingestion
  {
    id: "data-1",
    category: "Data Collection & Ingestion",
    title: "Kaggle IndiaVotes2024 Tweet Ingestion",
    description: "Download, verify checksums, and store raw tweet corpus with engagement metadata.",
    owner: "Member 1",
    defaultCompleted: true,
  },
  {
    id: "data-2",
    category: "Data Collection & Ingestion",
    title: "Daily RSS & Reddit Collector Implementation",
    description: "Build collect_daily.py to continuously fetch headlines and forum threads.",
    owner: "Member 1",
    defaultCompleted: true,
  },
  {
    id: "data-3",
    category: "Data Collection & Ingestion",
    title: "Constituency-Level Ground Truth Mapping",
    description: "Clean and verify 543 Lok Sabha 2024 election constituency winners and margins.",
    owner: "Member 1",
    defaultCompleted: true,
  },

  // Prototype 1 - Baseline
  {
    id: "p1-1",
    category: "Prototype 1: Baseline",
    title: "IndicTrans2 Batch Translation Pipeline",
    description: "Configure AI4Bharat IndicTrans2 to translate non-English source texts to English.",
    owner: "Member 2",
    defaultCompleted: true,
  },
  {
    id: "p1-2",
    category: "Prototype 1: Baseline",
    title: "XLM-RoBERTa Sentiment & Sarcasm Heuristics",
    description: "Extract sentence-level sentiment and detect sarcastic polarity inversion.",
    owner: "Member 3",
    defaultCompleted: true,
  },
  {
    id: "p1-3",
    category: "Prototype 1: Baseline",
    title: "Rule-Based Ideology Label Generation",
    description: "Match party entities with sentiment polarities to produce 9-class seed labels.",
    owner: "Member 4",
    defaultCompleted: true,
  },
  {
    id: "p1-4",
    category: "Prototype 1: Baseline",
    title: "TF-IDF + XGBoost Baseline Classification",
    description: "Train gradient boosted decision trees aiming for weighted F1 >= 0.75.",
    owner: "Member 4",
    defaultCompleted: false, // in progress
  },

  // Prototype 2 - Multimodal
  {
    id: "p2-1",
    category: "Prototype 2: Multimodal",
    title: "BLIP Political Image/Meme Captioning",
    description: "Generate synthetic textual representations for campaign rally images and infographics.",
    owner: "Member 2",
    defaultCompleted: false,
  },
  {
    id: "p2-2",
    category: "Prototype 2: Multimodal",
    title: "BiLSTM with Attention Architecture",
    description: "Implement dual-stream text and caption fusion with attention targeting F1 >= 0.80.",
    owner: "Member 4",
    defaultCompleted: false,
  },

  // Prototype 3 - MuRIL (Core Contribution)
  {
    id: "p3-1",
    category: "Prototype 3: MuRIL (Core)",
    title: "Multilingual Stratified Tokenization & Data Prep",
    description: "Tokenize native Hindi, Bengali, Tamil, Hinglish, and English without translation loss.",
    owner: "Member 1",
    defaultCompleted: false,
  },
  {
    id: "p3-2",
    category: "Prototype 3: MuRIL (Core)",
    title: "google/muril-base-cased Fine-Tuning Setup",
    description: "Fine-tune 12-layer MuRIL transformer with focal loss on balanced 9-class dataset.",
    owner: "Member 3",
    defaultCompleted: false,
  },
  {
    id: "p3-3",
    category: "Prototype 3: MuRIL (Core)",
    title: "F1 >= 0.88 Benchmark Validation & Ablations",
    description: "Evaluate macro and per-class metrics against held-out validation sets.",
    owner: "Member 3",
    defaultCompleted: false,
  },

  // Prototype 4 - Network Graph & Dashboard
  {
    id: "p4-1",
    category: "Prototype 4: Graph & Telemetry",
    title: "Retweet Network Graph (PageRank & Louvain)",
    description: "Analyze echo chambers, polarization, and influential broadcaster nodes with NetworkX.",
    owner: "Member 4",
    defaultCompleted: false,
  },
  {
    id: "p4-2",
    category: "Prototype 4: Graph & Telemetry",
    title: "Bot & Coordinated Inauthentic Detection (Isolation Forest)",
    description: "Filter automated spam and astroturfing accounts to preserve sentiment validity.",
    owner: "Member 2",
    defaultCompleted: false,
  },
  {
    id: "p4-3",
    category: "Prototype 4: Graph & Telemetry",
    title: "Temporal Drift Analysis (Jensen-Shannon)",
    description: "Track ideological drift across consecutive election campaign weeks.",
    owner: "Member 1",
    defaultCompleted: false,
  },
  {
    id: "p4-4",
    category: "Prototype 4: Graph & Telemetry",
    title: "Interactive Streamlit Research Dashboard",
    description: "Deploy interactive telemetry interface for live inspection and demo.",
    owner: "Member 3",
    defaultCompleted: false,
  },

  // Final Delivery & Documentation
  {
    id: "doc-1",
    category: "Final Documentation",
    title: "Final Year Thesis Project Report",
    description: "Comprehensive thesis report detailing methodology, experimental results, and ethics.",
    owner: "All Members",
    defaultCompleted: false,
  },
  {
    id: "doc-2",
    category: "Final Documentation",
    title: "Public Project Website Deployment",
    description: "Deploy responsive, research-grade React/TypeScript web portal to GitHub Pages.",
    owner: "All Members",
    defaultCompleted: true,
  },
];
