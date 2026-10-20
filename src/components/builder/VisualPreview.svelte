<script lang="ts">
  import { Blocks, Folder, Settings } from '@lucide/svelte';
  import PreviewCommand from '@/components/builder/PreviewCommand.svelte';
  import PreviewStructure from '@/components/builder/PreviewStructure.svelte';
  import SelectedTechBadge from '@/components/builder/SelectedTechBadge.svelte';

  type Translation = {
    projectNameLabel: string;
    projectNamePlaceholder: string;
    summaryTitle: string;
    emptySummary: string;
    tabStack: string;
    tabStructure: string;
  };

  const translations: Record<'es' | 'en', Translation> = {
    es: {
      projectNameLabel: 'Nombre del Proyecto',
      projectNamePlaceholder: 'nombre-de-tu-app',
      summaryTitle: 'STACK SELECCIONADO',
      emptySummary: 'No hay tecnologías seleccionadas.',
      tabStack: 'Mi Stack',
      tabStructure: 'Estructura'
    },
    en: {
      projectNameLabel: 'Project Name',
      projectNamePlaceholder: 'your-app-name',
      summaryTitle: 'SELECTED STACK',
      emptySummary: 'No technologies selected.',
      tabStack: 'My Stack',
      tabStructure: 'Structure'
    }
  };

  let {
    projectName = $bindable('my-koko-app'),
    generatedCommand = '',
    structurePreview = [],
    selectedTechs = [],
    selectedPackageManager = $bindable('pnpm'),
    selectedCommandType = $bindable('wrapper'),
    onremove = () => {},
    lang = 'es'
  } = $props<{
    projectName: string;
    generatedCommand: string;
    structurePreview: Array<any>;
    selectedTechs: Array<{ layerKey: string; id: string; name: string; iconComponent: any }>;
    selectedPackageManager: string;
    selectedCommandType: string;
    onremove: (layerKey: string, id?: string) => void;
    lang?: 'es' | 'en' | string;
  }>();

  let activeTab = $state<'stack' | 'structure'>('stack');

  const t = $derived(
    translations[(lang as 'es' | 'en')] ?? translations.es
  );
</script>   

<style>
  .tab-btn.active {
    background: var(--brand-primary);
    color: white;
    box-shadow: 0 4px 15px -3px rgba(90, 79, 196, 0.25);
  }
</style>

<div class="relative z-10 max-w-1xl space-y-4 font-sans">
  
  <!-- OUTER CARD: Contenedor unificado para Nombre + Stack/Estructura (tal como en la imagen) -->
  <div class="rounded-3xl border border-border-subtle bg-bg-base/90 p-4 sm:p-5 shadow-xl space-y-4">
    
    <!-- CARD 1 INTERNA: NOMBRE DEL PROYECTO -->
    <div class="rounded-2xl hover:border-brand-primary/30 transition-all">
      <label for="sidebar-pname" class="block text-[11px] font-extrabold uppercase tracking-widest text-text-muted mb-2 select-none border-l-2 border-brand-primary pl-2.5">
        {t.projectNameLabel}
      </label>
      <div class="relative flex items-center bg-bg-base border border-border-subtle rounded-xl px-3.5 py-2.5 hover:border-brand-primary/40 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10 transition-all shadow-2xs">
        <input
          id="sidebar-pname"
          type="text"
          bind:value={projectName}
          placeholder={t.projectNamePlaceholder}
          class="w-full bg-transparent border-none outline-none text-sm text-text-main placeholder-text-muted/40 p-0 focus:ring-0 font-mono font-bold tracking-wide"
        />
      </div>
    </div>

    <!-- CARD 2 INTERNA: STACK DEL PROYECTO / ESTRUCTURA DEL PROYECTO (Con toggle interno) -->
    <div class="rounded-2xl border border-border-subtle/80 bg-bg-surface/30 p-4 shadow-sm space-y-3.5">
      
      <!-- Toggle de "Mi Stack" y "Estructura" (dentro de la card) -->
      <div class="minimal-switcher flex items-center gap-1.5 p-1 rounded-xl w-full select-none border border-border-subtle bg-bg-base shadow-2xs">
        <button
          type="button"
          onclick={() => activeTab = 'stack'}
          class="tab-btn flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97]
            {activeTab === 'stack'
              ? 'active'
              : 'text-text-muted hover:text-text-main hover:bg-bg-surface/50'}"
        >
          <Blocks size={14} class={activeTab === 'stack' ? 'opacity-100' : 'opacity-70'} />
          <span>{t.tabStack}</span>
          {#if selectedTechs.length > 0}
            <span class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold {activeTab === 'stack' ? 'bg-white/25 text-white' : 'bg-bg-surface text-brand-secondary'}">
              {selectedTechs.length}
            </span>
          {/if}
        </button>
        <button
          type="button"
          onclick={() => activeTab = 'structure'}
          class="tab-btn flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97]
            {activeTab === 'structure'
              ? 'active'
              : 'text-text-muted hover:text-text-main hover:bg-bg-surface/50'}"
        >
          <Folder size={14} class={activeTab === 'structure' ? 'opacity-100' : 'opacity-70'} />
          <span>{t.tabStructure}</span>
        </button>
      </div>

      <!-- Contenido de Stack o Estructura con altura fija idéntica en ambas pestañas -->
      <div class="h-[250px] max-h-[250px] overflow-hidden">
        {#if activeTab === 'stack'}
          <div class="pt-1 space-y-2.5 h-full flex flex-col">
            {#if selectedTechs.length > 0}
              <div class="flex items-center justify-between pb-2 border-b border-border-subtle/40 select-none shrink-0">
                <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                  {selectedTechs.length} tecnologías
                </span>
                <span class="text-[10px] text-text-muted/60 font-medium">Click en × para quitar</span>
              </div>
              <div class="flex flex-wrap gap-1.5 overflow-y-auto pr-1 flex-1 content-start">
                {#each selectedTechs as tech (tech.layerKey + '-' + tech.id)}
                  <div class="inline-block">
                    <SelectedTechBadge
                      name={tech.name}
                      iconComponent={tech.iconComponent}
                      onremove={() => onremove(tech.layerKey, tech.id)}
                    />
                  </div>
                {/each}
              </div>
            {:else}
              <div class="py-10 text-center flex flex-col items-center justify-center flex-1">
                <div class="w-14 h-14 mb-2 flex items-center justify-center opacity-85 transition-transform duration-300 hover:scale-110">
                  <img src="/koko-pensando.png" alt="Koko Pensando" class="w-full h-full object-contain" />
                </div>
                <span class="text-xs text-text-muted leading-relaxed font-medium max-w-xs">{t.emptySummary}</span>
              </div>
            {/if}
          </div>
        {:else}
          <div class="h-full">
            <PreviewStructure {structurePreview} {lang} />
          </div>
        {/if}
      </div>

    </div>

  </div>

  <!-- CARD 3: COPY DEL COMANDO (Abajo, card independiente tal como en la imagen) -->
  <div class="rounded-3xl border border-border-subtle bg-bg-base/90 p-4 sm:p-5 shadow-xl">
    <PreviewCommand
      {generatedCommand}
      bind:selectedPackageManager={selectedPackageManager}
      bind:selectedCommandType={selectedCommandType}
      {lang}
    />
  </div>

</div>
