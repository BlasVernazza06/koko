<script lang="ts">
  import { Check } from '@lucide/svelte';

  let {
    name = '',
    desc = '',
    iconComponent = null,
    isActive = false,
    isDisabled = false,
    disabledReason = '',
    hoverColor = 'group-hover/btn:text-brand-secondary',
    activeColor = 'text-brand-secondary',
    layerKey = '',
    onClick = () => {}
  } = $props<{
    name: string;
    desc: string;
    iconComponent?: any;
    isActive?: boolean;
    isDisabled?: boolean;
    disabledReason?: string;
    hoverColor?: string;
    activeColor?: string;
    layerKey: string;
    onClick: () => void;
  }>();
</script>

<button
  type="button"
  onclick={onClick}
  disabled={isDisabled && !isActive}
  aria-pressed={isActive}
  class="relative group/btn flex flex-col items-start gap-2.5 p-5 rounded-2xl border transition-all text-left cursor-pointer active:scale-[0.98] w-full
    {isDisabled 
      ? 'bg-rose-500/10 dark:bg-rose-4500/20 border-rose-300/40 text-rose-300/50 cursor-not-allowed' 
      : isActive 
        ? layerKey === 'backend' || layerKey === 'auth' || layerKey === 'payment'
          ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-sm font-bold'
          : 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary shadow-sm font-bold' 
        : 'bg-bg-base border-border-subtle hover:border-brand-secondary/30 text-text-main'}"
>
  {#if isActive}
    <div 
      class="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-white shadow-xs
        {layerKey === 'backend' || layerKey === 'auth' || layerKey === 'payment' ? 'bg-brand-primary' : 'bg-brand-secondary'}"
    >
      <Check size={11} strokeWidth={3.5} />
    </div>
  {/if}
  
  <div class="flex items-center gap-2.5">
    {#if iconComponent}
      <div class="w-6 h-6 flex items-center justify-center {isDisabled ? 'text-rose-400/60' : ''}">
        <!-- Render custom or svgl component passing isActive state -->
        <svelte:component this={iconComponent} {isActive} width="24" height="24" />
      </div>
    {/if}
    <span class="text-sm font-bold {isDisabled ? 'text-text-muted' : ''}">{name}</span>
  </div>
  
  <span class="text-[10px] sm:text-xs text-text-muted leading-relaxed">
    {desc}
  </span>
  {#if isDisabled}
    <span class="text-[10px] sm:text-xs text-red-400 font-medium leading-relaxed">
      {disabledReason}
    </span>
  {/if}
</button>
