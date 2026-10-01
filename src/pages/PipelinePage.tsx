import React, { useState } from 'react';
import { pipelineStages, PipelineStage } from '../data/pipeline';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  ChevronDown,
  ChevronUp,
  Cpu,
  Sparkles,
  Target,
  ArrowDownToLine,
  ArrowUpFromLine,
} from 'lucide-react';

export const PipelinePage: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('P3'); // Default to core contribution
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    'P1-0': true,
    'P3-0': true,
    'P3-1': true,
  });

  const selectedStage = pipelineStages.find((s) => s.id === selectedStageId) || pipelineStages[0];

  const toggleStep = (stepKey: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const getStatusBadge = (status: PipelineStage['status']) => {
    switch (status) {
      case 'in-progress':
        return <Badge variant="in-progress">In Progress</Badge>;
      case 'completed':
        return <Badge variant="completed">Completed</Badge>;
      case 'planned':
      default:
        return <Badge variant="planned">Planned</Badge>;
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="ink">Architecture Roadmap</Badge>
          <Badge variant="outline">4 Sequential Prototypes</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
          Research Pipeline & Prototypes
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          From an initial translation-based XGBoost baseline to native multilingual fine-tuning with{' '}
          <strong className="text-slate-900 dark:text-white">google/muril-base-cased</strong> and social graph analytics.
        </p>
      </div>

      {/* Prototype Selector Timeline (Desktop & Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {pipelineStages.map((stage) => {
          const isSelected = stage.id === selectedStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? 'bg-ink-50/90 dark:bg-ink-950/80 border-ink-600 dark:border-ink-500 shadow-sm ring-1 ring-ink-500'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-mono text-xs font-bold text-ink-900 dark:text-ink-300">
                    {stage.title}
                  </span>
                  {getStatusBadge(stage.status)}
                </div>

                <div className="font-heading font-bold text-base text-slate-900 dark:text-white">
                  {stage.name}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {stage.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Target F1:</span>
                <span className="font-mono font-bold text-ink-800 dark:text-ink-300">
                  {stage.targetF1}
                </span>
              </div>

              {stage.isCoreContribution && (
                <div className="mt-2 text-center py-1 rounded-md bg-teal-100 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-800 text-[11px] font-semibold text-teal-900 dark:text-teal-200 flex items-center justify-center gap-1">
                  <Sparkles size={12} />
                  <span>Core Project Contribution</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Prototype Detail Card */}
      <Card className="p-6 sm:p-8 space-y-8 bg-white dark:bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm font-bold text-ink-700 dark:text-ink-400">
                {selectedStage.title}: {selectedStage.name}
              </span>
              {getStatusBadge(selectedStage.status)}
              {selectedStage.isCoreContribution && (
                <Badge variant="completed">Core Contribution</Badge>
              )}
            </div>
            <p className="text-base text-slate-700 dark:text-slate-300 mt-1">
              {selectedStage.tagline}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0 flex items-center gap-3">
            <Target size={24} className="text-ink-600 dark:text-ink-400" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Evaluation Target
              </div>
              <div className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                {selectedStage.targetF1}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Cpu size={14} />
            <span>Technologies & Frameworks</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedStage.stack.map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-ink-50 dark:bg-ink-950/70 border border-ink-200 dark:border-ink-800 text-ink-900 dark:text-ink-300 font-mono"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Inputs & Outputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <ArrowDownToLine size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Inputs & Data Dependencies</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {selectedStage.inputs.map((inp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                  <span>{inp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <ArrowUpFromLine size={14} className="text-teal-600 dark:text-teal-400" />
              <span>Pipeline Artifacts & Outputs</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {selectedStage.outputs.map((out, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1 shrink-0" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expandable Execution Steps */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Execution Steps & Architectural Details
          </h4>

          <div className="space-y-2.5">
            {selectedStage.steps.map((step, idx) => {
              const stepKey = `${selectedStage.id}-${idx}`;
              const isExpanded = !!expandedSteps[stepKey];
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 transition-colors"
                >
                  <button
                    onClick={() => toggleStep(stepKey)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus-visible:ring-2 focus-visible:ring-ink-500"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-heading font-semibold text-sm text-slate-900 dark:text-white">
                          {step.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {step.description}
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-4 pt-1 bg-slate-50/60 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/80">
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="text-ink-600 dark:text-ink-400 mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};
