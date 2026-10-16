<script lang="ts">
  import { Check, Copy, ChevronDown, ChevronUp } from '@lucide/svelte';

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

  const translations = {
    es: {
      commandLabel: 'CLI COMMAND',
      copiedBtn: 'Copiado',
      copyBtn: 'Copiar',
      expandCmd: 'Ver comando completo',
      collapseCmd: 'Comprimir'
    },
    en: {
      commandLabel: 'CLI COMMAND',
      copiedBtn: 'Copied',
      copyBtn: 'Copy',
      expandCmd: 'View full flags',
      collapseCmd: 'Collapse'
    }
  };

  const t = $derived(lang === 'en' ? translations.en : translations.es);

  // Parse command into base command and individual flags
  const parsedCommand = $derived.by(() => {
    if (!generatedCommand) {
      return { baseCmd: '', flags: [] };
    }
    const parts = generatedCommand.trim().split(/\s+/);
    let i = 0;
    const baseParts: string[] = [];
    while (i < parts.length && !parts[i].startsWith('--')) {
      baseParts.push(parts[i]);
      i++;
    }
    const baseCmd = baseParts.join(' ');

    const flags: Array<{ flag: string; value: string }> = [];
    while (i < parts.length) {
      const part = parts[i];
      if (part.startsWith('--')) {
        const flag = part;
        let value = '';
        if (i + 1 < parts.length && !parts[i + 1].startsWith('--')) {
          value = parts[i + 1];
          i++;
        }
        flags.push({ flag, value });
      }
      i++;
    }

    return { baseCmd, flags };
  });

  const hasFlags = $derived(parsedCommand.flags.length > 0);

  // Copy command to clipboard as a single inline string (no newlines, no backslashes)
  function copyCommand() {
    const inlineCommand = generatedCommand.trim().replace(/\s+/g, ' ');
    navigator.clipboard.writeText(inlineCommand);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }

  // Base command line with trailing backslash if there are flags (when expanded)
  const highlightedBaseCmd = $derived.by(() => {
    if (!parsedCommand.baseCmd) return '';
    const slashHtml = (hasFlags && isExpanded) ? ` <span class="text-slate-500 font-bold">\\</span>` : '';
    return `<span class="text-slate-100 font-semibold">${parsedCommand.baseCmd}</span>${slashHtml}`;
  });

  // Flags list for multi-line visual view
  const highlightedFlags = $derived.by(() => {
    return parsedCommand.flags.map((item, idx) => {
      const hasNext = idx < parsedCommand.flags.length - 1;
      const valHtml = item.value ? ` <span class="text-emerald-400 font-medium">${item.value}</span>` : '';
      const slashHtml = hasNext ? ` <span class="text-slate-500 font-bold">\\</span>` : '';
      return `<span class="text-brand-secondary font-semibold">${item.flag}</span>${valHtml}${slashHtml}`;
    });
  });
</script>

