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
  class="editorial-card relative group/btn flex flex-col items-start gap-3 p-5 rounded-xl border text-left cursor-pointer active:scale-[0.98] w-full select-none
    {isDisabled 
      ? 'bg-bg-surface/10 border-border-subtle/40 text-text-muted/40 opacity-40 cursor-not-allowed' 
      : isActive 
        ? 'bg-brand-primary/[0.04] border-brand-primary text-text-main shadow-xs font-semibold' 
        : 'bg-bg-surface/40 border-border-subtle hover:bg-bg-surface hover:shadow-xs text-text-main'}
    disabled"
  class:disabled={isDisabled}
>
  {#if isActive}
    <!-- Fine Minimalist Checkmark Badge -->
    <div 
      class="absolute top-3.5 right-3.5 w-5 h-5 rounded-full flex items-center justify-center text-white bg-brand-primary shadow-xs transition-transform duration-300 scale-100"
    >
      <Check size={10} strokeWidth={4} />
    </div>
  {:else if isDefault}
    <!-- Elegant outline default badge -->
    <div 
      class="absolute top-3.5 right-3.5 px-2 py-0.5 rounded border border-border-subtle text-text-muted text-[8px] font-extrabold tracking-widest uppercase select-none"
    >
      <span>Default</span>
    </div>
  {/if}
  
  <div class="flex items-center gap-3">
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
    <span class="text-sm font-bold tracking-tight text-text-main">{name}</span>
  </div>
  
  <span class="text-xs text-text-muted leading-relaxed font-medium mt-0.5">
    {desc}
  </span>
  
  {#if isDisabled}
    <div class="flex items-center gap-1.5 text-[10px] text-rose-500 font-bold leading-normal mt-2 border border-rose-500/10 bg-rose-500/5 px-2 py-0.5 rounded">
      <span>⚠️ {disabledReason}</span>
    </div>
  {/if}
</button>



