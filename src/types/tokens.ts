// Core token type definitions — shared contract across all modules

export interface ColorScale {
  base: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export type ShadeKey = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';

export const SHADE_KEYS: ShadeKey[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

export type SemanticColorName = 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export const SEMANTIC_COLOR_NAMES: SemanticColorName[] = [
  'primary', 'secondary', 'accent', 'neutral', 'success', 'warning', 'danger', 'info'
];

export interface DesignTokens {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    accent: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    danger: ColorScale;
    info: ColorScale;
    custom: Record<string, ColorScale>;
  };

  typography: {
    fontFamilies: {
      heading: string;
      body: string;
      mono: string;
    };
    fontSizes: Record<string, string>;
    fontWeights: Record<string, number>;
    lineHeights: Record<string, string>;
    letterSpacing: Record<string, string>;
  };

  spacing: {
    baseUnit: number;
    scale: Record<string, string>;
  };

  borders: {
    radii: Record<string, string>;
    widths: Record<string, string>;
  };

  shadows: Record<string, string>;

  breakpoints: Record<string, string>;

  container: {
    center: boolean;
    padding: string;
    maxWidths: Record<string, string>;
  };

  transitions: {
    durations: Record<string, string>;
    easings: Record<string, string>;
  };

  meta: {
    name: string;
    version: string;
    tailwindVersion: '3' | '4';
    darkMode: 'class' | 'media';
  };
}

export interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaa: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
}

export type PresetName = 'default' | 'shadcn' | 'material' | 'minimal' | 'bold';

export interface Preset {
  name: PresetName;
  label: string;
  description: string;
  tokens: DesignTokens;
}

export type ViewportSize = 'mobile' | 'tablet' | 'desktop';

export interface ViewportDimensions {
  width: number;
  label: string;
}

export const VIEWPORT_SIZES: Record<ViewportSize, ViewportDimensions> = {
  mobile: { width: 375, label: 'Mobile' },
  tablet: { width: 768, label: 'Tablet' },
  desktop: { width: 1280, label: 'Desktop' },
};
