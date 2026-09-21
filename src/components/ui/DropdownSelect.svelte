<script lang="ts">
  import { ChevronDown, Check } from '@lucide/svelte';

  export interface SelectOption {
    value: string;
    label?: string;
    icon?: any;
    badge?: string;
    disabled?: boolean;
  }

  interface Props {
    value?: string;
    options: (string | SelectOption)[];
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    class?: string;
    size?: 'sm' | 'md' | 'lg';
  }

  let {
    value = $bindable(''),
    options = [],
    label,
    placeholder = 'Seleccionar...',
    disabled = false,
    class: className = '',
    size = 'sm'
  }: Props = $props();

  let isOpen = $state(false);
  let highlightedIndex = $state(-1);
  let containerRef: HTMLDivElement | null = $state(null);

  // Normalize options to SelectOption[]
  const normalizedOptions = $derived<SelectOption[]>(
    options.map((opt: string | SelectOption) => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return {
        ...opt,
        label: opt.label || opt.value
      };
    })
  );

  const selectedOption = $derived<SelectOption | undefined>(
    normalizedOptions.find((opt) => opt.value === value)
  );

  const selectedLabel = $derived<string>(
    selectedOption?.label || value || placeholder
  );

  function toggleOpen() {
    if (disabled) return;
    isOpen = !isOpen;
    if (isOpen) {
      const idx = normalizedOptions.findIndex((opt) => opt.value === value);
      highlightedIndex = idx >= 0 ? idx : 0;
    }
  }

  function closeMenu() {
    isOpen = false;
    highlightedIndex = -1;
  }

  function selectOption(opt: SelectOption) {
    if (opt.disabled) return;
    value = opt.value;
    closeMenu();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (disabled) return;

    const opts = normalizedOptions;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleOpen();
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
      case 'Tab':
        e.preventDefault();
        closeMenu();
        break;

      case 'ArrowDown':
        e.preventDefault();
        highlightedIndex = (highlightedIndex + 1) % opts.length;
        break;

      case 'ArrowUp':
        e.preventDefault();
        highlightedIndex = (highlightedIndex - 1 + opts.length) % opts.length;
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < opts.length) {
          selectOption(opts[highlightedIndex]);
        }
        break;
    }
  }

  $effect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: PointerEvent) {
      if (containerRef && !containerRef.contains(event.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  });
</script>

<div 
  bind:this={containerRef}
  class="relative w-full text-left {className}"
  role="presentation"
>
  {#if label}
    <span class="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1.5 select-none">
      {label}
    </span>
  {/if}

  <!-- Trigger Button -->
  <button
    type="button"
    onclick={toggleOpen}
    onkeydown={handleKeyDown}
    disabled={disabled}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    class="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-border-subtle bg-bg-base/80 dark:bg-bg-surface/70 hover:bg-bg-surface/90 hover:border-brand-primary/40 focus:border-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 transition-all duration-200 text-xs font-semibold text-text-main disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs select-none group"
    class:border-brand-primary={isOpen}
    class:ring-2={isOpen}
    class:ring-brand-primary={isOpen}
    class:ring-opacity-30={isOpen}
  >
    <span class="truncate text-left flex items-center gap-2">
      {selectedLabel}
    </span>

    <ChevronDown 
      size={14} 
      class="text-text-muted transition-transform duration-200 shrink-0 group-hover:text-text-main {isOpen ? 'rotate-180 text-brand-primary' : ''}" 
    />
  </button>

  <!-- Floating Dropdown Menu -->
  {#if isOpen}
    <div
      role="listbox"
      tabindex="-1"
      class="dropdown-popover absolute left-0 right-0 top-[calc(100%+6px)] z-50 p-1 rounded-xl border border-border-subtle bg-bg-surface/95 dark:bg-[#14131e]/98 backdrop-blur-xl shadow-xl shadow-black/20 dark:shadow-black/60 max-h-56 overflow-y-auto outline-none"
    >
      {#each normalizedOptions as opt, idx}
        {@const isSelected = opt.value === value}
        {@const isHighlighted = idx === highlightedIndex}
        <button
          type="button"
          role="option"
          aria-selected={isSelected}
          disabled={opt.disabled}
          onclick={() => selectOption(opt)}
          onmouseenter={() => (highlightedIndex = idx)}
          class="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 text-left cursor-pointer select-none {opt.disabled ? 'opacity-40 cursor-not-allowed' : ''} {isSelected ? 'bg-brand-primary/10 text-brand-primary font-semibold dark:bg-brand-primary/15' : isHighlighted ? 'bg-bg-base/80 text-text-main dark:bg-white/5' : 'text-text-muted hover:text-text-main'}"
        >
          <div class="flex items-center gap-2 truncate">
            <span class="truncate">{opt.label}</span>
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            {#if opt.badge}
              <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                {opt.badge}
              </span>
            {/if}
            {#if isSelected}
              <Check size={13} class="text-brand-primary animate-in fade-in zoom-in-75 duration-150" />
            {/if}
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  @keyframes dropdownEnter {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .dropdown-popover {
    animation: dropdownEnter 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
</style>
