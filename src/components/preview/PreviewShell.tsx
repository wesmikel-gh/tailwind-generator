'use client';

import { useMemo, type ReactNode } from 'react';
import { useDesignTokenStore } from '@/stores/designTokenStore';
import { useShallow } from 'zustand/react/shallow';
import { usePreviewState } from './usePreviewState';
import { SHADE_KEYS, SEMANTIC_COLOR_NAMES, VIEWPORT_SIZES } from '@/types/tokens';
import type { DesignTokens, ShadeKey, SemanticColorName } from '@/types/tokens';

function generateCSSVariables(tokens: DesignTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  // Colors
  for (const name of SEMANTIC_COLOR_NAMES) {
    const scale = tokens.colors[name];
    for (const shade of SHADE_KEYS) {
      vars[`--color-${name}-${shade}`] = scale[shade];
    }
  }
  // Custom colors
  for (const [name, scale] of Object.entries(tokens.colors.custom)) {
    for (const shade of SHADE_KEYS) {
      vars[`--color-${name}-${shade}`] = scale[shade as ShadeKey];
    }
  }

  // Font families
  vars['--font-heading'] = tokens.typography.fontFamilies.heading;
  vars['--font-body'] = tokens.typography.fontFamilies.body;
  vars['--font-mono'] = tokens.typography.fontFamilies.mono;

  // Font sizes
  for (const [key, value] of Object.entries(tokens.typography.fontSizes)) {
    vars[`--text-${key}`] = value;
  }

  // Font weights
  for (const [key, value] of Object.entries(tokens.typography.fontWeights)) {
    vars[`--font-weight-${key}`] = String(value);
  }

  // Line heights
  for (const [key, value] of Object.entries(tokens.typography.lineHeights)) {
    vars[`--leading-${key}`] = value;
  }

  // Letter spacing
  for (const [key, value] of Object.entries(tokens.typography.letterSpacing)) {
    vars[`--tracking-${key}`] = value;
  }

  // Spacing
  for (const [key, value] of Object.entries(tokens.spacing.scale)) {
    vars[`--spacing-${key}`] = value;
  }

  // Border radii
  for (const [key, value] of Object.entries(tokens.borders.radii)) {
    vars[`--radius-${key}`] = value;
  }

  // Border widths
  for (const [key, value] of Object.entries(tokens.borders.widths)) {
    vars[`--border-${key}`] = value;
  }

  // Shadows
  for (const [key, value] of Object.entries(tokens.shadows)) {
    vars[`--shadow-${key}`] = value;
  }

  // Transition durations
  for (const [key, value] of Object.entries(tokens.transitions.durations)) {
    vars[`--duration-${key}`] = value;
  }

  // Transition easings
  for (const [key, value] of Object.entries(tokens.transitions.easings)) {
    vars[`--ease-${key}`] = value;
  }

  return vars;
}

/** Extract just the DesignTokens portion (no actions) from the store */
function selectTokens(state: ReturnType<typeof useDesignTokenStore.getState>): DesignTokens {
  return {
    colors: state.colors,
    typography: state.typography,
    spacing: state.spacing,
    borders: state.borders,
    shadows: state.shadows,
    breakpoints: state.breakpoints,
    container: state.container,
    transitions: state.transitions,
    meta: state.meta,
  };
}

interface PreviewShellProps {
  children: ReactNode;
}

export default function PreviewShell({ children }: PreviewShellProps) {
  const tokens = useDesignTokenStore(useShallow(selectTokens));
  const { viewport, darkMode, zoom, fullscreen } = usePreviewState();

  const cssVars = useMemo(() => generateCSSVariables(tokens), [tokens]);

  const viewportWidth =
    viewport === 'desktop' ? '100%' : `${VIEWPORT_SIZES[viewport].width}px`;

  const wrapperStyle: React.CSSProperties = {
    ...(cssVars as React.CSSProperties),
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'top center',
    width: viewportWidth,
    maxWidth: '100%',
    margin: viewport !== 'desktop' ? '0 auto' : undefined,
    transition: 'transform 0.2s ease, width 0.3s ease',
  };

  const shellContent = (
    <div
      className="preview-scope overflow-auto"
      data-mode={darkMode ? 'dark' : 'light'}
      style={wrapperStyle}
    >
      <div
        className="min-h-[200px] space-y-12 p-6"
        style={{
          backgroundColor: darkMode
            ? 'var(--color-neutral-900)'
            : 'var(--color-neutral-50)',
          color: darkMode
            ? 'var(--color-neutral-100)'
            : 'var(--color-neutral-900)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-normal)',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {children}
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/60 p-8">
        <div className="w-full max-w-7xl rounded-xl bg-white shadow-2xl">
          {shellContent}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-lg border border-zinc-200 bg-white">
      {shellContent}
    </div>
  );
}
