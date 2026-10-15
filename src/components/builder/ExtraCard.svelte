<script lang="ts">
  let {
    title = '',
    description = '',
    iconComponent = null,
    lucideIcon = '',
    isActive = false,
    isLocked = false,
    onclick = () => {}
  } = $props<{
    title: string;
    description: string;
    iconComponent?: any;
    lucideIcon?: string;
    isActive?: boolean;
    isLocked?: boolean;
    onclick: () => void;
  }>();
</script>

<style>
  .editorial-extra {
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .editorial-extra:hover:not(.locked) {
    transform: translateY(-2px);
    border-color: rgba(90, 79, 196, 0.45);
    box-shadow: 0 4px 20px -4px rgba(90, 79, 196, 0.12);
  }
  .icon-holder {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .editorial-extra:hover:not(.locked) .icon-holder {
    transform: scale(1.08);
  }
</style>

<button
  type="button"
  onclick={isLocked ? undefined : onclick}
  disabled={isLocked}
  aria-pressed={isLocked ? true : isActive}
  class="editorial-extra group/btn flex items-center justify-between p-4.5 sm:p-5 rounded-2xl border text-left w-full select-none
    {isLocked
      ? 'bg-bg-base/90 border-brand-primary/40 shadow-xs font-semibold cursor-default locked'
      : isActive 
        ? 'bg-gradient-to-b from-brand-primary/[0.08] to-brand-primary/[0.02] border-brand-primary shadow-[0_0_24px_-6px_rgba(90,79,196,0.25)] ring-1 ring-brand-primary/40 font-semibold cursor-pointer active:scale-[0.99]' 
        : 'bg-bg-base/80 hover:bg-bg-base border-border-subtle/80 hover:border-brand-primary/40 text-text-main cursor-pointer active:scale-[0.99]'}"
>
  <div class="flex items-center gap-3.5 min-w-0 flex-1 pr-3">
    <div class="icon-holder w-9 h-9 flex items-center justify-center rounded-xl bg-bg-surface/60 border border-border-subtle p-1.5 shrink-0 shadow-2xs group-hover/btn:border-brand-primary/30 transition-colors">
      {#if iconComponent}
        {#if typeof iconComponent === 'string'}
          <img src={iconComponent} class="w-full h-full object-contain transition-opacity duration-300 {isActive ? 'opacity-100' : 'opacity-80'}" alt="" />
        {:else}
          {@const Icon = iconComponent}
          <Icon width="100%" height="100%" />
        {/if}
      {:else if lucideIcon === 'ci'}
        <svg viewBox="0 0 24 24" class="w-full h-full {isActive ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a10 10 0 0 0-7.3 16.8" class="opacity-20"/>
          <path d="M12 8v4l2.5 2.5" stroke-linecap="round"/>
        </svg>
      {:else if lucideIcon === 'linter'}
        <svg viewBox="0 0 24 24" class="w-full h-full {isActive ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8" stroke-linecap="round"/>
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" class="w-full h-full {isActive ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      {/if}
    </div>
    
    <div class="flex flex-col gap-0.5 min-w-0">
      <span class="text-sm font-bold text-text-main tracking-tight truncate">{title}</span>
      <span class="text-xs text-text-muted leading-relaxed font-medium line-clamp-1">{description}</span>
    </div>
  </div>
  
  <div class="flex items-center gap-2.5 shrink-0">
    {#if isLocked}
      <span class="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
        Default
      </span>
    {/if}
    <!-- Sleek Switch slider -->
    <div class="w-10 h-5.5 flex items-center rounded-full p-0.5 shrink-0 transition-colors duration-200 {isLocked || isActive ? 'bg-brand-primary shadow-sm shadow-brand-primary/30' : 'bg-border-subtle/80'}">
      <span class="w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform duration-200 transform {isLocked || isActive ? 'translate-x-4.5' : 'translate-x-0.5'}"></span>
    </div>
  </div>
</button>



