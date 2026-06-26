<script lang="ts">
  import { Check, Copy, ChevronDown, Terminal } from '@lucide/svelte';
  import {
    SvglNPMLogo,
    SvglPnpmLogo,
    SvglBunLogo,
    SvglGoLogo
  } from '@selemondev/svgl-svelte';

  // Define Props
  let { lang = 'es' } = $props<{ lang?: string }>();

  // State
  let isCopied = $state(false);
  let isDropdownOpen = $state(false);
  let selectedManager = $state<'npm' | 'pnpm' | 'bun' | 'go'>('bun');

  const managers = [
    { id: 'bun', name: 'BUN', icon: SvglBunLogo, command: 'bun create claw-app@latest' },
    { id: 'pnpm', name: 'PNPM', icon: SvglPnpmLogo, command: 'pnpm create claw-app@latest' },
    { id: 'npm', name: 'NPM', icon: SvglNPMLogo, command: 'npm create claw-app@latest' },
    { id: 'go', name: 'GO', icon: SvglGoLogo, command: 'go install github.com/BlasVernazza06/claw@latest' }
  ];

  const currentManager = $derived(managers.find(m => m.id === selectedManager) || managers[0]);

  function copyInstallCommand() {
    navigator.clipboard.writeText(currentManager.command);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }

  function selectManager(id: 'npm' | 'pnpm' | 'bun' | 'go') {
    selectedManager = id;
    isDropdownOpen = false;
  }
</script>

<div class="w-full h-full font-sans select-none flex flex-col">
  <!-- Container with glow effect and dark premium background -->
  <div class="group/box rounded-2xl border border-border-subtle/50 bg-bg-surface/50 backdrop-blur-md p-5 shadow-lg overflow-visible h-max flex flex-col">
    <!-- Top Row: Title and Dropdown -->
    <div class="flex items-center justify-between pb-3.5 border-b border-border-subtle/40 mb-4">
      <div class="flex items-center gap-2 text-text-main font-bold text-sm tracking-wider">
        <Terminal size={16} class="text-brand-primary animate-pulse" />
        <span>CLI_COMMAND</span>
      </div>

      <!-- Custom Premium Dropdown -->
      <div class="relative">
        <button
          type="button"
          onclick={() => isDropdownOpen = !isDropdownOpen}
          class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-base/80 border border-border-subtle/60 text-xs font-bold text-text-main hover:border-brand-primary/40 hover:bg-bg-base transition-all duration-200 cursor-pointer active:scale-95"
        >
          <span class="w-3.5 h-3.5 flex items-center justify-center shrink-0">
            <svelte:component this={currentManager.icon} width="14" height="14" />
          </span>
          <span>{currentManager.name}</span>
          <ChevronDown size={12} class="text-text-muted transition-transform duration-200 {isDropdownOpen ? 'rotate-180' : ''}" />
        </button>

        {#if isDropdownOpen}
          <!-- Dropdown Options Panel -->
          <div class="absolute right-0 mt-1.5 w-32 rounded-xl bg-bg-base border border-border-subtle shadow-xl z-50 overflow-hidden animate-fade-in py-1">
            {#each managers as mgr}
              <button
                type="button"
                onclick={() => selectManager(mgr.id as any)}
                class="flex items-center gap-2.5 w-full px-3 py-2 text-left text-xs font-semibold hover:bg-brand-primary/10 text-text-main hover:text-brand-primary transition-colors cursor-pointer {selectedManager === mgr.id ? 'bg-brand-primary/5 text-brand-primary font-bold' : ''}"
              >
                <span class="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  <svelte:component this={mgr.icon} width="14" height="14" />
                </span>
                <span>{mgr.name}</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Bottom Row: Terminal Code Block -->
    <div class="flex items-center justify-between gap-4 bg-bg-base/80 border border-border-subtle/50 p-4 rounded-xl shadow-xs">
      <div class="flex items-center gap-3 overflow-hidden">
        <span class="text-brand-primary font-bold font-mono text-sm shrink-0 select-none">$</span>
        <code class="text-xs sm:text-sm font-mono text-text-main font-medium break-all select-all whitespace-nowrap">
          {currentManager.command}
        </code>
      </div>

      <button
        type="button"
        onclick={copyInstallCommand}
        class="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg bg-bg-surface hover:bg-bg-base border border-border-subtle/70 hover:border-brand-primary/30 text-text-main transition-all duration-200 cursor-pointer shrink-0 active:scale-95"
      >
        {#if isCopied}
          <Check size={14} class="text-brand-secondary" />
          <span class="text-brand-secondary font-bold">
            {lang === 'es' ? 'Copiado' : 'Copied'}
          </span>
        {:else}
          <Copy size={14} class="text-text-muted" />
          <span>{lang === 'es' ? 'COPIAR' : 'COPY'}</span>
        {/if}
      </button>
    </div>
  </div>
</div>