<script lang="ts">
  import PresetsView from './PresetsView.svelte';
  import ManualConfigView from './ManualConfigView.svelte';
  import { templates } from './templates';
  import type { KokoTemplateConfig } from './templates';
  import { SlidersHorizontal, Layers } from '@lucide/svelte';

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
    selectedEmail = $bindable('resend'),
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

  function applyTemplate(config: KokoTemplateConfig) {
    selectedFront = config.selectedFront;
    selectedNativeFront = config.selectedNativeFront;
    selectedBack = config.selectedBack;
    selectedDb = config.selectedDb;
    selectedAuth = config.selectedAuth;
    selectedPackageManager = config.selectedPackageManager;
    selectedTools = config.selectedTools;
    selectedPayments = config.selectedPayments;
    selectedEmail = config.selectedEmail;
    withDocker = config.withDocker;
    withTurborepo = config.withTurborepo;
    selectedRuntime = config.selectedRuntime || (config.selectedBack === 'go' || config.selectedBack === 'python' ? 'none' : 'node');
    withCi = config.withCi || false;
    withLinter = config.withLinter || false;
    withTesting = config.withTesting || false;
    activeTab = 'manual'; // Auto-switch back to let them customize or see the stack
  }

  let activeTab = $state<'manual' | 'presets'>('manual');
</script>

<style>
  .minimal-switcher {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
  }
  .tab-btn {
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .tab-btn.active {
    background: var(--brand-primary);
    color: white;
    box-shadow: 0 4px 15px -3px rgba(90, 79, 196, 0.25);
  }
  .editorial-panel {
    background: rgba(235, 237, 247, 0.15);
    border: 1px solid var(--border-subtle);
    box-shadow: 0 20px 40px -15px rgba(90, 79, 196, 0.03);
  }
  :root[data-theme="dark"] .editorial-panel {
    background: rgba(20, 19, 30, 0.25);
  }
</style>

<div class="relative z-10 font-sans">
  <!-- Modern Pill-Switcher with Editorial Styling -->
  <div class="minimal-switcher flex items-center gap-2 p-1.5 rounded-2xl w-fit mb-8 select-none backdrop-blur-md shadow-xs">
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
      <img src="/icons-receta.png" alt="receta-icono" class="size-4 transition-all duration-300 {activeTab === 'presets' ? 'opacity-100' : 'opacity-70'}">
      <span>{lang === 'es' ? 'Recetas (Presets)' : 'Presets (Recipes)'}</span>
    </button>
  </div>

  <!-- Main glassmorphic card container -->
  <div class="editorial-panel relative w-full rounded-3xl p-8 backdrop-blur-xl max-sm:rounded-2xl max-sm:p-5">
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
</div>
