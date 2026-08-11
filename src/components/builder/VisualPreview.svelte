<script lang="ts">
  import { Blocks, Folder } from '@lucide/svelte';
  import { fade, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import PreviewCommand from './PreviewCommand.svelte';
  import PreviewStructure from './PreviewStructure.svelte';
  import SelectedTechBadge from './SelectedTechBadge.svelte';

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
    lang: string;
  }>();

  let activeTab = $state<'stack' | 'structure'>('stack');

  const t = $derived({
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
  }[lang] || {
    summaryTitle: 'STACK SELECCIONADO',
    emptySummary: 'No hay tecnologías seleccionadas.',
    tabStack: 'Mi Stack',
    tabStructure: 'Estructura'
  });
</script>

<div class="space-y-6">
  <!-- Command Display Box -->
  <PreviewCommand {generatedCommand} bind:selectedPackageManager={selectedPackageManager} bind:selectedCommandType={selectedCommandType} {lang} />

  <!-- Tab Buttons -->
  <div class="flex items-center gap-1 p-1 bg-bg-surface border border-border-subtle rounded-xl select-none w-full">
    <button
      type="button"
      onclick={() => activeTab = 'stack'}
      class="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-200 cursor-pointer active:scale-95
        {activeTab === 'stack'
          ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-xs'
          : 'bg-transparent border-transparent text-text-muted hover:text-text-main hover:bg-bg-base'}"
    >
      <Blocks size={14} />
      <span>{t.tabStack}</span>
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'structure'}
      class="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-200 cursor-pointer active:scale-95
        {activeTab === 'structure'
          ? 'bg-brand-secondary/10 border-brand-secondary/20 text-brand-secondary shadow-xs'
          : 'bg-transparent border-transparent text-text-muted hover:text-text-main hover:bg-bg-base'}"
    >
      <Folder size={14} />
      <span>{t.tabStructure}</span>
    </button>
  </div>

  <!-- Tab Content Container with Grid Overlay to prevent layout height jumps during transitions -->
  <div class="grid grid-cols-1 grid-rows-1 items-start">
    {#if activeTab === 'stack'}
      <div transition:fade={{ duration: 150 }} class="col-start-1 row-start-1 rounded-2xl border border-border-subtle bg-bg-surface/30 p-7 backdrop-blur-xs shadow-sm w-full">
        <div class="flex items-center gap-2.5 mb-4 pb-2 border-b border-border-subtle select-none">
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
          <span class="text-xs text-text-muted leading-relaxed font-medium">{t.emptySummary}</span>
        {/if}
      </div>
    {:else}
      <div transition:fade={{ duration: 150 }} class="col-start-1 row-start-1 w-full">
        <PreviewStructure {structurePreview} {lang} />
      </div>
    {/if}
  </div>
</div>

