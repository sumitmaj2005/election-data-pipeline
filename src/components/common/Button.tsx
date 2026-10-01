import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm rounded-lg gap-2',
    lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5',
  }[size];

  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-ink-900 text-white hover:bg-ink-800 dark:bg-ink-600 dark:hover:bg-ink-500 shadow-xs focus-visible:ring-2 focus-visible:ring-ink-500 active:scale-[0.99]';
      break;
    case 'secondary':
      variantClasses =
        'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400';
      break;
    case 'outline':
      variantClasses =
        'border border-slate-300 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-ink-400';
      break;
    case 'ghost':
      variantClasses =
        'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-slate-400';
      break;
  }

  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
