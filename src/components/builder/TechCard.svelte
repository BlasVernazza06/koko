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
    onclick: () => void;
  }>();
</script>

<style>
  .editorial-card {
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .editorial-card:hover:not(.disabled) {
    transform: translateY(-2px);
    border-color: var(--brand-primary);
  }
  .icon-wrapper {
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .editorial-card:hover:not(.disabled) .icon-wrapper {
    transform: scale(1.05);
  }
</style>

<button
  type="button"
  onclick={onclick}
  disabled={isDisabled && !isActive}
  aria-pressed={isActive}
  class="editorial-card relative group/btn flex flex-col items-start gap-2.5 p-5 rounded-xl border text-left w-full select-none
    {isDisabled 
      ? 'bg-rose-50/70 dark:bg-rose-950/25 border-rose-300 dark:border-rose-800/80 text-text-muted cursor-not-allowed' 
      : isActive 
        ? 'bg-brand-primary/[0.04] border-brand-primary text-text-main shadow-xs font-semibold cursor-pointer active:scale-[0.98]' 
        : 'bg-bg-base border-border-subtle hover:border-brand-primary/40 hover:shadow-xs text-text-main cursor-pointer active:scale-[0.98]'}"
  class:disabled={isDisabled}
>
  <div class="flex items-start justify-between w-full gap-2">
    <div class="flex items-center gap-2.5 min-w-0 flex-1">
      {#if iconComponent}
        <div class="icon-wrapper w-8 h-8 flex items-center justify-center rounded-lg bg-bg-base border border-border-subtle p-1.5 shrink-0 shadow-2xs">
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
        <div class="w-5 h-5 rounded-full flex items-center justify-center text-white bg-brand-primary shadow-xs transition-transform duration-300 scale-100">
          <Check size={10} strokeWidth={4} />
        </div>
      {:else if isDefault}
        <div class="px-2 py-0.5 rounded border border-border-subtle bg-bg-surface/50 text-text-muted text-[8px] font-extrabold tracking-widest uppercase select-none">
          <span>Default</span>
        </div>
      {/if}
    </div>
  </div>
  
  <span class="text-xs text-text-muted leading-relaxed font-medium mt-0.5">
    {desc}
  </span>
  
  {#if isDisabled}
    <div class="flex items-start gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 font-medium leading-tight mt-2 border border-rose-300/60 dark:border-rose-800/60 bg-rose-100/70 dark:bg-rose-900/30 px-2.5 py-1.5 rounded-lg w-full">
      <span class="shrink-0">⚠️</span>
      <span>{disabledReason}</span>
    </div>
  {/if}
</button>



