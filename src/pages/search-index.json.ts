import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSearchIndex } from '../lib/search';

export const GET: APIRoute = async () => {
  const titles = await getCollection('titles');
  const index = buildSearchIndex(titles);

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
