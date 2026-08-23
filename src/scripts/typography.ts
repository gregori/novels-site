export type FontFamily = 'serif' | 'sans';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type LineSpacing = 'compact' | 'comfortable' | 'relaxed';

const FONT_FAMILY_KEY = 'fontFamily';
const FONT_SIZE_KEY = 'fontSize';
const LINE_SPACING_KEY = 'lineSpacing';

const FONT_FAMILIES: FontFamily[] = ['serif', 'sans'];
const FONT_SIZES: FontSize[] = ['sm', 'md', 'lg', 'xl'];
const LINE_SPACINGS: LineSpacing[] = ['compact', 'comfortable', 'relaxed'];

// BR-7 defaults: calm serif, medium size, comfortable (1.5-1.6) line spacing
const DEFAULT_FONT_FAMILY: FontFamily = 'serif';
const DEFAULT_FONT_SIZE: FontSize = 'md';
const DEFAULT_LINE_SPACING: LineSpacing = 'comfortable';

function resolvePreference<T extends string>(stored: string | null, allowed: T[], fallback: T): T {
  return allowed.includes(stored as T) ? (stored as T) : fallback;
}

export function resolveInitialFontFamily(stored: string | null): FontFamily {
  return resolvePreference(stored, FONT_FAMILIES, DEFAULT_FONT_FAMILY);
}

export function resolveInitialFontSize(stored: string | null): FontSize {
  return resolvePreference(stored, FONT_SIZES, DEFAULT_FONT_SIZE);
}

export function resolveInitialLineSpacing(stored: string | null): LineSpacing {
  return resolvePreference(stored, LINE_SPACINGS, DEFAULT_LINE_SPACING);
}

function persist(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* localStorage unavailable (e.g. private mode) — preference just won't persist */
  }
}

export function setFontFamily(value: FontFamily): void {
  document.documentElement.dataset.font = value;
  persist(FONT_FAMILY_KEY, value);
}

export function setFontSize(value: FontSize): void {
  document.documentElement.dataset.fontSize = value;
  persist(FONT_SIZE_KEY, value);
}

export function setLineSpacing(value: LineSpacing): void {
  document.documentElement.dataset.lineSpacing = value;
  persist(LINE_SPACING_KEY, value);
}
