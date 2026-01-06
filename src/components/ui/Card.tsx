import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'gradient';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default',
  hover = true,
  padding = 'md'
}) => {
  const variantClasses = {
    default: 'bg-gray-900/80 backdrop-blur-sm border border-gray-800/50',
    bordered: 'bg-gray-900/80 backdrop-blur-sm border-l-4',
    gradient: 'bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50',
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1' 
    : '';

  return (
    <div 
      className={cn(
        'modern-card rounded-xl',
        variantClasses[variant],
        paddingClasses[padding],
        hoverClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;




