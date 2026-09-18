<script lang="ts">
  import { ShieldCheck, RefreshCw, Check, ArrowRight, Wrench, AlertTriangle, Sparkles } from '@lucide/svelte';
  import type { DocItem } from '@/types/docs-section.types';

  interface Props {
    doc: DocItem;
    lang?: string;
  }

  let { doc, lang = 'es' } = $props<Props>();

  let isScanning = $state(false);
  let scanState = $state<'idle' | 'scanning' | 'done'>('idle');
  let scanProgress = $state(0);
  let autoFix = $state(true);
  
  function runDoctor() {
    if (isScanning) return;
    isScanning = true;
    scanState = 'scanning';
    scanProgress = 0;
    
    const interval = setInterval(() => {
      scanProgress += 5;
      if (scanProgress >= 100) {
        clearInterval(interval);
        isScanning = false;
        scanState = 'done';
      }
    }, 45);
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
    <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <div class="p-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
          <ShieldCheck size={18} />
        </div>
        <h3 class="text-lg font-extrabold text-text-main">
          {doc.title}
        </h3>
      </div>
      
      <!-- koko doctor command chip -->
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bg-base/80 border border-border-subtle text-[11px] font-mono font-bold text-brand-primary">
        <code>koko doctor {autoFix ? '--fix' : ''}</code>
      </span>
    </div>

    <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-4 font-medium">
      {doc.desc}
    </p>

    <!-- Doctor Simulation Terminal -->
    <div class="rounded-xl border border-border-subtle/80 bg-bg-base/90 p-4 font-mono text-[11px] relative overflow-hidden min-h-[160px]">
      {#if scanState === 'scanning'}
        <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent animate-pulse opacity-90 z-10"></div>
      {/if}

      <!-- Terminal Header Bar -->
      <div class="flex items-center justify-between text-[10px] text-text-muted border-b border-border-subtle/40 pb-2 mb-3">
        <div class="flex items-center gap-2">
          <span class="text-text-main font-semibold">koko doctor diagnostics</span>
          <span class="text-text-muted/60">|</span>
          <span class="text-text-muted">{autoFix ? '--fix (auto-repair)' : 'read-only'}</span>
        </div>
        <span class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full {scanState === 'scanning' ? 'bg-amber-500 animate-ping' : scanState === 'done' ? 'bg-emerald-500' : 'bg-brand-primary'}"></span>
          <span class="font-bold">{scanState === 'scanning' ? 'Diagnosing...' : scanState === 'done' ? (autoFix ? '100% Repaired & Clean' : 'Drift Identified') : 'Ready'}</span>
        </span>
      </div>

      <!-- Diagnostic Steps -->
      <div class="space-y-1.5">
        <!-- Step 1: Manifest check -->
        <div class="flex justify-between items-center text-xs py-0.5">
          <span class="text-text-muted">• koko.config.json Manifest Schema</span>
          {#if scanState === 'scanning' && scanProgress < 25}
            <span class="text-text-muted/50 animate-pulse">Checking...</span>
          {:else}
            <span class="text-[#27c93f] font-bold flex items-center gap-1 text-[11px]">
              <Check size={11} /> VALID SCHEMA
            </span>
          {/if}
        </div>

        <!-- Step 2: Monorepo & TS config -->
        <div class="flex justify-between items-center text-xs py-0.5">
          <span class="text-text-muted">• Monorepo & TypeScript Workspaces</span>
          {#if scanState === 'scanning' && scanProgress < 50}
            <span class="text-text-muted/50 animate-pulse">Checking...</span>
          {:else}
            <span class="text-[#27c93f] font-bold flex items-center gap-1 text-[11px]">
              <Check size={11} /> SYNCED
            </span>
          {/if}
        </div>

        <!-- Step 3: Drift & Dependencies Catalog -->
        <div class="flex justify-between items-center text-xs py-0.5">
          <span class="text-text-muted">• Master Catalog Version Drift</span>
          {#if scanState === 'scanning' && scanProgress < 80}
            <span class="text-text-muted/50 animate-pulse">Analyzing drift...</span>
          {:else if scanState === 'done' && !autoFix}
            <span class="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
              <AlertTriangle size={11} /> 1 DRIFT DETECTED
            </span>
          {:else if scanState === 'done' && autoFix}
            <span class="text-brand-primary font-bold flex items-center gap-1 text-[11px]">
              <Sparkles size={11} /> AUTO-FIXED (v2.0)
            </span>
          {:else}
            <span class="text-[#27c93f] font-bold flex items-center gap-1 text-[11px]">
              <Check size={11} /> IN SYNC
            </span>
          {/if}
        </div>

        <!-- Step 4: Docker Port Collision -->
        <div class="flex justify-between items-center text-xs py-0.5">
          <span class="text-text-muted">• Docker DB Port Health (5432, 27017)</span>
          {#if scanState === 'scanning'}
            <span class="text-text-muted/50 animate-pulse">Probing ports...</span>
          {:else}
            <span class="text-[#27c93f] font-bold flex items-center gap-1 text-[11px]">
              <Check size={11} /> NO CONFLICTS
            </span>
          {/if}
        </div>
      </div>

      {#if scanState === 'done'}
        <div class="mt-2.5 pt-2 border-t border-border-subtle/40 text-[10px] flex items-center justify-between text-text-muted">
          {#if autoFix}
            <span class="text-[#27c93f] font-semibold">✓ 0 errors, 1 auto-fix applied to koko.config.json</span>
          {:else}
            <span class="text-amber-400 font-semibold">⚠ Run with --fix to sync koko.config.json automatically</span>
          {/if}
          <span class="text-text-muted/70">18ms</span>
        </div>
      {/if}
    </div>
  </div>

  <!-- Bottom Action & Navigation Bar -->
  <div class="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle/50 relative z-10 pr-6 sm:pr-14 flex-wrap gap-3">
    <div class="flex items-center gap-3">
      <button 
        type="button"
        onclick={runDoctor}
        disabled={isScanning}
        class="px-4 py-2 rounded-xl bg-bg-surface hover:bg-bg-base border border-border-subtle hover:border-brand-primary/40 text-text-main text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
      >
        <RefreshCw size={13} class={isScanning ? 'animate-spin text-brand-primary' : ''} />
        <span>{lang === 'es' ? 'Ejecutar koko doctor' : 'Run koko doctor'}</span>
      </button>

      <!-- Auto-fix Toggle Button -->
      <button
        type="button"
        onclick={() => autoFix = !autoFix}
        class="text-[11px] font-mono px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer select-none {autoFix ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary font-bold' : 'bg-bg-base/60 border-border-subtle text-text-muted hover:text-text-main'}"
        title={lang === 'es' ? 'Alternar flag --fix' : 'Toggle --fix flag'}
      >
        <Wrench size={12} class={autoFix ? 'text-brand-primary' : 'text-text-muted'} />
        <span>--fix</span>
      </button>
    </div>

    <a href={lang === 'es' ? doc.path : `/en${doc.path}`} class="text-xs font-bold text-brand-primary hover:underline flex items-center gap-0.5">
      <span>{lang === 'es' ? 'Ver Guía de koko doctor' : 'koko doctor Docs'}</span>
      <ArrowRight size={12} class="rotate-[-45deg]" />
    </a>
  </div>
</div>
