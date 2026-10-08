<script lang="ts">
  import { Copy, Check } from '@lucide/svelte';
  import { packageManagers } from '@/data/package-managers.data';
  import type { PackageManagerId } from '@/types/package-managers.types';

  let { lang = 'es' } = $props<{ lang?: string }>();

  // State
  let isCopied = $state(false);
  let selectedManager = $state<PackageManagerId>('bun');

  // Sliding indicator state
  let containerRef = $state<HTMLDivElement | null>(null);
  let buttonRefs = $state<Record<string, HTMLButtonElement | null>>({});
  let indicatorStyle = $state({ left: 0, top: 0, width: 0, height: 0, ready: false });

  const managers = packageManagers;
  const currentManager = $derived(managers.find(m => m.id === selectedManager) || managers[0]);

  function copyInstallCommand() {
    navigator.clipboard.writeText(currentManager.command);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }

  function updateIndicator() {
    const activeBtn = buttonRefs[selectedManager];
    if (activeBtn && containerRef) {
      indicatorStyle = {
        left: activeBtn.offsetLeft,
        top: activeBtn.offsetTop,
        width: activeBtn.offsetWidth,
        height: activeBtn.offsetHeight,
        ready: true
      };
    }
  }

  $effect(() => {
    // React to selectedManager change
    const _ = selectedManager;
    updateIndicator();
  });

  $effect(() => {
    if (typeof window === 'undefined') return;

    // Initial calculation after render
    const frameId = requestAnimationFrame(updateIndicator);

    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateIndicator());
      resizeObserver.observe(containerRef);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  });
</script>

<div class="w-full flex flex-col items-center gap-3 font-sans select-none">
  <!-- Option 3: SpaceFS Pure Minimalist Runtime Pill with Sliding Indicator -->
  <div 
    bind:this={containerRef}
    class="relative flex items-center h-[42px] sm:h-[44px] p-[3px] bg-bg-surface backdrop-blur-md border border-border-subtle rounded-full shadow-xs"
  >
    <!-- Sliding Pill Background Indicator -->
    {#if indicatorStyle.ready}
      <div
        class="absolute rounded-full bg-bg-base shadow-xs border border-border-subtle transition-[left,width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
        style="left: {indicatorStyle.left}px; top: {indicatorStyle.top}px; width: {indicatorStyle.width}px; height: {indicatorStyle.height}px;"
      ></div>
    {/if}

    {#each managers as mgr}
      <button
        type="button"
        bind:this={buttonRefs[mgr.id]}
        onclick={() => selectedManager = mgr.id}
        class="relative z-10 flex items-center gap-2 h-full px-3.5 sm:px-4 rounded-full text-[13px] sm:text-sm font-sans cursor-pointer active:scale-95
          {selectedManager === mgr.id 
            ? 'text-text-main font-medium sm:font-semibold' 
            : 'text-text-muted hover:text-text-main font-normal'}"
      >
        <img src={mgr.logo} class="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain shrink-0" alt="" />
        <span>{mgr.name}</span>
      </button>
    {/each}
  </div>

  <!-- Minimal Terminal Console Pill -->
  <div class="w-full max-w-md flex items-center justify-between gap-3 bg-bg-surface backdrop-blur-xl border border-border-subtle rounded-full px-4 py-2 shadow-xs hover:border-brand-primary/40 group/cmd">
    <div class="flex items-center gap-2.5 min-w-0 flex-1 pl-1 font-mono">
      <span class="text-brand-primary font-bold select-none text-xs sm:text-sm">$</span>
      <code class="text-xs sm:text-[13px] text-text-main font-semibold tracking-tight select-all truncate">
        {currentManager.command}
      </code>
    </div>

    <!-- Integrated sleek copy button -->
    <button
      type="button"
      onclick={copyInstallCommand}
      aria-label={lang === 'es' ? 'Copiar' : 'Copy'}
      class="flex items-center gap-1.5 px-3 py-1 text-xs font-bold font-mono rounded-full border transition-transform duration-150 cursor-pointer active:scale-95 select-none shrink-0
        {isCopied 
          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]' 
          : 'bg-bg-base hover:bg-bg-surface border-border-subtle text-text-main hover:border-brand-primary/40'}"
    >
      {#if isCopied}
        <Check size={12} class="text-emerald-400" />
      {:else}
        <Copy size={12} class="text-text-muted group-hover/cmd:text-text-main" />
      {/if}
    </button>
  </div>
</div>
