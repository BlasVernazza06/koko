// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
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