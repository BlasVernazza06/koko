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

<button
  type="button"
  onclick={onclick}
  aria-pressed={isActive}
  class="group/btn flex items-center justify-between p-5 bg-bg-base border border-border-subtle rounded-2xl cursor-pointer text-left hover:border-brand-primary/20 transition-all duration-200 w-full"
>
  <div class="flex items-center gap-3.5">
    <div class="w-7 h-7 flex items-center justify-center shrink-0">
      {#if iconComponent}
        {#if typeof iconComponent === 'string'}
          <img src={iconComponent} class="w-7 h-7 object-contain {isActive ? '' : 'opacity-80'}" alt="" />
        {:else}
          {@const Icon = iconComponent}
          <Icon width="28" height="28" />
        {/if}
      {:else if lucideIcon === 'ci'}
        <svg viewBox="0 0 24 24" class="w-7 h-7 {isActive ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a10 10 0 0 0-7.3 16.8" class="opacity-20"/>
          <path d="M12 8v4l2.5 2.5" stroke-linecap="round"/>
        </svg>
      {:else if lucideIcon === 'linter'}
        <svg viewBox="0 0 24 24" class="w-7 h-7 {isActive ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8" stroke-linecap="round"/>
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" class="w-7 h-7 {isActive ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      {/if}
    </div>
    
    <div class="flex flex-col gap-1">
      <span class="text-sm font-bold text-text-main">{title}</span>
      <span class="text-[10px] sm:text-xs text-text-muted leading-relaxed">{description}</span>
    </div>
  </div>
  
  <div class="w-10 h-6 flex items-center rounded-full p-0.5 transition-all duration-300 shrink-0 {isActive ? 'bg-brand-primary justify-end' : 'bg-border-subtle justify-start'}">
    <span class="w-4.5 h-4.5 rounded-full bg-white shadow-md"></span>
  </div>
</button>
