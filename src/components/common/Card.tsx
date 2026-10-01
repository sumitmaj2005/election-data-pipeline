import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-all ${
        hoverable ? 'hover:border-ink-400 dark:hover:border-ink-600 hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
