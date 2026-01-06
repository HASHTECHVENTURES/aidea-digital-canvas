import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '',
  variant = 'rectangular',
  width,
  height
}) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-800/50',
        variantClasses[variant],
        className
      )}
      style={{
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? '3rem' : '8rem'),
      }}
      aria-label="Loading..."
    />
  );
};

// Pre-built skeleton components
export const SkeletonCard = () => (
  <div className="modern-card p-5 sm:p-6 space-y-4">
    <Skeleton variant="rectangular" height="2rem" />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="60%" />
    <div className="space-y-2">
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="70%" />
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        variant="text" 
        width={i === lines - 1 ? '60%' : '100%'} 
      />
    ))}
  </div>
);

export default Skeleton;



