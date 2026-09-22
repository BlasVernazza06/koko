import { describe, it, expect } from 'vitest';
import { validateProjectName, sanitizeProjectName, formatCliCommand } from '@/lib/projectValidation';

describe('Project Name Validation & Sanitization', () => {
  it('should accept valid kebab-case project names', () => {
    const result = validateProjectName('my-koko-app');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
    expect(result.sanitized).toBe('my-koko-app');
  });

  it('should accept alphanumeric and underscore names', () => {
    const result = validateProjectName('koko_backend_v2');
    expect(result.valid).toBe(true);
    expect(result.sanitized).toBe('koko_backend_v2');
  });

  it('should reject empty or whitespace-only names', () => {
    const result = validateProjectName('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('no puede estar vacío');
    expect(result.sanitized).toBe('my-koko-app');
  });

  it('should reject names starting with dot or hyphen', () => {
    const resultDot = validateProjectName('.hidden-app');
    expect(resultDot.valid).toBe(false);
    expect(resultDot.error).toContain('no puede comenzar con un punto');

    const resultHyphen = validateProjectName('-invalid-start');
    expect(resultHyphen.valid).toBe(false);
  });

  it('should reject and sanitize invalid special characters', () => {
    const result = validateProjectName('my@unsafe/project*name!');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Solo se permiten');
    expect(result.sanitized).toBe('myunsafeprojectname');
  });

  it('should block Windows reserved names', () => {
    const reserved = ['con', 'aux', 'nul', 'prn', 'com1', 'lpt1'];
    for (const name of reserved) {
      const result = validateProjectName(name);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('nombre reservado');
    }
  });

  it('should sanitize multi-word inputs by converting spaces to hyphens', () => {
    const sanitized = sanitizeProjectName('Awesome Koko Project  2026');
    expect(sanitized).toBe('awesome-koko-project-2026');
  });

  it('should truncate and validate names longer than 100 characters', () => {
    const longName = 'a'.repeat(105);
    const result = validateProjectName(longName);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('no puede exceder los 100 caracteres');
    expect(result.sanitized.length).toBe(100);
  });
});

describe('CLI Command Generator', () => {
  it('should format wrapper commands for pnpm, npm, yarn, bun', () => {
    const base = { projectName: 'koko-api', framework: 'astro', commandType: 'wrapper' as const };
    
    expect(formatCliCommand({ ...base, packageManager: 'pnpm' }))
      .toBe('pnpm create koko-app koko-api --template astro');
      
    expect(formatCliCommand({ ...base, packageManager: 'npm' }))
      .toBe('npx create-koko-app koko-api --template astro');
      
    expect(formatCliCommand({ ...base, packageManager: 'yarn' }))
      .toBe('yarn create koko-app koko-api --template astro');
      
    expect(formatCliCommand({ ...base, packageManager: 'bun' }))
      .toBe('bun create koko-app koko-api --template astro');
  });

  it('should format native binary and Go direct commands', () => {
    const options = {
      projectName: 'super app',
      commandType: 'binary' as const,
      database: 'postgresql',
      orm: 'drizzle'
    };

    expect(formatCliCommand(options))
      .toBe('koko init super-app --db postgresql --orm drizzle');

    expect(formatCliCommand({ ...options, commandType: 'go' }))
      .toBe('go run github.com/BlasVernazza06/koko-cli@latest init super-app --db postgresql --orm drizzle');
  });
});
