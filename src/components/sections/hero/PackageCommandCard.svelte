<script lang="ts">
  import { Copy, Check, Terminal } from '@lucide/svelte';
  import { packageManagers } from '@/data/package-managers.data';
  import type { PackageManagerId } from '@/types/package-managers.types';

  let { lang = 'es' } = $props<{ lang?: string }>();

  // State
  let isCopied = $state(false);
  let selectedManager = $state<PackageManagerId>('bun');

  const managers = packageManagers;
  const currentManager = $derived(managers.find(m => m.id === selectedManager) || managers[0]);

  function copyInstallCommand() {
    navigator.clipboard.writeText(currentManager.command);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }
</script>

<div class="w-full h-full font-sans select-none flex flex-col justify-between">
  <!-- Modern Linear-style dark card -->
  <div class="group/box rounded-2xl border border-border-subtle/50 bg-bg-surface/50 backdrop-blur-md p-6 shadow-lg hover:shadow-[0_20px_50px_rgba(90,79,196,0.12)] hover:-translate-y-0.5 hover:border-brand-primary/45 transition-all duration-200 ease-out flex flex-col justify-between flex-1 relative overflow-hidden">
    <!-- Subtle glow dot in corner -->
    <div class="absolute -right-12 -top-12 w-24 h-24 bg-brand-primary/10 rounded-full blur-xl pointer-events-none transition-all duration-200 group-hover/box:bg-brand-primary/20"></div>

    <div class="flex flex-col gap-4">
      <!-- Title & Header -->
      <div class="flex items-center justify-between pb-3 border-b border-border-subtle/40">
        <div class="flex items-center gap-2">
          <Terminal size={15} class="text-brand-secondary" />
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-text-muted/80">{lang === 'es' ? 'Instalación Rápida' : 'Quick Install'}</span>
        </div>
        <span class="text-[11px] font-mono bg-bg-base/80 border border-border-subtle/50 px-2.5 py-0.5 rounded text-text-muted">v0.1.0</span>
      </div>

      <!-- Segmented Select Row -->
      <div class="flex flex-col gap-2">
        <span class="text-[11px] font-extrabold uppercase tracking-widest text-text-muted/70">
          {lang === 'es' ? 'Gestor de paquetes:' : 'Package manager:'}
        </span>
        <div class="flex items-center gap-1.5 p-1 bg-bg-base/70 border border-border-subtle/50 rounded-xl w-max">
          {#each managers as mgr}
            <button
              type="button"
              onclick={() => selectedManager = mgr.id}
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-transparent text-xs font-semibold font-mono transition-all duration-200 cursor-pointer active:scale-95
                {selectedManager === mgr.id ? mgr.activeColor : 'text-text-muted bg-transparent hover:text-text-main'}"
            >
              <img src={mgr.logo} class="w-3.5 h-3.5 object-contain" alt="" />
              <span>{mgr.name}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Monospace Prompt Display -->
    <div class="mt-6 flex flex-col gap-2.5">
      <span class="text-[11px] font-extrabold uppercase tracking-widest text-text-muted/70">
        {lang === 'es' ? 'Comando de terminal:' : 'Terminal command:'}
      </span>
      <div class="flex items-center justify-between gap-4 bg-bg-base/80 border border-border-subtle rounded-xl p-4 shadow-inner relative group/code">
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <span class="text-brand-primary font-mono font-bold select-none text-xs sm:text-sm">$</span>
          <code class="text-xs sm:text-[13px] font-mono text-text-main font-semibold tracking-wide select-all truncate">
            {currentManager.command}
          </code>
        </div>

        <button
          type="button"
          onclick={copyInstallCommand}
          aria-label={lang === 'es' ? 'Copiar comando' : 'Copy command'}
          class="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer active:scale-95 select-none shrink-0
            {isCopied 
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
              : 'bg-bg-surface hover:bg-bg-base border border-border-subtle hover:border-brand-primary/45 text-text-main'}"
        >
          {#if isCopied}
            <Check size={13} class="text-emerald-400 animate-in zoom-in-75 duration-150" />
            <span class="text-emerald-400">{lang === 'es' ? '¡COPIADO!' : 'COPIED!'}</span>
          {:else}
            <Copy size={12} class="text-text-muted group-hover/box:text-text-main transition-colors" />
            <span>{lang === 'es' ? 'COPIAR' : 'COPY'}</span>
          {/if}
        </button>
      </div>
    </div>

  </div>
</div>
