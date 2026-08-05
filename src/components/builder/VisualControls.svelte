<script lang="ts">
  import PresetsView from './PresetsView.svelte';
  import ManualConfigView from './ManualConfigView.svelte';
  import { templates } from './templates';
  import type { KokoTemplateConfig } from './templates';

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

<div class="relative z-10 font-sans">
  <!-- Tabs connecting to the background container below -->
  <div class="flex gap-1 -mb-[1px] relative z-20 select-none">
    <button
      type="button"
      class="border border-border-subtle border-b-border-subtle text-[11px] font-bold uppercase tracking-wider px-7 py-3 rounded-t-xl cursor-pointer transition-all duration-200 {activeTab === 'manual' ? 'bg-bg-base text-brand-primary border-b-bg-base font-extrabold shadow-[0_-2px_10px_rgba(90,79,196,0.05)]' : 'bg-bg-surface text-text-muted hover:text-text-main hover:bg-bg-base'}"
      onclick={() => activeTab = 'manual'}
    >
      ⚙️ {lang === 'es' ? 'Manual' : 'Manual'}
    </button>
    <button
      type="button"
      class="border border-border-subtle border-b-border-subtle text-[11px] font-bold uppercase tracking-wider px-7 py-3 rounded-t-xl cursor-pointer transition-all duration-200 {activeTab === 'presets' ? 'bg-bg-base text-brand-primary border-b-bg-base font-extrabold shadow-[0_-2px_10px_rgba(90,79,196,0.05)]' : 'bg-bg-surface text-text-muted hover:text-text-main hover:bg-bg-base'}"
      onclick={() => activeTab = 'presets'}
    >
      📁 {lang === 'es' ? 'Recetas (Presets)' : 'Presets (Recipes)'}
    </button>
  </div>

  <div class="relative w-full bg-bg-base border border-border-subtle rounded-br-2xl rounded-bl-2xl rounded-tr-2xl p-8 shadow-[0_10px_30px_-10px_rgba(90,79,196,0.08)] max-sm:rounded-2xl max-sm:p-5">
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
