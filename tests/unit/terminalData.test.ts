import { describe, it, expect } from 'vitest';
import { initialSidebarFiles, terminalTranslations } from '@/data/terminal-simulator.data';

describe('Terminal Simulator Data & i18n Suite', () => {
  it('should have initial sidebar files with valid properties', () => {
    expect(initialSidebarFiles.length).toBeGreaterThan(0);

    for (const file of initialSidebarFiles) {
      expect(file.id.trim()).not.toBe('');
      expect(file.name.trim()).not.toBe('');
      expect(['file', 'dir']).toContain(file.type);
      expect(file.indent).toBeGreaterThanOrEqual(1);
    }
  });

  it('should have unique IDs for all sidebar file nodes', () => {
    const ids = initialSidebarFiles.map((f) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should guarantee exact translation key parity between ES and EN in terminal simulator', () => {
    const esKeys = Object.keys(terminalTranslations.es).sort();
    const enKeys = Object.keys(terminalTranslations.en).sort();

    expect(esKeys).toEqual(enKeys);

    for (const key of esKeys) {
      const esVal = terminalTranslations.es[key as keyof typeof terminalTranslations.es];
      const enVal = terminalTranslations.en[key as keyof typeof terminalTranslations.en];

      expect(typeof esVal).toBe('string');
      expect(typeof enVal).toBe('string');
      expect(esVal.trim()).not.toBe('');
      expect(enVal.trim()).not.toBe('');
    }
  });
});
