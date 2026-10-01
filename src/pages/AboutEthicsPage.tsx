import React from 'react';
import { ethicsContent } from '../data/ethics';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { ShieldAlert, AlertTriangle, BookOpen, Lock, Scale, CheckCircle2 } from 'lucide-react';

export const AboutEthicsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="ink">Ethics & Disclosure</Badge>
          <Badge variant="outline">Academic Research Charter</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
          Research Purpose, Ethics & Limitations
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Our commitment to ethical artificial intelligence, transparent linguistic methodology, and safeguards
          against misuse in democratic contexts.
        </p>
      </div>

      {/* Non-Profiling Ethical Charter Banner */}
      <div className="p-6 rounded-2xl bg-ink-950 text-white shadow-sm border border-ink-800 space-y-3">
        <div className="flex items-center gap-2.5 text-indigo-300">
          <ShieldAlert size={22} className="text-amber-400" />
          <h2 className="font-heading font-bold text-lg text-white">
            {ethicsContent.disclaimer.title}
          </h2>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {ethicsContent.disclaimer.statement}
        </p>
        <div className="pt-2 text-xs text-indigo-300/80 flex items-center gap-2">
          <Lock size={13} />
          <span>Strict Anonymization • No Micro-Targeting • No Personal Identifiable Information</span>
        </div>
      </div>

      {/* Academic Purpose Section */}
      <Card className="p-6 space-y-3 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-ink-700 dark:text-ink-400" />
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {ethicsContent.academicPurpose.title}
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {ethicsContent.academicPurpose.text}
        </p>
      </Card>

      {/* Methodological Limitations Grid */}
      <section aria-labelledby="limitations-heading" className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 id="limitations-heading" className="text-xl font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale size={20} className="text-ink-700 dark:text-ink-400" />
              <span>Acknowledged Methodological Limitations</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Transparent documentation of challenges in code-mixing, sarcasm, bias, and heuristics.
            </p>
          </div>
          <Badge variant="outline">Critical Analysis</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ethicsContent.limitations.map((item, idx) => (
            <Card key={idx} className="p-5 space-y-2 bg-white dark:bg-slate-900">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Responsible Data Handling Commitments */}
      <Card className="p-6 space-y-4 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
          Data Governance & Privacy Safeguards
        </h3>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          {ethicsContent.guidelines.map((guide, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
              <span>{guide}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
