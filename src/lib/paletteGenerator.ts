import { oklch, formatHex, parse, clampChroma } from 'culori';
import type { ColorScale, ShadeKey } from '@/types/tokens';

/**
 * Target lightness values for each shade in OKLCH color space.
 * These produce a perceptually uniform progression from near-white to near-black.
 * Shade 500 is ~0.55 which matches most base colors.
 */
const SHADE_LIGHTNESS: Record<ShadeKey, number> = {
  '50':  0.97,
  '100': 0.93,
  '200': 0.87,
  '300': 0.78,
  '400': 0.68,
  '500': 0.55,
  '600': 0.47,
  '700': 0.39,
  '800': 0.32,
  '900': 0.25,
  '950': 0.17,
};

/**
 * Chroma scaling factors per shade — lighter and darker shades have less chroma
 * to maintain perceptual uniformity and avoid oversaturation.
 */
const SHADE_CHROMA_SCALE: Record<ShadeKey, number> = {
  '50':  0.15,
  '100': 0.30,
  '200': 0.50,
  '300': 0.72,
  '400': 0.88,
  '500': 1.00,
  '600': 0.95,
  '700': 0.85,
  '800': 0.72,
  '900': 0.58,
  '950': 0.40,
};

/**
 * Generates a perceptually uniform 50–950 shade scale from a single hex base color
 * using the OKLCH color space via the culori library.
 *
 * The base color maps approximately to the 500 shade. Lightness and chroma are
 * adjusted per shade to produce natural-looking tints and shades.
 */
export function generateColorScale(baseHex: string): ColorScale {
  const parsed = parse(baseHex);
  if (!parsed) {
    // Fallback: treat invalid color as gray
    return generateColorScale('#6b7280');
  }

  const base = oklch(parsed);
  if (!base) {
    return generateColorScale('#6b7280');
  }

  const baseL = base.l ?? 0.55;
  const baseC = base.c ?? 0;
  const baseH = base.h ?? 0;

  // Handle achromatic colors (pure white, black, grays)
  const isAchromatic = baseC < 0.005;

  const scale: Partial<ColorScale> = { base: baseHex };

  const shadeKeys: ShadeKey[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  for (const shade of shadeKeys) {
    const targetL = SHADE_LIGHTNESS[shade];
    const chromaScale = SHADE_CHROMA_SCALE[shade];

    // For the 500 shade, use a chroma that matches the base color's chroma
    // For other shades, scale relative to the base
    let targetC: number;
    if (isAchromatic) {
      targetC = 0;
    } else {
      targetC = baseC * chromaScale;
    }

    // Slight hue shift for very light/dark ends to add warmth (optional, subtle)
    let targetH = baseH;
    if (!isAchromatic && !isNaN(baseH)) {
      // Lighter shades shift slightly toward warm, darker toward cool — very subtle
      const lightnessDelta = targetL - baseL;
      targetH = baseH + lightnessDelta * 3; // max ~1.2 degree shift
    }

    const shadeColor = clampChroma(
      { mode: 'oklch', l: targetL, c: targetC, h: isAchromatic ? undefined : targetH },
      'oklch'
    );

    const hex = formatHex(shadeColor);
    scale[shade] = hex ?? '#000000';
  }

  return scale as ColorScale;
}
