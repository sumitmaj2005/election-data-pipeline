export interface PipelineStage {
  id: 'P1' | 'P2' | 'P3' | 'P4';
  title: string;
  name: string;
  tagline: string;
  status: 'in-progress' | 'planned' | 'completed';
  targetF1: string;
  isCoreContribution: boolean;
  stack: string[];
  inputs: string[];
  outputs: string[];
  steps: {
    title: string;
    description: string;
    details: string[];
  }[];
}

export const pipelineStages: PipelineStage[] = [
  {
    id: 'P1',
    title: 'Prototype 1',
    name: 'Translation Baseline & Feature Engineering',
    tagline: 'Translate Indic texts to English, extract sentiment and sarcasm, classify with XGBoost',
    status: 'in-progress',
    targetF1: '>= 0.75',
    isCoreContribution: false,
    stack: ['IndicTrans2', 'XLM-RoBERTa', 'XGBoost', 'TF-IDF', 'Scikit-Learn'],
    inputs: [
      'Raw multilingual posts (Hindi, Hinglish, Bengali, Tamil, English)',
      'Party keywords dictionary',
      'Sentiment lexicons',
    ],
    outputs: [
      'Cleaned & translated English text corpora',
      'Sentiment (Positive/Negative/Neutral) & Sarcasm flags',
      'Rule-based ideology seed labels',
      'TF-IDF feature vectors + XGBoost 9-class predictions',
    ],
    steps: [
      {
        title: 'Text Cleaning & Normalization',
        description: 'Remove URLs, emojis, platform artifacts, and normalize Unicode Indic scripts.',
        details: [
          'De-emojification and hashtag segmentation',
          'Code-mixed Hinglish transliteration handling',
          'Deduplication across scraped Twitter, RSS, and Reddit feeds',
        ],
      },
      {
        title: 'Machine Translation via IndicTrans2',
        description: 'Translate non-English source texts into English to create an initial unified feature baseline.',
        details: [
          'Batch inference using AI4Bharat IndicTrans2 model checkpoints',
          'Handling vernacular nuances and low-resource grammatical constructs',
        ],
      },
      {
        title: 'Sentiment & Sarcasm Disambiguation',
        description: 'Extract affective orientation using XLM-RoBERTa and rule-based sarcasm heuristics.',
        details: [
          'XLM-RoBERTa fine-tuned sentiment logits',
          'Sarcasm inversion logic: negative context behind praise or hyperbole flips polarity',
        ],
      },
      {
        title: 'TF-IDF + XGBoost Classification',
        description: 'Train gradient boosted decision trees on n-gram TF-IDF representations.',
        details: [
          'Targeting weighted F1 >= 0.75 across all 9 political ideology classes',
          'Serves as the benchmark baseline against which neural architectures are evaluated',
        ],
      },
    ],
  },
  {
    id: 'P2',
    title: 'Prototype 2',
    name: 'Multimodal Representation',
    tagline: 'Combine textual tokens with vision-language BLIP captions and BiLSTM with Attention',
    status: 'planned',
    targetF1: '>= 0.80',
    isCoreContribution: false,
    stack: ['BLIP (Salesforce)', 'PyTorch', 'BiLSTM', 'Bahdanau Attention'],
    inputs: [
      'Multimodal social media posts with embedded banners, memes, and photos',
      'IndicTrans2 translated text representations',
    ],
    outputs: [
      'Generated visual synthetic captions describing political images/memes',
      'Joint multimodal dense embedding representations',
      'BiLSTM-Attention ideology classification logits',
    ],
    steps: [
      {
        title: 'Visual Feature Extraction (BLIP)',
        description: 'Generate semantic textual captions for political imagery, banners, and campaign infographics.',
        details: [
          'Zero-shot caption generation on campaign rally photos, candidate posters, and infographic memes',
          'Concatenation of visual semantics with post textual metadata',
        ],
      },
      {
        title: 'Attention-Guided BiLSTM Modeling',
        description: 'Feed dual sequences through a Bidirectional LSTM with soft attention weighting.',
        details: [
          'Learns word-level and caption-level saliency weights',
          'Focuses attention on pivotal political keywords and contrastive qualifiers',
        ],
      },
    ],
  },
  {
    id: 'P3',
    title: 'Prototype 3',
    name: 'Native Multilingual MuRIL Fine-Tuning',
    tagline: 'Fine-tune google/muril-base-cased on native Indian scripts without translation loss',
    status: 'planned',
    targetF1: '>= 0.88',
    isCoreContribution: true,
    stack: ['google/muril-base-cased', 'HuggingFace Transformers', 'PyTorch', 'Accelerate'],
    inputs: [
      'Raw native Indic scripts (Hindi, Bengali, Tamil) and Romanized Hinglish',
      'Stratified 9-class balanced train/val/test splits',
    ],
    outputs: [
      'Fine-tuned MuRIL transformer weights',
      'Cross-lingual ideological representation vectors',
      'Production inference module capable of native classification',
    ],
    steps: [
      {
        title: 'Native Tokenization without Information Loss',
        description: 'Retain original scripts and colloquial code-mixed patterns using MuRIL multilingual vocabulary.',
        details: [
          'Direct tokenization with google/muril-base-cased tokenizer trained specifically on Indian languages',
          'Avoids translation artifacts and lexical loss common in translation cascades',
        ],
      },
      {
        title: 'Transformer Architecture Fine-Tuning',
        description: 'Fine-tune 12 transformer encoder layers with classification head and focal loss.',
        details: [
          'Focal loss / class-weighted cross-entropy to handle long-tail party mentions',
          'Learning rate warmup with AdamW optimizer and linear decay',
          'Target weighted F1 >= 0.88 across all five linguistic streams',
        ],
      },
      {
        title: 'Cross-Lingual Zero-Shot / Few-Shot Validation',
        description: 'Validate model generalization across regional elections and code-switched variations.',
        details: [
          'Evaluation against Bengali and Tamil held-out test splits',
          'Ablation of script representation vs translation pipeline',
        ],
      },
    ],
  },
  {
    id: 'P4',
    title: 'Prototype 4',
    name: 'Network Graph, Drift & Interactive Dashboard',
    tagline: 'Social retweet network analysis, bot filtering, temporal drift, and Streamlit telemetry',
    status: 'planned',
    targetF1: 'N/A (Analytical / Telemetry)',
    isCoreContribution: false,
    stack: ['NetworkX', 'Louvain Community Detection', 'Isolation Forest', 'Streamlit', 'SciPy'],
    inputs: [
      'User interaction and retweet metadata from IndiaVotes2024 collection',
      'Daily RSS and Reddit streaming collector feeds',
      'Constituency-level 2024 Lok Sabha election results',
    ],
    outputs: [
      'Retweet echo chamber graphs with PageRank centralities',
      'Automated bot/inauthentic behavior filtration flags',
      'Temporal divergence metrics (Jensen-Shannon divergence)',
      'Operational Streamlit analytics dashboard',
    ],
    steps: [
      {
        title: 'Interaction Graph & Community Detection',
        description: 'Construct directed interaction networks and partition ideological clusters.',
        details: [
          'PageRank algorithm to identify ideological influencers and central broadcast hubs',
          'Louvain modularity optimization for echo chamber and party polarization detection',
        ],
      },
      {
        title: 'Bot & Sybil Filtering with Isolation Forest',
        description: 'Detect synthetic and coordinated inauthentic accounts distorting sentiment metrics.',
        details: [
          'Unsupervised outlier detection based on posting frequency, retweet ratio, and account creation age',
          'Prevents astroturfing campaigns from skewing ideology estimates',
        ],
      },
      {
        title: 'Temporal Drift Tracking (Jensen-Shannon)',
        description: 'Quantify shifts in party sentiment and ideological polarity over the election cycle.',
        details: [
          'Jensen-Shannon divergence computed across weekly time windows',
          'Correlates sentiment spikes with real-world campaign events and candidate announcements',
        ],
      },
      {
        title: 'Streamlit Deployment Interface',
        description: 'Full-featured researcher dashboard for live monitoring and constituency drill-down.',
        details: [
          'Interactive map linked to 543 constituency ground truth results',
          'Live inference testing panel for researchers and examiners',
        ],
      },
    ],
  },
];
