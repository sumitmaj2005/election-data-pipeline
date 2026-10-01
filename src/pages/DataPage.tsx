import React, { useState, useEffect } from 'react';
import {
  dataSources,
  labelClasses,
  classDistributionPlaceholder,
  languageDistributionPlaceholder,
} from '../data/datasetInfo';
import { parseConstituencyCSV, ConstituencyResult } from '../lib/csvParser';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { FileSpreadsheet, Search, RefreshCw, AlertCircle } from 'lucide-react';

const COLORS = ['#f97316', '#ea580c', '#3b82f6', '#1d4ed8', '#06b6d4', '#0891b2', '#10b981', '#059669', '#64748b'];

export const DataPage: React.FC = () => {
  const [constituencies, setConstituencies] = useState<ConstituencyResult[]>([]);
  const [loadingCSV, setLoadingCSV] = useState<boolean>(true);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPartyFilter, setSelectedPartyFilter] = useState<string>('All');

  const fetchCSVData = async () => {
    setLoadingCSV(true);
    setCsvError(null);
    try {
      // Support both local dev and GitHub Pages base paths
      const response = await fetch('./data/election_results_2024.csv');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load CSV file`);
      }
      const text = await response.text();
      const parsed = parseConstituencyCSV(text);
      setConstituencies(parsed);
    } catch (err: any) {
      console.warn('Failed to load CSV from ./data/, trying fallback root path', err);
      try {
        const fallbackRes = await fetch('/data/election_results_2024.csv');
        if (!fallbackRes.ok) throw new Error('Could not load election_results_2024.csv');
        const fallbackText = await fallbackRes.text();
        setConstituencies(parseConstituencyCSV(fallbackText));
      } catch (fallbackErr: any) {
        setCsvError(fallbackErr.message || 'Error loading election results CSV');
      }
    } finally {
      setLoadingCSV(false);
    }
  };

  useEffect(() => {
    fetchCSVData();
  }, []);

  const filteredConstituencies = constituencies.filter((item) => {
    const matchesSearch =
      item.constituencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.winningCandidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.constituencyNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesParty =
      selectedPartyFilter === 'All' || item.winningParty.toLowerCase() === selectedPartyFilter.toLowerCase();

    return matchesSearch && matchesParty;
  });

  const uniqueParties = ['All', ...Array.from(new Set(constituencies.map((c) => c.winningParty)))];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="completed">Multimodal Corpus</Badge>
          <Badge variant="outline">2024 Ground Truth</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
          Data Sources, Labels & Election Ground Truth
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Comprehensive inventory of our training data pipelines, 9-class ideological labeling taxonomy,
          distribution breakdowns, and official 2024 Lok Sabha constituency results.
        </p>
      </div>

      {/* Data Ingestion Sources */}
      <section aria-labelledby="sources-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="sources-heading" className="text-xl font-heading font-bold text-slate-900 dark:text-white">
            Primary Ingestion Pipelines
          </h2>
          <span className="text-xs text-slate-500 font-mono">repo: /collect_daily.py</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataSources.map((source) => (
            <Card key={source.id} className="p-5 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    {source.name}
                  </h3>
                  <Badge variant={source.isPlaceholderCount ? 'placeholder' : 'completed'} size="sm">
                    {source.recordCount}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {source.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1.5 text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Frequency:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{source.frequency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Languages:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {source.languages.join(', ')}
                  </span>
                </div>
                {source.pipelineScript && (
                  <div className="flex items-center justify-between">
                    <span>Handler Script:</span>
                    <code className="font-mono text-ink-700 dark:text-ink-300 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                      {source.pipelineScript}
                    </code>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Class Distribution Charts */}
      <section aria-labelledby="distribution-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 id="distribution-heading" className="text-xl font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Target Class & Language Distributions</span>
              <Badge variant="placeholder">Placeholder Distribution</Badge>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Preliminary stratified distribution across 9 ideological classes and 5 linguistic categories.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Synthetic Preview</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart for Class Distribution */}
          <Card className="p-5 space-y-3">
            <h3 className="font-heading font-semibold text-sm text-slate-900 dark:text-white">
              Estimated Posts per Ideology Class
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classDistributionPlaceholder} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs shadow-md">
                            <div className="font-bold">{data.name}</div>
                            <div className="text-ink-600 dark:text-ink-400 font-mono">
                              {data.count} posts ({data.percentage}%) [Placeholder]
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#4338ca" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Language Breakdown */}
          <Card className="p-5 space-y-3">
            <h3 className="font-heading font-semibold text-sm text-slate-900 dark:text-white">
              Estimated Language Stream Proportions
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageDistributionPlaceholder}
                    dataKey="percentage"
                    nameKey="language"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {languageDistributionPlaceholder.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name, item) => [
                      `${val}% (${item.payload.count} records) [Placeholder]`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      {/* Ideology Taxonomy Details */}
      <section aria-labelledby="taxonomy-heading" className="space-y-4">
        <h2 id="taxonomy-heading" className="text-xl font-heading font-bold text-slate-900 dark:text-white">
          9-Class Ideological Taxonomy
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Clear distinction between party alignment (Pro/Anti) and non-partisan neutral civic discourse.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {labelClasses.map((cls) => (
            <Card key={cls.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-ink-900 dark:text-ink-300">
                  {cls.id}
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[11px] font-semibold text-white"
                  style={{ backgroundColor: cls.color }}
                >
                  {cls.stance} {cls.party}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {cls.description}
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Example Post:
                </span>
                <p className="text-[11px] italic font-sans text-slate-700 dark:text-slate-300">
                  "{cls.exampleSnippet}"
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 2024 Lok Sabha Constituency Table loaded from CSV in /public/data/ */}
      <section aria-labelledby="constituency-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 id="constituency-heading" className="text-xl font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileSpreadsheet size={20} className="text-teal-600 dark:text-teal-400" />
              <span>2024 Lok Sabha Constituency Results (Ground Truth)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Dynamically parsed from <code className="font-mono text-ink-700 dark:text-ink-400">/public/data/election_results_2024.csv</code>.
            </p>
          </div>

          <button
            onClick={fetchCSVData}
            disabled={loadingCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
          >
            <RefreshCw size={13} className={loadingCSV ? 'animate-spin' : ''} />
            <span>Reload CSV</span>
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by constituency name, candidate, or state..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-ink-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 whitespace-nowrap">Filter Party:</span>
            <select
              value={selectedPartyFilter}
              onChange={(e) => setSelectedPartyFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-ink-500"
            >
              {uniqueParties.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Content */}
        {loadingCSV ? (
          <div className="p-8 text-center text-xs text-slate-500">
            <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-ink-600" />
            <span>Loading constituency CSV dataset...</span>
          </div>
        ) : csvError ? (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{csvError}</span>
          </div>
        ) : (
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-xs text-left">
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-2.5 px-3">Seat ID</th>
                    <th className="py-2.5 px-3">Constituency</th>
                    <th className="py-2.5 px-3">State</th>
                    <th className="py-2.5 px-3">Winning Candidate</th>
                    <th className="py-2.5 px-3">Winning Party</th>
                    <th className="py-2.5 px-3 text-right">Margin</th>
                    <th className="py-2.5 px-3 text-right">Turnout %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredConstituencies.map((row) => (
                    <tr key={row.constituencyNumber} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-2 px-3 font-mono text-[11px] text-slate-500">
                        {row.constituencyNumber}
                      </td>
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-white">
                        {row.constituencyName}
                      </td>
                      <td className="py-2 px-3">{row.state}</td>
                      <td className="py-2 px-3">{row.winningCandidate}</td>
                      <td className="py-2 px-3">
                        <span className="font-semibold">{row.winningParty}</span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono">
                        {row.margin.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right font-mono">
                        {row.turnoutPct}%
                      </td>
                    </tr>
                  ))}
                  {filteredConstituencies.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-slate-400">
                        No constituencies found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Showing {filteredConstituencies.length} of {constituencies.length} sample constituencies</span>
              <span>Loaded from /public/data/election_results_2024.csv</span>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
};
