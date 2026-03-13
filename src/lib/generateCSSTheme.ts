import type { DesignTokens } from '@/types/tokens';
import { SEMANTIC_COLOR_NAMES, SHADE_KEYS } from '@/types/tokens';

/**
 * Serializes the DesignTokens state to a valid Tailwind v4 `@theme` CSS block
 * using CSS custom properties syntax.
 */
export function generateTailwindV4Theme(tokens: DesignTokens): string {
  const lines: string[] = [];

  lines.push('@theme {');

  // -- Colors --
  lines.push('  /* Colors */');
  for (const name of SEMANTIC_COLOR_NAMES) {
    const scale = tokens.colors[name];
    for (const shade of SHADE_KEYS) {
      lines.push(`  --color-${name}-${shade}: ${scale[shade]};`);
    }
  }

  for (const [name, scale] of Object.entries(tokens.colors.custom)) {
    for (const shade of SHADE_KEYS) {
      lines.push(`  --color-${name}-${shade}: ${scale[shade]};`);
    }
  }

  lines.push('');

  // -- Typography --
  lines.push('  /* Font Families */');
  lines.push(`  --font-heading: '${tokens.typography.fontFamilies.heading}', sans-serif;`);
  lines.push(`  --font-body: '${tokens.typography.fontFamilies.body}', sans-serif;`);
  lines.push(`  --font-mono: '${tokens.typography.fontFamilies.mono}', monospace;`);
  lines.push('');

  lines.push('  /* Font Sizes */');
  for (const [key, value] of Object.entries(tokens.typography.fontSizes)) {
    lines.push(`  --text-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Font Weights */');
  for (const [key, value] of Object.entries(tokens.typography.fontWeights)) {
    lines.push(`  --font-weight-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Line Heights */');
  for (const [key, value] of Object.entries(tokens.typography.lineHeights)) {
    lines.push(`  --leading-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Letter Spacing */');
  for (const [key, value] of Object.entries(tokens.typography.letterSpacing)) {
    lines.push(`  --tracking-${key}: ${value};`);
  }
  lines.push('');

  // -- Spacing --
  lines.push('  /* Spacing */');
  for (const [key, value] of Object.entries(tokens.spacing.scale)) {
    lines.push(`  --spacing-${key}: ${value};`);
  }
  lines.push('');

  // -- Border Radius --
  lines.push('  /* Border Radius */');
  for (const [key, value] of Object.entries(tokens.borders.radii)) {
    const suffix = key === 'DEFAULT' ? '' : `-${key}`;
    lines.push(`  --radius${suffix}: ${value};`);
  }
  lines.push('');

  // -- Border Widths --
  lines.push('  /* Border Widths */');
  for (const [key, value] of Object.entries(tokens.borders.widths)) {
    const suffix = key === 'DEFAULT' ? '' : `-${key}`;
    lines.push(`  --border${suffix}: ${value};`);
  }
  lines.push('');

  // -- Shadows --
  lines.push('  /* Shadows */');
  for (const [key, value] of Object.entries(tokens.shadows)) {
    const suffix = key === 'DEFAULT' ? '' : `-${key}`;
    lines.push(`  --shadow${suffix}: ${value};`);
  }
  lines.push('');

  // -- Breakpoints --
  lines.push('  /* Breakpoints */');
  for (const [key, value] of Object.entries(tokens.breakpoints)) {
    lines.push(`  --breakpoint-${key}: ${value};`);
  }
  lines.push('');

  // -- Transitions --
  lines.push('  /* Transition Durations */');
  for (const [key, value] of Object.entries(tokens.transitions.durations)) {
    lines.push(`  --duration-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Transition Easings */');
  for (const [key, value] of Object.entries(tokens.transitions.easings)) {
    lines.push(`  --ease-${key}: ${value};`);
  }

  lines.push('}');

  return lines.join('\n');
}
