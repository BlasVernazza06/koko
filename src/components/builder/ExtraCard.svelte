<script lang="ts">
  let {
    title = '',
    description = '',
    iconComponent = null,
    lucideIcon = '',
    isActive = false,
    onclick = () => {}
  } = $props<{
    title: string;
    description: string;
    iconComponent?: any;
    lucideIcon?: string;
    isActive?: boolean;
    onclick: () => void;
  }>();
</script>

<style>
  .editorial-extra {
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .editorial-extra:hover {
    transform: translateY(-2px);
    border-color: var(--brand-primary);
  }
  .icon-holder {
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .editorial-extra:hover .icon-holder {
    transform: scale(1.05);
  }
</style>

<button
  type="button"
  onclick={onclick}
  aria-pressed={isActive}
  class="editorial-extra group/btn flex items-center justify-between p-5 rounded-xl border border-border-subtle transition-all duration-300 text-left cursor-pointer active:scale-[0.99] w-full select-none
    {isActive 
      ? 'bg-bg-base  border-brand-primary shadow-xs font-semibold' 
      : 'bg-bg-base hover:border-brand-primary/40 hover:shadow-xs text-text-main'}"
>
  <div class="flex items-center gap-4">
    <div class="icon-holder w-8 h-8 flex items-center justify-center rounded-lg bg-bg-base border border-border-subtle p-1.5 shrink-0 shadow-2xs">
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
    
    <div class="flex flex-col gap-0.5">
      <span class="text-sm font-bold text-text-main tracking-tight">{title}</span>
      <span class="text-xs text-text-muted leading-relaxed font-medium">{description}</span>
    </div>
  </div>
  
  <!-- Sleek Switch slider -->
  <div class="w-10 h-6 flex items-center rounded-full p-1 transition-all duration-300 shrink-0 relative {isActive ? 'bg-brand-primary' : 'bg-border-subtle'}">
    <span class="w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 transform {isActive ? 'translate-x-4' : 'translate-x-0'}"></span>
  </div>
</button>



