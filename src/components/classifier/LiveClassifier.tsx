import React, { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle2, RotateCcw, Info, Zap } from 'lucide-react';
import { classifier, ClassifierResult } from '../../lib/classifier';
import { Badge } from '../common/Badge';

interface LiveClassifierProps {
  compact?: boolean;
  initialText?: string;
}

interface ExamplePrompt {
  label: string;
  lang: string;
  text: string;
  isSarcastic?: boolean;
}

const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    label: 'Hinglish Pro-BJP',
    lang: 'Hinglish',
    text: 'Modi ji ka kaam sach mein achha hai, highway aur digital vikas shandar hua hai.',
    isSarcastic: false,
  },
  {
    label: 'Hinglish Anti-BJP',
    lang: 'Hinglish',
    text: 'BJP sarkar ne mehangai badha di hai aur berozgari se sab barbaad aur bekar kar diya.',
    isSarcastic: false,
  },
  {
    label: 'Hinglish Sarcastic',
    lang: 'Hinglish (Sarcasm)',
    text: 'Wah kya vikas hai! Bijli 8 ghante gayab rehti hai aur sadak poori bekaar hai.',
    isSarcastic: true,
  },
  {
    label: 'Hindi Pro-AAP',
    lang: 'Hindi',
    text: 'केजरीवाल ने शिक्षा और अस्पतालों में बहुत अच्छा और सराहनीय काम किया है।',
    isSarcastic: false,
  },
  {
    label: 'Hindi Anti-Congress',
    lang: 'Hindi',
    text: 'कांग्रेस ने दशकों के भ्रष्टाचार और घोटालों से देश की अर्थव्यवस्था को नुकसान पहुंचाया।',
    isSarcastic: false,
  },
  {
    label: 'English Pro-TMC',
    lang: 'English',
    text: 'Mamata Banerjee welfare schemes have shown great progress for local development.',
    isSarcastic: false,
  },
  {
    label: 'Neutral Public Notice',
    lang: 'English',
    text: 'The Election Commission announced voter turnout was 65.8% across 96 constituencies.',
    isSarcastic: false,
  },
];

