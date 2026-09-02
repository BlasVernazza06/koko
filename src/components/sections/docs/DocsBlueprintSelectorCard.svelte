<script lang="ts">
  import { Layers, ArrowRight } from '@lucide/svelte';
  import { fade } from 'svelte/transition';
  import type { DocItem } from '@/types/docs-section.types';

  interface Props {
    doc: DocItem;
    lang?: string;
  }

  let { doc, lang = 'es' } = $props<Props>();

  let activeStack = $state<'saas' | 'mobile' | 'minimal'>('saas');
</script>

<div class="lg:col-span-5 md:col-span-1 flex flex-col justify-between p-6 rounded-3xl border border-border-subtle bg-bg-surface/40 hover:bg-bg-surface/60 transition-all duration-300 relative overflow-hidden group">
  <div class="absolute inset-0 bg-radial-[circle_at_20%_120%] from-brand-secondary/8 to-transparent opacity-60 pointer-events-none"></div>

  <div>
    <div class="flex items-center gap-2 mb-3">
      <div class="p-2 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary">
        <Layers size={18} />
      </div>
      <h3 class="text-lg font-extrabold text-text-main">
        {doc.title}
      </h3>
    </div>
    <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-5 font-medium">
      {doc.desc}
    </p>

    <!-- Preset Toggles -->
    <div class="flex rounded-xl bg-bg-base/70 border border-border-subtle/60 p-1 mb-4">
      <button 
        type="button"
        onclick={() => activeStack = 'saas'}
        class="flex-1 text-[10px] sm:text-xs font-bold py-1.5 rounded-lg transition-all cursor-pointer
          {activeStack === 'saas' ? 'bg-bg-surface text-brand-primary shadow-sm border border-border-subtle/50' : 'text-text-muted hover:text-text-main'}"
      >
        SaaS Stack
      </button>
      <button 
        type="button"
        onclick={() => activeStack = 'mobile'}
        class="flex-1 text-[10px] sm:text-xs font-bold py-1.5 rounded-lg transition-all cursor-pointer
          {activeStack === 'mobile' ? 'bg-bg-surface text-brand-primary shadow-sm border border-border-subtle/50' : 'text-text-muted hover:text-text-main'}"
      >
        Mobile API
      </button>
      <button 
        type="button"
        onclick={() => activeStack = 'minimal'}
        class="flex-1 text-[10px] sm:text-xs font-bold py-1.5 rounded-lg transition-all cursor-pointer
          {activeStack === 'minimal' ? 'bg-bg-surface text-brand-primary shadow-sm border border-border-subtle/50' : 'text-text-muted hover:text-text-main'}"
      >
        Full Stack
      </button>
    </div>

    <!-- File Structure Visualizer -->
    <div class="rounded-xl border border-border-subtle/80 bg-bg-base/80 p-3.5 font-mono text-[11px] min-h-[145px] overflow-hidden">
      {#if activeStack === 'saas'}
        <div in:fade={{ duration: 150 }} class="space-y-1.5 text-text-muted">
          <div class="text-text-main font-semibold">📁 saas-blueprint/</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 web-dashboard (Next.js)</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 worker-billing (Go)</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📄 docker-compose.yml</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📄 koko.config.json</div>
        </div>
      {:else if activeStack === 'mobile'}
        <div in:fade={{ duration: 150 }} class="space-y-1.5 text-text-muted">
          <div class="text-text-main font-semibold">📁 mobile-api-blueprint/</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 mobile-flutter (App)</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 core-gateway (Gin Gonic)</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📄 docker-compose.yml</div>
        </div>
      {:else}
        <div in:fade={{ duration: 150 }} class="space-y-1.5 text-text-muted">
          <div class="text-text-main font-semibold">📁 fullstack-app/</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 app-svelte (SvelteKit)</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 server-fiber (Go Fiber)</div>
          <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📄 koko.config.json</div>
        </div>
      {/if}
    </div>
  </div>

  <div class="flex justify-end mt-6 pt-4 border-t border-border-subtle/50">
    <a href={lang === 'es' ? doc.path : `/en${doc.path}`} class="text-xs font-bold text-brand-secondary hover:underline flex items-center gap-0.5">
      <span>{lang === 'es' ? 'Ver Plantillas Estructurales' : 'View Blueprints'}</span>
      <ArrowRight size={12} class="rotate-[-45deg]" />
    </a>
  </div>
</div>
