<script lang="ts">
  import { Settings } from '@lucide/svelte';
  import { getLayers, getInfrastructureOptions } from './builderData';
  import TechCard from './TechCard.svelte';
  import ExtraCard from './ExtraCard.svelte';

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

  // Constraints helper
  function isOptionDisabled(layerKey: string, optionId: string) {
    // Disable other frontends if a Fullstack backend is selected
    if (layerKey === 'frontend') {
      if (selectedBack === 'fullstack-next' && optionId !== 'nextjs') return true;
      if (selectedBack === 'fullstack-tanstack' && optionId !== 'react') return true;
      if (selectedBack === 'fullstack-nuxt' && optionId !== 'nuxt') return true;
      if (selectedBack === 'fullstack-sveltekit' && optionId !== 'sveltekit') return true;
      if (selectedBack === 'fullstack-astro' && optionId !== 'astro') return true;
    }
    // Disable fullstack backends if their frontend isn't selected, but NOT if 'none' is selected in frontend
    if (layerKey === 'backend') {
      if (selectedFront !== 'none') {
        if (optionId === 'fullstack-next' && selectedFront !== 'nextjs') return true;
        if (optionId === 'fullstack-tanstack' && selectedFront !== 'react') return true;
        if (optionId === 'fullstack-nuxt' && selectedFront !== 'nuxt') return true;
        if (optionId === 'fullstack-sveltekit' && selectedFront !== 'sveltekit') return true;
        if (optionId === 'fullstack-astro' && selectedFront !== 'astro') return true;
      }
    }
    // Mongoose only works with MongoDB database choice
    if (layerKey === 'orm') {
      if (optionId === 'mongoose' && selectedDb !== 'mongodb') return true;
    }
    return false;
  }

  function getDisabledReason(layerKey: string, optionId: string) {
    if (layerKey === 'frontend') {
      if (selectedBack === 'fullstack-next' && optionId !== 'nextjs') return lang === 'es' ? 'Requiere Next.js para Fullstack' : 'Requires Next.js for Fullstack';
      if (selectedBack === 'fullstack-tanstack' && optionId !== 'react') return lang === 'es' ? 'Requiere React para Fullstack' : 'Requires React for Fullstack';
      if (selectedBack === 'fullstack-nuxt' && optionId !== 'nuxt') return lang === 'es' ? 'Requiere Nuxt para Fullstack' : 'Requires Nuxt for Fullstack';
      if (selectedBack === 'fullstack-sveltekit' && optionId !== 'sveltekit') return lang === 'es' ? 'Requiere SvelteKit para Fullstack' : 'Requires SvelteKit for Fullstack';
      if (selectedBack === 'fullstack-astro' && optionId !== 'astro') return lang === 'es' ? 'Requiere Astro para Fullstack' : 'Requires Astro for Fullstack';
    }
    if (layerKey === 'backend') {
      if (selectedFront !== 'none') {
        if (optionId === 'fullstack-next' && selectedFront !== 'nextjs') return lang === 'es' ? 'Requiere frontend Next.js' : 'Requires Next.js frontend';
        if (optionId === 'fullstack-tanstack' && selectedFront !== 'react') return lang === 'es' ? 'Requiere frontend React SPA/Start' : 'Requires React SPA/Start frontend';
        if (optionId === 'fullstack-nuxt' && selectedFront !== 'nuxt') return lang === 'es' ? 'Requiere frontend Nuxt' : 'Requires Nuxt frontend';
        if (optionId === 'fullstack-sveltekit' && selectedFront !== 'sveltekit') return lang === 'es' ? 'Requiere frontend SvelteKit' : 'Requires SvelteKit frontend';
        if (optionId === 'fullstack-astro' && selectedFront !== 'astro') return lang === 'es' ? 'Requiere frontend Astro' : 'Requires Astro frontend';
      }
    }
    if (layerKey === 'orm') {
      if (optionId === 'mongoose' && selectedDb !== 'mongodb') return lang === 'es' ? 'Mongoose requiere base de datos MongoDB' : 'Mongoose requires MongoDB database';
    }
    return '';
  }

  function getSelectedId(layerKey: string): string {
    if (layerKey === 'frontend') return selectedFront;
    if (layerKey === 'native_frontend') return selectedNativeFront;
    if (layerKey === 'backend') return selectedBack;
    if (layerKey === 'runtime') return selectedRuntime;
    if (layerKey === 'orm') return selectedOrm;
    if (layerKey === 'api') return selectedApi;
    if (layerKey === 'package_manager') return selectedPackageManager;
    if (layerKey === 'tools') return selectedTools;
    if (layerKey === 'payments') return selectedPayments;
    if (layerKey === 'db') return selectedDb;
    if (layerKey === 'auth') return selectedAuth;
    if (layerKey === 'email') return selectedEmail;
    return '';
  }

  function setSelectedId(layerKey: string, optionId: string) {
    if (layerKey === 'frontend') {
      selectedFront = selectedFront === optionId ? 'none' : optionId;
    } else if (layerKey === 'native_frontend') {
      selectedNativeFront = selectedNativeFront === optionId ? 'none' : optionId;
    } else if (layerKey === 'backend') {
      selectedBack = selectedBack === optionId ? 'none' : optionId;
      // Auto-select correct frontend if we select a fullstack backend and frontend is 'none'
      if (selectedBack === 'fullstack-next' && selectedFront === 'none') {
        selectedFront = 'nextjs';
      } else if (selectedBack === 'fullstack-tanstack' && selectedFront === 'none') {
        selectedFront = 'react';
      } else if (selectedBack === 'fullstack-nuxt' && selectedFront === 'none') {
        selectedFront = 'nuxt';
      } else if (selectedBack === 'fullstack-sveltekit' && selectedFront === 'none') {
        selectedFront = 'sveltekit';
      } else if (selectedBack === 'fullstack-astro' && selectedFront === 'none') {
        selectedFront = 'astro';
      }
    } else if (layerKey === 'runtime') {
      selectedRuntime = selectedRuntime === optionId ? 'none' : optionId;
    } else if (layerKey === 'orm') {
      selectedOrm = selectedOrm === optionId ? 'none' : optionId;
    } else if (layerKey === 'api') {
      selectedApi = selectedApi === optionId ? 'none' : optionId;
    } else if (layerKey === 'package_manager') {
      selectedPackageManager = selectedPackageManager === optionId ? 'none' : optionId;
    } else if (layerKey === 'tools') {
      selectedTools = selectedTools === optionId ? 'none' : optionId;
    } else if (layerKey === 'payments') {
      selectedPayments = selectedPayments === optionId ? 'none' : optionId;
    } else if (layerKey === 'db') {
      selectedDb = selectedDb === optionId ? 'none' : optionId;
    } else if (layerKey === 'auth') {
      selectedAuth = selectedAuth === optionId ? 'none' : optionId;
    } else if (layerKey === 'email') {
      selectedEmail = selectedEmail === optionId ? 'none' : optionId;
    }
  }

  // Infrastructure binding accessors
  function isInfraActive(bindingKey: string): boolean {
    if (bindingKey === 'withDocker') return withDocker;
    if (bindingKey === 'withCi') return withCi;
    if (bindingKey === 'withLinter') return withLinter;
    if (bindingKey === 'withTesting') return withTesting;
    if (bindingKey === 'withTurborepo') return withTurborepo;
    return false;
  }

  function toggleInfra(bindingKey: string) {
    if (bindingKey === 'withDocker') withDocker = !withDocker;
    else if (bindingKey === 'withCi') withCi = !withCi;
    else if (bindingKey === 'withLinter') withLinter = !withLinter;
    else if (bindingKey === 'withTesting') withTesting = !withTesting;
    else if (bindingKey === 'withTurborepo') withTurborepo = !withTurborepo;
  }

  const t = $derived({
    es: {
      projectNameLabel: 'Nombre del Proyecto',
      extrasLabel: 'Infraestructura y Calidad de Código',
      none: 'Ninguno'
    },
    en: {
      projectNameLabel: 'Project Name',
      extrasLabel: 'Infrastructure & Code Quality',
      none: 'None'
    }
  }[lang] || {
    projectNameLabel: 'Nombre del Proyecto',
    extrasLabel: 'Infraestructura y Calidad de Código',
    none: 'Ninguno'
  });
