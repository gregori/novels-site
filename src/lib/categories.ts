export interface CategoryOf<T> {
  key: string;
  label: string;
  titles: T[];
}

type TitleLike = { id: string; data: { categories: string[] } };

/**
 * BR-2: normalization key/label for a category string — trimmed and lowercased,
 * with no separate "pretty" display casing.
 */
export function normalizeCategory(category: string): string {
  return category.trim().toLowerCase();
}

/**
 * BR-2: groups titles by their normalized category keys. Generic over the title
 * entry shape so it can be unit-tested with plain objects and used in pages with
 * full Astro `CollectionEntry<'titles'>` values.
 */
export function deriveCategories<T extends TitleLike>(titles: T[]): CategoryOf<T>[] {
  const byKey = new Map<string, CategoryOf<T>>();

  for (const title of titles) {
    for (const rawCategory of title.data.categories) {
      const key = normalizeCategory(rawCategory);
      const existing = byKey.get(key);
      if (existing) {
        existing.titles.push(title);
      } else {
        byKey.set(key, { key, label: key, titles: [title] });
      }
    }
  }

  return [...byKey.values()].sort((a, b) => a.key.localeCompare(b.key));
}
