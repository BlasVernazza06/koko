import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = path.resolve(__dirname, '../../');

describe('Deployment & Production Integrity Gate (Cloudflare Edge & SEO)', () => {
  it('should have a non-empty public/robots.txt with correct sitemap declaration', () => {
    const robotsPath = path.join(ROOT_DIR, 'public/robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);

    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    expect(robotsContent.length).toBeGreaterThan(10);
    expect(robotsContent).toContain('User-agent: *');
    expect(robotsContent).toContain('Allow: /');
    expect(robotsContent).toContain('Sitemap: https://koko-cli.pages.dev/sitemap-index.xml');
  });

  it('should have a valid public/_headers file with critical security and caching headers', () => {
    const headersPath = path.join(ROOT_DIR, 'public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);

    const headersContent = fs.readFileSync(headersPath, 'utf-8');
    expect(headersContent).toContain('Strict-Transport-Security');
    expect(headersContent).toContain('X-Content-Type-Options: nosniff');
    expect(headersContent).toContain('X-Frame-Options: DENY');
    expect(headersContent).toContain('Cache-Control: public, max-age=31536000, immutable');
    expect(headersContent).toContain('/_astro/*');
  });

  it('should have a valid Google Search Console verification file', () => {
    const gscPath = path.join(ROOT_DIR, 'public/google73f2141f16b7ca0e.html');
    expect(fs.existsSync(gscPath)).toBe(true);

    const gscContent = fs.readFileSync(gscPath, 'utf-8');
    expect(gscContent).toContain('google-site-verification: google73f2141f16b7ca0e.html');
  });

  it('should have site URL and sitemap integration declared in astro.config.mjs', () => {
    const astroConfigPath = path.join(ROOT_DIR, 'astro.config.mjs');
    expect(fs.existsSync(astroConfigPath)).toBe(true);

    const configContent = fs.readFileSync(astroConfigPath, 'utf-8');
    expect(configContent).toContain("site: 'https://koko-cli.pages.dev'");
    expect(configContent).toContain('sitemap(');
  });

  it('should have synchronized package.json scripts for CI validation', () => {
    const pkgPath = path.join(ROOT_DIR, 'package.json');
    expect(fs.existsSync(pkgPath)).toBe(true);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    expect(pkg.scripts).toBeDefined();
    expect(pkg.scripts.build).toBe('astro build');
    expect(pkg.scripts.typecheck).toBe('astro check');
    expect(pkg.scripts.test).toBe('vitest run');
  });
});
