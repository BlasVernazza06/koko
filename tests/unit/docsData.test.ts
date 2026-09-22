import { describe, it, expect } from 'vitest';
import { docsData } from '@/lib/docsData';

describe('Documentation Data & i18n Parity (docsData.ts)', () => {
  it('should have both "es" and "en" locales defined', () => {
    expect(docsData.es).toBeDefined();
    expect(docsData.en).toBeDefined();
    expect(docsData.es.length).toBeGreaterThan(0);
    expect(docsData.en.length).toBeGreaterThan(0);
  });

  it('should maintain exact section ID parity between ES and EN docs', () => {
    const esIds = docsData.es.map((s) => s.id);
    const enIds = docsData.en.map((s) => s.id);

    expect(esIds).toEqual(enIds);
  });

  it('should guarantee each section has non-empty titles and content blocks', () => {
    for (const locale of ['es', 'en'] as const) {
      for (const section of docsData[locale]) {
        expect(section.id.trim()).not.toBe('');
        expect(section.title.trim()).not.toBe('');
        expect(section.content.length).toBeGreaterThan(0);

        for (const block of section.content) {
          expect(block.anchorId.trim()).not.toBe('');
          expect(block.title.trim()).not.toBe('');
          expect(block.body).toBeInstanceOf(Array);
        }
      }
    }
  });

  it('should have unique anchor IDs within each section to prevent broken anchor links', () => {
    for (const locale of ['es', 'en'] as const) {
      for (const section of docsData[locale]) {
        const anchorIds = section.content.map((b) => b.anchorId);
        const uniqueAnchors = new Set(anchorIds);
        expect(uniqueAnchors.size).toBe(anchorIds.length);
      }
    }
  });
});