export const LiveClassifier: React.FC<LiveClassifierProps> = ({
  compact = false,
  initialText = '',
}) => {
  const [inputText, setInputText] = useState(
    initialText || 'Modi ji ka kaam sach mein achha hai aur vikas ground level par dikh raha hai.'
  );
  const [sarcasmOverride, setSarcasmOverride] = useState<boolean>(false);
  const [result, setResult] = useState<ClassifierResult | null>(() => {
    return classifier.classify(
      initialText || 'Modi ji ka kaam sach mein achha hai aur vikas ground level par dikh raha hai.',
      { sarcasmOverride: false }
    );
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClassify = (textToClassify = inputText, sarcasm = sarcasmOverride) => {
    setIsProcessing(true);
    // Simulate brief asynchronous dispatch to mimic future API contract
    setTimeout(() => {
      const output = classifier.classify(textToClassify, { sarcasmOverride: sarcasm });
      setResult(output);
      setIsProcessing(false);
    }, 120);
  };

  const handleSelectExample = (ex: ExamplePrompt) => {
    setInputText(ex.text);
    setSarcasmOverride(!!ex.isSarcastic);
    handleClassify(ex.text, !!ex.isSarcastic);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const getPartyBadgeColor = (party: string) => {
    switch (party) {
      case 'bjp':
        return 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/70 dark:text-orange-300 dark:border-orange-800';
      case 'congress':
        return 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800';
      case 'aap':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800';
      case 'tmc':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge variant="completed">Positive</Badge>;
      case 'negative':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800 border border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900">
            Negative
          </span>
        );
      default:
        return <Badge variant="neutral">Neutral</Badge>;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-all">
      {/* Notice Banner */}
      <div className="bg-ink-50 dark:bg-ink-950/70 border-b border-ink-100 dark:border-ink-900/60 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-ink-900 dark:text-ink-200">
          <Info size={14} className="text-ink-600 dark:text-ink-400 shrink-0" />
          <span>
            <strong>Client-Side Demo:</strong> Runs P1 rule-based classifier. This is not the full MuRIL model (P3), which is trained on PyTorch/HuggingFace.
          </span>
        </div>
        <Badge variant="ink" size="sm">Prototype 1 Heuristic</Badge>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Example Chips */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
            Load example text (Hindi, Hinglish, English):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_PROMPTS.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectExample(ex)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-ink-500"
              >
                <span className="font-medium">{ex.label}</span>
                <span className="ml-1 opacity-60 text-[10px]">({ex.lang})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Textarea Area */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              rows={compact ? 3 : 4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type political text in Hindi, Hinglish, Bengali, Tamil, or English..."
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-paper-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-ink-500 font-sans text-sm resize-y transition-all"
            />
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear text input"
                className="absolute top-2.5 right-2.5 p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>

          {/* Controls: Sarcasm toggle and Classify button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={sarcasmOverride}
                  onChange={(e) => setSarcasmOverride(e.target.checked)}
                  className="rounded border-slate-300 text-ink-700 focus:ring-ink-500 w-4 h-4 cursor-pointer"
                />
                <span className="font-medium">Force sarcasm inversion toggle</span>
              </label>
              <span className="text-[11px] text-slate-400 hidden md:inline">
                (Flips apparent sentiment polarity)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleClassify()}
                disabled={!inputText.trim() || isProcessing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ink-950 hover:bg-ink-900 text-white font-medium text-sm shadow-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-ink-500 active:scale-[0.99]"
              >
                <Sparkles size={16} className={isProcessing ? 'animate-spin' : ''} />
                <span>{isProcessing ? 'Classifying...' : 'Classify Text'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Display */}
        {result && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Model Inference Output
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                <Zap size={12} className="text-amber-500" />
                Confidence: {(result.confidence * 100).toFixed(0)}%
              </span>
            </div>

            {/* Grid of Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Detected Party */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Detected Entity</div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold border ${getPartyBadgeColor(
                      result.detectedParty
                    )}`}
                  >
                    {result.detectedParty.toUpperCase()}
                  </span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                    {result.detectedPartyName}
                  </span>
                </div>
              </div>

              {/* Effective Sentiment */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Effective Sentiment</div>
                <div className="flex items-center gap-2">
                  {getSentimentBadge(result.effectiveSentiment)}
                  {result.explanation.sarcasmApplied && (
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-900">
                      Sarcasm Flipped
                    </span>
                  )}
                </div>
              </div>

              {/* Sarcasm Flag */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Sarcasm Heuristic</div>
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {result.isSarcastic ? (
                    <span className="text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <AlertCircle size={13} /> Sarcasm Detected
                    </span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">Direct / Literal</span>
                  )}
                </div>
              </div>

              {/* Final 9-Class Ideology Label */}
              <div className="p-3 rounded-xl border border-ink-300 dark:border-ink-800 bg-ink-50/80 dark:bg-ink-950/80">
                <div className="text-[11px] text-ink-700 dark:text-ink-400 mb-1 font-semibold">
                  Assigned Ideology Label
                </div>
                <div className="font-mono text-sm font-bold text-ink-950 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-ink-600 dark:text-ink-400 shrink-0" />
                  <span className="truncate">{result.ideologyLabel}</span>
                </div>
              </div>
            </div>

            {/* Rule Explanation Accordion / Drawer */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
              <div className="font-semibold text-slate-700 dark:text-slate-300">Classification Reasoning (P1 Rule Engine):</div>
              <p className="text-slate-600 dark:text-slate-400">
                • Rule triggered: <code className="font-mono text-ink-700 dark:text-ink-300">{result.explanation.ruleTriggered}</code>
              </p>
              {result.explanation.partyKeywordsMatched.length > 0 && (
                <p className="text-slate-600 dark:text-slate-400">
                  • Matched Party Keywords:{' '}
                  <span className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {result.explanation.partyKeywordsMatched.join(', ')}
                  </span>
                </p>
              )}
              {result.explanation.sentimentWordsMatched.length > 0 && (
                <p className="text-slate-600 dark:text-slate-400">
                  • Matched Sentiment Lexicon:{' '}
                  <span className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {result.explanation.sentimentWordsMatched.join(', ')}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
