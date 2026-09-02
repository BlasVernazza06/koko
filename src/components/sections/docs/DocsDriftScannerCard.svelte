<script lang="ts">
  import { ShieldCheck, RefreshCw, Check, ArrowRight } from '@lucide/svelte';
  import type { DocItem } from '@/types/docs-section.types';

  interface Props {
    doc: DocItem;
    lang?: string;
  }

  let { doc, lang = 'es' } = $props<Props>();

  let isScanning = $state(false);
  let scanState = $state<'idle' | 'scanning' | 'done'>('idle');
  let scanProgress = $state(0);
  
  function runDriftScan() {
    if (isScanning) return;
    isScanning = true;
    scanState = 'scanning';
    scanProgress = 0;
    
    const interval = setInterval(() => {
      scanProgress += 4;
      if (scanProgress >= 100) {
        clearInterval(interval);
        isScanning = false;
        scanState = 'done';
      }
    }, 60);
  }
</script>

<div class="lg:col-span-7 md:col-span-2 flex flex-col justify-between p-6 rounded-3xl border border-border-subtle bg-bg-surface/40 hover:bg-bg-surface/60 transition-all duration-300 relative overflow-visible group">
  <!-- Inner background gradient -->
  <div class="absolute inset-0 rounded-3xl bg-radial-[circle_at_-20%_-20%] from-brand-primary/8 to-transparent opacity-60 pointer-events-none overflow-hidden"></div>

  <!-- Koko Guardian Mascot with Protective Shield (Defending at bottom-right border) -->
  <div class="absolute -bottom-6 sm:-bottom-8 right-2 sm:-right-10 z-20 pointer-events-none select-none">
    <img 
      src="/koko-shield.png" 
      alt="Koko guardián con escudo de protección" 
      class="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_8px_20px_rgba(90,79,196,0.35)] dark:drop-shadow-[0_8px_25px_rgba(155,141,247,0.45)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
    />
  </div>

  <div>
    <div class="flex items-center gap-2 mb-3">
      <div class="p-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
        <ShieldCheck size={18} />
      </div>
      <h3 class="text-lg font-extrabold text-text-main">
        {doc.title}
      </h3>
    </div>
    <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-5 font-medium">
      {doc.desc}
    </p>

    <!-- Scanner Simulation Interface -->
    <div class="rounded-xl border border-border-subtle/80 bg-bg-base/90 p-4 font-mono text-[11px] relative overflow-hidden min-h-[145px]">
      {#if scanState === 'scanning'}
        <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent animate-bounce opacity-80 z-10"></div>
      {/if}

      <div class="flex items-center justify-between text-[10px] text-text-muted border-b border-border-subtle/40 pb-2 mb-3">
        <span>{lang === 'es' ? 'Monitoreo de Consistencia' : 'Consistency Daemon'}</span>
        <span class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full {scanState === 'scanning' ? 'bg-amber-500' : scanState === 'done' ? 'bg-emerald-500' : 'bg-brand-primary'}"></span>
          <span>{scanState === 'scanning' ? 'Scanning...' : scanState === 'done' ? 'Sync Verified' : 'Idle'}</span>
        </span>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between items-center text-xs py-0.5">
          <span class="text-text-muted">• TypeScript Config Mapping</span>
          {#if scanState === 'scanning' && scanProgress < 30}
            <span class="text-text-muted/40 animate-pulse">Scanning...</span>
          {:else}
            <span class="text-[#27c93f] font-bold flex items-center gap-1">
              <Check size={11} /> MATCHED
            </span>
          {/if}
        </div>

        <div class="flex justify-between items-center text-xs py-0.5">
          <span class="text-text-muted">• Biome / Linter Sync</span>
          {#if scanState === 'scanning' && scanProgress < 65}
            <span class="text-text-muted/40 animate-pulse">Scanning...</span>
          {:else}
            <span class="text-[#27c93f] font-bold flex items-center gap-1">
              <Check size={11} /> MATCHED
            </span>
          {/if}
        </div>

        <div class="flex justify-between items-center text-xs py-0.5">
          <span class="text-text-muted">• Docker DB Port Alignment</span>
          {#if scanState === 'scanning'}
            <span class="text-text-muted/40 animate-pulse">Scanning...</span>
          {:else}
            <span class="text-[#27c93f] font-bold flex items-center gap-1">
              <Check size={11} /> MATCHED
            </span>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle/50 relative z-10 pr-6 sm:pr-14">
    <button 
      type="button"
      onclick={runDriftScan}
      disabled={isScanning}
      class="px-4 py-2 rounded-xl bg-bg-surface hover:bg-bg-base border border-border-subtle hover:border-brand-primary/40 text-text-main text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
    >
      <RefreshCw size={13} class={isScanning ? 'animate-spin text-brand-primary' : ''} />
      <span>{lang === 'es' ? 'Ejecutar Auditoría' : 'Scan Workspace'}</span>
    </button>

    <a href={lang === 'es' ? doc.path : `/en${doc.path}`} class="text-xs font-bold text-brand-primary hover:underline flex items-center gap-0.5">
      <span>{lang === 'es' ? 'Ver Monitoreo de Desviación' : 'Drift Documentation'}</span>
      <ArrowRight size={12} class="rotate-[-45deg]" />
    </a>
  </div>
</div>
