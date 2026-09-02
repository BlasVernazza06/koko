<script lang="ts">
  import { Settings, FolderCode, MonitorSmartphone, Server, Database, Fingerprint, Rocket, ArrowLeft, ArrowRight, Mail } from '@lucide/svelte';
  import { getLayers, getInfrastructureOptions } from '@/components/builder/builderData';
  import TechCard from '@/components/builder/TechCard.svelte';
  import ExtraCard from '@/components/builder/ExtraCard.svelte';
  import { fade } from 'svelte/transition';

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

  // Multi-selection helper for tools
  function isToolActive(optionId: string): boolean {
    if (optionId === 'none') {
      return !selectedTools || selectedTools === 'none';
    }
    const tools = selectedTools === 'none' || !selectedTools ? [] : selectedTools.split(',').filter(Boolean);
    return tools.includes(optionId);
  }

  function toggleTool(optionId: string) {
    if (optionId === 'none') {
      selectedTools = 'none';
      return;
    }
    const tools = selectedTools === 'none' || !selectedTools ? [] : selectedTools.split(',').filter(Boolean);
    if (tools.includes(optionId)) {
      const remaining = tools.filter(t => t !== optionId);
      selectedTools = remaining.length > 0 ? remaining.join(',') : 'none';
    } else {
      selectedTools = [...tools, optionId].join(',');
    }
  }

  // Constraints helper
  function isOptionDisabled(layerKey: string, optionId: string) {
    if (layerKey === 'frontend') {
      if (selectedBack === 'fullstack-next' && optionId !== 'nextjs') return true;
      if (selectedBack === 'fullstack-tanstack' && optionId !== 'react') return true;
      if (selectedBack === 'fullstack-nuxt' && optionId !== 'nuxt') return true;
      if (selectedBack === 'fullstack-sveltekit' && optionId !== 'sveltekit') return true;
      if (selectedBack === 'fullstack-astro' && optionId !== 'astro') return true;
    }
    if (layerKey === 'backend') {
      if (selectedFront !== 'none') {
        if (optionId === 'fullstack-next' && selectedFront !== 'nextjs') return true;
        if (optionId === 'fullstack-tanstack' && selectedFront !== 'react') return true;
        if (optionId === 'fullstack-nuxt' && selectedFront !== 'nuxt') return true;
        if (optionId === 'fullstack-sveltekit' && selectedFront !== 'sveltekit') return true;
        if (optionId === 'fullstack-astro' && selectedFront !== 'astro') return true;
      }
      if (optionId === 'elysia' && (selectedRuntime === 'node' || selectedRuntime === 'cloudflare')) {
        return true;
      }
    }
    if (layerKey === 'runtime') {
      if (selectedBack === 'elysia' && optionId !== 'bun') return true;
      if ((selectedBack === 'go' || selectedBack === 'fastapi') && optionId !== 'none') return true;
    }
    if (layerKey === 'orm') {
      if (selectedBack === 'convex' && optionId !== 'none') return true;
      if (optionId === 'mongoose' && selectedDb !== 'mongodb') return true;
      if (optionId === 'drizzle' && (selectedDb === 'mongodb' || selectedDb === 'none')) return true;
      if (optionId === 'prisma' && selectedDb === 'none') return true;
    }
    if (layerKey === 'db') {
      if (selectedBack === 'convex' && optionId !== 'none') return true;
      if (selectedOrm === 'mongoose' && optionId !== 'mongodb') return true;
      if (selectedOrm === 'drizzle' && optionId === 'mongodb') return true;
    }
    if (layerKey === 'api') {
      if ((selectedBack === 'go' || selectedBack === 'fastapi') && (optionId === 'trpc' || optionId === 'orpc')) return true;
    }
    if (layerKey === 'tools') {
      if (optionId === 'shadcn' && selectedFront === 'none') return true;
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
        if (optionId === 'fullstack-tanstack' && selectedFront !== 'react') return lang === 'es' ? 'Requiere frontend React SPA' : 'Requires React SPA frontend';
        if (optionId === 'fullstack-nuxt' && selectedFront !== 'nuxt') return lang === 'es' ? 'Requiere frontend Nuxt' : 'Requires Nuxt frontend';
        if (optionId === 'fullstack-sveltekit' && selectedFront !== 'sveltekit') return lang === 'es' ? 'Requiere frontend SvelteKit' : 'Requires SvelteKit frontend';
        if (optionId === 'fullstack-astro' && selectedFront !== 'astro') return lang === 'es' ? 'Requiere frontend Astro' : 'Requires Astro frontend';
      }
      if (optionId === 'elysia' && (selectedRuntime === 'node' || selectedRuntime === 'cloudflare')) {
        return lang === 'es' ? 'Elysia requiere runtime Bun' : 'Elysia requires Bun runtime';
      }
    }
    if (layerKey === 'runtime') {
      if (selectedBack === 'elysia' && optionId !== 'bun') {
        return lang === 'es' ? 'Elysia solo es compatible con Bun' : 'Elysia is only compatible with Bun';
      }
      if ((selectedBack === 'go' || selectedBack === 'fastapi') && optionId !== 'none') {
        return lang === 'es' ? 'Go y Python gestionan su propio runtime' : 'Go and Python manage their own runtime';
      }
    }
    if (layerKey === 'orm') {
      if (selectedBack === 'convex' && optionId !== 'none') {
        return lang === 'es' ? 'Convex incluye su propio motor de persistencia' : 'Convex includes its own persistence engine';
      }
      if (optionId === 'mongoose' && selectedDb !== 'mongodb') {
        return lang === 'es' ? 'Mongoose requiere base de datos MongoDB' : 'Mongoose requires MongoDB database';
      }
      if (optionId === 'drizzle' && selectedDb === 'mongodb') {
        return lang === 'es' ? 'Drizzle no soporta MongoDB (usa Postgres, MySQL o SQLite)' : 'Drizzle does not support MongoDB (use Postgres, MySQL or SQLite)';
      }
      if ((optionId === 'drizzle' || optionId === 'prisma') && selectedDb === 'none') {
        return lang === 'es' ? 'Requiere una base de datos activa' : 'Requires an active database';
      }
    }
    if (layerKey === 'db') {
      if (selectedBack === 'convex' && optionId !== 'none') {
        return lang === 'es' ? 'Convex gestiona los datos de forma integrada' : 'Convex manages data in a fully integrated way';
      }
      if (selectedOrm === 'mongoose' && optionId !== 'mongodb') {
        return lang === 'es' ? 'Mongoose solo es compatible con MongoDB' : 'Mongoose only works with MongoDB';
      }
      if (selectedOrm === 'drizzle' && optionId === 'mongodb') {
        return lang === 'es' ? 'Drizzle requiere una base de datos relacional SQL' : 'Drizzle requires a relational SQL database';
      }
    }
    if (layerKey === 'api') {
      if ((selectedBack === 'go' || selectedBack === 'fastapi') && (optionId === 'trpc' || optionId === 'orpc')) {
        return lang === 'es' ? 'Requiere un backend en TypeScript' : 'Requires a TypeScript backend';
      }
    }
    if (layerKey === 'tools') {
      if (optionId === 'shadcn' && selectedFront === 'none') {
        return lang === 'es' ? 'shadcn requiere un framework frontend' : 'shadcn requires a frontend framework';
      }
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
      toggleTool(optionId);
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

  function isInfraActive(bindingKey: string): boolean {
    if (bindingKey === 'withDocker') return withDocker;
    if (bindingKey === 'withCi') return withCi;
    if (bindingKey === 'withLinter') return withLinter;
    if (bindingKey === 'withTesting') return withTesting;
    if (bindingKey === 'withTurborepo') return true;
    return false;
  }

  function toggleInfra(bindingKey: string) {
    if (bindingKey === 'withTurborepo') return; // Always active
    if (bindingKey === 'withDocker') withDocker = !withDocker;
    else if (bindingKey === 'withCi') withCi = !withCi;
    else if (bindingKey === 'withLinter') withLinter = !withLinter;
    else if (bindingKey === 'withTesting') withTesting = !withTesting;
  }

  let stepScrollContainer: HTMLDivElement | null = $state(null);
  function changeStep(idx: number) {
    activeStep = idx;
    if (stepScrollContainer) {
      stepScrollContainer.scrollTop = 0;
    }
  }

  // View state variables
  let viewMode = $state<'stepper' | 'expanded'>('stepper');
  let activeStep = $state(0);

  const steps = [
    {
      id: 'project',
      title: lang === 'es' ? 'Proyecto' : 'Project',
      desc: lang === 'es' ? 'Información básica' : 'Basic setup & monorepo',
      icon: FolderCode
    },
    {
      id: 'frontend',
      title: lang === 'es' ? 'Frontend' : 'Frontend',
      desc: lang === 'es' ? 'Web, Móvil y UI' : 'Web, Mobile & UI',
      icon: MonitorSmartphone
    },
    {
      id: 'backend',
      title: lang === 'es' ? 'Backend' : 'Backend',
      desc: lang === 'es' ? 'Motor y APIs' : 'Engine & API protocol',
      icon: Server
    },
    {
      id: 'data',
      title: lang === 'es' ? 'Persistencia' : 'Data',
      desc: lang === 'es' ? 'Base de datos y ORM' : 'Database & ORM',
      icon: Database
    },
    {
      id: 'services',
      title: lang === 'es' ? 'Servicios' : 'Services',
      desc: lang === 'es' ? 'Auth, Pagos y Email' : 'Auth, Payments & Email',
      icon: Fingerprint
    },
    {
      id: 'devops',
      title: lang === 'es' ? 'Calidad y DevOps' : 'DevOps & Quality',
      desc: lang === 'es' ? 'Contenedores y CI' : 'Containers, testing & linting',
      icon: Rocket
    }
  ];

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

<div class="space-y-6">
  <!-- View Mode Switcher -->
  <div class="flex items-center justify-between pb-3 border-b border-border-subtle/50 select-none">
    <span class="text-xs font-bold uppercase tracking-widest text-text-muted">
      {lang === 'es' ? 'Modo de Configuración' : 'Configuration Mode'}
    </span>
    <div class="flex items-center gap-1 bg-bg-base border border-border-subtle p-1 rounded-xl text-xs">
      <button
        type="button"
        onclick={() => viewMode = 'stepper'}
        class="px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95
          {viewMode === 'stepper' 
            ? 'bg-brand-primary text-white shadow-sm' 
            : 'text-text-muted hover:text-text-main hover:bg-bg-base/50'}"
      >
        {lang === 'es' ? 'Paso a Paso' : 'Step by Step'}
      </button>
      <button
        type="button"
        onclick={() => viewMode = 'expanded'}
        class="px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95
          {viewMode === 'expanded' 
            ? 'bg-brand-primary text-white shadow-sm' 
            : 'text-text-muted hover:text-text-main hover:bg-bg-base/50'}"
      >
        {lang === 'es' ? 'Ver Todo' : 'Show All'}
      </button>
    </div>
  </div>

  {#if viewMode === 'stepper'}
    <!-- STEPPER LAYOUT -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      <!-- Steps Navigation Sidebar (Sticky to accompany scroll) -->
      <div class="md:col-span-4 flex flex-row md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 md:pr-4 md:border-r border-border-subtle/30 select-none custom-scrollbar relative md:sticky md:top-24 md:self-start">
        {#each steps as step, idx}
          {@const StepIcon = step.icon}
          {@const isActive = activeStep === idx}
          {@const isCompleted = idx < activeStep}
          <button
            type="button"
            onclick={() => changeStep(idx)}
            class="flex items-center gap-3.5 p-3 rounded-2xl text-left hover:bg-bg-base transition-all duration-300 cursor-pointer shrink-0 group w-auto md:w-full relative select-none
              {isActive 
                ? 'bg-brand-primary/[0.08] text-brand-primary font-bold shadow-xs' 
                : isCompleted
                  ? 'text-brand-primary/80 hover:bg-bg-surface/30'
                  : 'text-text-muted hover:text-text-main hover:bg-bg-surface/40'}"
          >
            <div class="w-9 h-9 flex items-center justify-center transition-all duration-350 shrink-0 relative
              {isActive 
                ? 'text-brand-primary scale-110 drop-shadow-[0_0_8px_rgba(90,79,196,0.3)]' 
                : isCompleted
                  ? 'text-brand-primary/80'
                  : 'text-text-muted group-hover:text-text-main'}"
            >
              <StepIcon size={18} />
            </div>
            
            <div class="hidden sm:flex flex-col gap-0.5">
              <span class="text-[10px] md:text-xs uppercase tracking-widest font-extrabold leading-none transition-colors duration-300
                {isActive ? 'text-brand-primary' : 'text-text-main/80'}">
                {step.title}
              </span>
              <span class="text-[9px] md:text-[10px] opacity-75 font-medium leading-none mt-1.5">{step.desc}</span>
            </div>
          </button>
        {/each}
      </div>

      <!-- Current Step Panel -->
      <div class="md:col-span-8 flex flex-col justify-between min-h-[460px]">
        <div class="space-y-4">
          <!-- Step Header -->
          <div class="pb-3 border-b border-border-subtle/40 select-none">
            <h2 class="text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
              <span class="text-[10px] font-bold font-mono px-2.5 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-md">
                {lang === 'es' ? 'PASO' : 'STEP'} {activeStep + 1} / 6
              </span>
              {steps[activeStep].title}
            </h2>
            <p class="text-xs text-text-muted mt-1.5 font-medium leading-relaxed">{steps[activeStep].desc}</p>
          </div>

          <!-- Options Container with Internal Scroll and Bottom Gradient Indicator -->
          <div class="relative">
            <div 
              bind:this={stepScrollContainer}
              class="max-h-[460px] md:max-h-[500px] overflow-y-auto pr-2 pb-6 space-y-6 custom-scrollbar scroll-smooth"
            >
              <!-- Step Fields -->
              {#if activeStep === 0}
                {@const pmLayer = getLayers(lang).find(l => l.key === 'package_manager')}
                {@const turboOpt = getInfrastructureOptions(lang).find(o => o.id === 'turborepo')}
                <!-- Step 1: Proyecto -->
                <div class="space-y-6" transition:fade={{ duration: 120 }}>
                  <!-- Project Name Input -->
                  <div class="space-y-2.5">
                    <label for="pname" class="block text-xs font-extrabold uppercase tracking-widest text-text-muted border-l-3 border-brand-primary pl-3 select-none">
                      {t.projectNameLabel}
                    </label>
                    <div class="relative flex items-center bg-bg-base border border-border-subtle rounded-xl px-4 py-3 hover:border-brand-primary/40 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10 transition-all duration-300 shadow-2xs">
                      <Settings size={16} class="text-brand-primary/70 mr-3 animate-pulse" aria-hidden="true" />
                      <input
                        id="pname"
                        type="text"
                        bind:value={projectName}
                        placeholder="my-koko-app"
                        class="w-full bg-transparent border-none outline-none text-sm text-text-main placeholder-text-muted/40 p-0 focus:ring-0 font-mono font-bold tracking-wide"
                      />
                    </div>
                  </div>

                  <!-- Package Manager -->
                  {#if pmLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-secondary pl-2.5">{pmLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each pmLayer.options as opt}
                          {@const isActive = selectedPackageManager === opt.id}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            layerKey="package_manager"
                            onclick={() => selectedPackageManager = opt.id}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- Monorepo Option (Always active by default) -->
                  {#if turboOpt}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-primary pl-2.5">{lang === 'es' ? 'Monorepo' : 'Monorepo'}</span>
                      <ExtraCard
                        title={turboOpt.title}
                        description={turboOpt.description}
                        iconComponent={turboOpt.iconComponent}
                        isActive={true}
                        isLocked={true}
                        onclick={() => {}}
                      />
                    </div>
                  {/if}
                </div>

              {:else if activeStep === 1}
                {@const feLayer = getLayers(lang).find(l => l.key === 'frontend')}
                {@const mobLayer = getLayers(lang).find(l => l.key === 'native_frontend')}
                {@const toolsLayer = getLayers(lang).find(l => l.key === 'tools')}
                <!-- Step 2: Frontend -->
                <div class="space-y-6" transition:fade={{ duration: 120 }}>
                  <!-- Web Frontend -->
                  {#if feLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-secondary pl-2.5">{feLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each feLayer.options as opt}
                          {@const isActive = selectedFront === opt.id}
                          {@const isDisabled = isOptionDisabled('frontend', opt.id)}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            {isDisabled}
                            disabledReason={getDisabledReason('frontend', opt.id)}
                            layerKey="frontend"
                            onclick={() => !isDisabled && setSelectedId('frontend', opt.id)}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- Mobile Frontend -->
                  {#if mobLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-primary pl-2.5">{mobLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each mobLayer.options as opt}
                          {@const isActive = selectedNativeFront === opt.id}
                          {@const isDisabled = isOptionDisabled('native_frontend', opt.id)}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            {isDisabled}
                            disabledReason={getDisabledReason('native_frontend', opt.id)}
                            layerKey="native_frontend"
                            onclick={() => !isDisabled && setSelectedId('native_frontend', opt.id)}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- Tools (Multiselection enabled) -->
                  {#if toolsLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-secondary pl-2.5">{toolsLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each toolsLayer.options as opt}
                          {@const isActive = isToolActive(opt.id)}
                          {@const isDisabled = isOptionDisabled('tools', opt.id)}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            {isDisabled}
                            disabledReason={getDisabledReason('tools', opt.id)}
                            layerKey="tools"
                            onclick={() => !isDisabled && toggleTool(opt.id)}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>

              {:else if activeStep === 2}
                {@const beLayer = getLayers(lang).find(l => l.key === 'backend')}
                {@const runtimeLayer = getLayers(lang).find(l => l.key === 'runtime')}
                {@const apiLayer = getLayers(lang).find(l => l.key === 'api')}
                <!-- Step 3: Backend & APIs -->
                <div class="space-y-6" transition:fade={{ duration: 120 }}>
                  <!-- Backend Framework -->
                  {#if beLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-primary pl-2.5">{beLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each beLayer.options as opt}
                          {@const isActive = selectedBack === opt.id}
                          {@const isDisabled = isOptionDisabled('backend', opt.id)}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            {isDisabled}
                            disabledReason={getDisabledReason('backend', opt.id)}
                            layerKey="backend"
                            onclick={() => !isDisabled && setSelectedId('backend', opt.id)}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- Runtime -->
                  {#if runtimeLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-secondary pl-2.5">{runtimeLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each runtimeLayer.options as opt}
                          {@const isActive = selectedRuntime === opt.id}
                          {@const isDisabled = isOptionDisabled('runtime', opt.id)}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            {isDisabled}
                            disabledReason={getDisabledReason('runtime', opt.id)}
                            layerKey="runtime"
                            onclick={() => !isDisabled && setSelectedId('runtime', opt.id)}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- API -->
                  {#if apiLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-primary pl-2.5">{apiLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each apiLayer.options as opt}
                          {@const isActive = selectedApi === opt.id}
                          {@const isDisabled = isOptionDisabled('api', opt.id)}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            {isDisabled}
                            disabledReason={getDisabledReason('api', opt.id)}
                            layerKey="api"
                            onclick={() => !isDisabled && setSelectedId('api', opt.id)}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>

              {:else if activeStep === 3}
                {@const dbLayer = getLayers(lang).find(l => l.key === 'db')}
                {@const ormLayer = getLayers(lang).find(l => l.key === 'orm')}
                <!-- Step 4: Datos -->
                <div class="space-y-6" transition:fade={{ duration: 120 }}>
                  <!-- Database -->
                  {#if dbLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-primary pl-2.5">{dbLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each dbLayer.options as opt}
                          {@const isActive = selectedDb === opt.id}
                          {@const isDisabled = isOptionDisabled('db', opt.id)}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            {isDisabled}
                            disabledReason={getDisabledReason('db', opt.id)}
                            layerKey="db"
                            onclick={() => !isDisabled && setSelectedId('db', opt.id)}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- ORM -->
                  {#if ormLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-secondary pl-2.5">{ormLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each ormLayer.options as opt}
                          {@const isActive = selectedOrm === opt.id}
                          {@const isDisabled = isOptionDisabled('orm', opt.id)}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            {isDisabled}
                            disabledReason={getDisabledReason('orm', opt.id)}
                            layerKey="orm"
                            onclick={() => !isDisabled && setSelectedId('orm', opt.id)}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>

              {:else if activeStep === 4}
                {@const authLayer = getLayers(lang).find(l => l.key === 'auth')}
                {@const payLayer = getLayers(lang).find(l => l.key === 'payments')}
                <!-- Step 5: Servicios -->
                <div class="space-y-6" transition:fade={{ duration: 120 }}>
                  <!-- Auth -->
                  {#if authLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-primary pl-2.5">{authLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each authLayer.options as opt}
                          {@const isActive = selectedAuth === opt.id}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            layerKey="auth"
                            onclick={() => selectedAuth = opt.id}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- Payments -->
                  {#if payLayer}
                    <div class="space-y-3">
                      <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-secondary pl-2.5">{payLayer.label}</span>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {#each payLayer.options as opt}
                          {@const isActive = selectedPayments === opt.id}
                          <TechCard
                            name={opt.name}
                            desc={opt.desc}
                            iconComponent={opt.iconComponent}
                            default={opt.default}
                            {isActive}
                            layerKey="payments"
                            onclick={() => selectedPayments = opt.id}
                          />
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- Email (None by default) -->
                  <div class="space-y-3">
                    <span class="block text-xs font-bold uppercase tracking-widest text-text-muted border-l-2 border-brand-primary pl-2.5">{lang === 'es' ? 'Servicio de Correo' : 'Email Service'}</span>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <TechCard
                        name={lang === 'es' ? 'Sin Correo' : 'No Email'}
                        desc={lang === 'es' ? 'Omitir integración de servicio de correo' : 'Skip email service integration'}
                        default={true}
                        isActive={selectedEmail === 'none'}
                        layerKey="email"
                        onclick={() => selectedEmail = 'none'}
                      />
                      <TechCard
                        name="Resend"
                        desc={lang === 'es' ? 'Plataforma de correo moderna para desarrolladores' : 'Modern email platform for developers'}
                        iconComponent="/logos/resend.svg"
                        isActive={selectedEmail === 'resend'}
                        layerKey="email"
                        onclick={() => selectedEmail = 'resend'}
                      />
                    </div>
                  </div>
                </div>

              {:else if activeStep === 5}
                <!-- Step 6: DevOps y Calidad -->
                <div class="space-y-4" transition:fade={{ duration: 120 }}>
                  {#each getInfrastructureOptions(lang) as option}
                    <!-- Skip turborepo since it is managed in step 1 -->
                    {#if option.id !== 'turborepo'}
                      <ExtraCard
                        title={option.title}
                        description={option.description}
                        iconComponent={option.iconComponent}
                        lucideIcon={option.lucideIcon}
                        isActive={isInfraActive(option.bindingKey)}
                        isLocked={option.isLocked}
                        onclick={() => toggleInfra(option.bindingKey)}
                      />
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>

            <!-- Subtle bottom shadow/gradient indicating more scrollable content -->
            <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-bg-base via-bg-base/60 to-transparent rounded-b-xl"></div>
          </div>
        </div>

        <!-- Stepper Navigation Controls -->
        <div class="flex items-center justify-between pt-5 border-t border-border-subtle/30 mt-6 select-none">
          <button
            type="button"
            onclick={() => changeStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            class="px-4 py-2 border border-border-subtle rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-surface hover:text-text-main text-text-muted flex items-center gap-1.5"
          >
            <ArrowLeft size={12} />
            <span>{lang === 'es' ? 'Atrás' : 'Back'}</span>
          </button>
          
          <div class="hidden sm:flex gap-1.5">
            {#each steps as _, idx}
              <button
                type="button"
                onclick={() => changeStep(idx)}
                class="w-1.5 h-1.5 rounded-full transition-all duration-300 {activeStep === idx ? 'bg-brand-primary w-5' : 'bg-border-subtle hover:bg-text-muted/40'}" 
                aria-label="Ir al paso {idx + 1}"
              ></button>
            {/each}
          </div>

          <button
            type="button"
            onclick={() => changeStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            class="px-4 py-2 bg-brand-primary text-white border border-transparent rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-primary/95 flex items-center gap-1.5"
          >
            <span>{lang === 'es' ? 'Siguiente' : 'Next'}</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  {:else}
    <!-- EXPANDED/SCROLL LAYOUT -->
    <div class="space-y-8" transition:fade={{ duration: 150 }}>
      <!-- Project Name Input -->
      <div class="rounded-3xl border border-border-subtle bg-bg-surface/30 p-6 backdrop-blur-md shadow-xs hover:border-brand-primary/25 transition-all duration-300">
        <label for="pname-exp" class="block text-xs font-extrabold uppercase tracking-widest text-text-muted mb-3.5 select-none border-l-3 border-brand-primary pl-3">
          {t.projectNameLabel}
        </label>
        <div class="relative flex items-center bg-bg-base border border-border-subtle rounded-xl px-4 py-3.5 hover:border-brand-primary/40 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10 transition-all duration-300">
          <Settings size={18} class="text-brand-primary/70 mr-3 animate-pulse" aria-hidden="true" />
          <input
            id="pname-exp"
            type="text"
            bind:value={projectName}
            placeholder="my-koko-app"
            class="w-full bg-transparent border-none outline-none text-base text-text-main placeholder-text-muted/40 p-0 focus:ring-0 font-mono font-bold tracking-wide"
          />
        </div>
      </div>

      <!-- Technology Layers mapped dynamically (including email) -->
      {#each getLayers(lang) as layer}
        {@const LayerIcon = layer.icon}
        <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-6 backdrop-blur-xs shadow-sm space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-border-subtle/50 select-none">
            <div class="flex items-center gap-2.5">
              <LayerIcon size={18} class="{layer.colorClass}" aria-hidden="true" />
              <span class="text-sm font-bold uppercase tracking-widest text-text-main">{layer.label}</span>
            </div>
            <span class="text-xs {layer.colorClass} font-bold font-mono">{layer.step}</span>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {#each layer.options as opt}
              {@const isActive = layer.key === 'tools' ? isToolActive(opt.id) : getSelectedId(layer.key) === opt.id}
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
                onclick={() => !isDisabled && (layer.key === 'tools' ? toggleTool(opt.id) : setSelectedId(layer.key, opt.id))}
              />
            {/each}
          </div>
        </div>
      {/each}

      <!-- Infrastructure / Quality Add-ons mapped dynamically -->
      <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-6 backdrop-blur-xs shadow-sm space-y-6">
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
              isActive={option.isLocked ? true : isInfraActive(option.bindingKey)}
              isLocked={option.isLocked}
              onclick={() => toggleInfra(option.bindingKey)}
            />
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
