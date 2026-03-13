import type { DesignTokens, ColorScale } from '@/types/tokens';
import { SEMANTIC_COLOR_NAMES, SHADE_KEYS } from '@/types/tokens';

/**
 * Formats a JavaScript object as a pretty-printed string for embedding in config.
 * Produces JS object literal syntax (not JSON).
 */
function formatObject(obj: Record<string, unknown>, indent: number = 2): string {
  const pad = ' '.repeat(indent);
  const innerPad = ' '.repeat(indent + 2);
  const entries = Object.entries(obj);

  if (entries.length === 0) return '{}';

  const lines: string[] = ['{'];
  for (const [key, value] of entries) {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;

    if (typeof value === 'string') {
      lines.push(`${innerPad}${safeKey}: '${value}',`);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      lines.push(`${innerPad}${safeKey}: ${value},`);
    } else if (Array.isArray(value)) {
      const items = value.map((v) => (typeof v === 'string' ? `'${v}'` : String(v)));
      lines.push(`${innerPad}${safeKey}: [${items.join(', ')}],`);
    } else if (typeof value === 'object' && value !== null) {
      const nested = formatObject(value as Record<string, unknown>, indent + 2);
      lines.push(`${innerPad}${safeKey}: ${nested},`);
    }
  }
  lines.push(`${pad}}`);
  return lines.join('\n');
}

/**
 * Converts a ColorScale to a flat shade map for Tailwind config.
 */
function colorScaleToConfig(scale: ColorScale): Record<string, string> {
  const result: Record<string, string> = {};
  for (const shade of SHADE_KEYS) {
    result[shade] = scale[shade];
  }
  return result;
}

/**
 * Builds the full colors object for the Tailwind config.
 */
function buildColorsConfig(tokens: DesignTokens): Record<string, unknown> {
  const colors: Record<string, unknown> = {};

  for (const name of SEMANTIC_COLOR_NAMES) {
    colors[name] = colorScaleToConfig(tokens.colors[name]);
  }

  for (const [name, scale] of Object.entries(tokens.colors.custom)) {
    colors[name] = colorScaleToConfig(scale);
  }

  return colors;
}

/**
 * Serializes the full DesignTokens state to a valid Tailwind v3 `tailwind.config.js` string.
 */
export function generateTailwindV3Config(tokens: DesignTokens): string {
  const { typography, spacing, borders, shadows, breakpoints, container, transitions } = tokens;

  const colorsConfig = buildColorsConfig(tokens);

  const fontFamilyConfig: Record<string, string[]> = {
    heading: [typography.fontFamilies.heading, 'sans-serif'],
    body: [typography.fontFamilies.body, 'sans-serif'],
    mono: [typography.fontFamilies.mono, 'monospace'],
  };

  const themeExtend: Record<string, unknown> = {
    colors: colorsConfig,
    fontFamily: fontFamilyConfig,
    fontSize: typography.fontSizes,
    fontWeight: typography.fontWeights,
    lineHeight: typography.lineHeights,
    letterSpacing: typography.letterSpacing,
    spacing: spacing.scale,
    borderRadius: borders.radii,
    borderWidth: borders.widths,
    boxShadow: shadows,
    screens: breakpoints,
    transitionDuration: transitions.durations,
    transitionTimingFunction: transitions.easings,
  };

  const containerConfig: Record<string, unknown> = {
    center: container.center,
    padding: container.padding,
  };

  const lines: string[] = [
    `/** @type {import('tailwindcss').Config} */`,
    `module.exports = {`,
    `  darkMode: '${tokens.meta.darkMode}',`,
    `  content: [`,
    `    './src/**/*.{js,ts,jsx,tsx,mdx}',`,
    `    './app/**/*.{js,ts,jsx,tsx,mdx}',`,
    `    './components/**/*.{js,ts,jsx,tsx,mdx}',`,
    `  ],`,
    `  theme: {`,
    `    container: ${formatObject(containerConfig, 4)},`,
    `    extend: ${formatObject(themeExtend, 4)},`,
    `  },`,
    `  plugins: [],`,
    `};`,
  ];

  return lines.join('\n');
}
