export const ethicsContent = {
  academicPurpose: {
    title: "Academic Research Purpose",
    text: "The Advanced MPIDISM research project is an academic investigation conducted as a final-year engineering thesis. Its goal is to analyze linguistic patterns, code-mixed nuances, and transformer representation capabilities in multilingual Indian political discourse during the 2024 General Elections.",
  },
  disclaimer: {
    title: "Non-Profiling & Ethical Statement",
    statement: "This project and its associated models are developed solely for aggregate linguistic and statistical analysis. They are strictly NOT intended, authorized, or designed for individual surveillance, personal profiling, voter micro-targeting, censorship, or commercial political campaigning.",
  },
  limitations: [
    {
      title: "Nuances of Sarcasm and Irony",
      description: "Indian political discourse frequently relies on subtle cultural irony, rhetorical questions, and satirical memes. While sarcasm inversion heuristics and contextual transformers mitigate obvious cases, complex double-irony remains prone to misclassification.",
    },
    {
      title: "Code-Mixing & Vernacular Dialects",
      description: "Hinglish, Tanglish, and regional vernaculars exhibit no standardized grammatical rules or spelling. Transliteration variants (e.g., 'acha', 'achha', 'achaa') introduce phonetic out-of-vocabulary challenges that can degrade lexical matching.",
    },
    {
      title: "Rule-Based Seed Labeling Risks",
      description: "Prototype 1 employs rule-based heuristics to bootstrap initial pseudo-labels. While essential for low-resource bootstrapping, heuristics can propagate systemic label noise to downstream supervised classifiers if not rigorously cross-validated.",
    },
    {
      title: "Demographic & Platform Sampling Bias",
      description: "Social media users on platforms like Twitter and Reddit represent a technologically literate, urban-skewed demographic that does not represent the full socioeconomic spectrum of India's 900+ million voting populace.",
    },
    {
      title: "Potential Misuse & Astroturfing Sensitivity",
      description: "Public opinion monitoring tools can hypothetically be co-opted for disinformation tracking or voter suppression. We incorporate bot detection and temporal drift constraints specifically to expose astroturfing rather than facilitate it.",
    },
  ],
  guidelines: [
    "All social media data collected complies with platform developer terms and is fully anonymized before publication.",
    "No personally identifiable information (PII), phone numbers, or geo-coordinates are stored or exposed.",
    "Open-source release of code and synthetic evaluation sets is intended to advance multilingual NLP research across low-resource Indic languages.",
  ],
};
