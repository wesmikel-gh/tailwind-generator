/**
 * A hardcoded list of ~100 popular Google Fonts for client-side search.
 */
const POPULAR_FONTS: string[] = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Nunito',
  'Nunito Sans',
  'Source Sans 3',
  'Ubuntu',
  'Rubik',
  'Work Sans',
  'Noto Sans',
  'Fira Sans',
  'PT Sans',
  'Mulish',
  'Playfair Display',
  'Merriweather',
  'Lora',
  'Libre Baskerville',
  'EB Garamond',
  'Crimson Text',
  'Source Serif 4',
  'Bitter',
  'PT Serif',
  'Noto Serif',
  'DM Sans',
  'DM Serif Display',
  'DM Serif Text',
  'Manrope',
  'Outfit',
  'Plus Jakarta Sans',
  'Space Grotesk',
  'Space Mono',
  'Sora',
  'Albert Sans',
  'Figtree',
  'Geist',
  'Geist Mono',
  'IBM Plex Sans',
  'IBM Plex Serif',
  'IBM Plex Mono',
  'JetBrains Mono',
  'Fira Code',
  'Source Code Pro',
  'Roboto Mono',
  'Ubuntu Mono',
  'Inconsolata',
  'Red Hat Display',
  'Red Hat Text',
  'Red Hat Mono',
  'Barlow',
  'Barlow Condensed',
  'Barlow Semi Condensed',
  'Josefin Sans',
  'Josefin Slab',
  'Cabin',
  'Karla',
  'Libre Franklin',
  'Archivo',
  'Archivo Black',
  'Archivo Narrow',
  'Exo 2',
  'Comfortaa',
  'Quicksand',
  'Overpass',
  'Overpass Mono',
  'Catamaran',
  'Heebo',
  'Assistant',
  'Maven Pro',
  'Lexend',
  'Lexend Deca',
  'Kanit',
  'Prompt',
  'Sarabun',
  'Titillium Web',
  'Yanone Kaffeesatz',
  'Bebas Neue',
  'Oswald',
  'Fjalla One',
  'Anton',
  'Permanent Marker',
  'Pacifico',
  'Lobster',
  'Caveat',
  'Dancing Script',
  'Satisfy',
  'Great Vibes',
  'Sacramento',
  'Cormorant Garamond',
  'Spectral',
  'Zilla Slab',
  'Alegreya',
  'Alegreya Sans',
  'Vollkorn',
  'Cardo',
  'Domine',
  'Hind',
  'Mukta',
  'Oxygen',
  'Dosis',
  'Abel',
  'Signika',
];

/** Tracks which fonts have already been loaded to avoid duplicate <link> tags. */
const loadedFonts = new Set<string>();

/**
 * Dynamically loads a Google Font by injecting a <link> tag into the document head.
 * Idempotent — calling with the same font name multiple times will only inject once.
 */
export function loadGoogleFont(fontName: string): void {
  if (typeof document === 'undefined') return; // SSR guard
  if (loadedFonts.has(fontName)) return;

  const encoded = fontName.replace(/ /g, '+');
  const href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@100;200;300;400;500;600;700;800;900&display=swap`;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.googleFont = fontName;
  document.head.appendChild(link);

  loadedFonts.add(fontName);
}

/**
 * Searches the hardcoded popular Google Fonts list, returning matching font names.
 * The search is case-insensitive and matches anywhere in the font name.
 *
 * Returns a Promise for API-compatibility (future: could hit the actual Google Fonts API).
 */
export async function searchGoogleFonts(query: string): Promise<string[]> {
  if (!query || query.trim().length === 0) {
    return POPULAR_FONTS.slice(0, 20);
  }

  const lowerQuery = query.toLowerCase().trim();
  return POPULAR_FONTS.filter((font) => font.toLowerCase().includes(lowerQuery));
}
