<script lang="ts">
  import { Settings } from '@lucide/svelte';
  import { getLayers, getInfrastructureOptions } from './builderData';
  import TechCard from './TechCard.svelte';
  import ExtraCard from './ExtraCard.svelte';

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

  let isRecipesOpen = $state(false);

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

  const SvglNextjsLogo = '/logos/nextjs.svg';
  const SvglReactLogo = '/logos/react.svg';
  const SvglSvelteLogo = '/logos/svelte.svg';
  const SvglNodejsLogo = '/logos/nodejs.svg';
  const SvglPostgreSQLLogo = '/logos/postgresql.svg';
  const SvglMongoDBLogo = '/logos/mongodb.svg';
  const SvglNestJSLogo = '/logos/nestjs.svg';
  const SvglPythonLogo = '/logos/python.svg';

  const templates = [
    {
      id: 'saas-next',
      nameEs: 'Boilerplate SaaS Next.js',
      nameEn: 'SaaS Next.js Boilerplate',
      descEs: 'Next.js + Go Fiber + Prisma + Better-Auth + Stripe. La receta definitiva para lanzar un SaaS.',
      descEn: 'Next.js + Go Fiber + Prisma + Better-Auth + Stripe. The ultimate recipe to launch a SaaS.',
      icon: SvglNextjsLogo,
      config: {
        selectedFront: 'nextjs',
        selectedNativeFront: 'none',
        selectedBack: 'go',
        selectedDb: 'prisma',
        selectedAuth: 'better-auth',
        selectedPackageManager: 'pnpm',
        selectedTools: 'zod',
        selectedPayments: 'stripe',
        selectedEmail: 'resend',
        withDocker: true,
        withTurborepo: true
      }
    },
    {
      id: 'fullstack-svelte',
      nameEs: 'Full-Stack Svelte 5 + NestJS',
      nameEn: 'Svelte 5 + NestJS Fullstack',
      descEs: 'SvelteKit + NestJS + Drizzle + Better-Auth. Ideal para monorepos con reactividad extrema.',
      descEn: 'SvelteKit + NestJS + Drizzle + Better-Auth. Ideal for monorepos with extreme reactivity.',
      icon: SvglSvelteLogo,
      config: {
        selectedFront: 'sveltekit',
        selectedNativeFront: 'none',
        selectedBack: 'nestjs',
        selectedDb: 'drizzle',
        selectedAuth: 'better-auth',
        selectedPackageManager: 'pnpm',
        selectedTools: 'zod',
        selectedPayments: 'stripe',
        selectedEmail: 'resend',
        withDocker: true,
        withTurborepo: true
      }
    },
    {
      id: 'mern',
      nameEs: 'MERN Stack Clásico',
      nameEn: 'Classic MERN Stack',
      descEs: 'React SPA + Node.js Express + MongoDB. El stack legendario para aplicaciones web modernas.',
      descEn: 'React SPA + Node.js Express + MongoDB. The legendary stack for modern web applications.',
      icon: SvglMongoDBLogo,
      config: {
        selectedFront: 'react',
        selectedNativeFront: 'none',
        selectedBack: 'node',
        selectedDb: 'mongo',
        selectedAuth: 'better-auth',
        selectedPackageManager: 'npm',
        selectedTools: 'zod',
        selectedPayments: 'none',
        selectedEmail: 'none',
        withDocker: true,
        withTurborepo: false
      }
    },
    {
      id: 'pern',
      nameEs: 'PERN Stack Moderno',
      nameEn: 'Modern PERN Stack',
      descEs: 'React SPA + Node.js Express + PostgreSQL (Prisma). Una base sólida y relacional para escalar.',
      descEn: 'React SPA + Node.js Express + PostgreSQL (Prisma). A solid relational foundation to scale.',
      icon: SvglPostgreSQLLogo,
      config: {
        selectedFront: 'react',
        selectedNativeFront: 'none',
        selectedBack: 'node',
        selectedDb: 'prisma',
        selectedAuth: 'better-auth',
        selectedPackageManager: 'pnpm',
        selectedTools: 'zod',
        selectedPayments: 'none',
        selectedEmail: 'none',
        withDocker: true,
        withTurborepo: false
      }
    },
    {
      id: 'python-fastapi',
      nameEs: 'FastAPI + React SPA',
      nameEn: 'FastAPI + React SPA',
      descEs: 'React SPA + Python FastAPI + Supabase Auth. Un stack liviano ideal para análisis de datos.',
      descEn: 'React SPA + Python FastAPI + Supabase Auth. A lightweight stack ideal for data analysis.',
      icon: SvglPythonLogo,
      config: {
        selectedFront: 'react',
        selectedNativeFront: 'none',
        selectedBack: 'python',
        selectedDb: 'none',
        selectedAuth: 'supabase',
        selectedPackageManager: 'npm',
        selectedTools: 'zod',
        selectedPayments: 'none',
        selectedEmail: 'none',
        withDocker: true,
        withTurborepo: false
      }
    },
    {
      id: 'mobile-go',
      nameEs: 'Mobile React Native + Go',
      nameEn: 'Mobile React Native + Go',
      descEs: 'Aplicación nativa móvil con React Native + backend de alto rendimiento en Go Fiber.',
      descEn: 'Native mobile app with React Native + high performance Go Fiber backend api.',
      icon: SvglReactLogo,
      config: {
        selectedFront: 'none',
        selectedNativeFront: 'expo-bare',
        selectedBack: 'go',
        selectedDb: 'sqlx',
        selectedAuth: 'supabase',
        selectedPackageManager: 'bun',
        selectedTools: 'zod',
        selectedPayments: 'none',
        selectedEmail: 'none',
        withDocker: true,
        withTurborepo: true
      }
    }
  ];

  function applyTemplate(config: any) {
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
  }

  // Translations
  const t = $derived({
    es: {
      projectNameLabel: 'Nombre del Proyecto',
      extrasLabel: 'Infraestructura y Calidad de Código',
      templatesLabel: 'Estructuras Pre-Hechas (Recetas)',
      templatesSubtitle: 'Selecciona una configuración inicial recomendada para acelerar el desarrollo.',
      none: 'Ninguno'
    },
    en: {
      projectNameLabel: 'Project Name',
      extrasLabel: 'Infrastructure & Code Quality',
      templatesLabel: 'Pre-made Templates (Recipes)',
      templatesSubtitle: 'Select a recommended bootstrap configuration to accelerate setup.',
      none: 'None'
    }
  }[lang] || t.es);

  let activeTab = $state<'manual' | 'presets'>('manual');
