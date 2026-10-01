import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X, Github, ExternalLink } from 'lucide-react';
import { navigationLinks } from '../../data/navigation';
import { projectMeta } from '../../data/projectData';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-paper-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <NavLink
            to="/"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-ink-500 rounded-lg p-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-ink-950 dark:bg-ink-900 border border-ink-800 flex items-center justify-center text-white shadow-xs group-hover:bg-ink-900 transition-colors">
              <span className="w-2 h-3.5 bg-indigo-400 rounded-xs transform rotate-6"></span>
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                Advanced MPIDISM
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-ink-700 dark:text-ink-400 bg-ink-50 dark:bg-ink-950/80 px-1.5 py-0.5 rounded border border-ink-200 dark:border-ink-800">
                2024 Research
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions: Theme Toggle & GitHub */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-ink-500"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <a
              href={projectMeta.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-ink-500"
            >
              <Github size={14} />
              <span>GitHub</span>
              <ExternalLink size={12} className="opacity-60" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-ink-500"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-paper-950 px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navigationLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-100 text-ink-950 dark:bg-ink-950 dark:text-ink-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center justify-between">
                <span>{item.name}</span>
                <span className="text-xs text-slate-400 font-normal">{item.description}</span>
              </div>
            </NavLink>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <a
              href={projectMeta.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Github size={16} />
              <span>Repository: adiris123/election-data-pipeline</span>
              <ExternalLink size={14} className="ml-auto opacity-60" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
