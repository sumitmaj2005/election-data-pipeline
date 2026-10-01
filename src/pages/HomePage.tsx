import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, GitBranch, BarChart3, Database, Users, CheckSquare, ShieldCheck } from 'lucide-react';
import { projectMeta } from '../data/projectData';
import { LiveClassifier } from '../components/classifier/LiveClassifier';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section with Live Demo as centerpiece */}
      <section className="space-y-8" aria-labelledby="hero-heading">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-100 dark:bg-ink-950/80 border border-ink-200 dark:border-ink-800 text-xs font-semibold text-ink-900 dark:text-ink-300">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span>Final-Year Research Project • 2024 Lok Sabha Elections</span>
          </div>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            Multilingual Political Ideology Detection in Indian Social Media
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {projectMeta.shortPitch}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {projectMeta.languages.map((lang) => (
              <span
                key={lang.code}
                className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium"
              >
                {lang.name} <span className="text-[10px] opacity-60">({lang.script})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Memorable Hero Element: The Interactive Live Classifier */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Interactive Prototype Sandbox
            </span>
          </div>
          <LiveClassifier compact={false} />
        </div>
      </section>

      {/* Key Numbers / Metrics Section pulled from data files */}
      <section aria-labelledby="stats-heading" className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 id="stats-heading" className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white">
              Project Dimensions & Metrics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live configuration figures and benchmark targets pulled from project data files.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">src/data/projectData.ts</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {projectMeta.keyMetrics.map((stat, idx) => (
            <Card key={idx} className="p-4 flex flex-col justify-between space-y-2">
              <div className="flex items-start justify-between gap-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
                {stat.isPlaceholder && (
                  <Badge variant="placeholder" size="sm">
                    Est.
                  </Badge>
                )}
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-heading font-bold text-ink-950 dark:text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {stat.subtext}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gateways to Project Sections */}
      <section aria-labelledby="modules-heading" className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 id="modules-heading" className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white">
            Explore Research Modules
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Examine the engineering pipeline, benchmark results, dataset distributions, and deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Pipeline */}
          <NavLink
            to="/pipeline"
            className="group block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-ink-400 dark:hover:border-ink-600 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-ink-50 dark:bg-ink-950 flex items-center justify-center text-ink-800 dark:text-ink-300 mb-4 group-hover:scale-105 transition-transform">
              <GitBranch size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-ink-700 dark:group-hover:text-ink-400 flex items-center justify-between">
              <span>Four-Stage Pipeline</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform opacity-70" />
            </h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore P1 (IndicTrans2 baseline), P2 (BLIP multimodal), P3 (google/muril-base-cased core), and P4 (Network graph & dashboard).
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="in-progress">P1 In Progress</Badge>
              <Badge variant="planned">P2–P4 Planned</Badge>
            </div>
          </NavLink>

          {/* Results */}
          <NavLink
            to="/results"
            className="group block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-ink-400 dark:hover:border-ink-600 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 flex items-center justify-center text-teal-800 dark:text-teal-300 mb-4 group-hover:scale-105 transition-transform">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 flex items-center justify-between">
              <span>Benchmark Results</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform opacity-70" />
            </h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Interactive F1 performance charts comparing P1 to P3 target F1 &gt;= 0.88, per-class breakdown, ablations, and confusion matrix.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="placeholder">Placeholders Marked</Badge>
              <Badge variant="outline">Target: F1 0.88</Badge>
            </div>
          </NavLink>

          {/* Data */}
          <NavLink
            to="/data"
            className="group block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-ink-400 dark:hover:border-ink-600 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-300 mb-4 group-hover:scale-105 transition-transform">
              <Database size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-ink-700 dark:group-hover:text-ink-400 flex items-center justify-between">
              <span>Corpus & Election Data</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform opacity-70" />
            </h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Kaggle IndiaVotes2024 tweets, RSS headlines, Reddit feeds, 9 label classes, and 543 Lok Sabha seat ground truth CSV table.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="completed">543 Lok Sabha Seats</Badge>
            </div>
          </NavLink>

          {/* Team */}
          <NavLink
            to="/team"
            className="group block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-ink-400 dark:hover:border-ink-600 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-800 dark:text-indigo-300 mb-4 group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-ink-700 dark:group-hover:text-ink-400 flex items-center justify-between">
              <span>Team & Responsibilities</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform opacity-70" />
            </h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Meet Members 1 through 4, spanning text cleaning, translation, transformer fine-tuning, and graph network analysis.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">4 Investigators</Badge>
            </div>
          </NavLink>

          {/* Progress */}
          <NavLink
            to="/progress"
            className="group block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-ink-400 dark:hover:border-ink-600 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-800 dark:text-amber-300 mb-4 group-hover:scale-105 transition-transform">
              <CheckSquare size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 flex items-center justify-between">
              <span>Deliverable Checklist</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform opacity-70" />
            </h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Track project milestones and deliverables with an interactive checklist saved in browser storage.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="completed">Local State Saved</Badge>
            </div>
          </NavLink>

          {/* Ethics */}
          <NavLink
            to="/about"
            className="group block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-ink-400 dark:hover:border-ink-600 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-800 dark:text-purple-300 mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 flex items-center justify-between">
              <span>About & Ethics</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform opacity-70" />
            </h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Limitations on code-mixing and sarcasm, non-profiling safeguards, and academic research charter.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">Non-Profiling Charter</Badge>
            </div>
          </NavLink>
        </div>
      </section>
    </div>
  );
};
