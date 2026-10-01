import React from 'react';
import { teamMembers } from '../data/team';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Github, Linkedin, Mail, Shield } from 'lucide-react';

export const TeamPage: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="ink">Investigators</Badge>
          <Badge variant="placeholder">Placeholder Identities</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
          Project Team & Work Distribution
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Four final-year undergraduate engineering researchers contributing across data engineering,
          Indic machine translation, neural transformer fine-tuning, and graph network analytics.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card
            key={member.id}
            hoverable
            className="p-6 flex flex-col justify-between space-y-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
          >
            <div>
              {/* Member Header */}
              <div className="flex items-start gap-4">
                {/* Photo Placeholder */}
                <div className="w-14 h-14 rounded-2xl bg-ink-950 dark:bg-ink-900 border-2 border-ink-800 flex items-center justify-center text-white font-heading font-bold text-xl shrink-0 shadow-xs">
                  {member.avatarPlaceholder}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white truncate">
                      {member.name}
                    </h3>
                    <Badge variant="placeholder" size="sm">Placeholder</Badge>
                  </div>
                  <div className="text-xs font-semibold text-ink-700 dark:text-ink-400 mt-0.5">
                    {member.titleRole}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <strong>Core Focus:</strong> {member.responsibilities}
                  </div>
                </div>
              </div>

              {/* Specific Tasks List */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Assigned Pipeline Deliverables
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {member.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-ink-600 dark:text-ink-400 mt-0.5 font-bold">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social / Contact Links */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono text-[11px]">ID: {member.id}</span>
              <div className="flex items-center gap-3">
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label={`${member.name} GitHub`}
                >
                  <Github size={16} />
                </a>
                <a
                  href={member.links.linkedin}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={`mailto:${member.links.email}`}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Editing Instructions Callout */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
        <Shield size={18} className="text-ink-700 dark:text-ink-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900 dark:text-white">How to update team profiles: </span>
          Replace placeholder names, personal GitHub/LinkedIn handles, and contact emails in{' '}
          <code className="font-mono text-ink-700 dark:text-ink-300 bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            src/data/team.ts
          </code>{' '}
          without modifying any layout or UI code.
        </div>
      </div>
    </div>
  );
};
