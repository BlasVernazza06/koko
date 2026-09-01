<script lang="ts">
  import { Check, Copy, ChevronDown } from '@lucide/svelte';

  let {
    generatedCommand = '',
    selectedPackageManager = $bindable('pnpm'),
    selectedCommandType = $bindable('wrapper'),
    lang = 'es'
  } = $props<{
    generatedCommand: string;
    selectedPackageManager: string;
    selectedCommandType: string;
    lang: string;
  }>();

  let isCopied = $state(false);
  let isExpanded = $state(false);

  const t = $derived({
    es: {
      commandLabel: 'CLI COMMAND',
      copiedBtn: 'Copiado',
      copyBtn: 'Copiar',
      flagsBtn: 'Flags'
    },
    en: {
      commandLabel: 'CLI COMMAND',
      copiedBtn: 'Copied',
      copyBtn: 'Copy',
      flagsBtn: 'Flags'
    }
  }[lang] || {
    commandLabel: 'CLI COMMAND',
    copiedBtn: 'Copiado',
    copyBtn: 'Copiar',
    flagsBtn: 'Flags'
  });

  const hasFlags = $derived(generatedCommand.includes('--'));

  // Extract base command without flags
  const baseCommandText = $derived.by(() => {
    if (!generatedCommand) return '';
    const parts = generatedCommand.split(' ');
    let text = '';
    let i = 0;
    while (i < parts.length && !parts[i].startsWith('--') && parts[i] !== '--') {
      if (parts[i]) {
        text += (text ? ' ' : '') + parts[i];
      }
      i++;
    }
    if (i < parts.length && parts[i] === '--') {
      text += ' --';
    }
    return text;
  });

  // Get raw formatted lines for multi-line clipboard copy
  function getCommandLinesRaw(): string[] {
    if (!generatedCommand) return [];
    const parts = generatedCommand.split(' ');
    const lines: string[] = [];
    let i = 0;
    
    let baseCmd = '';
    while (i < parts.length && !parts[i].startsWith('--')) {
      if (parts[i]) {
        baseCmd += (baseCmd ? ' ' : '') + parts[i];
      }
      i++;
    }
    if (i < parts.length) baseCmd += ' \\';
    lines.push(baseCmd);

    const flagsList: string[] = [];
    while (i < parts.length) {
      const part = parts[i];
      if (part.startsWith('--')) {
        let flagStr = '  ' + part;
        if (i + 1 < parts.length && !parts[i + 1].startsWith('--')) {
          flagStr += ' ' + parts[i + 1];
          i++;
        }
        flagsList.push(flagStr);
      }
      i++;
    }

    for (let j = 0; j < flagsList.length; j++) {
      let flagLine = flagsList[j];
      if (j < flagsList.length - 1) {
        flagLine += ' \\';
      }
      lines.push(flagLine);
    }
    return lines;
  }

  function copyCommand() {
    const textToCopy = isExpanded && hasFlags
      ? getCommandLinesRaw().join('\n')
      : generatedCommand;

    navigator.clipboard.writeText(textToCopy);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }

  // Syntax highlighting for single-line horizontal view
  const highlightedSingleLine = $derived.by(() => {
    if (!generatedCommand) return '';
    const parts = generatedCommand.split(' ');
    const formattedParts: string[] = [];
    
    let isBase = true;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (!p) continue;
      
      if (p.startsWith('--')) {
        isBase = false;
        formattedParts.push(`<span class="text-brand-secondary font-semibold">${p}</span>`);
      } else if (isBase) {
        formattedParts.push(`<span class="text-slate-100 font-semibold">${p}</span>`);
      } else {
        formattedParts.push(`<span class="text-emerald-400 font-medium">${p}</span>`);
      }
    }
    return formattedParts.join(' ');
  });

  // Base command line for multi-line expanded view
  const highlightedBaseCmd = $derived.by(() => {
    if (!baseCommandText) return '';
    return `<span class="text-slate-100 font-semibold">${baseCommandText}</span> <span class="text-slate-500 font-bold">\\</span>`;
  });

  // Flags list for multi-line expanded view
  const highlightedFlags = $derived.by(() => {
    if (!generatedCommand) return [];
    const parts = generatedCommand.split(' ');
    let i = 0;
    
    while (i < parts.length && !parts[i].startsWith('--') && parts[i] !== '--') {
      i++;
    }
    if (i < parts.length && parts[i] === '--') {
      i++;
    }
    
    const flagsList: { flag: string; value: string }[] = [];
    while (i < parts.length) {
      const part = parts[i];
      if (part.startsWith('--')) {
        const flag = part;
        let value = '';
        if (i + 1 < parts.length && !parts[i + 1].startsWith('--')) {
          value = parts[i + 1];
          i++;
        }
        flagsList.push({ flag, value });
      }
      i++;
    }
    
    const lines: string[] = [];
    for (let j = 0; j < flagsList.length; j++) {
      const item = flagsList[j];
      const hasNext = j < flagsList.length - 1;
      const valHtml = item.value ? ` <span class="text-emerald-400 font-medium">${item.value}</span>` : '';
      const slashHtml = hasNext ? ` <span class="text-slate-500 font-bold">\\</span>` : '';
      lines.push(`<span class="text-brand-secondary font-semibold">${item.flag}</span>${valHtml}${slashHtml}`);
    }
    
    return lines;
  });
