/**
 * Client-Side Rule-Based Political Ideology Classifier (P1 Baseline Prototype)
 * Advanced MPIDISM Research Project
 *
 * Implements party keyword detection, multilingual/Hinglish sentiment lexicons,
 * and sarcasm inversion heuristics. Designed with a swappable interface so it
 * can seamlessly switch to a hosted MuRIL inference API in future prototypes.
 */

export type PoliticalParty = 'bjp' | 'congress' | 'aap' | 'tmc' | 'neutral' | 'unknown';
export type SentimentPolarity = 'positive' | 'negative' | 'neutral';

export type IdeologyLabel =
  | 'pro_bjp'
  | 'anti_bjp'
  | 'pro_congress'
  | 'anti_congress'
  | 'pro_aap'
  | 'anti_aap'
  | 'pro_tmc'
  | 'anti_tmc'
  | 'neutral';

export interface ClassifierExplanation {
  partyKeywordsMatched: string[];
  sentimentWordsMatched: string[];
  sarcasmApplied: boolean;
  ruleTriggered: string;
  sourceType: 'rule_based_p1' | 'muril_neural';
}

export interface ClassifierResult {
  text: string;
  detectedParty: PoliticalParty;
  detectedPartyName: string;
  rawSentiment: SentimentPolarity;
  effectiveSentiment: SentimentPolarity;
  isSarcastic: boolean;
  ideologyLabel: IdeologyLabel;
  confidence: number;
  explanation: ClassifierExplanation;
}

export interface ClassifierOptions {
  sarcasmOverride?: boolean;
}

export interface ClassifierService {
  classify(text: string, options?: ClassifierOptions): Promise<ClassifierResult> | ClassifierResult;
}

// -------------------------------------------------------------
// LEXICONS & KEYWORDS
// -------------------------------------------------------------

const PARTY_LEXICON: Record<Exclude<PoliticalParty, 'neutral' | 'unknown'>, { name: string; keywords: string[] }> = {
  bjp: {
    name: 'Bharatiya Janata Party (BJP)',
    keywords: [
      'bjp', 'modi', 'narendra modi', 'amit shah', 'yogi', 'adityanath',
      'nda', 'bhagwa', 'saffron', 'lotus', 'kamal', 'bjp4india',
      'भाजपा', 'मोदी', 'नरेंद्र मोदी', 'अमित शाह', 'योगी', 'कमल', 'भगवा',
      'বিজেপি', 'মোদী',
    ],
  },
  congress: {
    name: 'Indian National Congress (INC)',
    keywords: [
      'congress', 'inc', 'rahul gandhi', 'rahul', 'kharge', 'mallikarjun kharge',
      'sonia gandhi', 'priyanka gandhi', 'upa', 'haath', 'panja', 'hand symbol',
      'कांग्रेस', 'राहुल गांधी', 'राहुल', 'खड़गे', 'सोनिया गांधी', 'पंजा', 'हाथ',
      'কংগ্রেস', 'রাহুল গান্ধী',
    ],
  },
  aap: {
    name: 'Aam Aadmi Party (AAP)',
    keywords: [
      'aap', 'kejriwal', 'arvind kejriwal', 'bhagwant mann', 'mann',
      'jhadu', 'broom', 'aam aadmi party', 'atishi', 'sanjay singh',
      'आप', 'केजरीवाल', 'अरविंद केजरीवाल', 'झाड़ू', 'भगवंत मान', 'आम आदमी पार्टी',
    ],
  },
  tmc: {
    name: 'All India Trinamool Congress (AITC)',
    keywords: [
      'tmc', 'mamata', 'mamata banerjee', 'didi', 'trinamool',
      'abhishek banerjee', 'ghashphul', 'aitc',
      'टीएमसी', 'ममता', 'ममता बनर्जी', 'दीदी', 'तृणमूल',
      'তৃণমূল', 'মমতা', 'দিদি', 'অভিষেক বন্দ্যোপাধ্যায়',
    ],
  },
};

const POSITIVE_WORDS = [
  // English
  'good', 'great', 'best', 'excellent', 'superb', 'progress', 'development',
  'growth', 'win', 'winner', 'victory', 'trust', 'strong', 'proud', 'success',
  'successful', 'honest', 'visionary', 'empower', 'benefit', 'support', 'hope',
  // Hinglish
  'achha', 'accha', 'achhi', 'acchi', 'badhiya', 'shandar', 'shandaar',
  'zabardast', 'vikas', 'tarakki', 'bharosa', 'sahi', 'sundar', 'jeetega',
  'jeet', 'vijay', 'superhit', 'kamaal', 'kamal', 'dhamaal', 'sach', 'asli',
  // Hindi Devanagari
  'अच्छा', 'अच्छी', 'बढ़िया', 'शानदार', 'ज़बरदस्त', 'विकास', 'तरक्की',
  'भरोसा', 'जीत', 'सफल', 'सराहनीय', 'ईमानदार', 'उन्नति', 'गौरव',
  // Bengali / Tamil transliterated
  'bhalo', 'unnayan', 'nalla', 'vetri', 'perumai',
];

