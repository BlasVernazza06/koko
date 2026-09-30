import { describe, it, expect } from 'vitest';
import { templates } from '@/data/templates.data';
import { packageManagers } from '@/data/package-managers.data';

describe('Builder Templates & Package Managers Suite', () => {
  it('should have production templates with valid configurations', () => {
    expect(templates.length).toBeGreaterThan(0);

    for (const template of templates) {
      expect(template.id.trim()).not.toBe('');
      expect(template.nameEs.trim()).not.toBe('');
      expect(template.nameEn.trim()).not.toBe('');
      expect(template.descEs.trim()).not.toBe('');
      expect(template.descEn.trim()).not.toBe('');
      expect(template.config).toBeDefined();
      expect(template.config.selectedPackageManager).toBeDefined();
    }
  });

  it('should have unique IDs for all templates', () => {
    const ids = templates.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid package manager options (pnpm, npm, yarn, bun)', () => {
    expect(packageManagers.length).toBeGreaterThan(0);
    const pmIds = packageManagers.map((p) => p.id);

    expect(pmIds).toContain('pnpm');
    expect(pmIds).toContain('npm');
  });
});
