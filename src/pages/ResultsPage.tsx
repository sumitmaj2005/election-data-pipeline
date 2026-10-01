import React from 'react';
import resultsData from '../data/results.json';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AlertTriangle } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const { f1Comparison, perClassMetrics, ablations, placeholderNotice } = resultsData;

  const chartData = f1Comparison.map((item) => ({
    name: item.modelId,
    modelName: item.model,
    'Target F1': item.targetF1,
    'Current F1 [Placeholder]': item.currentF1,
  }));

  const ablationChartData = ablations.map((item) => ({
    name: item.configuration.length > 22 ? item.configuration.substring(0, 20) + '...' : item.configuration,
    fullName: item.configuration,
    'Macro F1 [Placeholder]': item.macroF1,
  }));

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="placeholder">Placeholder Metrics Active</Badge>
          <Badge variant="outline">Evaluation Suite</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
          Experimental Results & Benchmarks
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Quantitative evaluation across prototypes P1 (Baseline), P2 (Multimodal), and P3 (MuRIL Fine-Tuning).
          All values below are loaded dynamically from <code className="font-mono text-xs text-ink-700 dark:text-ink-400 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">src/data/results.json</code>.
        </p>
      </div>

      {/* Mandatory Placeholder Notice Banner */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
        <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={18} />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong>Academic Transparency Notice:</strong> {placeholderNotice} No synthetic numbers are presented as finalized experimental truth.
        </div>
      </div>

      {/* F1 Comparison Bar Chart */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Weighted F1 Performance by Prototype
              </h2>
              <Badge variant="placeholder">Placeholder Values</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Comparing project targets against current experimental checkpoint evaluation.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Target F1 Scale: 0.0 - 1.0</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0.5, 1.0]} tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md text-xs space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white">{data.modelName}</div>
                        <div className="text-slate-500">Target F1: <span className="font-mono font-bold text-slate-900 dark:text-white">{data['Target F1']}</span></div>
                        <div className="text-amber-600 dark:text-amber-400">
                          Current F1 [Placeholder]: <span className="font-mono font-bold">{data['Current F1 [Placeholder]']}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Target F1" fill="#312e81" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Current F1 [Placeholder]" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          {f1Comparison.map((f1) => (
            <div
              key={f1.modelId}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"
            >
              <div className="font-mono font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                <span>{f1.modelId} Target: &ge; {f1.targetF1}</span>
                <Badge variant={f1.status === 'In Progress' ? 'in-progress' : 'planned'}>
                  {f1.status}
                </Badge>
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 truncate">
                {f1.model}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Per-Class Metrics Table */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Per-Class Breakdown (9 Ideological Classes)
              </h2>
              <Badge variant="placeholder">Placeholder Test Split</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Precision, Recall, and F1-Scores across all 8 party-aligned classes plus Neutral.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Class Evaluation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-2.5 px-3">Class</th>
                <th className="py-2.5 px-3">Precision</th>
                <th className="py-2.5 px-3">Recall</th>
                <th className="py-2.5 px-3">F1-Score</th>
                <th className="py-2.5 px-3">Support</th>
                <th className="py-2.5 px-3 text-right">Data Source Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {perClassMetrics.map((row) => (
                <tr key={row.class} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-medium font-sans flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-ink-600 dark:bg-ink-400" />
                    <span>{row.class}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono">{row.precision.toFixed(2)}</td>
                  <td className="py-2.5 px-3 font-mono">{row.recall.toFixed(2)}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-ink-950 dark:text-white">
                    {row.f1Score.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{row.support}</td>
                  <td className="py-2.5 px-3 text-right">
                    <Badge variant="placeholder" size="sm">Placeholder</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Ablation Study Chart */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Ablation Study: Architectural Components
              </h2>
              <Badge variant="placeholder">Placeholder Metrics</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Assessing impact of individual modules: Sarcasm Inversion, IndicTrans2, and Domain Lexicons.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Macro F1 Impact</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ablationChartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis type="number" domain={[0.5, 1.0]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={160} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md text-xs">
                        <div className="font-semibold text-slate-900 dark:text-white">{data.fullName}</div>
                        <div className="text-teal-600 dark:text-teal-400 font-mono mt-1">
                          Macro F1: {data['Macro F1 [Placeholder]']}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="Macro F1 [Placeholder]" fill="#0d9488" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Confusion Matrix Slot */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Confusion Matrix Slot (MuRIL Test Run)
              </h2>
              <Badge variant="placeholder">Synthetic Mockup</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Heatmap representation of predicted vs true labels for validation across languages.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">public/confusion_matrix_placeholder.svg</span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950 p-2 sm:p-4 flex flex-col items-center justify-center">
          <img
            src="./confusion_matrix_placeholder.svg"
            alt="Confusion matrix placeholder graphic"
            className="w-full max-w-2xl h-auto rounded-lg shadow-xs"
          />
          <div className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold">Note:</span> Real confusion matrix plot generated by <code className="font-mono text-ink-700 dark:text-ink-400">src/evaluate.py</code> will replace this SVG once test split inference runs.
          </div>
        </div>
      </Card>
    </div>
  );
};
