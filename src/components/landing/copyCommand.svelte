<script lang="ts">
  import { Check, Copy, Terminal } from '@lucide/svelte';
  const SvglBunLogo = '/logos/bun.svg';
  const SvglPnpmLogo = '/logos/pnpm.svg';
  const SvglNPMLogo = '/logos/npm.svg';
  const SvglGoLogo = '/logos/go.svg';

  // Define Props
  let { lang = 'es' } = $props<{ lang?: string }>();

  // State
  let isCopied = $state(false);
  let selectedManager = $state<'npm' | 'pnpm' | 'bun' | 'go'>('bun');

  const managers = [
    { id: 'bun', name: 'BUN', icon: SvglBunLogo, command: 'bun create claw-app@latest', color: 'hover:border-rose-400/50 hover:bg-rose-400/5 hover:text-rose-300', active: 'border-rose-400/60 bg-rose-400/10 text-rose-300' },
    { id: 'pnpm', name: 'PNPM', icon: SvglPnpmLogo, command: 'pnpm create claw-app@latest', color: 'hover:border-yellow-400/50 hover:bg-yellow-400/5 hover:text-yellow-300', active: 'border-yellow-400/60 bg-yellow-400/10 text-yellow-300' },
    { id: 'npm', name: 'NPM', icon: SvglNPMLogo, command: 'npm create claw-app@latest', color: 'hover:border-red-400/50 hover:bg-red-400/5 hover:text-red-300', active: 'border-red-400/60 bg-red-400/10 text-red-300' },
    { id: 'go', name: 'GO', icon: SvglGoLogo, command: 'go install github.com/BlasVernazza06/claw@latest', color: 'hover:border-[#00ADD8]/50 hover:bg-[#00ADD8]/5 hover:text-[#00ADD8]', active: 'border-[#00ADD8]/60 bg-[#00ADD8]/10 text-[#00ADD8]' }
  ];

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
  <!-- Symmetrical Card -->
  <div class="group/box rounded-2xl border border-border-subtle/50 bg-bg-surface/50 backdrop-blur-md p-5 shadow-lg hover:shadow-[0_20px_60px_rgba(90,79,196,0.18)] hover:-translate-y-1 hover:border-brand-primary/45 transition-all duration-500 overflow-visible h-max flex flex-col relative">
    
    <!-- Top Terminal bar -->
    <div class="flex items-center justify-between pb-3.5 border-b border-border-subtle/40 mb-3">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
      </div>
      <div class="text-[10px] uppercase font-bold tracking-widest text-text-muted/60 font-mono">
        claw-cli // terminal_install
      </div>
      <div class="w-10"></div> <!-- Spacer to center title -->
    </div>

    <!-- Segmented Package Manager Tabs Grid -->
    <div class="flex flex-col gap-1.5 mb-5">
      <span class="text-[10px] font-bold uppercase tracking-widest text-text-muted/80">
        {lang === 'es' ? 'Selecciona tu Gestor:' : 'Choose Package Manager:'}
      </span>
      <div class="grid grid-cols-4 gap-1.5 bg-bg-base/60 p-1.5 rounded-xl border border-border-subtle/50">
        {#each managers as mgr}
          <button
            type="button"
            onclick={() => selectedManager = mgr.id as any}
            class="flex flex-col items-center justify-center gap-1 py-2 rounded-lg border border-transparent text-[10px] font-bold transition-all duration-200 cursor-pointer active:scale-95
              {selectedManager === mgr.id ? mgr.active : `text-text-muted bg-transparent ${mgr.color}`}"
          >
            <img src={mgr.icon} class="w-3.5 h-3.5 object-contain" alt="" />
            <span>{mgr.name}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Terminal Code Block -->
    <div class="flex flex-col gap-2 bg-bg-base/80 border border-border-subtle/70 p-4.5 rounded-xl relative overflow-visible group/terminal">
      <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl pointer-events-none transition-all duration-500 group-hover/box:bg-brand-primary/10"></div>
      
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 overflow-visible min-w-0 flex-1 relative group/tooltip">
          <Terminal size={14} class="text-brand-secondary shrink-0" />
          <code class="text-xs sm:text-sm font-mono text-text-main font-semibold tracking-wide select-all truncate cursor-help flex-1 pr-1">
            {currentManager.command}
          </code>
          <!-- Custom Premium Tooltip -->
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 px-3 py-2 bg-bg-surface border border-border-subtle rounded-xl text-xs font-mono text-text-main shadow-xl opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-250 z-50 whitespace-nowrap">
            {currentManager.command}
          </div>
        </div>

        <button
          type="button"
          onclick={copyInstallCommand}
          class="flex items-center gap-2 px-3.5 py-2 text-[10px] font-bold rounded-lg border transition-all duration-200 cursor-pointer shrink-0 active:scale-95 select-none
            {isCopied 
              ? 'bg-brand-secondary/15 border-brand-secondary text-brand-secondary font-extrabold shadow-sm' 
              : 'bg-bg-surface hover:bg-bg-base border border-border-subtle/80 hover:border-brand-primary/40 text-text-main'}"
        >
          {#if isCopied}
            <Check size={12} strokeWidth={3.5} />
            <span>{lang === 'es' ? 'COPIADO' : 'COPIED'}</span>
          {:else}
            <Copy size={12} class="text-text-muted" />
            <span>{lang === 'es' ? 'COPIAR' : 'COPY'}</span>
          {/if}
        </button>
      </div>
    </div>

  </div>
</div>