<script lang="ts">
  import { Terminal, Check, Copy } from '@lucide/svelte';

  let {
    generatedCommand = '',
    lang = 'es'
  } = $props<{
    generatedCommand: string;
    lang: string;
  }>();

  let isCopied = $state(false);

  const t = $derived({
    es: {
      commandLabel: 'CONSOLA DE INSTALACIÓN',
      copiedBtn: '¡Copiado!',
      copyBtn: 'Copiar'
    },
    en: {
      commandLabel: 'INSTALLATION CONSOLE',
      copiedBtn: 'Copied!',
      copyBtn: 'Copy'
    }
  }[lang] || {
    commandLabel: 'CONSOLA DE INSTALACIÓN',
    copiedBtn: '¡Copiado!',
    copyBtn: 'Copiar'
  });

  function copyCommand() {
    navigator.clipboard.writeText(generatedCommand);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }

  // Syntax highlighting logic mapping CLI flags, values and base command
  const highlightedHtml = $derived.by(() => {
    if (!generatedCommand) return '';
    const parts = generatedCommand.split(' ');
    let html = '';
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;
      
      if (i === 0 && part === 'koko') {
        html += `<span class="text-brand-primary font-bold">koko</span>`;
      } else if (i === 1 && part === 'init') {
        html += ` <span class="text-brand-secondary font-bold">init</span>`;
      } else if (i === 2 && !part.startsWith('--')) {
        // Project name
        html += ` <span class="text-emerald-400 font-semibold font-mono">${part}</span>`;
      } else if (part.startsWith('--')) {
        // Command line flags (e.g. --frontend)
        html += ` <span class="text-[#f472b6] font-medium font-mono">${part}</span>`;
      } else {
        // Values for flags (e.g. nextjs)
        html += ` <span class="text-slate-300 font-normal font-mono opacity-90">${part}</span>`;
      }
    }
    return html;
  });
</script>

<!-- Command Display Box (macOS Terminal Mockup) -->
<div class="rounded-2xl border border-border-subtle bg-[#0c0b14] dark:bg-[#07060b] shadow-[0_12px_30px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-300 group">
  <!-- macOS Terminal Titlebar -->
  <div class="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] bg-white/[0.01] select-none">
    <div class="flex items-center gap-1.5">
      <span class="w-3 h-3 rounded-full bg-[#ff5f56] block opacity-90"></span>
      <span class="w-3 h-3 rounded-full bg-[#ffbd2e] block opacity-90"></span>
      <span class="w-3 h-3 rounded-full bg-[#27c93f] block opacity-90"></span>
    </div>
    <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 font-mono select-none">
      {t.commandLabel}
    </span>
    <div class="w-12"></div> <!-- layout balance spacer -->
  </div>
  
  <!-- Terminal Content Area -->
  <div class="p-5 pb-14 font-mono text-xs sm:text-[13px] relative leading-relaxed">
    <div class="flex items-start gap-2.5">
      <span class="text-brand-secondary select-none font-bold">~ $</span>
      <div class="flex-1 text-slate-300 break-all whitespace-pre-wrap tracking-wide">
        {@html highlightedHtml}
      </div>
    </div>

    <!-- Floating Copy Button inside terminal -->
    <button
      type="button"
      onclick={copyCommand}
      class="absolute right-3.5 bottom-3.5 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-brand-primary text-white border border-white/[0.08] hover:border-brand-primary/50 font-bold rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95 text-xs select-none"
      aria-label={t.copyBtn}
    >
      {#if isCopied}
        <Check size={12} class="text-emerald-400 animate-bounce" aria-hidden="true" />
        <span class="text-emerald-400">{t.copiedBtn}</span>
      {:else}
        <Copy size={12} class="text-slate-300 group-hover:text-white" aria-hidden="true" />
        <span>{t.copyBtn}</span>
      {/if}
    </button>
  </div>
</div>