</script>

<div class="space-y-3 font-sans">
  <!-- Header Layout: Title on Left, Selector & Flags toggle on Right -->
  <div class="flex items-center justify-between pb-3 select-none">
    <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-text-muted">
      {t.commandLabel}
    </span>
    <div class="flex items-center gap-2">
      <!-- Segmented Buttons for Installer Method Selection -->
      <div class="flex items-center gap-1 p-0.5 bg-bg-base border border-border-subtle rounded-xl select-none shadow-2xs">
        <button
          type="button"
          onclick={() => selectedCommandType = 'wrapper'}
          class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border transition-all duration-200 cursor-pointer active:scale-95
            {selectedCommandType === 'wrapper'
              ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-xs'
              : 'bg-transparent border-transparent text-text-muted hover:text-text-main'}"
        >
          {selectedPackageManager}
        </button>
        <button
          type="button"
          onclick={() => selectedCommandType = 'binary'}
          class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border transition-all duration-200 cursor-pointer active:scale-95
            {selectedCommandType === 'binary'
              ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-xs'
              : 'bg-transparent border-transparent text-text-muted hover:text-text-main'}"
        >
          koko
        </button>
        <button
          type="button"
          onclick={() => selectedCommandType = 'go'}
          class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border transition-all duration-200 cursor-pointer active:scale-95
            {selectedCommandType === 'go'
              ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-xs'
              : 'bg-transparent border-transparent text-text-muted hover:text-text-main'}"
        >
          go
        </button>
      </div>

      <!-- FLAGS DROPDOWN TOGGLE -->
      {#if hasFlags}
        <button
          type="button"
          onclick={() => isExpanded = !isExpanded}
          class="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs
            {isExpanded
              ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary'
              : 'bg-bg-base border-border-subtle text-text-muted hover:text-text-main'}"
        >
          <ChevronDown size={11} class="transition-transform duration-300 {isExpanded ? 'rotate-180 text-brand-primary' : ''}" />
          <span>{t.flagsBtn}</span>
        </button>
      {/if}
    </div>
  </div>
  <div class="h-px bg-border-subtle w-full !mt-0 !mb-3"></div>

  <!-- Command Box Container -->
  <div class="border border-border-subtle/50 dark:border-border-subtle rounded-2xl bg-[#0c0b14] dark:bg-[#07060b] shadow-[0_4px_24px_rgba(0,0,0,0.18)] p-3 sm:p-4 font-mono text-xs sm:text-[13px] tracking-wide">
    
    <!-- Main Row: Command Text on Left (min-w-0 flex-1 overflow-x-auto) + Copy Button on Right (shrink-0) -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5 min-w-0 flex-1 overflow-x-auto no-scrollbar scroll-smooth py-1">
        <span class="text-brand-primary select-none font-extrabold text-sm shrink-0">$</span>
        <div class="whitespace-nowrap font-mono text-xs sm:text-[13px] tracking-wide select-all text-slate-300">
          {#if isExpanded && hasFlags}
            {@html highlightedBaseCmd}
          {:else}
            {@html highlightedSingleLine}
          {/if}
        </div>
      </div>

      <!-- Copy Button inside the box (Always visible, never covers text) -->
      <button
        type="button"
        onclick={copyCommand}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10.5px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-md select-none shrink-0
          {isCopied
            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-emerald-500/10'
            : 'bg-white/10 hover:bg-white/15 border-white/15 text-slate-200 hover:text-white hover:border-white/25'}"
      >
        {#if isCopied}
          <Check size={12} strokeWidth={2.5} class="text-emerald-400 animate-bounce" />
          <span class="text-emerald-400">{t.copiedBtn}</span>
        {:else}
          <Copy size={12} class="opacity-80" />
          <span>{t.copyBtn}</span>
        {/if}
      </button>
    </div>

    <!-- Multi-Line View when Flags are Expanded -->
    {#if isExpanded && hasFlags}
      <div class="mt-2.5 pt-2.5 border-t border-white/10 overflow-x-auto max-h-[160px] overflow-y-auto no-scrollbar">
        <div class="space-y-1.5 font-mono text-xs sm:text-[13px] tracking-wide select-all text-slate-300 pl-5">
          {#each highlightedFlags as line}
            <div class="whitespace-pre">{@html line}</div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- CTA Button to download native binary from GitHub Releases -->
  <div class="flex justify-end pt-1">
    <a
      href="https://github.com/BlasVernazza06/koko-cli/releases"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-brand-primary/20 bg-bg-base hover:bg-brand-primary/5 text-brand-primary rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 shadow-2xs hover:shadow-sm select-none"
    >
      <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-none stroke-current stroke-[2]" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span>{lang === 'es' ? 'Instalar Binario Nativo (Releases)' : 'Install Native Binary (Releases)'}</span>
    </a>
  </div>
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
