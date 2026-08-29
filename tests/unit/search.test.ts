import { describe, expect, it } from 'vitest';
import { test } from '@fast-check/vitest';
import fc from 'fast-check';
import { searchTitles, type SearchIndexEntry } from '../../src/lib/search';

// PBT-07: domain-specific generator for search index entries
const indexEntryArb: fc.Arbitrary<SearchIndexEntry> = fc.record({
  slug: fc.stringMatching(/^[a-z][a-z0-9-]{0,8}$/),
  title: fc.string({ minLength: 1, maxLength: 30 }),
  originalAuthor: fc.string({ minLength: 1, maxLength: 30 }),
});

describe('searchTitles', () => {
  it('returns no results for an empty or whitespace-only query (BR-6)', () => {
    const index: SearchIndexEntry[] = [
      { slug: 'a', title: 'Solo Leveling', originalAuthor: 'Chugong' },
    ];
    expect(searchTitles('', index)).toEqual([]);
    expect(searchTitles('   ', index)).toEqual([]);
  });

  // PBT-03: invariant — matching is case-insensitive regardless of query casing
  test.prop([fc.string({ minLength: 1 }), fc.array(indexEntryArb, { maxLength: 20 })])(
    'is case-insensitive with respect to the query',
    (query, index) => {
      const lower = searchTitles(query.toLowerCase(), index);
      const upper = searchTitles(query.toUpperCase(), index);
      expect(new Set(upper.map((e) => e.slug))).toEqual(new Set(lower.map((e) => e.slug)));
    },
  );

  // PBT-03: invariant — the result set exactly matches the case-insensitive substring definition
  test.prop([fc.string({ minLength: 1 }), fc.array(indexEntryArb, { maxLength: 20 })])(
    'returns exactly the entries whose title or author contain the query, case-insensitively',
    (query, index) => {
      const trimmed = query.trim().toLowerCase();
      fc.pre(trimmed.length > 0);

      const expected = index.filter(
        (entry) =>
          entry.title.toLowerCase().includes(trimmed) ||
          entry.originalAuthor.toLowerCase().includes(trimmed),
      );

      expect(new Set(searchTitles(query, index).map((e) => e.slug))).toEqual(
        new Set(expected.map((e) => e.slug)),
      );
    },
  );
});
