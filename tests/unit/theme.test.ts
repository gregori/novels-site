import { describe, expect, it } from 'vitest';
import { resolveInitialTheme } from '../../src/scripts/theme';

describe('resolveInitialTheme (BR-7)', () => {
  it('uses the stored preference when it is a valid theme', () => {
    expect(resolveInitialTheme('light', true)).toBe('light');
    expect(resolveInitialTheme('dark', false)).toBe('dark');
  });

  it('falls back to the OS preference when nothing valid is stored', () => {
    expect(resolveInitialTheme(null, true)).toBe('dark');
    expect(resolveInitialTheme(null, false)).toBe('light');
    expect(resolveInitialTheme('not-a-theme', true)).toBe('dark');
  });
});