</script>

<div class="space-y-10">
  <!-- Project Name Input -->
  <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-7 backdrop-blur-xs shadow-sm hover:border-brand-primary/20 transition-colors duration-300">
    <label for="pname" class="block text-xs font-bold uppercase tracking-widest text-text-muted mb-3 select-none border-l-2 border-brand-primary pl-2.5">
      {t.projectNameLabel}
    </label>
    <div class="relative flex items-center bg-bg-base border border-border-subtle rounded-xl px-4 py-3.5 hover:border-brand-primary/40 focus-within:border-brand-primary transition-colors duration-200">
      <Settings size={18} class="text-text-muted mr-3" aria-hidden="true" />
      <input
        id="pname"
        type="text"
        bind:value={projectName}
        placeholder="my-claw-app"
        class="w-full bg-transparent border-none outline-none text-base text-text-main placeholder-text-muted/50 p-0 focus:ring-0 font-mono"
      />
    </div>
  </div>

  <!-- Technology Layers mapped dynamically -->
  {#each getLayers(lang) as layer}
    {@const LayerIcon = layer.icon}
    <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-8 backdrop-blur-xs shadow-sm space-y-6">
      <div class="flex items-center justify-between pb-3 border-b border-border-subtle/50 select-none">
        <div class="flex items-center gap-2.5">
          <LayerIcon size={18} class="{layer.colorClass} animate-pulse" aria-hidden="true" />
          <span class="text-sm font-bold uppercase tracking-widest text-text-main">{layer.label}</span>
        </div>
        <span class="text-xs {layer.colorClass} font-bold font-mono">{layer.step}</span>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {#each layer.options as opt}
          {@const isActive = getSelectedId(layer.key) === opt.id}
          {@const isDisabled = isOptionDisabled(layer.key, opt.id)}
          <TechCard
            name={opt.name}
            desc={opt.desc}
            iconComponent={opt.iconComponent}
            default={opt.default}
            {isActive}
            {isDisabled}
            disabledReason={getDisabledReason(layer.key, opt.id)}
            hoverColor={opt.hoverColor}
            activeColor={opt.activeColor}
            layerKey={layer.key}
            onclick={() => !isDisabled && setSelectedId(layer.key, opt.id)}
          />
        {/each}
      </div>
    </div>
  {/each}

  <!-- Infrastructure / Quality Add-ons mapped dynamically -->
  <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-8 backdrop-blur-xs shadow-sm space-y-6">
    <div class="flex items-center justify-between pb-3 border-b border-border-subtle/50 select-none">
      <div class="flex items-center gap-2.5">
        <Settings size={18} class="text-text-muted" aria-hidden="true" />
        <span class="text-sm font-bold uppercase tracking-widest text-text-main">{t.extrasLabel}</span>
      </div>
      <span class="text-xs text-text-muted font-bold font-mono">08 / QUALITY & DEV</span>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {#each getInfrastructureOptions(lang) as option}
        <ExtraCard
          title={option.title}
          description={option.description}
          iconComponent={option.iconComponent}
          lucideIcon={option.lucideIcon}
          isActive={isInfraActive(option.bindingKey)}
          onclick={() => toggleInfra(option.bindingKey)}
        />
      {/each}
    </div>
  </div>
</div>
