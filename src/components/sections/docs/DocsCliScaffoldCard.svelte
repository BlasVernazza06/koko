<script lang="ts">
  import { Terminal, ArrowRight } from '@lucide/svelte';
  import DropdownSelect from '@/components/ui/DropdownSelect.svelte';
  import type { DocItem } from '@/types/docs-section.types';

  interface Props {
    doc: DocItem;
    lang?: string;
  }

  let { doc, lang = 'es' } = $props<Props>();

  let selectedFramework = $state('Next.js');
  let selectedBackend = $state('Hono');
  let selectedDb = $state('PostgreSQL');
  let isBuilding = $state(false);
  let buildProgress = $state(0);
  let buildComplete = $state(false);

  const frameworkOptions = [
    { value: 'Next.js', label: 'Next.js' },
    { value: 'React + Vite', label: 'React + Vite' },
    { value: 'Astro', label: 'Astro' },
    { value: 'Svelte', label: 'Svelte' },
    { value: 'Nuxt', label: 'Nuxt' }
  ];

  const backendOptions = [
    { value: 'Hono', label: 'Hono' },
    { value: 'Express', label: 'Express' },
    { value: 'FastAPI', label: 'FastAPI' },
    { value: 'Go Chi', label: 'Go Chi' },
    { value: 'NestJS', label: 'NestJS' }
  ];

  const dbOptions = [
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'SQLite', label: 'SQLite' }
  ];

  const frontSlug = $derived(() => {
    switch (selectedFramework) {
      case 'Next.js': return 'nextjs';
      case 'React + Vite': return 'react';
      case 'Astro': return 'astro';
      case 'Svelte': return 'svelte';
      case 'Nuxt': return 'nuxt';
      default: return 'nextjs';
    }
  });

  const backSlug = $derived(() => {
    switch (selectedBackend) {
      case 'Hono': return 'hono';
      case 'Express': return 'express';
      case 'FastAPI': return 'fastapi';
      case 'Go Chi': return 'go_chi';
      case 'NestJS': return 'nestjs';
      default: return 'hono';
    }
  });

  const dbSlug = $derived(() => {
    switch (selectedDb) {
      case 'PostgreSQL': return 'postgres';
      case 'MySQL': return 'mysql';
      case 'MongoDB': return 'mongodb';
      case 'SQLite': return 'sqlite';
      default: return 'postgres';
    }
  });

  function startCliBuild() {
    if (isBuilding) return;
    isBuilding = true;
    buildComplete = false;
    buildProgress = 0;
    
    const interval = setInterval(() => {
      buildProgress += 10;
      if (buildProgress >= 100) {
        clearInterval(interval);
        isBuilding = false;
        buildComplete = true;
      }
    }, 120);
  }
</script>

<div class="lg:col-span-7 md:col-span-2 flex flex-col justify-between p-6 rounded-3xl border border-border-subtle bg-bg-surface/40 hover:bg-bg-surface/60 transition-all duration-300 relative overflow-visible group">
  <!-- Subtle inner background gradient -->
  <div class="absolute inset-0 rounded-3xl bg-radial-[circle_at_70%_120%] from-brand-primary/8 to-transparent opacity-60 pointer-events-none overflow-hidden"></div>
  
  <!-- Koko Mascot Sitting on Card Top Left Border -->
  <div class="absolute -top-16 sm:-top-20 -left-8 sm:-left-4 z-20 pointer-events-none select-none">
    <img 
      src="/koko-libro.png" 
      alt="Koko leyendo documentación" 
      class="w-22 h-22 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
    />
  </div>
  
  <div>
    <div class="flex items-center gap-2 mb-3">
      <div class="p-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
        <Terminal size={18} />
      </div>
      <h3 class="text-lg font-extrabold text-text-main">
        {doc.title}
      </h3>
    </div>
    <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-6 font-medium">
      {doc.desc}
    </p>

    <!-- Selector controls -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
      <DropdownSelect
        label="Frontend"
        bind:value={selectedFramework}
        options={frameworkOptions}
        disabled={isBuilding}
      />
      <DropdownSelect
        label="Backend"
        bind:value={selectedBackend}
        options={backendOptions}
        disabled={isBuilding}
      />
      <DropdownSelect
        label="Database"
        bind:value={selectedDb}
        options={dbOptions}
        disabled={isBuilding}
      />
    </div>

    <!-- Live Terminal Mockup -->
    <div class="rounded-xl border border-border-subtle/80 bg-bg-base/90 p-4 font-mono text-[11px] min-h-[140px] flex flex-col justify-between">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-[10px] text-text-muted border-b border-border-subtle/40 pb-1.5 mb-2">
          <span>koko-cli simulator</span>
          <span class="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
        </div>

        <div class="flex gap-1.5 text-text-muted flex-wrap">
          <span class="text-brand-primary font-bold">$</span>
          <span class="text-text-main">koko init my-app --frontend {frontSlug()} --backend {backSlug()} --database {dbSlug()}</span>
        </div>

        {#if isBuilding}
          <div class="text-text-muted animate-pulse">
            [io] Injecting {selectedFramework} templates...<br/>
            [io] Binding {selectedBackend} endpoints...<br/>
            [io] Mapping {selectedDb} drivers...
          </div>
        {:else if buildComplete}
          <div class="text-[#27c93f] font-semibold space-y-1">
            <div>✓ Scaffold complete in 24ms</div>
            <div class="text-[10px] text-text-muted/80">Stack configured with {selectedFramework} + {selectedBackend} + {selectedDb}</div>
          </div>
        {:else}
          <div class="text-text-muted/65 italic">
            {lang === 'es' ? 'Haz clic en "Iniciar Scaffolding" para simular.' : 'Click "Start Scaffolding" to simulate creation.'}
          </div>
        {/if}
      </div>

      {#if isBuilding}
        <div class="w-full bg-border-subtle/20 h-1 rounded-full overflow-hidden mt-3">
          <div class="bg-gradient-to-r from-brand-primary to-brand-secondary h-full rounded-full transition-all duration-75" style="width: {buildProgress}%"></div>
        </div>
      {/if}
    </div>
  </div>

  <div class="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle/50">
    <button 
      type="button"
      onclick={startCliBuild}
      disabled={isBuilding}
      class="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/95 transition-all shadow-md shadow-brand-primary/10 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
    >
      <span>{lang === 'es' ? 'Iniciar Scaffolding' : 'Start Scaffolding'}</span>
      <ArrowRight size={13} />
    </button>

    <a href={lang === 'es' ? doc.path : `/en${doc.path}`} class="text-xs font-bold text-brand-primary hover:underline flex items-center gap-0.5">
      <span>{lang === 'es' ? 'Ver Comandos CLI' : 'View CLI Commands'}</span>
      <ArrowRight size={12} class="rotate-[-45deg]" />
    </a>
  </div>
</div>
