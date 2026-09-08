<script lang="ts">
  import { Folder, FileCode, ChevronDown, ChevronRight, FolderOpen, ArrowDown } from '@lucide/svelte';

  let {
    structurePreview = [],
    lang = 'es'
  } = $props<{
    structurePreview: Array<{
      type: string;
      name: string;
      depth?: number;
      indent?: boolean;
      doubleIndent?: boolean;
      tripleIndent?: boolean;
      quadIndent?: boolean;
      highlight?: string;
    }>;
    lang: string;
  }>();

  // Track collapsed folders instead of expanded ones so they are expanded by default
  let collapsedIndices = $state<Record<number, boolean>>({});
  let scrollContainer = $state<HTMLElement | null>(null);
  let canScrollDown = $state(false);
  let canScrollUp = $state(false);

  function checkScroll() {
    if (!scrollContainer) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    canScrollUp = scrollTop > 10;
    canScrollDown = scrollHeight - scrollTop - clientHeight > 15;
  }

  $effect(() => {
    // Re-check scroll whenever structurePreview or collapsedIndices change
    if (structurePreview || collapsedIndices) {
      setTimeout(checkScroll, 50);
    }
  });

  function toggleCollapse(index: number) {
    collapsedIndices[index] = !collapsedIndices[index];
    setTimeout(checkScroll, 50);
  }

  function getItemDepth(item: any): number {
    if (item.depth !== undefined) return item.depth;
    if (item.quadIndent) return 4;
    if (item.tripleIndent) return 3;
    if (item.doubleIndent) return 2;
    if (item.indent) return 1;
    return 0;
  }

  function isItemVisible(index: number, item: any): boolean {
    const itemDepth = getItemDepth(item);
    if (itemDepth === 0) return true;

    let currentDepth = itemDepth;
    for (let i = index - 1; i >= 0; i--) {
      const prev = structurePreview[i];
      const prevDepth = getItemDepth(prev);
      
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
      structureTitle: 'Estructura de Directorios Generada',
      scrollMore: 'Desplaza para ver más archivos'
    },
    en: {
      structureTitle: 'Generated Directory Structure',
      scrollMore: 'Scroll to explore more files'
    }
  }[lang] || {
    structureTitle: 'Estructura de Directorios Generada',
    scrollMore: 'Desplaza para ver más archivos'
  });
</script>

<style>
  /* Sleek DevTools Custom Scrollbar */
  .tree-scroll::-webkit-scrollbar {
    width: 5px;
  }
  .tree-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .tree-scroll::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 170, 0.2);
    border-radius: 9999px;
    transition: background 0.2s ease;
  }
  .tree-scroll::-webkit-scrollbar-thumb:hover {
    background: var(--brand-primary);
  }
  .tree-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(150, 150, 170, 0.2) transparent;
  }

  /* Tree hierarchy guide line */
  .tree-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(160, 160, 185, 0.12);
  }

  .tree-node:hover .tree-line {
    background: rgba(160, 160, 185, 0.25);
  }
</style>

<!-- Generated Structure Container -->
<div class="rounded-2xl p-6 overflow-hidden relative">
  <!-- Header -->
  <div class="flex items-center justify-between gap-2.5 mb-4 pb-2 border-b border-border-subtle select-none">
    <div class="flex items-center gap-2">
      <Folder size={16} class="text-brand-secondary" aria-hidden="true" />
      <span class="text-xs font-bold uppercase tracking-widest text-text-muted">
        {t.structureTitle}
      </span>
    </div>
    
    <!-- Active items counter / indicator -->
    <span class="text-[10px] font-mono text-text-muted/70 bg-bg-surface px-2 py-0.5 rounded-md border border-border-subtle/50">
      {structurePreview.length} items
    </span>
  </div>

  <div class="relative">
    <!-- Top Subtle Fade Mask when scrolled down -->
    {#if canScrollUp}
      <div class="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-bg-base to-transparent z-10 transition-opacity duration-300"></div>
    {/if}

    <!-- Scrollable Tree View -->
    <div 
      bind:this={scrollContainer}
      onscroll={checkScroll}
      class="tree-scroll space-y-1 font-mono text-xs sm:text-sm text-text-muted max-h-[300px] overflow-y-auto pr-2 pb-6 relative select-none"
    >
      {#each structurePreview as item, idx}
        {@const depth = getItemDepth(item)}
        {#if isItemVisible(idx, item)}
          <div class="relative tree-node flex items-center group/node">
            <!-- Indent Guide Lines (Vertical Tab Lines) -->
            {#if depth > 0}
              {#each Array(depth) as _, i}
                <div 
                  class="tree-line"
                  style="left: {i * 1.1 + 0.65}rem"
                ></div>
              {/each}
            {/if}

            {#if item.type === 'dir'}
              <button 
                type="button"
                onclick={() => toggleCollapse(idx)}
                class="flex items-center gap-1.5 cursor-pointer hover:text-text-main text-left w-full focus:outline-none py-1 transition-colors rounded-md hover:bg-bg-surface/60 px-1" 
                style="padding-left: {depth > 0 ? depth * 1.1 + 0.2 : 0}rem"
              >
                {#if !collapsedIndices[idx]}
                  <ChevronDown size={11} class="text-text-muted/80 group-hover/node:text-text-main shrink-0 transition-transform" />
                  <FolderOpen size={14} class="text-brand-secondary/90 shrink-0" aria-hidden="true" />
                {:else}
                  <ChevronRight size={11} class="text-text-muted/80 group-hover/node:text-text-main shrink-0 transition-transform" />
                  <Folder size={14} class="text-brand-secondary/90 shrink-0" aria-hidden="true" />
                {/if}
                
                <span class="text-text-main font-semibold text-[13px] tracking-tight">{item.name}</span>
              </button>
            {:else}
              <div 
                class="flex items-center gap-1.5 py-1 text-[13px] rounded-md hover:bg-bg-surface/40 px-1 transition-colors w-full" 
                style="padding-left: {depth > 0 ? depth * 1.1 + 0.8 : 0.6}rem"
              >
                <FileCode size={13} class="{item.highlight || 'text-text-muted/80 group-hover/node:text-text-muted'} shrink-0 transition-colors" aria-hidden="true" />
                <span class="truncate">{item.name}</span>
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>

    <!-- Bottom Subtle Gradient Fade + Scroll Cue Indicator -->
    {#if canScrollDown}
      <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent z-10 flex items-end justify-center pb-1 transition-opacity duration-300">
        <div class="pointer-events-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-bg-surface/90 border border-border-subtle/80 text-[10.5px] font-sans font-semibold text-text-muted shadow-sm backdrop-blur-sm animate-pulse">
          <span>{t.scrollMore}</span>
          <ArrowDown size={10} class="text-brand-secondary" />
        </div>
      </div>
    {/if}
  </div>
</div>