const NEGATIVE_WORDS = [
  // English
  'bad', 'worst', 'fail', 'failed', 'failure', 'corrupt', 'corruption',
  'scam', 'terrible', 'ruin', 'ruined', 'fraud', 'useless', 'destroy',
  'destroyed', 'loss', 'hate', 'shame', 'shameful', 'inflation', 'unemployment',
  'crisis', 'lie', 'liar', 'cheater', 'dictator', 'disaster',
  // Hinglish
  'barbaad', 'barbad', 'bekar', 'bekaar', 'kharab', 'ghatiya', 'dhokha',
  'chori', 'chor', 'lutera', 'loot', 'nuksan', 'mehangai', 'mehngai',
  'berozgari', 'bhrashtachar', 'jumla', 'haarega', 'harega', 'jhooth', 'jhoot',
  'danga', 'gunda', 'pakhand', 'dhongi',
  // Hindi Devanagari
  'बेकार', 'बर्बाद', 'खराब', 'घटिया', 'धोखा', 'चोर', 'लूट', 'नुकसान',
  'महंगाई', 'बेरोजगारी', 'भ्रष्टाचार', 'जुमला', 'झूठ', 'असफल', 'दंगा', 'विनाश',
  // Bengali / Tamil transliterated
  'kharap', 'dur-niti', 'mosam', 'tholvi', 'keduthal',
];

const SARCASM_HEURISTIC_PATTERNS = [
  /\bwah\s+(re|kya|ji)\b/i,
  /\bkya\s+baat\s+hai\b/i,
  /\bshabaash\b/i,
  /\bsuch\s+a\s+masterstroke\b/i,
  /\bmasterstroke\b/i,
  /\bvaah\s+re\b/i,
  /\bवाह\s+(क्या|रे|जी)\b/i,
  /\bक्या\s+बात\s+है\b/i,
];

// -------------------------------------------------------------
// IMPLEMENTATION
// -------------------------------------------------------------

