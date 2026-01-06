import React from 'react';
import { SECTION_PADDING } from '../../constants/design-system';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'primary' | 'secondary' | 'gradient';
  id?: string;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  background = 'primary',
  id 
}) => {
  const backgroundClasses = {
    primary: 'bg-gray-950',
    secondary: 'bg-gray-900/50',
    gradient: 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden',
  };

  return (
    <section 
      id={id}
      className={`${SECTION_PADDING.mobile} ${SECTION_PADDING.tablet} ${SECTION_PADDING.desktop} ${backgroundClasses[background]} ${className} px-4 sm:px-6 lg:px-8`}
    >
      {background === 'gradient' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      )}
      <div className={background === 'gradient' ? 'relative' : ''}>
        {children}
      </div>
    </section>
  );
};

export default Section;

