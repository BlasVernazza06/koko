<script lang="ts">
  import PresetsView from '@/components/builder/PresetsView.svelte';
  import ManualConfigView from '@/components/builder/ManualConfigView.svelte';
  import RecipeToast from '@/components/builder/RecipeToast.svelte';
  import { templates } from '@/data/templates.data';
  import type { KokoTemplate, KokoTemplateConfig } from '@/types/builder.types';
  import { getLayers, getInfrastructureOptions } from '@/data/builder.data';
  import { Sparkles, RotateCcw, Check } from '@lucide/svelte';

  const defaultLayers = getLayers('es');
  function getDefault(key: string, fallback: string): string {
    const layer = defaultLayers.find(l => l.key === key);
    if (!layer) return fallback;
    const defaultOption = layer.options.find(o => o.default);
    return defaultOption ? defaultOption.id : fallback;
  }

  const defaultInfra = getInfrastructureOptions('es');
  function isInfraDefault(id: string, fallback: boolean): boolean {
    const opt = defaultInfra.find(o => o.id === id);
    return opt && opt.default !== undefined ? opt.default : fallback;
  }

  let isResetting = $state(false);
  let toastVisible = $state(false);
  let toastRecipeName = $state('');
  let toastRecipeDesc = $state('');
  let toastRecipeIcon = $state<any>(null);

  function resetToDefaults() {
    projectName = 'my-koko-app';
    selectedFront = getDefault('frontend', 'nextjs');
    selectedNativeFront = getDefault('native_frontend', 'none');
    selectedBack = getDefault('backend', 'express');
    selectedRuntime = getDefault('runtime', 'node');
    selectedOrm = getDefault('orm', 'drizzle');
    selectedApi = getDefault('api', 'none');
    selectedPackageManager = getDefault('package_manager', 'pnpm');
    selectedTools = getDefault('tools', 'zod');
    selectedPayments = getDefault('payments', 'none');
    selectedDb = getDefault('db', 'postgres');
    selectedAuth = getDefault('auth', 'better-auth');
    selectedEmail = getDefault('email', 'none');
    withDocker = isInfraDefault('docker', true);
    withCi = isInfraDefault('ci', false);
    withLinter = isInfraDefault('linter', false);
    withTesting = isInfraDefault('testing', false);
    withTurborepo = true;

    isResetting = true;
    setTimeout(() => {
      isResetting = false;
    }, 1500);
  }

  // Svelte 5 bindable props
  let {
    projectName = $bindable('my-koko-app'),
    selectedFront = $bindable('nextjs'),
    selectedNativeFront = $bindable('none'),
    selectedBack = $bindable('hono'),
    selectedRuntime = $bindable('bun'),
    selectedOrm = $bindable('drizzle'),
    selectedApi = $bindable('trpc'),
    selectedPackageManager = $bindable('pnpm'),
    selectedTools = $bindable('zod'),
    selectedPayments = $bindable('stripe'),
    selectedDb = $bindable('postgres'),
    selectedAuth = $bindable('better-auth'),
    selectedEmail = $bindable('none'),
    withDocker = $bindable(true),
    withCi = $bindable(false),
    withLinter = $bindable(true),
    withTesting = $bindable(false),
    withTurborepo = $bindable(true),
    lang = 'es'
  } = $props<{
    projectName: string;
    selectedFront: string;
    selectedNativeFront: string;
    selectedBack: string;
    selectedRuntime: string;
    selectedOrm: string;
    selectedApi: string;
    selectedPackageManager: string;
    selectedTools: string;
    selectedPayments: string;
    selectedDb: string;
    selectedAuth: string;
    selectedEmail: string;
    withDocker: boolean;
    withCi: boolean;
    withLinter: boolean;
    withTesting: boolean;
    withTurborepo: boolean;
    lang: string;
  }>();

  function applyTemplate(config: KokoTemplateConfig, template?: KokoTemplate) {
    selectedFront = config.selectedFront;
    selectedNativeFront = config.selectedNativeFront;
    selectedBack = config.selectedBack;
    selectedDb = config.selectedDb;
    selectedAuth = config.selectedAuth;
    selectedPackageManager = config.selectedPackageManager;
    selectedTools = config.selectedTools;
    selectedPayments = config.selectedPayments;
    selectedEmail = config.selectedEmail || 'none';
    withDocker = config.withDocker;
    withCi = config.withCi ?? false;
    withLinter = config.withLinter ?? false;
    withTesting = config.withTesting ?? false;
    withTurborepo = config.withTurborepo ?? true;
    if (config.selectedRuntime !== undefined) selectedRuntime = config.selectedRuntime;
    if (config.selectedOrm !== undefined) selectedOrm = config.selectedOrm;
    if (config.selectedApi !== undefined) selectedApi = config.selectedApi;

    if (template) {
      toastRecipeName = lang === 'es' ? template.nameEs : template.nameEn;
      toastRecipeDesc = lang === 'es' ? template.descEs : template.descEn;
      toastRecipeIcon = template.icon;
      toastVisible = true;
    }
  }

  let activeTab = $state<'manual' | 'presets'>('manual');
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

