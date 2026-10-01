import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, FileText, ShieldAlert } from 'lucide-react';
import { projectMeta } from '../../data/projectData';
import { navigationLinks } from '../../data/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-paper-50 dark:bg-paper-950 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-ink-950 dark:bg-ink-900 border border-ink-800 flex items-center justify-center text-white">
                <span className="w-1.5 h-2.5 bg-indigo-400 rounded-xs transform rotate-6"></span>
              </div>
              <span className="font-heading font-bold text-slate-900 dark:text-white">
                {projectMeta.name}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {projectMeta.shortPitch}
            </p>
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-500 space-y-1">
              <p>Core Model: <span className="font-mono text-ink-700 dark:text-ink-400">{projectMeta.coreModel}</span></p>
              <p className="flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-amber-600 dark:text-amber-400" />
                <span>Academic research purpose only. Not designed for individual profiling.</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Project Pages
            </h3>
            <ul className="space-y-2 text-sm">
              {navigationLinks.slice(0, 4).map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-ink-700 dark:hover:text-ink-300 transition-colors"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Research & Docs
            </h3>
            <ul className="space-y-2 text-sm">
              {navigationLinks.slice(4).map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-ink-700 dark:hover:text-ink-300 transition-colors"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={projectMeta.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-ink-700 dark:text-ink-400 hover:underline font-mono"
                >
                  <Github size={13} />
                  <span>github.com/adiris123</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500">
          <p>© 2024 Advanced MPIDISM Project Team (Members 1–4). All rights reserved.</p>
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <NavLink to="/about" className="hover:underline flex items-center gap-1">
              <FileText size={12} />
              <span>Ethics & Disclosure</span>
            </NavLink>
            <span>•</span>
            <span>Static Deployment on GitHub Pages</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
