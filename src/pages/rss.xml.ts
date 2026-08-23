import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { parseChapterId } from '../lib/chapters';

export async function GET(context: APIContext) {
  const chapters = await getCollection('chapters');
  const titles = await getCollection('titles');
  const titleById = new Map(titles.map((t) => [t.id, t]));

  const items = [...chapters]
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
    .map((chapter) => {
      const { titleSlug } = parseChapterId(chapter.id);
      const parentTitle = titleById.get(titleSlug);
      return {
        title: `${parentTitle?.data.title ?? titleSlug} — ${chapter.data.chapterTitle}`,
        pubDate: chapter.data.publishDate,
        link: `/titles/${chapter.id}/`,
      };
    });

  return rss({
    title: 'Forgotten Translations',
    description: 'New chapter releases from Forgotten Translations.',
    site: context.site!,
    items,
  });
}
