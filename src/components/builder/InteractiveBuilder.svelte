<script lang="ts">
  import { onMount } from 'svelte';
  import { templates } from '@/data/templates.data';
  import VisualControls from '@/components/builder/VisualControls.svelte';
  import VisualPreview from '@/components/builder/VisualPreview.svelte';
  import { Terminal, Folder, FileCode, Check, Copy, Settings, Cpu, Database, Blocks } from '@lucide/svelte';

  let { lang = 'es' } = $props<{ lang?: string }>();

  import { getLayers, getInfrastructureOptions } from '@/data/builder.data';

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

  // State variables
  let projectName = $state('my-koko-app');
  let selectedCommandType = $state('wrapper');
  let selectedFront = $state(getDefault('frontend', 'next'));
  let selectedNativeFront = $state(getDefault('native_frontend', 'none'));
  let selectedBack = $state(getDefault('backend', 'hono'));
  let selectedOrm = $state(getDefault('orm', 'drizzle'));
  let selectedApi = $state(getDefault('api', 'trpc'));
  let selectedDb = $state(getDefault('db', 'postgres'));
  let selectedAuth = $state(getDefault('auth', 'better-auth'));
  let selectedPackageManager = $state(getDefault('package_manager', 'pnpm'));
  let selectedTools = $state(getDefault('tools', 'zod'));
  const hasValidator = $derived(selectedTools.split(',').includes('zod') || selectedTools.split(',').includes('valibot'));
  let selectedPayments = $state(getDefault('payments', 'none'));
  let selectedEmail = $state(getDefault('email', 'none'));
  let withDocker = $state(isInfraDefault('docker', true));
  let withCi = $state(isInfraDefault('ci', false));
  let withLinter = $state(isInfraDefault('linter', false));
  let withTesting = $state(isInfraDefault('testing', false));
  let withTurborepo = $state(true);

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const presetId = params.get('preset');
    if (presetId) {
      const template = templates.find(t => t.id === presetId);
      if (template) {
        projectName = 'my-koko-app';
        selectedFront = template.config.selectedFront;
        selectedNativeFront = template.config.selectedNativeFront;
        selectedBack = template.config.selectedBack;
        selectedDb = template.config.selectedDb;
        selectedAuth = template.config.selectedAuth;
        selectedPackageManager = template.config.selectedPackageManager;
        selectedTools = template.config.selectedTools;
        selectedPayments = template.config.selectedPayments;
        selectedEmail = template.config.selectedEmail || 'none';
        withDocker = template.config.withDocker;
        withTurborepo = true;
        if (template.config.selectedOrm !== undefined) selectedOrm = template.config.selectedOrm;
        if (template.config.selectedApi !== undefined) selectedApi = template.config.selectedApi;
        withCi = template.config.withCi || false;
        withLinter = template.config.withLinter || false;
        withTesting = template.config.withTesting || false;
      }
    } else {
      if (params.has('frontend')) selectedFront = params.get('frontend')!;
      else if (params.has('front')) selectedFront = params.get('front')!;
      if (params.has('mobile')) selectedNativeFront = params.get('mobile')!;
      if (params.has('backend')) selectedBack = params.get('backend')!;
      else if (params.has('back')) selectedBack = params.get('back')!;
      if (params.has('orm')) selectedOrm = params.get('orm')!;
      if (params.has('api')) selectedApi = params.get('api')!;
      if (params.has('database')) selectedDb = params.get('database')!;
      else if (params.has('db')) selectedDb = params.get('db')!;
      if (params.has('auth')) selectedAuth = params.get('auth')!;
      if (params.has('package-manager')) selectedPackageManager = params.get('package-manager')!;
      else if (params.has('pm')) selectedPackageManager = params.get('pm')!;
      if (params.has('addons')) selectedTools = params.get('addons')!;
      else if (params.has('tools')) selectedTools = params.get('tools')!;
      if (params.has('payments')) selectedPayments = params.get('payments')!;
      if (params.has('email')) selectedEmail = params.get('email')!;
      if (params.has('docker')) withDocker = params.get('docker') === 'true';
      if (params.has('ci')) withCi = params.get('ci') === 'true';
      if (params.has('linter')) withLinter = params.get('linter') === 'true';
      if (params.has('test')) withTesting = params.get('test') === 'true';
      withTurborepo = true;
    }
  });

  // Reactively auto-resolve selection conflicts (Cascading Rules)
  $effect(() => {
    const FULLSTACK_FRONTENDS = ['next', 'tanstack-start', 'nuxt', 'svelte', 'astro'];
    const isFullstack = selectedBack === 'self';
    const isNonJs = ['go', 'fastapi', 'spring'].includes(selectedBack);

    // 1. Turborepo always active
    if (!withTurborepo) {
      withTurborepo = true;
    }

    // 2. If no backend (frontend-only mode), clean up backend-related layers
    if (selectedBack === 'none') {
      if (selectedDb !== 'none') selectedDb = 'none';
      if (selectedOrm !== 'none') selectedOrm = 'none';
      if (selectedApi !== 'none') selectedApi = 'none';
      if (selectedAuth !== 'none') selectedAuth = 'none';
      if (selectedPayments !== 'none') selectedPayments = 'none';
    }

    // 3. Backend 'self' (Monolithic) constraints
    if (selectedBack === 'self') {
      if (!FULLSTACK_FRONTENDS.includes(selectedFront)) {
        selectedFront = 'next';
      }
      if (selectedAuth === 'clerk' && !['next', 'tanstack-start'].includes(selectedFront)) {
        selectedAuth = 'better-auth';
      }
    }

    // 4. Non-JS backends MUST have api 'none'
    if (isNonJs) {
      if (selectedApi !== 'none') selectedApi = 'none';
    }

    // 5. Frontend restrictions for non-React against tRPC and Clerk
    if (['astro', 'nuxt', 'svelte', 'angular'].includes(selectedFront)) {
      if (selectedApi === 'trpc') selectedApi = 'orpc';
      if (selectedAuth === 'clerk') selectedAuth = 'better-auth';
    }

    // 6. DB <-> ORM cross dependency
    if (selectedDb === 'none') {
      if (selectedOrm !== 'none') selectedOrm = 'none';
    } else if (selectedDb === 'mongodb') {
      if (selectedOrm !== 'mongoose' && selectedOrm !== 'prisma') {
        selectedOrm = 'mongoose';
      }
    } else {
      // SQL DBs
      if (selectedOrm === 'mongoose') {
        selectedOrm = 'drizzle';
      } else if (selectedOrm === 'none') {
        selectedOrm = 'drizzle';
      }
    }

    // 7. Auth <-> Payments
    if (selectedAuth === 'none') {
      if (selectedPayments !== 'none') selectedPayments = 'none';
    } else if (selectedPayments === 'polar' && selectedAuth !== 'better-auth') {
      selectedPayments = 'none';
    }

    // 8. Tools & shadcn
    if (selectedFront === 'none' && selectedTools.split(',').includes('shadcn')) {
      const remaining = selectedTools.split(',').filter(t => t !== 'shadcn');
      selectedTools = remaining.length > 0 ? remaining.join(',') : 'none';
    }
  });

  const selectedTechOptions = $derived.by(() => {
    const list: Array<{ layerKey: string; id: string; name: string; iconComponent: any }> = [];
    const layers = getLayers('es');
    const infraOptions = getInfrastructureOptions('es');

    const singleLayers = [
      { key: 'frontend', id: selectedFront },
      { key: 'native_frontend', id: selectedNativeFront },
      { key: 'backend', id: selectedBack },
      { key: 'orm', id: selectedOrm },
      { key: 'api', id: selectedApi },
      { key: 'auth', id: selectedAuth },
      { key: 'db', id: selectedDb },
      { key: 'package_manager', id: selectedPackageManager },
      { key: 'payments', id: selectedPayments },
      { key: 'email', id: selectedEmail }
    ];

    for (const item of singleLayers) {
      const layer = layers.find(l => l.key === item.key);
      const option = layer?.options.find(o => o.id === item.id);
      if (option && !option.isNone) {
        list.push({
          layerKey: item.key,
          id: option.id,
          name: option.name,
          iconComponent: option.iconComponent
        });
      }
    }

    // Multi-selection tools
    const toolsLayer = layers.find(l => l.key === 'tools');
    if (toolsLayer && selectedTools && selectedTools !== 'none') {
      const toolIds = selectedTools.split(',').filter(Boolean);
      for (const toolId of toolIds) {
        const option = toolsLayer.options.find(o => o.id === toolId);
        if (option && !option.isNone) {
          list.push({
            layerKey: 'tools',
            id: option.id,
            name: option.name,
            iconComponent: option.iconComponent
          });
        }
      }
    }

    // Infrastructure options mapped to their boolean state
    const infraList = [
      { id: 'docker', active: withDocker },
      { id: 'ci', active: withCi },
      { id: 'linter', active: withLinter },
      { id: 'testing', active: withTesting },
      { id: 'turborepo', active: withTurborepo }
    ];

    for (const item of infraList) {
      if (item.active) {
        const opt = infraOptions.find(o => o.id === item.id);
        if (opt) {
          list.push({
            layerKey: item.id,
            id: opt.id,
            name: opt.title,
            iconComponent: opt.iconComponent
          });
        }
      }
    }

    return list;
  });

  function removeTech(layerKey: string, id?: string) {
    if (layerKey === 'frontend') selectedFront = 'none';
    else if (layerKey === 'native_frontend') selectedNativeFront = 'none';
    else if (layerKey === 'backend') selectedBack = 'none';
    else if (layerKey === 'orm') selectedOrm = 'none';
    else if (layerKey === 'api') selectedApi = 'none';
    else if (layerKey === 'auth') selectedAuth = 'none';
    else if (layerKey === 'db') selectedDb = 'none';
    else if (layerKey === 'package_manager') selectedPackageManager = 'none';
    else if (layerKey === 'tools') {
      if (id) {
        const tools = selectedTools.split(',').filter(t => t && t !== id);
        selectedTools = tools.length > 0 ? tools.join(',') : 'none';
      } else {
        selectedTools = 'none';
      }
    }
    else if (layerKey === 'payments') selectedPayments = 'none';
    else if (layerKey === 'email') selectedEmail = 'none';
    // Infrastructure options
    else if (layerKey === 'docker') withDocker = false;
    else if (layerKey === 'ci') withCi = false;
    else if (layerKey === 'linter') withLinter = false;
    else if (layerKey === 'testing') withTesting = false;
    // Turborepo is always true
  }

  let isCopied = $state(false);

  // Translations
  const translations = {
    es: {
      title: 'Constructor Visual de Stack',
      subtitle: 'Personaliza cada capa de tu aplicación y genera la receta exacta para inicializar tu repositorio con un solo comando de terminal.',
      projectNameLabel: 'Nombre del Proyecto',
      frontendLabel: 'Capa Frontend (Cliente)',
      backendLabel: 'Motor Backend (Servidor)',
      dbLabel: 'Base de Datos y ORM',
      extrasLabel: 'Infraestructura y Calidad de Código',
      commandLabel: 'Ejecuta este comando en tu terminal:',
      copyBtn: 'Copiar comando',
      copiedBtn: '¡Copiado!',
      structureTitle: 'Estructura de Directorios Generada',
      recipeTitle: 'Configuración de Receta',
      dockerLabel: 'Configurar contenedor Docker Compose local',
      ciLabel: 'Configurar GitHub Actions para CI/CD',
      linterLabel: 'Añadir reglas de Biome / ESLint standard',
      testingLabel: 'Configurar entorno de Testing unitario',
      none: 'Ninguno',
      selected: 'Seleccionado'
    },
    en: {
      title: 'Visual Stack Builder',
      subtitle: 'Customize every layer of your application and generate the exact recipe to bootstrap your repository with a single terminal command.',
      projectNameLabel: 'Project Name',
      frontendLabel: 'Frontend Layer (Client)',
      backendLabel: 'Backend Engine (Server)',
      dbLabel: 'Database & ORM',
      extrasLabel: 'Infrastructure & Code Quality',
      commandLabel: 'Run this command in your terminal:',
      copyBtn: 'Copy command',
      copiedBtn: 'Copied!',
      structureTitle: 'Generated Directory Structure',
      recipeTitle: 'Recipe Settings',
      dockerLabel: 'Configure local Docker Compose container',
      ciLabel: 'Configure GitHub Actions for CI/CD',
      linterLabel: 'Add standard Biome / ESLint rules',
      testingLabel: 'Set up unit testing environment',
      none: 'None',
      selected: 'Selected'
    }
  };

  const t = $derived(lang === 'en' ? translations.en : translations.es);

  // Computes the dynamic command based on state (Strictly aligned with Koko-CLI flags)
  const generatedCommand = $derived.by(() => {
    let cmd = '';
    const name = projectName || 'my-koko-app';
    
    if (selectedCommandType === 'wrapper') {
      if (selectedPackageManager === 'npm') {
        cmd = `npx koko-app init ${name}`;
      } else if (selectedPackageManager === 'bun') {
        cmd = `bunx koko-app init ${name}`;
      } else if (selectedPackageManager === 'yarn') {
        cmd = `yarn dlx koko-app init ${name}`;
      } else { // pnpm or default
        cmd = `pnpm dlx koko-app init ${name}`;
      }
    } else if (selectedCommandType === 'binary') {
      cmd = `koko init ${name}`;
    } else { // 'go'
      cmd = `go run github.com/BlasVernazza06/koko-cli@latest init ${name}`;
    }

    // Resolve frontend flag value (koko-cli: nextjs, react, nuxt, svelte, astro, native, none)
    let frontVal = selectedFront;
    if (frontVal === 'next') frontVal = 'nextjs';
    else if (frontVal === 'tanstack-router' || frontVal === 'tanstack-start' || frontVal === 'react-router') frontVal = 'react';
    if (selectedFront === 'none' && selectedNativeFront !== 'none') {
      frontVal = 'native';
    }

    if (frontVal !== 'none' && frontVal !== '') {
      cmd += ` --frontend ${frontVal}`;
    }

    // Resolve backend flag value (koko-cli: express, hono, fastapi, go_chi, spring_boot, nestjs, self, none)
    if (selectedBack !== 'none' && selectedBack !== '') {
      let backVal = selectedBack;
      if (backVal === 'spring') backVal = 'spring_boot';
      else if (backVal === 'go') backVal = 'go_chi';
      cmd += ` --backend ${backVal}`;
    }

    if (selectedApi !== 'none' && selectedApi !== '') {
      cmd += ` --api ${selectedApi}`;
    }

    if (selectedPackageManager !== 'none' && selectedPackageManager !== '') {
      cmd += ` --package-manager ${selectedPackageManager}`;
    }

    if (selectedDb !== 'none' && selectedDb !== '') {
      cmd += ` --database ${selectedDb}`;
    }

    if (selectedOrm !== 'none' && selectedOrm !== '') {
      cmd += ` --orm ${selectedOrm}`;
    }

    if (selectedAuth !== 'none' && selectedAuth !== '') {
      let authVal = selectedAuth;
      if (authVal === 'authjs') authVal = 'next-auth';
      cmd += ` --auth ${authVal}`;
    }

    // Collect all addons into single --addons flag supported by koko-cli
    const addonsList: string[] = [];
    if (selectedTools && selectedTools !== 'none') {
      const toolIds = selectedTools.split(',').map(s => s.trim()).filter(Boolean);
      for (const t of toolIds) {
        if (['shadcn', 'lucide', 'svgl', 'motion', 'zod'].includes(t) && !addonsList.includes(t)) {
          addonsList.push(t);
        }
      }
    }
    if (selectedPayments !== 'none' && ['stripe', 'polar'].includes(selectedPayments) && !addonsList.includes(selectedPayments)) {
      addonsList.push(selectedPayments);
    }
    if (selectedEmail !== 'none' && ['resend', 'brevo'].includes(selectedEmail) && !addonsList.includes(selectedEmail)) {
      addonsList.push(selectedEmail);
    }
    if (withDocker && !addonsList.includes('docker')) {
      addonsList.push('docker');
    }
    if (withCi && !addonsList.includes('github_actions')) {
      addonsList.push('github_actions');
    }

    if (addonsList.length > 0) {
      cmd += ` --addons ${addonsList.join(',')}`;
    }

    return cmd;
  });

  // Computes directory structure preview dynamically
  const structurePreview = $derived.by(() => {
    let tree: Array<{ type: string; name: string; depth?: number; highlight?: string }> = [
      { type: 'dir', depth: 0, name: `${projectName || 'my-koko-app'}/` }
    ];

    if (withTurborepo) {
      tree.push({ type: 'file', depth: 1, name: 'turbo.json', highlight: 'text-brand-primary font-bold' });
      tree.push({ type: 'file', depth: 1, name: 'package.json' });
      tree.push({ type: 'file', depth: 1, name: selectedPackageManager === 'pnpm' ? 'pnpm-workspace.yaml' : 'package-lock.json' });
      tree.push({ type: 'file', depth: 1, name: 'koko.config.json', highlight: 'text-brand-primary font-bold' });

      if (withDocker) {
        tree.push({ type: 'file', depth: 1, name: 'docker-compose.yml', highlight: 'text-brand-primary' });
      }
      if (withCi) {
        tree.push({ type: 'dir', depth: 1, name: '.github/' });
        tree.push({ type: 'dir', depth: 2, name: 'workflows/' });
        tree.push({ type: 'file', depth: 3, name: 'ci.yml' });
      }
      if (withLinter) {
        tree.push({ type: 'file', depth: 1, name: 'biome.json', highlight: 'text-brand-secondary' });
      }
      if (withTesting) {
        tree.push({ type: 'file', depth: 1, name: 'vitest.config.ts' });
      }

      // ================= apps/ =================
      tree.push({ type: 'dir', depth: 1, name: 'apps/' });

      // Web Frontend
      if (selectedFront !== 'none') {
        tree.push({ type: 'dir', depth: 2, name: `web/ [${selectedFront}]` });
        tree.push({ type: 'file', depth: 3, name: 'package.json' });
        tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });

        if (selectedFront === 'next') {
          tree.push({ type: 'file', depth: 3, name: 'next.config.ts' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'dir', depth: 4, name: 'app/' });
          tree.push({ type: 'file', depth: 5, name: 'layout.tsx', highlight: 'text-brand-secondary' });
          tree.push({ type: 'file', depth: 5, name: 'page.tsx', highlight: 'text-brand-primary' });
          tree.push({ type: 'file', depth: 5, name: 'globals.css' });
          if (selectedBack === 'self') {
            tree.push({ type: 'dir', depth: 5, name: 'api/health/' });
            tree.push({ type: 'file', depth: 6, name: 'route.ts' });
          }
          tree.push({ type: 'dir', depth: 4, name: 'components/' });
          if (selectedTools.includes('shadcn')) {
            tree.push({ type: 'file', depth: 5, name: 'ui/button.tsx' });
          }
          tree.push({ type: 'file', depth: 5, name: 'Navbar.tsx' });
        } else if (selectedFront === 'tanstack-start') {
          tree.push({ type: 'file', depth: 3, name: 'app.config.ts' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'dir', depth: 4, name: 'routes/' });
          tree.push({ type: 'file', depth: 5, name: '__root.tsx', highlight: 'text-brand-secondary' });
          tree.push({ type: 'file', depth: 5, name: 'index.tsx', highlight: 'text-brand-primary' });
          if (selectedBack === 'self') {
            tree.push({ type: 'file', depth: 5, name: 'api.health.ts' });
          }
          tree.push({ type: 'dir', depth: 4, name: 'components/' });
        } else if (selectedFront === 'tanstack-router' || selectedFront === 'react-router') {
          tree.push({ type: 'file', depth: 3, name: 'vite.config.ts' });
          tree.push({ type: 'file', depth: 3, name: 'index.html' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'main.tsx' });
          tree.push({ type: 'file', depth: 4, name: 'App.tsx', highlight: 'text-brand-primary' });
          tree.push({ type: 'file', depth: 4, name: 'App.css' });
          tree.push({ type: 'dir', depth: 4, name: 'components/' });
          tree.push({ type: 'file', depth: 5, name: 'Header.tsx' });
        } else if (selectedFront === 'svelte') {
          if (selectedBack === 'self') {
            tree.push({ type: 'file', depth: 3, name: 'svelte.config.js' });
            tree.push({ type: 'dir', depth: 3, name: 'src/' });
            tree.push({ type: 'dir', depth: 4, name: 'routes/' });
            tree.push({ type: 'file', depth: 5, name: '+layout.svelte' });
            tree.push({ type: 'file', depth: 5, name: '+page.svelte', highlight: 'text-brand-primary' });
            tree.push({ type: 'dir', depth: 5, name: 'api/health/' });
            tree.push({ type: 'file', depth: 6, name: '+server.ts' });
            tree.push({ type: 'file', depth: 4, name: 'app.html' });
          } else {
            tree.push({ type: 'file', depth: 3, name: 'vite.config.ts' });
            tree.push({ type: 'dir', depth: 3, name: 'src/' });
            tree.push({ type: 'file', depth: 4, name: 'main.ts' });
            tree.push({ type: 'file', depth: 4, name: 'App.svelte', highlight: 'text-brand-primary' });
          }
        } else if (selectedFront === 'nuxt') {
          tree.push({ type: 'file', depth: 3, name: 'nuxt.config.ts' });
          tree.push({ type: 'file', depth: 3, name: 'app.vue', highlight: 'text-brand-primary' });
          tree.push({ type: 'dir', depth: 3, name: 'pages/' });
          tree.push({ type: 'file', depth: 4, name: 'index.vue' });
          if (selectedBack === 'self') {
            tree.push({ type: 'dir', depth: 3, name: 'server/api/' });
            tree.push({ type: 'file', depth: 4, name: 'health.ts' });
          }
        } else if (selectedFront === 'astro') {
          tree.push({ type: 'file', depth: 3, name: 'astro.config.mjs' });
          tree.push({ type: 'dir', depth: 3, name: 'src/pages/' });
          tree.push({ type: 'file', depth: 4, name: 'index.astro', highlight: 'text-brand-primary' });
          if (selectedBack === 'self') {
            tree.push({ type: 'file', depth: 4, name: 'api/health.ts' });
          }
        } else if (selectedFront === 'angular') {
          tree.push({ type: 'file', depth: 3, name: 'angular.json' });
          tree.push({ type: 'dir', depth: 3, name: 'src/app/' });
          tree.push({ type: 'file', depth: 4, name: 'app.component.ts', highlight: 'text-brand-primary' });
        }
      }

      // Native Mobile Client
      if (selectedNativeFront && selectedNativeFront !== 'none') {
        tree.push({ type: 'dir', depth: 2, name: `mobile/ [${selectedNativeFront}]` });
        tree.push({ type: 'file', depth: 3, name: 'package.json' });
        tree.push({ type: 'file', depth: 3, name: 'app.json' });
        tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });
        tree.push({ type: 'dir', depth: 3, name: 'app/' });
        tree.push({ type: 'file', depth: 4, name: '_layout.tsx', highlight: 'text-brand-secondary' });
        tree.push({ type: 'file', depth: 4, name: 'index.tsx', highlight: 'text-brand-primary' });
        tree.push({ type: 'dir', depth: 3, name: 'components/' });
        tree.push({ type: 'file', depth: 4, name: 'ScreenView.tsx' });
      }

      // Backend API Service (dedicated servers only)
      if (selectedBack !== 'none' && selectedBack !== 'self') {
        let bname = selectedBack;
        if (selectedBack === 'go') bname = 'go-fiber';
        if (selectedBack === 'spring') bname = 'spring-boot';
        if (selectedBack === 'fastapi') bname = 'fastapi';
        if (selectedBack === 'nestjs') bname = 'nestjs';

        tree.push({ type: 'dir', depth: 2, name: `api/ [${bname}]` });

        if (selectedBack === 'spring') {
          tree.push({ type: 'file', depth: 3, name: 'pom.xml', highlight: 'text-brand-secondary font-bold' });
          tree.push({ type: 'dir', depth: 3, name: 'src/main/java/com/koko/api/' });
          tree.push({ type: 'file', depth: 4, name: 'Application.java', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'file', depth: 4, name: 'controller/ApiController.java' });
          tree.push({ type: 'file', depth: 4, name: 'service/UserService.java' });
          tree.push({ type: 'file', depth: 4, name: 'model/User.java' });
          tree.push({ type: 'dir', depth: 3, name: 'src/main/resources/' });
          tree.push({ type: 'file', depth: 4, name: 'application.yml' });
        } else if (selectedBack === 'go') {
          tree.push({ type: 'file', depth: 3, name: 'go.mod', highlight: 'text-brand-secondary font-bold' });
          tree.push({ type: 'file', depth: 3, name: 'go.sum' });
          tree.push({ type: 'dir', depth: 3, name: 'cmd/api/' });
          tree.push({ type: 'file', depth: 4, name: 'main.go', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'dir', depth: 3, name: 'pkg/handlers/' });
          tree.push({ type: 'file', depth: 4, name: 'routes.go' });
          tree.push({ type: 'file', depth: 4, name: 'middleware.go' });
        } else if (selectedBack === 'fastapi') {
          tree.push({ type: 'file', depth: 3, name: 'requirements.txt', highlight: 'text-brand-secondary' });
          tree.push({ type: 'file', depth: 3, name: 'main.py', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'dir', depth: 3, name: 'routers/' });
          tree.push({ type: 'file', depth: 4, name: 'users.py' });
          tree.push({ type: 'file', depth: 4, name: 'health.py' });
          tree.push({ type: 'dir', depth: 3, name: 'core/' });
          tree.push({ type: 'file', depth: 4, name: 'config.py' });
        } else if (selectedBack === 'nestjs') {
          tree.push({ type: 'file', depth: 3, name: 'package.json' });
          tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });
          tree.push({ type: 'file', depth: 3, name: 'nest-cli.json' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'main.ts', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'file', depth: 4, name: 'app.module.ts' });
          tree.push({ type: 'file', depth: 4, name: 'app.controller.ts' });
          tree.push({ type: 'file', depth: 4, name: 'app.service.ts' });
        } else if (selectedBack === 'express' || selectedBack === 'node') {
          tree.push({ type: 'file', depth: 3, name: 'package.json' });
          tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'index.ts', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'dir', depth: 4, name: 'routes/' });
          tree.push({ type: 'file', depth: 5, name: 'api.ts' });
          tree.push({ type: 'dir', depth: 4, name: 'middleware/' });
          tree.push({ type: 'file', depth: 5, name: 'auth.ts' });
        } else if (selectedBack === 'hono') {
          tree.push({ type: 'file', depth: 3, name: 'package.json' });
          tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'index.ts', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'file', depth: 4, name: 'routes.ts' });
        } else if (selectedBack === 'fastify') {
          tree.push({ type: 'file', depth: 3, name: 'package.json' });
          tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'server.ts', highlight: 'text-brand-primary font-bold' });
        } else if (selectedBack === 'elysia') {
          tree.push({ type: 'file', depth: 3, name: 'package.json' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'index.ts', highlight: 'text-brand-primary font-bold' });
        } else if (selectedBack === 'convex') {
          tree.push({ type: 'dir', depth: 3, name: 'convex/' });
          tree.push({ type: 'file', depth: 4, name: 'schema.ts', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'file', depth: 4, name: 'users.ts' });
        }
      }

      // ================= packages/ =================
      tree.push({ type: 'dir', depth: 1, name: 'packages/' });

      // Database Package
      if (selectedDb !== 'none' || selectedOrm !== 'none') {
        tree.push({ type: 'dir', depth: 2, name: 'db/' });
        tree.push({ type: 'file', depth: 3, name: 'package.json' });
        tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });

        if (selectedOrm === 'drizzle') {
          tree.push({ type: 'file', depth: 3, name: 'drizzle.config.ts', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'schema.ts', highlight: 'text-brand-secondary font-bold' });
          tree.push({ type: 'file', depth: 4, name: 'client.ts' });
          tree.push({ type: 'dir', depth: 4, name: 'migrations/' });
          tree.push({ type: 'file', depth: 5, name: '0001_initial.sql' });
        } else if (selectedOrm === 'prisma') {
          tree.push({ type: 'dir', depth: 3, name: 'prisma/' });
          tree.push({ type: 'file', depth: 4, name: 'schema.prisma', highlight: 'text-brand-secondary font-bold' });
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'client.ts' });
          tree.push({ type: 'file', depth: 4, name: 'index.ts' });
        } else if (selectedOrm === 'mongoose' || selectedDb === 'mongodb') {
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'models/user.model.ts', highlight: 'text-brand-secondary font-bold' });
          tree.push({ type: 'file', depth: 4, name: 'connection.ts' });
        } else {
          tree.push({ type: 'dir', depth: 3, name: 'src/' });
          tree.push({ type: 'file', depth: 4, name: 'schema.sql', highlight: 'text-brand-secondary' });
          tree.push({ type: 'file', depth: 4, name: 'pool.ts' });
        }
      }

      // Auth Package
      if (selectedAuth !== 'none') {
        tree.push({ type: 'dir', depth: 2, name: 'auth/' });
        tree.push({ type: 'file', depth: 3, name: 'package.json' });
        tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });
        tree.push({ type: 'dir', depth: 3, name: 'src/' });

        if (selectedAuth === 'better-auth') {
          tree.push({ type: 'file', depth: 4, name: 'auth.ts', highlight: 'text-emerald-500 font-bold' });
          tree.push({ type: 'file', depth: 4, name: 'client.ts' });
        } else if (selectedAuth === 'clerk') {
          tree.push({ type: 'file', depth: 4, name: 'clerk.config.ts', highlight: 'text-emerald-500 font-bold' });
        } else if (selectedAuth === 'authjs') {
          tree.push({ type: 'file', depth: 4, name: 'auth.config.ts', highlight: 'text-emerald-500 font-bold' });
        } else if (selectedAuth === 'supabase') {
          tree.push({ type: 'file', depth: 4, name: 'supabase.client.ts', highlight: 'text-emerald-500 font-bold' });
        }
      }

      // Validator Package
      if (hasValidator) {
        tree.push({ type: 'dir', depth: 2, name: 'validator/' });
        tree.push({ type: 'file', depth: 3, name: 'package.json' });
        tree.push({ type: 'file', depth: 3, name: 'tsconfig.json' });
        tree.push({ type: 'dir', depth: 3, name: 'src/' });

        if (selectedTools.includes('zod')) {
          tree.push({ type: 'file', depth: 4, name: 'schemas/user.schema.ts', highlight: 'text-brand-secondary font-bold' });
        }
        if (selectedTools.includes('valibot')) {
          tree.push({ type: 'file', depth: 4, name: 'schemas/user.valibot.ts', highlight: 'text-brand-secondary font-bold' });
        }
        tree.push({ type: 'file', depth: 4, name: 'index.ts' });
      }

      // Payments Package
      if (selectedPayments !== 'none') {
        tree.push({ type: 'dir', depth: 2, name: 'payments/' });
        tree.push({ type: 'file', depth: 3, name: 'package.json' });
        tree.push({ type: 'dir', depth: 3, name: 'src/' });
        if (selectedPayments === 'stripe') {
          tree.push({ type: 'file', depth: 4, name: 'stripe.ts', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'file', depth: 4, name: 'webhooks.ts' });
        } else if (selectedPayments === 'polar') {
          tree.push({ type: 'file', depth: 4, name: 'polar.ts', highlight: 'text-brand-primary font-bold' });
        }
      }

      // Email Package
      if (selectedEmail !== 'none') {
        tree.push({ type: 'dir', depth: 2, name: 'email/' });
        tree.push({ type: 'file', depth: 3, name: 'package.json' });
        tree.push({ type: 'dir', depth: 3, name: 'src/' });
        if (selectedEmail === 'brevo') {
          tree.push({ type: 'file', depth: 4, name: 'brevo.ts', highlight: 'text-brand-primary font-bold' });
        } else {
          tree.push({ type: 'file', depth: 4, name: 'resend.ts', highlight: 'text-brand-primary font-bold' });
        }
        tree.push({ type: 'file', depth: 4, name: 'templates/welcome.tsx' });
      }

      // Shared Config Package
      tree.push({ type: 'dir', depth: 2, name: 'config/' });
      tree.push({ type: 'file', depth: 3, name: 'tsconfig.base.json' });
      tree.push({ type: 'file', depth: 3, name: 'biome.json', highlight: 'text-brand-secondary' });

    } else {
      // Standalone Structure (Single package repo)
      tree.push({ type: 'file', depth: 1, name: 'package.json' });
      tree.push({ type: 'file', depth: 1, name: 'tsconfig.json' });
      tree.push({ type: 'file', depth: 1, name: 'koko.config.json', highlight: 'text-brand-primary font-bold' });

      if (withDocker) {
        tree.push({ type: 'file', depth: 1, name: 'docker-compose.yml', highlight: 'text-brand-primary' });
      }
      if (withLinter) {
        tree.push({ type: 'file', depth: 1, name: 'biome.json', highlight: 'text-brand-secondary' });
      }
      if (withTesting) {
        tree.push({ type: 'file', depth: 1, name: 'vitest.config.ts' });
      }

      tree.push({ type: 'dir', depth: 1, name: 'src/' });

      if (selectedFront !== 'none') {
        tree.push({ type: 'dir', depth: 2, name: 'components/' });
        tree.push({ type: 'file', depth: 3, name: 'Navbar.tsx' });
        tree.push({ type: 'file', depth: 3, name: 'Hero.tsx' });
      }

      if (selectedBack !== 'none') {
        tree.push({ type: 'dir', depth: 2, name: 'routes/' });
        tree.push({ type: 'file', depth: 3, name: 'api.ts' });
      }

      if (selectedDb !== 'none') {
        if (selectedOrm === 'drizzle') {
          tree.push({ type: 'file', depth: 1, name: 'drizzle.config.ts', highlight: 'text-brand-primary font-bold' });
          tree.push({ type: 'dir', depth: 2, name: 'db/' });
          tree.push({ type: 'file', depth: 3, name: 'schema.ts', highlight: 'text-brand-secondary font-bold' });
          tree.push({ type: 'file', depth: 3, name: 'client.ts' });
        } else if (selectedOrm === 'prisma') {
          tree.push({ type: 'dir', depth: 1, name: 'prisma/' });
          tree.push({ type: 'file', depth: 2, name: 'schema.prisma', highlight: 'text-brand-secondary font-bold' });
        } else if (selectedOrm === 'mongoose' || selectedDb === 'mongodb') {
          tree.push({ type: 'dir', depth: 2, name: 'models/' });
          tree.push({ type: 'file', depth: 3, name: 'user.model.ts', highlight: 'text-brand-secondary' });
        }
      }

      if (selectedAuth !== 'none') {
        tree.push({ type: 'file', depth: 2, name: `lib/auth.${selectedAuth === 'supabase' ? 'js' : 'ts'}`, highlight: 'text-emerald-500 font-bold' });
      }

      if (selectedEmail !== 'none') {
        tree.push({ type: 'file', depth: 2, name: `lib/${selectedEmail}.ts`, highlight: 'text-brand-primary font-bold' });
      }

      if (hasValidator) {
        tree.push({ type: 'file', depth: 2, name: 'schemas/user.schema.ts', highlight: 'text-brand-secondary' });
      }
    }

    return tree;
  });

  function copyCommand() {
    navigator.clipboard.writeText(generatedCommand);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }
</script>

<style>
  .builder-container {
    position: relative;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
</style>

<div class="w-full max-w-[92rem] mx-auto px-8 py-12 font-sans space-y-12 builder-container relative z-10">
  <!-- Header -->
  <div class="text-center mb-16">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs sm:text-sm font-bold text-brand-primary tracking-widest uppercase select-none">
      <span>Wizard Builder</span>
    </div>
    <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-text-main">
      {t.title}
    </h1>
    <p class="text-base sm:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
      {t.subtitle}
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
    
    <!-- LEFT: CONFIGURATION CONTROLS (8 cols) -->
    <div class="lg:col-span-8 space-y-10">
      <VisualControls
        bind:projectName
        bind:selectedFront
        bind:selectedNativeFront
        bind:selectedBack
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
    </div>

    <!-- RIGHT: COMMAND & STRUCTURE DISPLAY (4 cols) -->
    <div class="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
      <VisualPreview
        {generatedCommand}
        {structurePreview}
        selectedTechs={selectedTechOptions}
        onremove={removeTech}
        bind:selectedPackageManager={selectedPackageManager}
        bind:selectedCommandType={selectedCommandType}
        {lang}
      />
    </div>

  </div>
</div>
