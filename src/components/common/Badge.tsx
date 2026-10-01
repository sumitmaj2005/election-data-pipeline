import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'placeholder' | 'completed' | 'in-progress' | 'planned' | 'ink' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  let variantClasses = '';

  switch (variant) {
    case 'placeholder':
      variantClasses =
        'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700/60 font-medium';
      break;
    case 'completed':
      variantClasses =
        'bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800 font-medium';
      break;
    case 'in-progress':
      variantClasses =
        'bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800 font-medium';
      break;
    case 'planned':
      variantClasses =
        'bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 font-medium';
      break;
    case 'ink':
      variantClasses =
        'bg-ink-100 text-ink-900 border border-ink-300 dark:bg-ink-950 dark:text-ink-200 dark:border-ink-700 font-semibold';
      break;
    case 'outline':
      variantClasses =
        'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300 bg-transparent';
      break;
    case 'neutral':
    default:
      variantClasses =
        'bg-slate-100 text-slate-800 border border-slate-200 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-sans transition-colors ${sizeClasses} ${variantClasses} ${className}`}
    >
      {variant === 'placeholder' && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
      )}
      {children}
    </span>
  );
};
