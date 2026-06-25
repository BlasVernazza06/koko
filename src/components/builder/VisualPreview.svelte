<script lang="ts">
  import { Terminal, Folder, FileCode, Check, Copy, ChevronDown, ChevronRight } from '@lucide/svelte';

  let {
    generatedCommand = '',
    structurePreview = [],
    lang = 'es'
  } = $props<{
    generatedCommand: string;
    structurePreview: Array<{
      type: string;
      name: string;
      indent?: boolean;
      doubleIndent?: boolean;
      tripleIndent?: boolean;
      highlight?: string;
    }>;
    lang: string;
  }>();

  let isCopied = $state(false);
  let collapsedIndices = $state<Record<number, boolean>>({});

  function toggleCollapse(index: number) {
    collapsedIndices[index] = !collapsedIndices[index];
  }

  function isItemVisible(index: number, item: any): boolean {
    const itemDepth = item.tripleIndent ? 3 : item.doubleIndent ? 2 : item.indent ? 1 : 0;
    if (itemDepth === 0) return true;

    let currentDepth = itemDepth;
    for (let i = index - 1; i >= 0; i--) {
      const prev = structurePreview[i];
      const prevDepth = prev.tripleIndent ? 3 : prev.doubleIndent ? 2 : prev.indent ? 1 : 0;
      
      if (prevDepth < currentDepth) {
        if (prev.type === 'dir' && collapsedIndices[i]) {
          return false;
        }
        currentDepth = prevDepth;
        if (currentDepth === 0) break;
      }
    }
    return true;
  }

  const t = $derived({
    es: {
      commandLabel: 'Ejecuta este comando en tu terminal:',
      copyBtn: 'Copiar comando',
      copiedBtn: '¡Copiado!',
      structureTitle: 'Estructura de Directorios Generada'
    },
    en: {
      commandLabel: 'Run this command in your terminal:',
      copyBtn: 'Copy command',
      copiedBtn: 'Copied!',
      structureTitle: 'Generated Directory Structure'
    }
  }[lang] || t.es);

  function copyCommand() {
    navigator.clipboard.writeText(generatedCommand);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }
</script>

<!-- Command Display Box -->
<div class="rounded-2xl border border-border-subtle bg-[#0c0b11] p-5 shadow-lg relative overflow-hidden">
  <span class="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5 font-mono select-none border-b border-white/[0.04] pb-2">
    {t.commandLabel}
  </span>
  
  <div class="flex items-center gap-2.5 bg-black/40 border border-white/[0.04] p-3.5 rounded-xl text-xs sm:text-sm text-brand-primary font-mono select-all">
    <Terminal size={14} class="text-brand-primary shrink-0" aria-hidden="true" />
    <span class="break-all font-semibold leading-relaxed">{generatedCommand}</span>
  </div>

  <button
    type="button"
    onclick={copyCommand}
    class="mt-3.5 flex items-center justify-center gap-2 w-full py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold rounded-xl shadow-md cursor-pointer transition-colors duration-200 hover:scale-[1.01] active:scale-95 text-sm"
  >
    {#if isCopied}
      <Check size={14} aria-hidden="true" />
      <span>{t.copiedBtn}</span>
    {:else}
      <Copy size={14} aria-hidden="true" />
      <span>{t.copyBtn}</span>
    {/if}
  </button>
</div>

<!-- Generated Structure -->
<div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-7 backdrop-blur-xs shadow-sm">
  <div class="flex items-center gap-2.5 mb-4 pb-2 border-b border-border-subtle select-none">
    <Folder size={16} class="text-brand-secondary" aria-hidden="true" />
    <span class="text-xs font-bold uppercase tracking-widest text-text-muted">
      {t.structureTitle}
    </span>
  </div>

  <div class="space-y-2 font-mono text-xs sm:text-sm text-text-muted max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
    {#each structurePreview as item, idx}
      {#if isItemVisible(idx, item)}
        {#if item.type === 'dir'}
          <button 
            type="button"
            onclick={() => toggleCollapse(idx)}
            class="flex items-center gap-1.5 select-none cursor-pointer hover:text-text-main text-left w-full focus:outline-none py-0.5" 
            style="padding-left: {item.tripleIndent ? '3rem' : item.doubleIndent ? '2rem' : item.indent ? '1rem' : '0'}"
          >
            {#if collapsedIndices[idx]}
              <ChevronRight size={12} class="text-text-muted shrink-0" />
            {:else}
              <ChevronDown size={12} class="text-text-muted shrink-0" />
            {/if}
            <Folder size={14} class="text-brand-secondary/80 shrink-0" aria-hidden="true" />
            <span class="text-text-main font-semibold">{item.name}</span>
          </button>
        {:else}
          <div 
            class="flex items-center gap-1.5 select-none py-0.5" 
            style="padding-left: {item.tripleIndent ? '3.75rem' : item.doubleIndent ? '2.75rem' : item.indent ? '1.75rem' : '0.75rem'}"
          >
            <FileCode size={14} class="{item.highlight || 'text-text-muted'} shrink-0" aria-hidden="true" />
            <span>{item.name}</span>
          </div>
        {/if}
      {/if}
    {/each}
  </div>
</div>

<style>
  /* Custom scrollbar rules matching app styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--border-subtle);
    border-radius: 9999px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--brand-secondary);
  }
</style>
