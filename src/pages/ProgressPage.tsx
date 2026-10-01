import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { CheckCircle2, Circle, RotateCcw, Filter } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const {
    deliverables,
    completedMap,
    toggleItem,
    resetToDefault,
    totalCount,
    completedCount,
    progressPercentage,
  } = useProgress();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(deliverables.map((d) => d.category)))];

  const filteredDeliverables = deliverables.filter(
    (d) => selectedCategory === 'All' || d.category === selectedCategory
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="completed">Local Storage Persistent</Badge>
          <Badge variant="outline">Milestone Checklist</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
          Project Plan Deliverables & Progress
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Interactive task tracking across all project milestones. Toggle completion status directly in the
          checklist below; state is safely synchronized in your browser's persistent storage.
        </p>
      </div>

      {/* Progress Metric Card */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              Overall Execution Progress
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-heading font-bold text-ink-950 dark:text-white">
                {progressPercentage}%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ({completedCount} of {totalCount} deliverables verified)
              </span>
            </div>
          </div>

          <button
            onClick={resetToDefault}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
          >
            <RotateCcw size={13} />
            <span>Reset to Baseline Plan</span>
          </button>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-ink-700 to-teal-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
        <span className="text-slate-400 mr-2 flex items-center gap-1">
          <Filter size={13} />
          <span>Stage:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
              selectedCategory === cat
                ? 'bg-ink-950 text-white dark:bg-ink-700 font-semibold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Deliverable Items List */}
      <div className="space-y-3">
        {filteredDeliverables.map((item) => {
          const isDone = !!completedMap[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                isDone
                  ? 'bg-teal-50/40 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/50'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                aria-label={`Mark ${item.title} as ${isDone ? 'incomplete' : 'complete'}`}
                className="mt-0.5 shrink-0 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              >
                {isDone ? (
                  <CheckCircle2 size={20} className="text-teal-600 dark:text-teal-400" />
                ) : (
                  <Circle size={20} className="text-slate-300 dark:text-slate-600" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3
                    className={`font-heading text-sm font-semibold ${
                      isDone
                        ? 'text-teal-950 dark:text-teal-200 line-through opacity-85'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Owner: {item.owner}
                    </span>
                    <Badge variant={isDone ? 'completed' : 'planned'} size="sm">
                      {isDone ? 'Completed' : 'Pending'}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-2 text-[10px] text-slate-400">
                  <span>Category: {item.category}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
