import { describe, expect, it } from 'vitest';
import { test } from '@fast-check/vitest';
import fc from 'fast-check';
import { getChaptersForTitle, getRecentChapters, parseChapterId } from '../../src/lib/chapters';

// PBT-07: domain-specific generator instead of raw string/date primitives
const slugArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,8}$/);
const chapterArb = fc
  .record({
    titleSlug: slugArb,
    chapterSlug: slugArb,
    publishDate: fc.date({
      min: new Date('2000-01-01T00:00:00.000Z'),
      max: new Date('2100-01-01T00:00:00.000Z'),
      noInvalidDate: true,
    }),
  })
  .map(({ titleSlug, chapterSlug, publishDate }) => ({
    id: `${titleSlug}/${chapterSlug}`,
    data: { publishDate },
  }));

describe('getRecentChapters', () => {
  // PBT-03: invariant — output size never exceeds the requested limit or input size
  test.prop([fc.array(chapterArb, { maxLength: 30 }), fc.integer({ min: 0, max: 15 })])(
    'never returns more than min(limit, input length) chapters',
    (chapters, limit) => {
      const result = getRecentChapters(chapters, limit);
      expect(result.length).toBeLessThanOrEqual(Math.min(limit, chapters.length));
    },
  );

  // PBT-03: invariant — element preservation, output is a subset of input
  test.prop([fc.array(chapterArb, { maxLength: 30 })])(
    'only returns chapters present in the input',
    (chapters) => {
      const inputIds = new Set(chapters.map((c) => c.id));
      const result = getRecentChapters(chapters, 10);
      expect(result.every((c) => inputIds.has(c.id))).toBe(true);
    },
  );

  // PBT-03: invariant — result is sorted by publishDate descending
  test.prop([fc.array(chapterArb, { minLength: 1, maxLength: 30 })])(
    'sorts results by publishDate descending',
    (chapters) => {
      const result = getRecentChapters(chapters, chapters.length);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].data.publishDate.getTime()).toBeGreaterThanOrEqual(
          result[i + 1].data.publishDate.getTime(),
        );
      }
    },
  );
});

describe('getChaptersForTitle', () => {
  test.prop([fc.array(chapterArb, { maxLength: 30 }), slugArb])(
    'only returns chapters belonging to the requested title',
    (chapters, titleSlug) => {
      const result = getChaptersForTitle(chapters, titleSlug);
      expect(result.every((c) => parseChapterId(c.id).titleSlug === titleSlug)).toBe(true);
    },
  );

  it('sorts a title chapters ascending by filename (BR-3)', () => {
    const chapters = [
      { id: 'solo-leveling/chapter-02', data: { publishDate: new Date('2024-01-02') } },
      { id: 'solo-leveling/chapter-01', data: { publishDate: new Date('2024-01-01') } },
      { id: 'other-title/chapter-01', data: { publishDate: new Date('2024-01-01') } },
    ];

    const result = getChaptersForTitle(chapters, 'solo-leveling');
    expect(result.map((c) => c.id)).toEqual([
      'solo-leveling/chapter-01',
      'solo-leveling/chapter-02',
    ]);
  });
});
