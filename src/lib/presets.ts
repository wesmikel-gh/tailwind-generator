import type { DesignTokens, Preset, PresetName } from '@/types/tokens';
import { generateColorScale } from './paletteGenerator';

/** Standard Tailwind font sizes */
function defaultFontSizes(): Record<string, string> {
  return {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  };
}

/** Standard Tailwind font weights */
function defaultFontWeights(): Record<string, number> {
  return {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };
}

/** Standard Tailwind line heights */
function defaultLineHeights(): Record<string, string> {
  return {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  };
}

/** Standard Tailwind letter spacing */
function defaultLetterSpacing(): Record<string, string> {
  return {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  };
}

/** Standard Tailwind breakpoints */
function defaultBreakpoints(): Record<string, string> {
  return {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  };
}

/** Standard Tailwind border radii */
function defaultRadii(): Record<string, string> {
  return {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  };
}

/** Standard Tailwind border widths */
function defaultBorderWidths(): Record<string, string> {
  return {
    '0': '0px',
    DEFAULT: '1px',
    '2': '2px',
    '4': '4px',
    '8': '8px',
  };
}

/** Standard Tailwind shadows */
function defaultShadows(): Record<string, string> {
  return {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
  };
}

/** Standard Tailwind transition durations */
function defaultDurations(): Record<string, string> {
  return {
    '75': '75ms',
    '100': '100ms',
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
    '500': '500ms',
    '700': '700ms',
    '1000': '1000ms',
  };
}

/** Standard Tailwind transition easings */
function defaultEasings(): Record<string, string> {
  return {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  };
}

/** Standard container config */
function defaultContainer() {
  return {
    center: true,
    padding: '2rem',
    maxWidths: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  };
}

/** Generate the default spacing scale from a 4px base unit */
export function generateSpacingScale(baseUnit: number): Record<string, string> {
  const keys = [
    0, 'px', 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
  ] as const;

  const scale: Record<string, string> = {};

  for (const key of keys) {
    if (key === 0) {
      scale['0'] = '0px';
    } else if (key === 'px') {
      scale['px'] = '1px';
    } else {
      const value = (key as number) * baseUnit;
      scale[String(key)] = `${value / 16}rem`;
    }
  }

  return scale;
}

// ---------------------------------------------------------------------------
// Preset definitions
// ---------------------------------------------------------------------------

function createDefaultTokens(): DesignTokens {
  return {
    colors: {
      primary: generateColorScale('#3b82f6'),    // blue-500
      secondary: generateColorScale('#8b5cf6'),   // violet-500
      accent: generateColorScale('#f59e0b'),      // amber-500
      neutral: generateColorScale('#6b7280'),     // gray-500
      success: generateColorScale('#22c55e'),     // green-500
      warning: generateColorScale('#f59e0b'),     // amber-500
      danger: generateColorScale('#ef4444'),      // red-500
      info: generateColorScale('#06b6d4'),        // cyan-500
      custom: {},
    },
    typography: {
      fontFamilies: {
        heading: 'Inter',
        body: 'Inter',
        mono: 'JetBrains Mono',
      },
      fontSizes: defaultFontSizes(),
      fontWeights: defaultFontWeights(),
      lineHeights: defaultLineHeights(),
      letterSpacing: defaultLetterSpacing(),
    },
    spacing: {
      baseUnit: 4,
      scale: generateSpacingScale(4),
    },
    borders: {
      radii: defaultRadii(),
      widths: defaultBorderWidths(),
    },
    shadows: defaultShadows(),
    breakpoints: defaultBreakpoints(),
    container: defaultContainer(),
    transitions: {
      durations: defaultDurations(),
      easings: defaultEasings(),
    },
    meta: {
      name: 'Default',
      version: '1.0.0',
      tailwindVersion: '3',
      darkMode: 'class',
    },
  };
}

function createShadcnTokens(): DesignTokens {
  const tokens = createDefaultTokens();
  tokens.colors = {
    primary: generateColorScale('#18181b'),    // zinc-900 (dark primary)
    secondary: generateColorScale('#71717a'),   // zinc-500
    accent: generateColorScale('#f4f4f5'),      // zinc-100 (subtle accent)
    neutral: generateColorScale('#71717a'),     // zinc-500
    success: generateColorScale('#22c55e'),
    warning: generateColorScale('#eab308'),
    danger: generateColorScale('#ef4444'),
    info: generateColorScale('#3b82f6'),
    custom: {},
  };
  tokens.typography.fontFamilies = {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  };
  tokens.borders.radii = {
    ...defaultRadii(),
    DEFAULT: '0.375rem',
    md: '0.5rem',
    lg: '0.625rem',
    xl: '0.75rem',
  };
  tokens.shadows = {
    ...defaultShadows(),
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
  };
  tokens.meta = {
    name: 'shadcn',
    version: '1.0.0',
    tailwindVersion: '3',
    darkMode: 'class',
  };
  return tokens;
}