export class RuleBasedP1Classifier implements ClassifierService {
  classify(rawText: string, options?: ClassifierOptions): ClassifierResult {
    const text = (rawText || '').trim();

    if (!text) {
      return {
        text: '',
        detectedParty: 'neutral',
        detectedPartyName: 'None',
        rawSentiment: 'neutral',
        effectiveSentiment: 'neutral',
        isSarcastic: false,
        ideologyLabel: 'neutral',
        confidence: 0.5,
        explanation: {
          partyKeywordsMatched: [],
          sentimentWordsMatched: [],
          sarcasmApplied: false,
          ruleTriggered: 'Empty text default to neutral',
          sourceType: 'rule_based_p1',
        },
      };
    }

    const lowerText = text.toLowerCase();

    // 1. Detect Party
    const partyMatches: Record<Exclude<PoliticalParty, 'neutral' | 'unknown'>, string[]> = {
      bjp: [],
      congress: [],
      aap: [],
      tmc: [],
    };

    let matchedPartiesCount = 0;
    (Object.keys(PARTY_LEXICON) as Array<Exclude<PoliticalParty, 'neutral' | 'unknown'>>).forEach((partyKey) => {
      const entry = PARTY_LEXICON[partyKey];
      for (const kw of entry.keywords) {
        // Match word boundaries or substring for unicode
        const regex = new RegExp(`(^|\\W)${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|\\W)`, 'iu');
        if (regex.test(text) || lowerText.includes(kw.toLowerCase())) {
          partyMatches[partyKey].push(kw);
        }
      }
      if (partyMatches[partyKey].length > 0) {
        matchedPartiesCount++;
      }
    });

    let primaryParty: PoliticalParty = 'unknown';
    let maxMatchCount = 0;
    let matchedKeywords: string[] = [];

    (Object.keys(partyMatches) as Array<Exclude<PoliticalParty, 'neutral' | 'unknown'>>).forEach((partyKey) => {
      const count = partyMatches[partyKey].length;
      if (count > maxMatchCount) {
        maxMatchCount = count;
        primaryParty = partyKey;
        matchedKeywords = partyMatches[partyKey];
      }
    });

    // 2. Detect Sentiment
    const positiveMatches: string[] = [];
    const negativeMatches: string[] = [];

    POSITIVE_WORDS.forEach((word) => {
      const regex = new RegExp(`(^|\\W)${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|\\W)`, 'iu');
      if (regex.test(text) || lowerText.includes(word.toLowerCase())) {
        positiveMatches.push(word);
      }
    });

    NEGATIVE_WORDS.forEach((word) => {
      const regex = new RegExp(`(^|\\W)${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|\\W)`, 'iu');
      if (regex.test(text) || lowerText.includes(word.toLowerCase())) {
        negativeMatches.push(word);
      }
    });

    let rawSentiment: SentimentPolarity = 'neutral';
    if (positiveMatches.length > negativeMatches.length) {
      rawSentiment = 'positive';
    } else if (negativeMatches.length > positiveMatches.length) {
      rawSentiment = 'negative';
    }

    // 3. Sarcasm Analysis
    let hasSarcasmPattern = false;
    for (const pattern of SARCASM_HEURISTIC_PATTERNS) {
      if (pattern.test(text)) {
        hasSarcasmPattern = true;
        break;
      }
    }

    // Also check for positive words with negative context or sarcastic question marks
    if (text.includes('?!') || text.includes('!?') || (text.includes('"') && positiveMatches.length > 0 && negativeMatches.length > 0)) {
      hasSarcasmPattern = true;
    }

    const isSarcastic = options?.sarcasmOverride !== undefined ? options.sarcasmOverride : hasSarcasmPattern;

    // Sarcasm polarity flipping
    let effectiveSentiment: SentimentPolarity = rawSentiment;
    let sarcasmApplied = false;

    if (isSarcastic) {
      if (rawSentiment === 'positive') {
        effectiveSentiment = 'negative';
        sarcasmApplied = true;
      } else if (rawSentiment === 'negative') {
        effectiveSentiment = 'positive';
        sarcasmApplied = true;
      } else {
        // If neutral words exist alongside sarcastic markers, bias toward skepticism/negative
        effectiveSentiment = 'negative';
        sarcasmApplied = true;
      }
    }

    // 4. Determine Ideology Label
    let ideologyLabel: IdeologyLabel = 'neutral';
    let ruleTriggered = '';
    let confidence = 0.70;

    if (primaryParty === 'unknown' || primaryParty === 'neutral' || matchedPartiesCount === 0) {
      ideologyLabel = 'neutral';
      ruleTriggered = 'No political party entity detected; assigned Neutral';
      confidence = 0.65;
    } else {
      const targetParty = primaryParty as Exclude<PoliticalParty, 'neutral' | 'unknown'>;
      if (effectiveSentiment === 'positive') {
        ideologyLabel = `pro_${targetParty}` as IdeologyLabel;
        ruleTriggered = `Matched ${targetParty.toUpperCase()} entity with positive sentiment`;
        confidence = Math.min(0.92, 0.75 + (matchedKeywords.length * 0.05) + (positiveMatches.length * 0.03));
      } else if (effectiveSentiment === 'negative') {
        ideologyLabel = `anti_${targetParty}` as IdeologyLabel;
        ruleTriggered = `Matched ${targetParty.toUpperCase()} entity with negative sentiment${sarcasmApplied ? ' (sarcasm flipped)' : ''}`;
        confidence = Math.min(0.92, 0.75 + (matchedKeywords.length * 0.05) + (negativeMatches.length * 0.03));
      } else {
        ideologyLabel = 'neutral';
        ruleTriggered = `Matched ${targetParty.toUpperCase()} entity with neutral/balanced sentiment`;
        confidence = 0.68;
      }
    }

    const partyName =
      primaryParty !== 'unknown' && primaryParty !== 'neutral'
        ? PARTY_LEXICON[primaryParty as Exclude<PoliticalParty, 'neutral' | 'unknown'>].name
        : 'Non-partisan / None';

    const matchedSentimentWords = Array.from(new Set([...positiveMatches, ...negativeMatches]));

    return {
      text,
      detectedParty: primaryParty,
      detectedPartyName: partyName,
      rawSentiment,
      effectiveSentiment,
      isSarcastic,
      ideologyLabel,
      confidence: Number(confidence.toFixed(2)),
      explanation: {
        partyKeywordsMatched: matchedKeywords,
        sentimentWordsMatched: matchedSentimentWords,
        sarcasmApplied,
        ruleTriggered,
        sourceType: 'rule_based_p1',
      },
    };
  }
}

// Export default singleton instance
export const classifier = new RuleBasedP1Classifier();
