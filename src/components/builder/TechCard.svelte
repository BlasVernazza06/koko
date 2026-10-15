<script lang="ts">
  import { Check } from '@lucide/svelte';

  let {
    name = '',
    desc = '',
    iconComponent = null,
    default: isDefault = false,
    isActive = false,
    isDisabled = false,
    disabledReason = '',
    layerKey = '',
    hoverColor = '',
    activeColor = '',
    onclick = () => {}
  } = $props<{
    name: string;
    desc: string;
    iconComponent?: any;
    default?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    disabledReason?: string;
    layerKey: string;
    hoverColor?: string;
    activeColor?: string;
    onclick: () => void;
  }>();
</script>

<style>
  .editorial-card {
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .editorial-card:hover:not(.disabled):not(.is-active) {
    transform: translateY(-2px);
    border-color: rgba(90, 79, 196, 0.45);
    box-shadow: 0 4px 20px -4px rgba(90, 79, 196, 0.12);
  }
  .icon-wrapper {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .editorial-card:hover:not(.disabled) .icon-wrapper {
    transform: scale(1.08);
  }
</style>

<button
  type="button"
  onclick={onclick}
  disabled={isDisabled && !isActive}
  aria-pressed={isActive}
  class="editorial-card relative group/btn flex flex-col items-start justify-between gap-3 p-4.5 sm:p-5 rounded-2xl border text-left w-full select-none
    {isDisabled 
      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300/80 dark:border-rose-800/60 text-text-muted cursor-not-allowed opacity-75' 
      : isActive 
        ? 'is-active bg-gradient-to-b from-brand-primary/[0.08] to-brand-primary/[0.02] border-brand-primary text-text-main shadow-[0_0_24px_-6px_rgba(90,79,196,0.25)] ring-1 ring-brand-primary/40 font-semibold cursor-pointer active:scale-[0.98]' 
        : 'bg-bg-base/80 hover:bg-bg-base border-border-subtle/80 hover:border-brand-primary/40 text-text-main cursor-pointer active:scale-[0.98]'}"
  class:disabled={isDisabled}
>
  <div class="flex items-start justify-between w-full gap-2.5">
    <div class="flex items-center gap-3 min-w-0 flex-1">
      {#if iconComponent}
        <div class="icon-wrapper w-9 h-9 flex items-center justify-center rounded-xl bg-bg-surface/60 border border-border-subtle p-1.5 shrink-0 shadow-2xs group-hover/btn:border-brand-primary/30 transition-colors">
          {#if typeof iconComponent === 'string'}
            <img src={iconComponent} class="w-full h-full object-contain" alt="" />
          {:else}
            {@const Icon = iconComponent}
            <Icon {isActive} width="100%" height="100%" />
          {/if}
        </div>
      {/if}
      <span class="text-sm font-bold tracking-tight text-text-main break-words leading-snug">{name}</span>
    </div>

    <div class="shrink-0 flex items-center pt-0.5">
      {#if isActive}
        <div class="w-5 h-5 rounded-full flex items-center justify-center text-white bg-brand-primary shadow-sm shadow-brand-primary/40 transition-transform duration-200 scale-100 ring-2 ring-brand-primary/20">
          <Check size={11} strokeWidth={3.5} />
        </div>
      {:else if isDefault}
        <div class="px-2 py-0.5 rounded-md border border-border-subtle bg-bg-surface/50 text-text-muted text-[8px] font-extrabold tracking-widest uppercase select-none">
          <span>Default</span>
        </div>
      {/if}
    </div>
  </div>
  
  <span class="text-xs text-text-muted leading-relaxed font-medium line-clamp-2">
    {desc}
  </span>
  
  {#if isDisabled}
    <div class="flex items-start gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 font-medium leading-tight mt-1 border border-rose-300/60 dark:border-rose-800/60 bg-rose-100/60 dark:bg-rose-900/30 px-2.5 py-1.5 rounded-lg w-full">
      <span class="shrink-0 text-xs">⚠️</span>
      <span class="line-clamp-2">{disabledReason}</span>
    </div>
  {/if}
</button>



