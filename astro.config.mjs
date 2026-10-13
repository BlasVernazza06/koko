// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://koko-cli.pages.dev',

  redirects: {
    '/docs': '/docs/quick-start',
    '/en/docs': '/en/docs/quick-start'
  },

  integrations: [
    svelte(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en'
        }
      }
    }),
    // Activar Sentry únicamente en entornos de producción con token de autenticación
    ...(process.env.NODE_ENV === 'production' && process.env.SENTRY_AUTH_TOKEN ? [
      sentry({
        project: "koko-web",
        org: "obsidianui",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false
      })
    ] : [])
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@lucide/svelte', '@selemondev/svgl-svelte']
    }
  }
});