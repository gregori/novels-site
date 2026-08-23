import { describe, expect, it } from 'vitest';
import {
  resolveInitialFontFamily,
  resolveInitialFontSize,
  resolveInitialLineSpacing,
} from '../../src/scripts/typography';

describe('typography preference resolution (BR-7)', () => {
  it('defaults to a calm serif, medium size, comfortable spacing when nothing is stored', () => {
    expect(resolveInitialFontFamily(null)).toBe('serif');
    expect(resolveInitialFontSize(null)).toBe('md');
    expect(resolveInitialLineSpacing(null)).toBe('comfortable');
  });

  it('uses the stored preference when valid, and falls back when invalid', () => {
    expect(resolveInitialFontFamily('sans')).toBe('sans');
    expect(resolveInitialFontFamily('garbage')).toBe('serif');

    expect(resolveInitialFontSize('xl')).toBe('xl');
    expect(resolveInitialFontSize('garbage')).toBe('md');

    expect(resolveInitialLineSpacing('relaxed')).toBe('relaxed');
    expect(resolveInitialLineSpacing('garbage')).toBe('comfortable');
  });
});
