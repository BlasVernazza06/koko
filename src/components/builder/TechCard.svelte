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
    hoverColor = 'group-hover/btn:text-brand-secondary',
    activeColor = 'text-brand-secondary',
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
    hoverColor?: string;
    activeColor?: string;
    layerKey: string;
    onclick: () => void;
  }>();
</script>

<button
  type="button"
  onclick={onclick}
  disabled={isDisabled && !isActive}
  aria-pressed={isActive}
  class="relative group/btn flex flex-col items-start gap-2.5 p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer active:scale-[0.98] w-full
    {isDisabled 
      ? 'bg-rose-500/5 dark:bg-rose-950/10 border-rose-500/10 text-text-muted/60 opacity-60 cursor-not-allowed' 
      : isActive 
        ? layerKey === 'backend' || layerKey === 'auth' || layerKey === 'payments' || layerKey === 'db'
          ? 'bg-brand-primary/8 border-brand-primary text-text-main shadow-[0_0_20px_-3px_rgba(90,79,196,0.15)] dark:shadow-[0_0_20px_-3px_rgba(155,141,247,0.25)] font-bold'
          : 'bg-brand-secondary/8 border-brand-secondary text-text-main shadow-[0_0_20px_-3px_rgba(128,149,248,0.15)] dark:shadow-[0_0_20px_-3px_rgba(128,149,248,0.25)] font-bold' 
        : 'bg-bg-base border-border-subtle hover:border-brand-primary/40 hover:shadow-[0_8px_25px_rgba(90,79,196,0.04)] text-text-main'}"
>
  {#if isActive}
    <div 
      class="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-white shadow-xs
        {layerKey === 'backend' || layerKey === 'auth' || layerKey === 'payments' ? 'bg-brand-primary' : 'bg-brand-secondary'}"
    >
      <Check size={11} strokeWidth={3.5} />
    </div>
    {:else if isDefault}
    <div 
      class="absolute top-2.5 right-3 px-1.5 py-0.5 rounded-md flex items-center justify-center bg-brand-secondary/10 text-brand-secondary text-[10px] font-bold tracking-wide shadow-xs border border-brand-secondary/20"
    >
      <span>Default</span>
    </div>
  {/if}
  
  <div class="flex items-center gap-2.5">
    {#if iconComponent}
      <div class="w-6 h-6 flex items-center justify-center transition-transform duration-350 group-hover/btn:scale-110 {isDisabled ? 'text-rose-400/60' : ''}">
        {#if typeof iconComponent === 'string'}
          <img src={iconComponent} class="w-6 h-6 object-contain {isActive ? '' : 'opacity-80'}" alt="" />
        {:else}
          {@const Icon = iconComponent}
          <Icon {isActive} width="24" height="24" />
        {/if}
      </div>
    {/if}
    <span class="text-sm font-bold {isDisabled ? 'text-text-muted/80' : ''}">{name}</span>
  </div>
  
  <span class="text-[10px] sm:text-xs text-text-muted leading-relaxed font-medium">
    {desc}
  </span>
  {#if isDisabled}
    <span class="text-[10px] sm:text-xs text-rose-500 font-semibold leading-relaxed mt-1 block">
      ⚠️ {disabledReason}
    </span>
  {/if}
</button>
