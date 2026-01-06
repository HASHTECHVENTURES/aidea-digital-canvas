/**
 * Design System Constants
 * Centralized design tokens for consistent UI across the application
 */

// Spacing Scale (4px base unit)
export const SPACING = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const;

// Section Padding (consistent across all pages)
export const SECTION_PADDING = {
  mobile: 'py-12',      // 48px
  tablet: 'sm:py-16',   // 64px
  desktop: 'lg:py-20',  // 80px
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  h1: {
    mobile: 'text-3xl',      // 30px
    tablet: 'sm:text-4xl',   // 36px
    desktop: 'lg:text-5xl',  // 48px
    weight: 'font-bold',
    lineHeight: 'leading-tight',
  },
  h2: {
    mobile: 'text-2xl',      // 24px
    tablet: 'sm:text-3xl',   // 30px
    desktop: 'lg:text-4xl',  // 36px
    weight: 'font-bold',
    lineHeight: 'leading-tight',
  },
  h3: {
    mobile: 'text-xl',       // 20px
    tablet: 'sm:text-2xl',   // 24px
    desktop: 'lg:text-3xl',  // 30px
    weight: 'font-bold',
    lineHeight: 'leading-tight',
  },
  body: {
    mobile: 'text-sm',       // 14px
    tablet: 'sm:text-base',  // 16px
    desktop: 'lg:text-lg',   // 18px
    weight: 'font-normal',
    lineHeight: 'leading-relaxed',
  },
  small: {
    mobile: 'text-xs',       // 12px
    tablet: 'sm:text-sm',    // 14px
    desktop: 'lg:text-base', // 16px
    weight: 'font-normal',
    lineHeight: 'leading-relaxed',
  },
} as const;

// Color System
export const COLORS = {
  primary: {
    light: 'blue-400',
    DEFAULT: 'blue-500',
    dark: 'blue-600',
  },
  secondary: {
    light: 'purple-400',
    DEFAULT: 'purple-500',
    dark: 'purple-600',
  },
  accent: {
    light: 'blue-400',
    DEFAULT: 'blue-500',
    dark: 'blue-600',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    accent: 'text-blue-400',
  },
  background: {
    primary: 'bg-gray-950',
    secondary: 'bg-gray-900/50',
    card: 'bg-gray-900/80',
  },
} as const;

// Icon Sizes
export const ICON_SIZES = {
  xs: 'h-3 w-3',   // 12px
  sm: 'h-4 w-4',   // 16px
  md: 'h-5 w-5',   // 20px
  lg: 'h-6 w-6',   // 24px
  xl: 'h-8 w-8',   // 32px
} as const;

// Border Radius
export const RADIUS = {
  sm: 'rounded-lg',   // 8px
  md: 'rounded-xl',   // 12px
  lg: 'rounded-2xl',  // 16px
  full: 'rounded-full',
} as const;

// Animation Durations
export const ANIMATION = {
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500',
  slower: 'duration-700',
} as const;

// Grid Gaps
export const GRID_GAP = {
  sm: 'gap-3',   // 12px
  md: 'gap-4',   // 16px
  lg: 'gap-6',   // 24px
  xl: 'gap-8',   // 32px
} as const;




