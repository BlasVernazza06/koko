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

  it('should have .nvmrc specifying compatible Node.js version (>=22) for Cloudflare Pages build environment', () => {
    const nvmrcPath = path.join(ROOT_DIR, '.nvmrc');
    expect(fs.existsSync(nvmrcPath)).toBe(true);

    const nvmrcContent = fs.readFileSync(nvmrcPath, 'utf-8').trim();
    const majorVersion = parseInt(nvmrcContent.replace(/^v/, '').split('.')[0], 10);
    expect(majorVersion).toBeGreaterThanOrEqual(22);
  });

  it('should have wrangler.toml pointing asset directory to ./dist with nodejs_compat', () => {
    const wranglerPath = path.join(ROOT_DIR, 'wrangler.toml');
    expect(fs.existsSync(wranglerPath)).toBe(true);

    const wranglerContent = fs.readFileSync(wranglerPath, 'utf-8');
    expect(wranglerContent).toContain('directory = "./dist"');
    expect(wranglerContent).toContain('"nodejs_compat"');
  });

  it('should have all critical preloaded fonts and favicons referenced in Layout.astro existing in public/', () => {
    const layoutPath = path.join(ROOT_DIR, 'src/layouts/Layout.astro');
    expect(fs.existsSync(layoutPath)).toBe(true);

    const criticalAssets = [
      'fonts/plus-jakarta-sans-latin-wght-normal.woff2',
      'fonts/jetbrains-mono-latin-wght-normal.woff2',
      'fonts/instrument-serif-latin-400-italic.woff2',
      'koko-saludando.png'
    ];

    for (const asset of criticalAssets) {
      const assetPath = path.join(ROOT_DIR, 'public', asset);
      expect(
        fs.existsSync(assetPath),
        `Critical asset "${asset}" referenced in Layout.astro is missing in public directory!`
      ).toBe(true);
    }
  });

  it('should have all showcase demo videos referenced in VideoCommandsShowcase existing in public/', () => {
    const showcasePath = path.join(ROOT_DIR, 'src/components/sections/terminal/VideoCommandsShowcase.svelte');
    expect(fs.existsSync(showcasePath)).toBe(true);

    const videoAssets = [
      'demo.mp4',
      'videos/koko-init-saas.mp4',
      'videos/koko-doctor-fix.mp4',
      'videos/koko-add-stripe.mp4'
    ];

    for (const video of videoAssets) {
      const videoPath = path.join(ROOT_DIR, 'public', video);
      expect(
        fs.existsSync(videoPath),
        `Showcase video "${video}" is missing in public directory!`
      ).toBe(true);
    }
  });

  it('should have a dedicated 404 error page (src/pages/404.astro) for Cloudflare Pages routing', () => {
    const notFoundPath = path.join(ROOT_DIR, 'src/pages/404.astro');
    expect(fs.existsSync(notFoundPath)).toBe(true);

    const content = fs.readFileSync(notFoundPath, 'utf-8');
    expect(content).toContain('Layout');
    expect(content).toContain('404');
  });

  it('should have pnpm-lock.yaml strictly synchronized with package.json specs to prevent CI build crashes', () => {
    const pkgPath = path.join(ROOT_DIR, 'package.json');
    const pnpmLockPath = path.join(ROOT_DIR, 'pnpm-lock.yaml');
    expect(fs.existsSync(pnpmLockPath)).toBe(true);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const pnpmLockContent = fs.readFileSync(pnpmLockPath, 'utf-8');

    // Extract dependencies from importers > .: in pnpm-lock.yaml
    const expectedDeps = { ...pkg.dependencies };
    const expectedDevDeps = { ...pkg.devDependencies };

    for (const [dep, spec] of Object.entries(expectedDeps)) {
      const escapedDep = dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const escapedSpec = (spec as string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`['"]?${escapedDep}['"]?:[\\s\\r\\n]+specifier:\\s*['"]?${escapedSpec}['"]?`);
      expect(
        regex.test(pnpmLockContent),
        `Dependency "${dep}: ${spec}" from package.json is missing or desynchronized in pnpm-lock.yaml! Run "pnpm install --lockfile-only" to sync.`
      ).toBe(true);
    }

    for (const [dep, spec] of Object.entries(expectedDevDeps)) {
      const escapedDep = dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const escapedSpec = (spec as string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`['"]?${escapedDep}['"]?:[\\s\\r\\n]+specifier:\\s*['"]?${escapedSpec}['"]?`);
      expect(
        regex.test(pnpmLockContent),
        `DevDependency "${dep}: ${spec}" from package.json is missing or desynchronized in pnpm-lock.yaml! Run "pnpm install --lockfile-only" to sync.`
      ).toBe(true);
    }
  });

  it('should have package-lock.json strictly synchronized with package.json specs', () => {
    const pkgPath = path.join(ROOT_DIR, 'package.json');
    const pkgLockPath = path.join(ROOT_DIR, 'package-lock.json');
    expect(fs.existsSync(pkgLockPath)).toBe(true);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const pkgLock = JSON.parse(fs.readFileSync(pkgLockPath, 'utf-8'));

    const lockRootPackages = pkgLock.packages?.[''] || {};
    const lockDeps = lockRootPackages.dependencies || {};
    const lockDevDeps = lockRootPackages.devDependencies || {};

    expect(lockDeps).toEqual(pkg.dependencies);
    expect(lockDevDeps).toEqual(pkg.devDependencies);
  });
});
