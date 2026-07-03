<script lang="ts">
  import { Terminal, Check, Copy, ChevronDown } from '@lucide/svelte';
  import { slide } from 'svelte/transition';

  let {
    generatedCommand = '',
    lang = 'es'
  } = $props<{
    generatedCommand: string;
    lang: string;
  }>();

  let isCopied = $state(false);
  let isCollapsed = $state(true);

  const t = $derived({
    es: {
      commandLabel: 'COMANDO DE INSTALACIÓN',
      copiedBtn: '¡Copiado!',
      copyBtn: 'Copiar Comando'
    },
    en: {
      commandLabel: 'INSTALLATION COMMAND',
      copiedBtn: 'Copied!',
      copyBtn: 'Copy Command'
    }
  }[lang] || {
    commandLabel: 'COMANDO DE INSTALACIÓN',
    copiedBtn: '¡Copiado!',
    copyBtn: 'Copiar Comando'
  });

  function copyCommand() {
    navigator.clipboard.writeText(generatedCommand);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
</script>

<!-- Command Display Box -->
<div class="rounded-2xl border border-border-subtle bg-[#0c0b11] p-5 shadow-lg relative overflow-hidden transition-all duration-300">
  <div class="flex items-center justify-between border-b border-white/[0.04] pb-2 mb-3.5 select-none">
    <span class="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
      {t.commandLabel}
    </span>
    
    <button
      type="button"
      onclick={toggleCollapse}
      class="flex items-center justify-center p-1 rounded-lg border border-transparent hover:border-brand-secondary/35 text-slate-400 hover:text-brand-secondary transition-all duration-200 cursor-pointer active:scale-90"
      aria-label={isCollapsed ? 'Expand command' : 'Collapse command'}
      aria-expanded={!isCollapsed}
    >
      <div class="transition-transform duration-300 transform" class:rotate-180={isCollapsed}>
        <ChevronDown size={16} />
      </div>
    </button>
  </div>
  
  <div class="flex items-center gap-2.5 bg-black/40 border border-white/[0.04] p-3.5 rounded-xl text-xs sm:text-sm text-brand-secondary font-mono select-all transition-all duration-300 overflow-x-auto {isCollapsed ? 'py-2.5 px-3.5' : ''}">
    <Terminal size={14} class="text-brand-secondary shrink-0" aria-hidden="true" />
    <span class="font-semibold transition-all duration-300 {isCollapsed ? 'whitespace-nowrap' : 'break-all leading-relaxed'}">{generatedCommand}</span>
  </div>

  {#if !isCollapsed}
    <div transition:slide={{ duration: 250 }}>
      <button
        type="button"
        onclick={copyCommand}
        class="mt-3.5 flex items-center justify-center gap-2 w-full py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-95 text-sm"
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
  {/if}
</div>