function createMaterialTokens(): DesignTokens {
  const tokens = createDefaultTokens();
  tokens.colors = {
    primary: generateColorScale('#6750a4'),     // M3 primary purple
    secondary: generateColorScale('#625b71'),    // M3 secondary
    accent: generateColorScale('#7d5260'),       // M3 tertiary
    neutral: generateColorScale('#79747e'),      // M3 neutral
    success: generateColorScale('#386a20'),      // M3 green
    warning: generateColorScale('#e8a317'),      // M3 amber-like
    danger: generateColorScale('#b3261e'),       // M3 error
    info: generateColorScale('#0061a4'),         // M3 blue
    custom: {},
  };
  tokens.typography.fontFamilies = {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto Mono',
  };
  tokens.borders.radii = {
    none: '0px',
    sm: '0.25rem',
    DEFAULT: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.75rem',
    '2xl': '1.75rem',
    '3xl': '1.75rem',
    full: '9999px',
  };
  tokens.meta = {
    name: 'Material',
    version: '1.0.0',
    tailwindVersion: '3',
    darkMode: 'class',
  };
  return tokens;
}

function createMinimalTokens(): DesignTokens {
  const tokens = createDefaultTokens();
  tokens.colors = {
    primary: generateColorScale('#000000'),
    secondary: generateColorScale('#525252'),
    accent: generateColorScale('#a3a3a3'),
    neutral: generateColorScale('#737373'),
    success: generateColorScale('#16a34a'),
    warning: generateColorScale('#ca8a04'),
    danger: generateColorScale('#dc2626'),
    info: generateColorScale('#2563eb'),
    custom: {},
  };
  tokens.typography.fontFamilies = {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  };
  tokens.borders.radii = {
    none: '0px',
    sm: '0.0625rem',
    DEFAULT: '0.125rem',
    md: '0.1875rem',
    lg: '0.25rem',
    xl: '0.375rem',
    '2xl': '0.5rem',
    '3xl': '0.75rem',
    full: '9999px',
  };
  tokens.shadows = {
    sm: '0 1px 1px 0 rgb(0 0 0 / 0.04)',
    DEFAULT: '0 1px 2px 0 rgb(0 0 0 / 0.06)',
    md: '0 2px 4px 0 rgb(0 0 0 / 0.06)',
    lg: '0 4px 8px 0 rgb(0 0 0 / 0.06)',
    xl: '0 8px 16px 0 rgb(0 0 0 / 0.06)',
    '2xl': '0 12px 24px 0 rgb(0 0 0 / 0.08)',
    inner: 'inset 0 1px 2px 0 rgb(0 0 0 / 0.04)',
    none: '0 0 #0000',
  };
  tokens.meta = {
    name: 'Minimal',
    version: '1.0.0',
    tailwindVersion: '3',
    darkMode: 'class',
  };
  return tokens;
}

function createBoldTokens(): DesignTokens {
  const tokens = createDefaultTokens();
  tokens.colors = {
    primary: generateColorScale('#e11d48'),     // rose-600
    secondary: generateColorScale('#7c3aed'),    // violet-600
    accent: generateColorScale('#f59e0b'),       // amber-500
    neutral: generateColorScale('#1e293b'),      // slate-800
    success: generateColorScale('#059669'),      // emerald-600
    warning: generateColorScale('#d97706'),      // amber-600
    danger: generateColorScale('#dc2626'),       // red-600
    info: generateColorScale('#0284c7'),         // sky-600
    custom: {},
  };
  tokens.typography.fontFamilies = {
    heading: 'Poppins',
    body: 'Inter',
    mono: 'Fira Code',
  };
  tokens.borders.radii = {
    none: '0px',
    sm: '0.375rem',
    DEFAULT: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  };
  tokens.shadows = {
    sm: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 8px 12px -2px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 16px 24px -4px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 24px 40px -8px rgb(0 0 0 / 0.2), 0 12px 16px -8px rgb(0 0 0 / 0.1)',
    '2xl': '0 32px 64px -16px rgb(0 0 0 / 0.3)',
    inner: 'inset 0 4px 6px 0 rgb(0 0 0 / 0.1)',
    none: '0 0 #0000',
  };
  tokens.meta = {
    name: 'Bold',
    version: '1.0.0',
    tailwindVersion: '3',
    darkMode: 'class',
  };
  return tokens;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const presets: Record<PresetName, Preset> = {
  default: {
    name: 'default',
    label: 'Default',
    description: 'Standard Tailwind defaults with blue primary and gray neutral colors.',
    tokens: createDefaultTokens(),
  },
  shadcn: {
    name: 'shadcn',
    label: 'shadcn/ui',
    description: 'shadcn/ui inspired theme with zinc neutrals, subtle radii, and minimal shadows.',
    tokens: createShadcnTokens(),
  },
  material: {
    name: 'material',
    label: 'Material Design 3',
    description: 'Material Design 3 inspired with purple primary, rounded shapes, and Roboto typography.',
    tokens: createMaterialTokens(),
  },
  minimal: {
    name: 'minimal',
    label: 'Minimal',
    description: 'Monochrome design with black/white primary, very small radii, and subtle shadows.',
    tokens: createMinimalTokens(),
  },
  bold: {
    name: 'bold',
    label: 'Bold',
    description: 'Vibrant colors, large border radii, and heavy shadow depths for a punchy look.',
    tokens: createBoldTokens(),
  },
};

/**
 * Returns a deep clone of the preset tokens for the given preset name.
 * This ensures the store gets its own mutable copy.
 */
export function getPreset(name: PresetName): DesignTokens {
  const preset = presets[name];
  // Deep clone to avoid shared references between store and presets
  return JSON.parse(JSON.stringify(preset.tokens)) as DesignTokens;
}
