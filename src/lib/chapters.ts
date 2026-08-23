export interface ParsedChapterId {
  titleSlug: string;
  chapterSlug: string;
}

type ChapterLike = { id: string; data: { publishDate: Date } };

/**
 * BR-3: chapter entries are identified as `<titleSlug>/<chapterSlug>` by the glob loader.
 */
export function parseChapterId(id: string): ParsedChapterId {
  const [titleSlug, chapterSlug] = id.split('/');
  return { titleSlug, chapterSlug };
}

/**
 * BR-3: chapter order within a title is the ascending lexicographic sort of the
 * chapter filename (chapterSlug). Zero-padded numbers in filenames (chapter-01,
 * chapter-02, ...) keep lexicographic order equal to numeric order.
 */
export function getChaptersForTitle<T extends ChapterLike>(allChapters: T[], titleSlug: string): T[] {
  return allChapters
    .filter((chapter) => parseChapterId(chapter.id).titleSlug === titleSlug)
    .sort((a, b) => parseChapterId(a.id).chapterSlug.localeCompare(parseChapterId(b.id).chapterSlug));
}

/**
 * BR-4: the `limit` most recently published chapters across all titles, sorted by
 * publishDate descending, tiebroken by titleSlug then chapterSlug ascending.
 */
export function getRecentChapters<T extends ChapterLike>(allChapters: T[], limit = 10): T[] {
  return [...allChapters]
    .sort((a, b) => {
      const dateDiff = b.data.publishDate.getTime() - a.data.publishDate.getTime();
      if (dateDiff !== 0) return dateDiff;

      const aParsed = parseChapterId(a.id);
      const bParsed = parseChapterId(b.id);
      const titleDiff = aParsed.titleSlug.localeCompare(bParsed.titleSlug);
      if (titleDiff !== 0) return titleDiff;

      return aParsed.chapterSlug.localeCompare(bParsed.chapterSlug);
    })
    .slice(0, limit);
}
