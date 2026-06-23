<script lang="ts">
  import { RotateCw } from '@lucide/svelte';

  const { lang = 'es' } = $props<{ lang?: string }>();

  let status = $state<'ready' | 'scanning'>('ready');

  const recipes = $derived([
    {
      initials: 'FS',
      titleEs: 'Receta Fullstack SaaS Starter',
      titleEn: 'Fullstack SaaS Starter Recipe',
      desc: 'Next.js + Go Fiber + PostgreSQL + Docker',
      colorClass: 'bg-brand-secondary/15 text-brand-secondary border-brand-secondary/30'
    },
    {
      initials: 'AM',
      titleEs: 'Receta API Moderna limpia',
      titleEn: 'Clean API Recipe',
      desc: 'Fastify + Prisma + PostgreSQL',
      colorClass: 'bg-brand-primary/15 text-brand-primary border-brand-primary/30'
    }
  ]);

  function startScan() {
    if (status === 'scanning') return;
    status = 'scanning';
    setTimeout(() => {
      status = 'ready';
    }, 1000);
  }
</script>

<div class="w-full max-w-md bg-bg-base/90 rounded-2xl border border-border-subtle p-5 font-sans space-y-4 shadow-sm relative overflow-hidden">
  <div class="flex items-center justify-between border-b border-border-subtle pb-3 select-none">
    <div class="flex items-center gap-2">
      <div class="w-2.5 h-2.5 rounded-full bg-brand-secondary animate-ping" aria-hidden="true"></div>
      <span class="text-xs font-bold text-text-main">
        {lang === 'es' ? 'Motor de Scaffolding Híbrido' : 'Hybrid Scaffolding Engine'}
      </span>
    </div>
    
    <button 
      type="button"
      onclick={startScan}
      disabled={status === 'scanning'}
      class="flex items-center gap-1.5 text-[10px] text-brand-secondary bg-brand-secondary/10 hover:bg-brand-secondary/20 transition-colors px-2.5 py-1 rounded font-bold cursor-pointer select-none disabled:opacity-75"
    >
      <RotateCw size={10} class={status === 'scanning' ? 'animate-spin' : ''} aria-hidden="true" />
      <span>
        {status === 'scanning' 
          ? (lang === 'es' ? 'Escaneando...' : 'Scanning...') 
          : (lang === 'es' ? 'Simular Recetas' : 'Simulate Recipes')}
      </span>
    </button>
  </div>

  <!-- Recipe List visualizer -->
  <div class="space-y-3 select-none">
    {#each recipes as recipe}
      <div class="repo-row flex items-center justify-between p-2 rounded-xl bg-bg-surface border border-border-subtle transition-colors">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono border {recipe.colorClass}">
            {recipe.initials}
          </div>
          <div>
            <div class="text-[11px] font-bold text-text-main">
              {lang === 'es' ? recipe.titleEs : recipe.titleEn}
            </div>
            <div class="text-[9px] text-text-muted">{recipe.desc}</div>
          </div>
        </div>
        
        <div 
          class="flex items-center gap-1 text-[10px] font-medium transition-all duration-300
            {status === 'scanning' ? 'text-brand-secondary' : 'text-emerald-500'}"
        >
          {#if status === 'scanning'}
            <span class="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" aria-hidden="true"></span>
            <span>{lang === 'es' ? 'Escaneando...' : 'Scanning...'}</span>
          {:else}
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
            <span>{lang === 'es' ? 'Lista' : 'Ready'}</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
