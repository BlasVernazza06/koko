<script lang="ts">
  import { Folder, FileCode, ChevronDown, ChevronRight, FolderOpen } from '@lucide/svelte';

  let {
    structurePreview = [],
    lang = 'es'
  } = $props<{
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

  // Track collapsed folders instead of expanded ones so they are expanded by default
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
        // If the parent directory is collapsed, hide this item
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
      structureTitle: 'Estructura de Directorios Generada'
    },
    en: {
      structureTitle: 'Generated Directory Structure'
    }
  }[lang] || {
    structureTitle: 'Estructura de Directorios Generada'
  });
</script>

<!-- Generated Structure -->
<div class="rounded-2xl p-6 overflow-hidden">
  <div class="flex items-center gap-2.5 mb-4 pb-2 border-b border-border-subtle select-none">
    <Folder size={16} class="text-brand-secondary" aria-hidden="true" />
    <span class="text-xs font-bold uppercase tracking-widest text-text-muted">
      {t.structureTitle}
    </span>
  </div>

  <div class="space-y-1.5 font-mono text-xs sm:text-sm text-text-muted max-h-[220px] overflow-y-auto no-scrollbar pb-3">
    {#each structurePreview as item, idx}
      {#if isItemVisible(idx, item)}
        {#if item.type === 'dir'}
          <button 
            type="button"
            onclick={() => toggleCollapse(idx)}
            class="flex items-center gap-1.5 select-none cursor-pointer hover:text-text-main text-left w-full focus:outline-none py-0.5" 
            style="padding-left: {item.tripleIndent ? '3rem' : item.doubleIndent ? '2rem' : item.indent ? '1rem' : '0'}"
          >
            {#if !collapsedIndices[idx]}
              <ChevronDown size={12} class="text-text-muted shrink-0" />
              <FolderOpen size={14} class="text-brand-secondary/80 shrink-0" aria-hidden="true" />
            {:else}
              <ChevronRight size={12} class="text-text-muted shrink-0" />
              <Folder size={14} class="text-brand-secondary/80 shrink-0" aria-hidden="true" />
            {/if}
            
            <span class="text-text-main font-semibold text-[13px]">{item.name}</span>
          </button>
        {:else}
          <div 
            class="flex items-center gap-1.5 select-none py-0.5 text-[13px]" 
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
  /* Hide standard scrollbars */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
