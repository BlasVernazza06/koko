import { describe, it, expect } from 'vitest';
import { docsDropdownItems, recipesDropdownItems, faqCarouselSlides } from '@/data/navigation.data';
import { footerContent } from '@/data/footer.data';

describe('Navigation, Dropdown & Footer Data Integrity', () => {
  it('should have valid docs dropdown items with valid internal routes', () => {
    expect(docsDropdownItems.length).toBeGreaterThan(0);

    for (const item of docsDropdownItems) {
      expect(item.titleEs.trim()).not.toBe('');
      expect(item.titleEn.trim()).not.toBe('');
      expect(item.descEs.trim()).not.toBe('');
      expect(item.descEn.trim()).not.toBe('');
      expect(item.href.startsWith('/docs')).toBe(true);
      expect(item.hrefEn.startsWith('/en/docs')).toBe(true);
    }
  });

  it('should have valid recipe dropdown items with recipe ids and names', () => {
    expect(recipesDropdownItems.length).toBeGreaterThan(0);

    for (const recipe of recipesDropdownItems) {
      expect(recipe.id.trim()).not.toBe('');
      expect(recipe.nameEs.trim()).not.toBe('');
      expect(recipe.nameEn.trim()).not.toBe('');
      expect(recipe.descEs.trim()).not.toBe('');
      expect(recipe.descEn.trim()).not.toBe('');
      expect(recipe.icon.trim()).not.toBe('');
    }
  });

  it('should have valid FAQ carousel slides in navigation data', () => {
    expect(faqCarouselSlides.length).toBeGreaterThan(0);

    for (const slide of faqCarouselSlides) {
      expect(slide.questionEs.trim()).not.toBe('');
      expect(slide.questionEn.trim()).not.toBe('');
      expect(slide.answerEs.trim()).not.toBe('');
      expect(slide.answerEn.trim()).not.toBe('');
    }
  });

  it('should have valid footer content with exact translation key parity between ES and EN', () => {
    const esKeys = Object.keys(footerContent.es).sort();
    const enKeys = Object.keys(footerContent.en).sort();

    expect(esKeys).toEqual(enKeys);

    for (const key of esKeys) {
      const esVal = footerContent.es[key as keyof typeof footerContent.es];
      const enVal = footerContent.en[key as keyof typeof footerContent.en];

      expect(typeof esVal).toBe('string');
      expect(typeof enVal).toBe('string');
      expect(esVal.trim()).not.toBe('');
      expect(enVal.trim()).not.toBe('');
    }
  });
});
