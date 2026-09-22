import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utility cn() - Tailwind Class Merge & Conditionals', () => {
  it('should merge basic class names', () => {
    expect(cn('px-4', 'py-2', 'bg-black')).toBe('px-4 py-2 bg-black');
  });

  it('should resolve Tailwind conflicts preferring the latter class', () => {
    expect(cn('p-4 text-red-500', 'p-2 text-blue-500')).toBe('p-2 text-blue-500');
    expect(cn('bg-red-500', 'bg-emerald-500')).toBe('bg-emerald-500');
  });

  it('should filter out falsy, undefined, null, and empty values', () => {
    const isHidden = false;
    const isPrimary = true;
    expect(
      cn(
        'base-btn',
        isHidden && 'hidden',
        isPrimary && 'btn-primary',
        null,
        undefined,
        '',
        0 && 'zero'
      )
    ).toBe('base-btn btn-primary');
  });

  it('should handle object syntax and array syntax cleanly', () => {
    expect(
      cn(['flex items-center', { 'opacity-50': true, 'opacity-100': false }])
    ).toBe('flex items-center opacity-50');
  });
});