<div class="space-y-3 font-sans">
  <!-- Header Layout: Title on Left, Selector on Right -->
  <div class="flex items-center justify-between pb-2 select-none">
    <div class="flex items-center gap-1.5">
      <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-text-muted">
        {t.commandLabel}
      </span>
    </div>
    <div class="flex items-center gap-2">
      <!-- Segmented Buttons for Installer Method Selection -->
      <div class="flex items-center gap-1 p-0.5 bg-bg-base border border-border-subtle rounded-xl select-none shadow-2xs">
        <button
          type="button"
          onclick={() => selectedCommandType = 'wrapper'}
          class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border cursor-pointer active:scale-95
            {selectedCommandType === 'wrapper'
              ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-xs'
              : 'bg-transparent border-transparent text-text-muted hover:text-text-main'}"
        >
          {selectedPackageManager}
        </button>
        <button
          type="button"
          onclick={() => selectedCommandType = 'binary'}
          class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border cursor-pointer active:scale-95
            {selectedCommandType === 'binary'
              ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-xs'
              : 'bg-transparent border-transparent text-text-muted hover:text-text-main'}"
        >
          koko
        </button>
        <button
          type="button"
          onclick={() => selectedCommandType = 'go'}
          class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border cursor-pointer active:scale-95
            {selectedCommandType === 'go'
              ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-xs'
              : 'bg-transparent border-transparent text-text-muted hover:text-text-main'}"
        >
          go
        </button>
      </div>
    </div>
  </div>
  <div class="h-px bg-border-subtle w-full !mt-0 !mb-2.5"></div>

  <!-- Command Box Container -->
  <div class="border border-border-subtle/50 dark:border-border-subtle rounded-2xl bg-[#0c0b14] dark:bg-[#07060b] shadow-[0_4px_24px_rgba(0,0,0,0.18)] p-3 sm:p-3.5 font-mono text-xs sm:text-[13px] tracking-wide relative">
    
    <!-- Top Row: Base Command & Flags on Left + Copy Button on Right -->
    <div class="flex items-start justify-between gap-2.5">
      <div class="flex items-start gap-2 min-w-0 flex-1 overflow-x-auto cmd-horizontal-scroll scroll-smooth py-0.5">
        <span class="text-brand-primary select-none font-extrabold text-sm shrink-0 leading-relaxed">$</span>
        <div class="space-y-1.5 font-mono text-xs sm:text-[12.5px] tracking-wide select-all text-slate-300 min-w-0 flex-1">
          <!-- Base Command Line -->
          <div class="whitespace-nowrap leading-relaxed">
            {@html highlightedBaseCmd}
            {#if !isExpanded && hasFlags}
              <span class="text-slate-500 font-mono text-[11px] ml-1.5 select-none bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                +{parsedCommand.flags.length} flags
              </span>
            {/if}
          </div>
          
          <!-- Multi-line formatted flags with internal scroll limit -->
          {#if isExpanded && hasFlags}
            <div class="flags-scroll space-y-1.5 pl-3 sm:pl-4 pt-1.5 border-t border-white/10 max-h-[120px] sm:max-h-[140px] overflow-y-auto overscroll-contain pr-1">
              {#each highlightedFlags as line}
                <div class="whitespace-nowrap leading-relaxed">{@html line}</div>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <!-- Copy Button inside the box -->
      <button
        type="button"
        onclick={copyCommand}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10.5px] font-mono font-bold uppercase tracking-wider cursor-pointer active:scale-95 shadow-md select-none shrink-0 transition-colors
          {isCopied
            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-emerald-500/10'
            : 'bg-white/10 hover:bg-white/15 border-white/15 text-slate-200 hover:text-white hover:border-white/25'}"
      >
        {#if isCopied}
          <img src="/koko-thumb-up.png" alt="Thumbs Up" class="w-3.5 h-3.5 object-contain animate-bounce" />
          <span class="text-emerald-400">{t.copiedBtn}</span>
        {:else}
          <Copy size={12} class="opacity-80" />
          <span>{t.copyBtn}</span>
        {/if}
      </button>
    </div>

    <!-- Collapsible Toggle Trigger (Only when there are flags to toggle) -->
    {#if hasFlags}
      <div class="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between">
        <button
          type="button"
          onclick={() => isExpanded = !isExpanded}
          class="flex items-center gap-1.5 text-[10.5px] font-mono text-slate-400 hover:text-brand-primary cursor-pointer transition-colors select-none"
        >
          {#if isExpanded}
            <ChevronUp size={13} class="text-brand-secondary" />
            <span>{t.collapseCmd}</span>
          {:else}
            <ChevronDown size={13} class="text-brand-primary" />
            <span>{t.expandCmd} ({parsedCommand.flags.length})</span>
          {/if}
        </button>
      </div>
    {/if}
  </div>

  <!-- CTA Button to download native binary from GitHub Releases -->
  <div class="flex justify-end pt-0.5">
    <a
      href="https://github.com/BlasVernazza06/koko-cli/releases"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 px-2.5 py-1 border border-brand-primary/20 bg-bg-base hover:bg-brand-primary/5 text-brand-primary rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-2xs hover:shadow-sm select-none"
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

  /* Sleek horizontal scrollbar for long command text */
  .cmd-horizontal-scroll::-webkit-scrollbar {
    height: 3px;
  }
  .cmd-horizontal-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .cmd-horizontal-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 9999px;
  }
  .cmd-horizontal-scroll::-webkit-scrollbar-thumb:hover {
    background: var(--brand-primary);
  }
  .cmd-horizontal-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
    overscroll-behavior-x: contain;
  }

  /* Sleek dark scrollbar for expanded flags */
  .flags-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .flags-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .flags-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
  }
  .flags-scroll::-webkit-scrollbar-thumb:hover {
    background: var(--brand-primary);
  }
  .flags-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    overscroll-behavior-y: contain;
  }
</style>
