<script lang="ts">
  import { Terminal, ArrowRight } from '@lucide/svelte';
  import type { DocItem } from '@/types/docs-section.types';

  interface Props {
    doc: DocItem;
    lang?: string;
  }

  let { doc, lang = 'es' } = $props<Props>();

  let selectedFramework = $state('Next.js');
  let selectedBackend = $state('Go Fiber');
  let selectedDb = $state('PostgreSQL');
  let isBuilding = $state(false);
  let buildProgress = $state(0);
  let buildComplete = $state(false);

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
    <div class="grid grid-cols-3 gap-3 mb-5">
      <div class="space-y-1.5">
        <label class="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Frontend</label>
        <select 
          bind:value={selectedFramework}
          disabled={isBuilding}
          class="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-border-subtle bg-bg-base/80 text-text-main focus:outline-none focus:border-brand-primary disabled:opacity-60 cursor-pointer"
        >
          <option>Next.js</option>
          <option>Astro</option>
          <option>SvelteKit</option>
        </select>
      </div>

      <div class="space-y-1.5">
        <label class="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Backend</label>
        <select 
          bind:value={selectedBackend}
          disabled={isBuilding}
          class="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-border-subtle bg-bg-base/80 text-text-main focus:outline-none focus:border-brand-primary disabled:opacity-60 cursor-pointer"
        >
          <option>Go Fiber</option>
          <option>Gin Gonic</option>
          <option>Go Standard</option>
        </select>
      </div>

      <div class="space-y-1.5">
        <label class="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Database</label>
        <select 
          bind:value={selectedDb}
          disabled={isBuilding}
          class="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-border-subtle bg-bg-base/80 text-text-main focus:outline-none focus:border-brand-primary disabled:opacity-60 cursor-pointer"
        >
          <option>PostgreSQL</option>
          <option>SQLite</option>
          <option>MySQL</option>
        </select>
      </div>
    </div>

    <!-- Live Terminal Mockup -->
    <div class="rounded-xl border border-border-subtle/80 bg-bg-base/90 p-4 font-mono text-[11px] min-h-[140px] flex flex-col justify-between">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-[10px] text-text-muted border-b border-border-subtle/40 pb-1.5 mb-2">
          <span>koko-cli simulator</span>
          <span class="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
        </div>

        <div class="flex gap-1.5 text-text-muted">
          <span class="text-brand-primary font-bold">$</span>
          <span class="text-text-main">koko init my-app --stack={selectedFramework.toLowerCase()}</span>
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
