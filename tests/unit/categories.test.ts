import { describe, expect, it } from 'vitest';
import { test } from '@fast-check/vitest';
import fc from 'fast-check';
import { deriveCategories, normalizeCategory } from '../../src/lib/categories';

describe('normalizeCategory', () => {
  // PBT-03 (blocking): invariant — output is always trimmed and lowercased
  test.prop([fc.string()])('always returns a trimmed, lowercased string', (input) => {
    const result = normalizeCategory(input);
    expect(result).toBe(result.trim().toLowerCase());
  });

  // Advisory idempotence property (not blocking under Partial PBT enforcement, kept for documentation value)
  test.prop([fc.string()])('is idempotent', (input) => {
    const once = normalizeCategory(input);
    const twice = normalizeCategory(once);
    expect(twice).toBe(once);
  });

  // PBT-10: example-based regression pinning the concrete business scenario
  it('treats differently-cased/whitespaced categories as the same key', () => {
    expect(normalizeCategory('  Fantasy ')).toBe('fantasy');
    expect(normalizeCategory('FANTASY')).toBe('fantasy');
    expect(normalizeCategory('fantasy')).toBe('fantasy');
  });
});

describe('deriveCategories', () => {
  it('groups titles whose categories normalize to the same key (BR-2)', () => {
    const titles = [
      { id: 'a', data: { categories: ['Fantasy', 'Slice of Life'] } },
      { id: 'b', data: { categories: ['fantasy'] } },
    ];

    const categories = deriveCategories(titles);
    const fantasy = categories.find((c) => c.key === 'fantasy');

    expect(fantasy?.titles.map((t) => t.id).sort()).toEqual(['a', 'b']);
  });
});
