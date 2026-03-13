import { create } from 'zustand';
import type { DesignTokens, SemanticColorName, ShadeKey, PresetName } from '@/types/tokens';
import { SEMANTIC_COLOR_NAMES } from '@/types/tokens';
import { generateColorScale } from '@/lib/paletteGenerator';
import { getPreset } from '@/lib/presets';
import { generateSpacingScale } from '@/lib/presets';

// Re-export generateSpacingScale for convenience
export { generateSpacingScale } from '@/lib/presets';

interface DesignTokenActions {
  /** Set the base color for a semantic or custom color and regenerate its full scale. */
  setColorBase: (name: SemanticColorName | string, hex: string) => void;

  /** Manually override a single shade within a color scale. */
  setColorShade: (name: string, shade: ShadeKey, hex: string) => void;

  /** Set a font family for a given role. */
  setFontFamily: (role: 'heading' | 'body' | 'mono', fontName: string) => void;

  /** Set a font size token. */
  setFontSize: (key: string, value: string) => void;

  /** Set the spacing base unit and regenerate the full spacing scale. */
  setSpacingBase: (baseUnit: number) => void;

  /** Set a border radius token. */
  setRadius: (key: string, value: string) => void;

  /** Set a box shadow token. */
  setShadow: (key: string, value: string) => void;

  /** Set a breakpoint token. */
  setBreakpoint: (key: string, value: string) => void;

  /** Merge partial metadata into the current meta. */
  setMeta: (partial: Partial<DesignTokens['meta']>) => void;

  /** Load a full preset, replacing all tokens. */
  loadPreset: (presetName: PresetName) => void;

  /** Add a custom color with a base hex value. */
  addCustomColor: (name: string, baseHex: string) => void;

  /** Remove a custom color by name. */
  removeCustomColor: (name: string) => void;

  /** Reset all tokens to the default preset. */
  resetToDefaults: () => void;
}

type DesignTokenStore = DesignTokens & DesignTokenActions;

/**
 * Determines if a color name is a semantic color (part of the fixed set)
 * or a custom color.
 */
function isSemanticColor(name: string): name is SemanticColorName {
  return (SEMANTIC_COLOR_NAMES as readonly string[]).includes(name);
}

export const useDesignTokenStore = create<DesignTokenStore>((set) => ({
  // Initialize with default preset
  ...getPreset('default'),

  setColorBase: (name, hex) =>
    set((state) => {
      const newScale = generateColorScale(hex);
      if (isSemanticColor(name)) {
        return {
          colors: {
            ...state.colors,
            [name]: newScale,
          },
        };
      }
      // Custom color
      return {
        colors: {
          ...state.colors,
          custom: {
            ...state.colors.custom,
            [name]: newScale,
          },
        },
      };
    }),

  setColorShade: (name, shade, hex) =>
    set((state) => {
      if (isSemanticColor(name)) {
        return {
          colors: {
            ...state.colors,
            [name]: {
              ...state.colors[name],
              [shade]: hex,
            },
          },
        };
      }
      // Custom color
      const existing = state.colors.custom[name];
      if (!existing) return state;
      return {
        colors: {
          ...state.colors,
          custom: {
            ...state.colors.custom,
            [name]: {
              ...existing,
              [shade]: hex,
            },
          },
        },
      };
    }),

  setFontFamily: (role, fontName) =>
    set((state) => ({
      typography: {
        ...state.typography,
        fontFamilies: {
          ...state.typography.fontFamilies,
          [role]: fontName,
        },
      },
    })),

  setFontSize: (key, value) =>
    set((state) => ({
      typography: {
        ...state.typography,
        fontSizes: {
          ...state.typography.fontSizes,
          [key]: value,
        },
      },
    })),

  setSpacingBase: (baseUnit) =>
    set(() => ({
      spacing: {
        baseUnit,
        scale: generateSpacingScale(baseUnit),
      },
    })),

  setRadius: (key, value) =>
    set((state) => ({
      borders: {
        ...state.borders,
        radii: {
          ...state.borders.radii,
          [key]: value,
        },
      },
    })),

  setShadow: (key, value) =>
    set((state) => ({
      shadows: {
        ...state.shadows,
        [key]: value,
      },
    })),

  setBreakpoint: (key, value) =>
    set((state) => ({
      breakpoints: {
        ...state.breakpoints,
        [key]: value,
      },
    })),

  setMeta: (partial) =>
    set((state) => ({
      meta: {
        ...state.meta,
        ...partial,
      },
    })),

  loadPreset: (presetName) =>
    set(() => getPreset(presetName)),

  addCustomColor: (name, baseHex) =>
    set((state) => ({
      colors: {
        ...state.colors,
        custom: {
          ...state.colors.custom,
          [name]: generateColorScale(baseHex),
        },
      },
    })),

  removeCustomColor: (name) =>
    set((state) => {
      const { [name]: _, ...rest } = state.colors.custom;
      return {
        colors: {
          ...state.colors,
          custom: rest,
        },
      };
    }),

  resetToDefaults: () =>
    set(() => getPreset('default')),
}));
