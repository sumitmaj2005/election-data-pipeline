import React from 'react';
import { LiveClassifier } from '../components/classifier/LiveClassifier';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ArrowRight, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const LiveDemoPage: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="ink">Prototype 1 Interactive Demo</Badge>
          <Badge variant="outline">Client-Side Engine</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
          Live Political Ideology Classifier
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Test real-time classification across multilingual posts in Hindi, Hinglish, Bengali, Tamil, and English.
          This demo implements our P1 baseline rule engine with entity detection, colloquial sentiment lexicons,
          and sarcasm inversion logic.
        </p>
      </div>

      {/* Main Interactive Classifier Component */}
      <section aria-label="Interactive Classifier">
        <LiveClassifier />
      </section>

      {/* Architecture & Implementation Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Card className="space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-ink-100 dark:bg-ink-950 flex items-center justify-center text-ink-800 dark:text-ink-300">
            <Terminal size={18} />
          </div>
          <h3 className="font-heading font-semibold text-base text-slate-900 dark:text-white">
            P1 Baseline Heuristics
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Detects candidate & party entities (BJP, Congress, AAP, TMC) and computes valence over normalized Hinglish and Indic lexicons like <em>achha</em>, <em>shandar</em>, <em>barbaad</em>, and <em>bekar</em>.
          </p>
        </Card>

        <Card className="space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-800 dark:text-teal-300">
            <ShieldCheck size={18} />
          </div>
          <h3 className="font-heading font-semibold text-base text-slate-900 dark:text-white">
            Sarcasm Polarity Inversion
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Applies conversational markers (e.g., <em>Wah kya vikas hai</em>, irony punctuation, hyperbolic praise) to flip nominal positive tokens into negative ideological critiques.
          </p>
        </Card>

        <Card className="space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-300">
            <Layers size={18} />
          </div>
          <h3 className="font-heading font-semibold text-base text-slate-900 dark:text-white">
            Pluggable MuRIL Interface
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The frontend service implements <code className="text-[11px] font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">ClassifierService</code>, allowing seamless replacement with a hosted fine-tuned MuRIL transformer API.
          </p>
        </Card>
      </div>

      {/* Call to Next Prototype */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-ink-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="font-heading font-bold text-lg">Curious how the transformer models compare?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Explore the four-stage pipeline from IndicTrans2 baseline to google/muril-base-cased.
          </p>
        </div>
        <NavLink
          to="/pipeline"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-ink-950 hover:bg-slate-100 font-medium text-xs transition-colors shrink-0"
        >
          <span>View Pipeline Stages</span>
          <ArrowRight size={14} />
        </NavLink>
      </div>
    </div>
  );
};
