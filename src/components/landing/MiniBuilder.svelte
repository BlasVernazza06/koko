<script lang="ts">
  import { Terminal, ArrowRight, Settings } from '@lucide/svelte';

  let { lang = 'es' } = $props<{ lang?: string }>();

  let selectedFront = $state<'nextjs' | 'svelte'>('nextjs');
  let selectedDb = $state<'postgres' | 'mongo'>('postgres');

  // Compute the interactive command preview
  const generatedCommand = $derived(
    `claw init --front ${selectedFront} --db ${selectedDb}`
  );
</script>

<div class="w-full h-full font-sans select-none flex flex-col justify-between">
  <!-- Symmetrical Card -->
  <div class="group/box rounded-2xl border border-border-subtle/50 bg-bg-surface/50 backdrop-blur-md p-5 shadow-lg hover:shadow-[0_20px_60px_rgba(90,79,196,0.18)] hover:-translate-y-1 hover:border-brand-secondary/45 transition-all duration-500 overflow-visible h-full flex flex-col justify-between relative">
    
    <!-- Top Header -->
    <div class="flex items-center justify-between pb-3.5 border-b border-border-subtle/40 mb-5">
      <div class="flex items-center gap-2 text-text-main font-bold text-sm tracking-wider">
        <Settings size={16} class="text-brand-secondary animate-spin-slow" />
        <span>WIZARD_BUILDER</span>
      </div>
      <span class="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20">
        {#if lang === 'es'}Interactivo{:else}Interactive{/if}
      </span>
    </div>
    <!-- CTA Launcher Button -->
    <a 
      href={lang === 'es' ? '/builder' : '/en/builder'}
      class="flex items-center justify-center gap-2.5 w-full p-4 rounded-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 text-white border border-brand-primary/20 transition-all duration-300 cursor-pointer shadow-md shadow-brand-primary/10 hover:shadow-[0_4px_20px_rgba(90,79,196,0.25)] active:scale-95 text-xs sm:text-sm group font-mono tracking-wider"
    >
      {#if lang === 'es'}INICIAR CONSTRUCTOR{:else}LAUNCH BUILDER{/if}
      <ArrowRight size={14} class="group-hover:translate-x-1 transition-transform duration-200" />
    </a>
  </div>
</div>
