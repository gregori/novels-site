export interface SearchIndexEntry {
  slug: string;
  title: string;
  originalAuthor: string;
}

type TitleLike = { id: string; data: { title: string; originalAuthor: string } };

export function buildSearchIndex<T extends TitleLike>(titles: T[]): SearchIndexEntry[] {
  return titles.map((title) => ({
    slug: title.id,
    title: title.data.title,
    originalAuthor: title.data.originalAuthor,
  }));
}

/**
 * BR-6: case-insensitive substring match against title/author only.
 * An empty/whitespace-only query returns no results.
 */
export function searchTitles(query: string, index: SearchIndexEntry[]): SearchIndexEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length === 0) return [];

  return index.filter(
    (entry) =>
      entry.title.toLowerCase().includes(trimmed) ||
      entry.originalAuthor.toLowerCase().includes(trimmed)
  );
}
