import React from 'react';
import { TYPOGRAPHY } from '../../constants/design-system';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const Heading: React.FC<HeadingProps> = ({ 
  children, 
  level = 2,
  className = '',
  align = 'left'
}) => {
  const typography = TYPOGRAPHY[`h${level}` as keyof typeof TYPOGRAPHY];
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={cn(
        typography.mobile,
        typography.tablet,
        typography.desktop,
        typography.weight,
        typography.lineHeight,
        'text-white',
        alignClasses[align],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;




