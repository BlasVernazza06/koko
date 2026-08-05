<script lang="ts">
  import { ArrowRight } from '@lucide/svelte';
import type { KokoTemplate, KokoTemplateConfig } from './templates';

  let {
    templates,
    lang = 'es',
    onapply
  } = $props<{
    templates: KokoTemplate[];
    lang: string;
    onapply: (config: KokoTemplateConfig) => void;
  }>();

  // Keep translations inline (standby on translations.ts)
  const t = $derived({
    es: {
      templatesLabel: 'Estructuras Pre-Hechas (Recetas)',
      templatesSubtitle: 'Selecciona una configuración inicial recomendada para acelerar el desarrollo.',
      useRecipe: 'Usar Receta'
    },
    en: {
      templatesLabel: 'Pre-made Templates (Recipes)',
      templatesSubtitle: 'Select a recommended bootstrap configuration to accelerate setup.',
      useRecipe: 'Use Recipe'
    }
  }[lang] || {
    templatesLabel: 'Estructuras Pre-Hechas (Recetas)',
    templatesSubtitle: 'Selecciona una configuración inicial recomendada para acelerar el desarrollo.',
    useRecipe: 'Usar Receta'
  });
</script>

<div class="space-y-6">
  <div class="border-l-2 border-brand-primary pl-2.5 mb-6">
    <span class="block text-sm font-bold uppercase tracking-widest text-text-main select-none">{t.templatesLabel}</span>
    <span class="block text-xs text-text-muted mt-1 select-none">{t.templatesSubtitle}</span>
  </div>
  
  <div class="grid grid-cols-1 gap-5">
    {#each templates as template}
      <button
        type="button"
        onclick={() => {
          onapply(template.config);
        }}
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-border-subtle bg-bg-surface/50 text-left hover:border-brand-primary/50 hover:bg-bg-surface transition-all active:scale-[0.99] cursor-pointer w-full group"
      >
        <div class="flex items-start gap-4 max-w-2xl">
          {#if template.icon}
            <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-base border border-border-subtle/50 shrink-0 mt-1">
              {#if typeof template.icon === 'string'}
                <img src={template.icon} class="w-6 h-6 object-contain" alt="" />
              {:else}
                {@const Icon = template.icon}
                <Icon width="24" height="24" />
              {/if}
            </div>
          {/if}
          <div class="space-y-1.5">
            <span class="block text-base font-bold text-brand-primary group-hover:text-brand-secondary transition-colors font-sans">
              {lang === 'es' ? template.nameEs : template.nameEn}
            </span>
            <span class="block text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
              {lang === 'es' ? template.descEs : template.descEn}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-1 shrink-0 px-4 py-2 bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white rounded-xl text-xs font-bold transition-all select-none">
          {t.useRecipe} 
          <ArrowRight size={13} className="group-hover:-translate-x-2"/>
        </div>
      </button>
    {/each}
  </div>
</div>
