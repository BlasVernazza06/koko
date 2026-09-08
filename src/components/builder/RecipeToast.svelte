<script lang="ts">
  import { Check, X, Sparkles } from '@lucide/svelte';
  import { onMount } from 'svelte';

  let {
    visible = false,
    recipeName = '',
    recipeDesc = '',
    recipeIcon = '',
    lang = 'es',
    onclose = () => {}
  } = $props<{
    visible: boolean;
    recipeName: string;
    recipeDesc: string;
    recipeIcon?: any;
    lang?: string;
    onclose?: () => void;
  }>();

  let timer: any = null;

  $effect(() => {
    if (visible) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onclose();
      }, 4000);
    }
    return () => clearTimeout(timer);
  });
</script>

<style>
  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.96);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes progressBar {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

  .toast-card {
    animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .progress-line {
    animation: progressBar 4s linear forwards;
  }
</style>

{#if visible}
  <div class="fixed bottom-6 right-6 z-50 pointer-events-auto max-w-[90vw] sm:max-w-[420px] font-sans">
    <div
      class="toast-card relative overflow-hidden flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border border-brand-primary/30 bg-bg-surface/95 dark:bg-[#0d1017]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-l-4 border-l-brand-primary"
      role="alert"
    >
      <!-- Icon Container -->
      <div class="w-11 h-11 rounded-xl bg-bg-base border border-border-subtle flex items-center justify-center shrink-0 p-2 shadow-inner">
        {#if recipeIcon}
          {#if typeof recipeIcon === 'string'}
            <img src={recipeIcon} class="w-full h-full object-contain" alt="" />
          {:else}
            {@const Icon = recipeIcon}
            <Icon class="w-full h-full text-brand-primary" />
          {/if}
        {:else}
          <Sparkles class="w-5 h-5 text-brand-primary" />
        {/if}
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0 pr-2">
        <div class="flex items-center gap-2">
          <span class="text-xs font-extrabold uppercase tracking-wider text-text-main">
            {lang === 'es' ? 'Receta Aplicada' : 'Recipe Applied'}
          </span>
          <span class="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20 uppercase tracking-wider">
            <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {lang === 'es' ? 'Activa' : 'Active'}
          </span>
        </div>

        <p class="text-xs sm:text-[13px] font-extrabold text-brand-primary mt-1 truncate">
          {recipeName}
        </p>

        <p class="text-[11px] text-text-muted mt-0.5 line-clamp-1 font-medium leading-relaxed">
          {recipeDesc}
        </p>
      </div>

      <!-- Close Button -->
      <button
        type="button"
        onclick={onclose}
        class="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-bg-base transition-colors shrink-0 cursor-pointer"
        aria-label="Cerrar notificación"
      >
        <X size={14} />
      </button>

      <!-- Auto-dismiss Progress Bar -->
      <div class="progress-line absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-brand-primary via-brand-secondary to-emerald-400"></div>
    </div>
  </div>
{/if}