<div class="relative z-10 font-sans">
  <!-- Toolbar: Pill-Switcher + Reset Defaults Button -->
  <div class="flex items-center justify-between flex-wrap gap-4 mb-8">
    <div class="minimal-switcher flex items-center gap-2 p-1.5 rounded-2xl w-fit select-none border border-border-subtle bg-bg-base backdrop-blur-md shadow-xs">
      <button
        type="button"
        class="tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97]
          {activeTab === 'manual' 
            ? 'active' 
            : 'text-text-muted hover:text-text-main hover:bg-bg-surface/50'}"
        onclick={() => activeTab = 'manual'}
      >
        <img src="/icons-ajustes.svg" alt="config-manual-builder" class="size-4 transition-all duration-300 {activeTab === 'manual' ? 'opacity-100' : 'opacity-70'}">
        <span>{lang === 'es' ? 'Configuración Manual' : 'Manual Config'}</span>
      </button>
      <button
        type="button"
        class="tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97]
          {activeTab === 'presets' 
            ? 'active' 
            : 'text-text-muted hover:text-text-main hover:bg-bg-surface/50'}"
        onclick={() => activeTab = 'presets'}
      >
        <Sparkles class="size-4 transition-all duration-300 {activeTab === 'presets' ? 'opacity-100' : 'opacity-70'}" />
        <span>{lang === 'es' ? 'Recetas (Presets)' : 'Presets (Recipes)'}</span>
      </button>
    </div>

    <!-- Reset to Defaults Button -->
    <button
      type="button"
      onclick={resetToDefaults}
      class="group flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border-subtle bg-bg-base text-text-muted hover:text-text-main text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-xs select-none"
      title={lang === 'es' ? 'Reestablecer todas las tecnologías a los valores por defecto' : 'Reset all stack choices to default values'}
    >
      {#if isResetting}
        <Check size={14} class="text-emerald-500 animate-in zoom-in-50 duration-200" />
        <span class="text-emerald-500 font-bold">{lang === 'es' ? '¡Reestablecido!' : 'Reset!'}</span>
      {:else}
        <RotateCcw size={14} class="transition-transform duration-500 group-hover:-rotate-180 group-hover:text-brand-primary" />
        <span class="group-hover:text-brand-primary transition-colors">{lang === 'es' ? 'Reestablecer Defaults' : 'Reset Defaults'}</span>
      {/if}
    </button>
  </div>

  <!-- Main card container -->
  <div class="border border-border-subtle bg-bg-base shadow-xl relative w-full rounded-3xl p-8 max-sm:rounded-2xl max-sm:p-5">
    {#if activeTab === 'presets'}
      <PresetsView {templates} {lang} onapply={applyTemplate} />
    {:else}
      <ManualConfigView
        bind:projectName
        bind:selectedFront
        bind:selectedNativeFront
        bind:selectedBack
        bind:selectedRuntime
        bind:selectedOrm
        bind:selectedApi
        bind:selectedPackageManager
        bind:selectedTools
        bind:selectedPayments
        bind:selectedDb
        bind:selectedAuth
        bind:selectedEmail
        bind:withDocker
        bind:withCi
        bind:withLinter
        bind:withTesting
        bind:withTurborepo
        {lang}
      />
    {/if}
  </div>

  <!-- Toast Notification when a recipe is applied -->
  <RecipeToast
    visible={toastVisible}
    recipeName={toastRecipeName}
    recipeDesc={toastRecipeDesc}
    recipeIcon={toastRecipeIcon}
    {lang}
    onclose={() => toastVisible = false}
  />
</div>
