<script lang="ts">
  import { Blocks, Folder } from '@lucide/svelte';
  import { fade, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import PreviewCommand from './PreviewCommand.svelte';
  import PreviewStructure from './PreviewStructure.svelte';
  import SelectedTechBadge from './SelectedTechBadge.svelte';

  type Translation = {
    summaryTitle: string;
    emptySummary: string;
    tabStack: string;
    tabStructure: string;
  };

  const translations: Record<'es' | 'en', Translation> = {
    es: {
      summaryTitle: 'STACK SELECCIONADO',
      emptySummary: 'No hay tecnologías seleccionadas.',
      tabStack: 'Mi Stack',
      tabStructure: 'Estructura'
    },
    en: {
      summaryTitle: 'SELECTED STACK',
      emptySummary: 'No technologies selected.',
      tabStack: 'My Stack',
      tabStructure: 'Structure'
    }
  };

  let {
    generatedCommand = '',
    structurePreview = [],
    selectedTechs = [],
    selectedPackageManager = $bindable('pnpm'),
    selectedCommandType = $bindable('npm'),
    onremove = () => {},
    lang = 'es'
  } = $props<{
    generatedCommand: string;
    structurePreview: Array<any>;
    selectedTechs: Array<{ layerKey: string; id: string; name: string; iconComponent: any }>;
    selectedPackageManager: string;
    selectedCommandType: string;
    onremove: (layerKey: string) => void;
    lang?: 'es' | 'en' | string;
  }>();

  let activeTab = $state<'stack' | 'structure'>('stack');

  const t = $derived(
    translations[(lang as 'es' | 'en')] ?? translations.es
  );
</script>   

<style>
  .tab-btn {
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .tab-btn.active {
    background: var(--brand-primary);
    color: white;
    box-shadow: 0 4px 15px -3px rgba(90, 79, 196, 0.25);
  }
</style>

<div class="relative z-10 w-full space-y-6 font-sans">
  <!-- Command Display Box -->
  <PreviewCommand {generatedCommand} bind:selectedPackageManager={selectedPackageManager} bind:selectedCommandType={selectedCommandType} {lang} />

  <div class="space-y-4">
    <!-- Tab Buttons Switcher with exact VisualControls bg-bg-base styling -->
    <div class="minimal-switcher flex items-center gap-1.5 p-1.5 rounded-2xl w-full select-none border border-border-subtle bg-bg-base shadow-md">
      <button
        type="button"
        onclick={() => activeTab = 'stack'}
        class="tab-btn flex-1 flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97]
          {activeTab === 'stack'
            ? 'active'
            : 'text-text-muted hover:text-text-main hover:bg-bg-surface/50'}"
      >
        <Blocks size={14} class={activeTab === 'stack' ? 'opacity-100' : 'opacity-70'} />
        <span>{t.tabStack}</span>
      </button>
      <button
        type="button"
        onclick={() => activeTab = 'structure'}
        class="tab-btn flex-1 flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97]
          {activeTab === 'structure'
            ? 'active'
            : 'text-text-muted hover:text-text-main hover:bg-bg-surface/50'}"
      >
        <Folder size={14} class={activeTab === 'structure' ? 'opacity-100' : 'opacity-70'} />
        <span>{t.tabStructure}</span>
      </button>
    </div>

    <!-- Tab Content Container -->
    <div class="grid grid-cols-1 grid-rows-1 items-start">
      {#if activeTab === 'stack'}
        <div transition:fade={{ duration: 150 }} class="col-start-1 row-start-1 rounded-2xl border border-border-subtle/60 bg-bg-base p-6 shadow-xl w-full">
          <div class="flex items-center gap-2.5 mb-5 pb-3 border-b border-border-subtle/40 select-none">
            <Blocks size={16} class="text-brand-primary" aria-hidden="true" />
            <span class="text-xs font-bold uppercase tracking-widest text-text-muted">
              {t.summaryTitle}
            </span>
          </div>

          {#if selectedTechs.length > 0}
            <div class="flex flex-wrap gap-2.5">
              {#each selectedTechs as tech (tech.layerKey)}
                <div
                  in:scale={{ duration: 250, start: 0.8 }}
                  out:scale={{ duration: 150, start: 0.8 }}
                  animate:flip={{ duration: 200 }}
                  class="inline-block"
                >
                  <SelectedTechBadge
                    name={tech.name}
                    iconComponent={tech.iconComponent}
                    onremove={() => onremove(tech.layerKey)}
                  />
                </div>
              {/each}
            </div>
          {:else}
            <div class="py-4 text-center">
              <span class="text-xs text-text-muted leading-relaxed font-medium">{t.emptySummary}</span>
            </div>
          {/if}
        </div>
      {:else}
        <div transition:fade={{ duration: 150 }} class="col-start-1 row-start-1 rounded-2xl border border-border-subtle/60 bg-bg-base p-2 shadow-xl w-full">
          <PreviewStructure {structurePreview} {lang} />
        </div>
      {/if}
    </div>
  </div>
</div>
