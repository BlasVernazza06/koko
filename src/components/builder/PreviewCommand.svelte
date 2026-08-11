<script lang="ts">
  import { Check, Copy, ChevronDown } from '@lucide/svelte';

  let {
    generatedCommand = '',
    selectedPackageManager = $bindable('pnpm'),
    selectedCommandType = $bindable('npm'),
    lang = 'es'
  } = $props<{
    generatedCommand: string;
    selectedPackageManager: string;
    selectedCommandType: string;
    lang: string;
  }>();

  let isCopied = $state(false);
  let isExpanded = $state(false);
  let isPmOpen = $state(false);

  const installerOptions = [
    { id: 'npm', label: 'npm' },
    { id: 'pnpm', label: 'pnpm' },
    { id: 'yarn', label: 'yarn' },
    { id: 'bun', label: 'bun' },
    { id: 'binary', label: 'koko' },
    { id: 'go', label: 'go' }
  ];

  const currentInstallerLabel = $derived(
    installerOptions.find(opt => opt.id === selectedCommandType)?.label || selectedCommandType
  );

  const t = $derived({
    es: {
      commandLabel: 'CLI COMMAND',
      copiedBtn: 'Copiado',
      copyBtn: 'Copy',
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
    copyBtn: 'Copy',
    flagsBtn: 'Flags'
  });

  function copyCommand() {
    const rawLines = getCommandLinesRaw();
    navigator.clipboard.writeText(rawLines.join('\n'));
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }

  // Get raw formatted lines for clipboard copy
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

  // Syntax highlighting logic for base command (Uniform color)
  const highlightedBaseCmd = $derived.by(() => {
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
      i++;
    }
    
    if (i < parts.length && isExpanded) {
      text += ' \\';
    }
    return `<span class="text-slate-200 font-mono font-medium">${text}</span>`;
  });

  // Syntax highlighting logic for flags (Uniform color)
  const highlightedFlags = $derived.by(() => {
    if (!generatedCommand) return [];
    const parts = generatedCommand.split(' ');
    const lines: string[] = [];
    let i = 0;
    
    // Skip base command
    while (i < parts.length && !parts[i].startsWith('--') && parts[i] !== '--') {
      i++;
    }
    if (i < parts.length && parts[i] === '--') {
      i++;
    }
    
    // Parse flags and values
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
    
    // Add backslashes
    for (let j = 0; j < flagsList.length; j++) {
      let flagLine = flagsList[j];
      if (j < flagsList.length - 1) {
        flagLine += ' \\';
      }
      lines.push(`<span class="text-slate-200 font-mono font-medium">${flagLine}</span>`);
    }
    
    return lines;
  });
</script>

<div class="space-y-3 font-sans">
  <!-- Reference Header Layout: Title on Left, Action buttons on Right -->
  <div class="flex items-center justify-between pb-3 select-none">
    <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-text-muted">
      {t.commandLabel}
    </span>
    <div class="flex items-center gap-2">
      <!-- Segmented Buttons for Installer Method Selection -->
      <div class="flex items-center gap-1 p-0.5 bg-bg-surface/40 border border-border-subtle rounded-xl select-none">
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
      {#if highlightedFlags.length > 0}
        <button
          type="button"
          onclick={() => isExpanded = !isExpanded}
          class="flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle bg-bg-surface/20 hover:bg-bg-surface text-text-muted hover:text-text-main rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
        >
          <ChevronDown size={11} class="transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}" />
          <span>{t.flagsBtn}</span>
        </button>
      {/if}

      <!-- COPY BUTTON -->
      <button
        type="button"
        onclick={copyCommand}
        class="flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle bg-bg-surface/20 hover:bg-bg-surface text-text-muted hover:text-text-main rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
      >
        {#if isCopied}
          <Check size={11} class="text-emerald-500 animate-bounce" />
          <span class="text-emerald-500">{t.copiedBtn}</span>
        {:else}
          <Copy size={11} />
          <span>{t.copyBtn}</span>
        {/if}
      </button>
    </div>
  </div>
  <div class="h-px bg-border-subtle w-full !mt-0 !mb-3"></div>

  <!-- Command Box (Enforced dark theme background for high contrast in light/dark modes) -->
  <div class="border border-border-subtle/50 dark:border-border-subtle rounded-xl bg-[#0c0b14] dark:bg-[#07060b] shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-4 font-mono text-xs sm:text-[13px] tracking-wide relative overflow-hidden">
    <div class="flex items-start gap-2.5">
      <!-- Elegant dollar prompt indicator -->
      <span class="text-brand-secondary select-none font-extrabold mt-0.5">$</span>
      <div class="flex-1 text-slate-300 leading-relaxed overflow-hidden">
        <div class="whitespace-pre">{@html highlightedBaseCmd}</div>
        
        <!-- Dropdown Flags Panel with internal scrolling -->
        {#if isExpanded && highlightedFlags.length > 0}
          <div class="space-y-1.5 mt-2 pt-2 border-t border-border-subtle/30 max-h-[135px] overflow-y-auto no-scrollbar">
            {#each highlightedFlags as line}
              <div class="whitespace-pre">{@html line}</div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- CTA Button to download native binary from GitHub Releases -->
  <div class="flex justify-end pt-1">
    <a
      href="https://github.com/BlasVernazza06/koko-cli/releases"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-brand-primary/20 bg-brand-primary/[0.04] hover:bg-brand-primary/10 text-brand-primary rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 shadow-2xs hover:shadow-sm"
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

