// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sentry from '@sentry/astro';

export default defineConfig({
  redirects: {
    '/docs': '/docs/quick-start',
    '/en/docs': '/en/docs/quick-start'
  },

  integrations: [
    svelte(),
    sentry({
      project: "koko-web",
      org: "obsidianui",
      authToken: process.env.SENTRY_AUTH_TOKEN
    })
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@lucide/svelte', '@selemondev/svgl-svelte']
    }
  }
});