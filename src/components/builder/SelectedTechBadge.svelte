<script lang="ts">
  import { X } from '@lucide/svelte';

  let {
    name = '',
    iconComponent = null,
    onremove = () => {}
  } = $props<{
    name: string;
    iconComponent?: any;
    onremove?: () => void;
  }>();
</script>

<div class="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl border border-border-subtle bg-bg-surface/30 backdrop-blur-xs text-xs font-semibold text-text-main shadow-xs select-none transition-all duration-200 hover:border-brand-secondary/35">
  {#if iconComponent}
    <div class="w-4.5 h-4.5 flex items-center justify-center shrink-0">
      {#if typeof iconComponent === 'string'}
        <img src={iconComponent} class="w-4 h-4 object-contain" alt="" />
      {:else}
        {@const Icon = iconComponent}
        <Icon isActive={true} width="16" height="16" />
      {/if}
    </div>
  {/if}
  <span class="text-[11px] sm:text-xs tracking-wide">{name}</span>
  
  <button
    type="button"
    onclick={onremove}
    class="ml-1 p-0.5 rounded-md hover:bg-rose-500/10 text-text-muted hover:text-rose-400 transition-colors cursor-pointer active:scale-90"
    aria-label="Remove {name}"
  >
    <X size={10} strokeWidth={2.5} />
  </button>
</div>