</script>

<style>
  .notebook-wrapper {
    position: relative;
    z-index: 10;
  }

  .tabs-container {
    display: flex;
    gap: 0.25rem;
    margin-bottom: -1px; /* Overlaps border of the container below */
    position: relative;
    z-index: 20;
  }

  .tab-btn {
    background-color: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.75rem 1.75rem;
    border-radius: 0.75rem 0.75rem 0 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tab-btn:hover {
    color: var(--text-main);
    background-color: var(--bg-base);
  }

  .tab-btn.active {
    background-color: var(--bg-base);
    color: var(--brand-primary);
    border-bottom: 1px solid var(--bg-base); /* Fuses with base card background */
    font-weight: 800;
    box-shadow: 0 -2px 10px rgba(90, 79, 196, 0.05);
  }

  .notebook-column {
    position: relative;
    width: 100%;
    background-color: var(--bg-base);
    border: 1px solid var(--border-subtle);
    border-radius: 0 1.25rem 1.25rem 1.25rem;
    padding: 2rem;
    box-shadow: 0 10px 30px -10px rgba(90, 79, 196, 0.08);
  }

  @media (max-width: 640px) {
    .notebook-column {
      border-radius: 1.25rem;
      padding: 1.25rem;
    }
  }
</style>

<div class="notebook-wrapper">
  <!-- Tabs connecting to the background container below -->
  <div class="tabs-container">
    <button
      type="button"
      class="tab-btn"
      class:active={activeTab === 'manual'}
      onclick={() => activeTab = 'manual'}
    >
      ⚙️ {lang === 'es' ? 'Manual' : 'Manual'}
    </button>
    <button
      type="button"
      class="tab-btn"
      class:active={activeTab === 'presets'}
      onclick={() => activeTab = 'presets'}
    >
      📁 {lang === 'es' ? 'Recetas (Presets)' : 'Presets (Recipes)'}
    </button>
  </div>

  <div class="notebook-column">
    {#if activeTab === 'presets'}
      <!-- PRESETS VIEW -->
      <div class="space-y-6">
        <div class="border-l-2 border-brand-primary pl-2.5 mb-6">
          <span class="block text-sm font-bold uppercase tracking-widest text-text-main">{t.templatesLabel}</span>
          <span class="block text-xs text-text-muted mt-1">{t.templatesSubtitle}</span>
        </div>
        
        <div class="grid grid-cols-1 gap-5">
          {#each templates as template}
            <button
              type="button"
              onclick={() => {
                applyTemplate(template.config);
                activeTab = 'manual'; // Auto-switch back to let them customize or see the stack
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
                  <span class="block text-base font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">
                    {lang === 'es' ? template.nameEs : template.nameEn}
                  </span>
                  <span class="block text-xs sm:text-sm text-text-muted leading-relaxed">
                    {lang === 'es' ? template.descEs : template.descEn}
                  </span>
                </div>
              </div>
              <div class="shrink-0 px-4 py-2 bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white rounded-xl text-xs font-bold transition-all">
                {lang === 'es' ? 'Usar Receta' : 'Use Recipe'} &rarr;
              </div>
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <!-- MANUAL STEP CONFIGURATION -->
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
    {/if}
  </div>
</div>
