<script lang="ts">
  import VisualControls from './VisualControls.svelte';
  import VisualPreview from './VisualPreview.svelte';
  import { Terminal, Folder, FileCode, Check, Copy, Settings, Cpu, Database, Blocks } from '@lucide/svelte';

  let { lang = 'es' } = $props<{ lang?: string }>();

  // State variables
  let projectName = $state('my-koko-app');
  let selectedFront = $state('nextjs');
  let selectedNativeFront = $state('none');
  let selectedBack = $state('hono');
  let selectedRuntime = $state('bun');
  let selectedOrm = $state('drizzle');
  let selectedApi = $state('trpc');
  let selectedDb = $state('postgres');
  let selectedAuth = $state('better-auth');
  let selectedValidator = $state('zod');
  let selectedPackageManager = $state('pnpm');
  let selectedTools = $state('zod');
  let selectedPayments = $state('stripe');
  let selectedEmail = $state('resend');
  let withDocker = $state(true);
  let withCi = $state(false);
  let withLinter = $state(true);
  let withTesting = $state(false);
  let withTurborepo = $state(true);

  // Reactively auto-resolve selection conflicts when users change backend or frontend
  $effect(() => {
    // Sync ORM rules based on backend & db choices
    if (selectedDb === 'mongodb') {
      selectedOrm = 'mongoose';
    } else if (selectedDb === 'none') {
      selectedOrm = 'none';
    } else {
      if (selectedOrm === 'mongoose') {
        selectedOrm = 'drizzle';
      }
    }
  });

  let isCopied = $state(false);

  // Translations
  const t = $derived({
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
  }[lang] || t.es);

  // Computes the dynamic command based on state
  const generatedCommand = $derived.by(() => {
    let cmd = `koko init ${projectName || 'my-koko-app'}`;
    if (selectedFront !== 'none') cmd += ` --frontend ${selectedFront}`;
    if (selectedNativeFront !== 'none') cmd += ` --mobile ${selectedNativeFront}`;
    if (selectedBack !== 'none') cmd += ` --backend ${selectedBack}`;
    if (selectedRuntime !== 'none') cmd += ` --runtime ${selectedRuntime}`;
    if (selectedOrm !== 'none') cmd += ` --orm ${selectedOrm}`;
    if (selectedApi !== 'none') cmd += ` --api ${selectedApi}`;
    if (selectedPackageManager !== 'none') cmd += ` --package-manager ${selectedPackageManager}`;
    if (selectedTools !== 'none') cmd += ` --tools ${selectedTools}`;
    if (selectedPayments !== 'none') cmd += ` --payment ${selectedPayments}`;
    if (selectedDb !== 'none') cmd += ` --db ${selectedDb}`;
    if (selectedAuth !== 'none') cmd += ` --auth ${selectedAuth}`;
    if (selectedEmail !== 'none') cmd += ` --email ${selectedEmail}`;
    if (withDocker) cmd += ` --docker`;
    if (withCi) cmd += ` --ci`;
    if (withLinter) cmd += ` --linter`;
    if (withTesting) cmd += ` --test`;
    if (withTurborepo) cmd += ` --turborepo`;
    return cmd;
  });

  // Computes directory structure preview dynamically
  const structurePreview = $derived.by(() => {
    let tree = [{ type: 'dir', name: `${projectName || 'my-koko-app'}/` }];
    if (withTurborepo) {
      tree.push({ type: 'file', indent: true, name: 'turbo.json', highlight: 'text-brand-primary' });
      tree.push({ type: 'file', indent: true, name: 'package.json' });
      tree.push({ type: 'dir', indent: true, name: 'apps/' });
      if (selectedFront !== 'none') {
        let fName = `web/ [${selectedFront}]`;
        if (selectedFront === 'react-native') fName = 'mobile/ [react-native]';
        if (selectedFront === 'flutter') fName = 'mobile/ [flutter]';
        tree.push({ type: 'dir', indent: true, doubleIndent: true, name: fName });
      }
      if (selectedBack !== 'none') {
        let bname = selectedBack;
        if (selectedBack === 'go') bname = 'go-fiber';
        if (selectedBack === 'node') bname = 'express';
        tree.push({ type: 'dir', indent: true, doubleIndent: true, name: `api/ [${bname}]` });
      }
      
      tree.push({ type: 'dir', indent: true, name: 'packages/' });
      
      if (selectedDb !== 'none') {
        tree.push({ type: 'dir', indent: true, doubleIndent: true, name: 'database/' });
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'package.json' });
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'tsconfig.json' });
        if (selectedDb === 'prisma') {
          tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'prisma/schema.prisma', highlight: 'text-brand-secondary' });
        } else if (selectedDb === 'sqlx') {
          tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'schema.sql', highlight: 'text-brand-primary' });
        } else if (selectedDb === 'mongo') {
          tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'models/user.js', highlight: 'text-brand-secondary' });
        } else if (selectedDb === 'drizzle') {
          tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'schema.ts', highlight: 'text-brand-primary' });
        }
      }
      if (selectedAuth !== 'none') {
        tree.push({ type: 'dir', indent: true, doubleIndent: true, name: 'auth/' });
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'package.json' });
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'tsconfig.json' });
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: `index.${selectedAuth === 'supabase' ? 'js' : 'ts'}`, highlight: 'text-emerald-500' });
      }
      
      if (selectedValidator !== 'none') {
        tree.push({ type: 'dir', indent: true, doubleIndent: true, name: 'validator/' });
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'package.json' });
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'tsconfig.json' });
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'schemas/user.ts', highlight: 'text-brand-secondary' });
      }
      tree.push({ type: 'dir', indent: true, doubleIndent: true, name: 'config/' });
      if (withLinter) {
        tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'biome.json', highlight: 'text-brand-secondary' });
      }
      tree.push({ type: 'file', indent: true, tripleIndent: true, name: 'tsconfig.json' });
    } else {
      if (selectedFront !== 'none') {
        let fName = `frontend-${selectedFront}/`;
        if (selectedFront === 'react-native') fName = 'mobile-react-native/';
        if (selectedFront === 'flutter') fName = 'mobile-flutter/';
        tree.push({ type: 'dir', indent: true, name: fName });
      }
      if (selectedBack !== 'none') {
        let bname = selectedBack;
        if (selectedBack === 'go') bname = 'go-fiber';
        if (selectedBack === 'node') bname = 'express';
        tree.push({ type: 'dir', indent: true, name: `backend-${bname}/` });
      }
      
      if (selectedDb !== 'none') {
        if (selectedDb === 'prisma') {
          tree.push({ type: 'file', indent: true, name: 'prisma/schema.prisma', highlight: 'text-brand-secondary' });
        } else if (selectedDb === 'sqlx') {
          tree.push({ type: 'file', indent: true, name: 'db/schema.sql', highlight: 'text-brand-primary' });
        } else if (selectedDb === 'mongo') {
          tree.push({ type: 'file', indent: true, name: 'db/models/user.js', highlight: 'text-brand-secondary' });
        } else if (selectedDb === 'drizzle') {
          tree.push({ type: 'file', indent: true, name: 'db/schema.ts', highlight: 'text-brand-primary' });
        }
      }
      if (selectedAuth !== 'none') {
        tree.push({ type: 'file', indent: true, name: `lib/auth.${selectedAuth === 'supabase' ? 'js' : 'ts'}`, highlight: 'text-emerald-500' });
      }
      if (selectedValidator !== 'none') {
        tree.push({ type: 'file', indent: true, name: 'shared/schemas/user.ts', highlight: 'text-brand-secondary' });
      }
      if (withLinter) {
        tree.push({ type: 'file', indent: true, name: 'biome.json', highlight: 'text-brand-secondary' });
      }
    }
    if (selectedPayments !== 'none') {
      tree.push({ type: 'file', indent: true, name: `routes/payments/${selectedPayments}.ts`, highlight: 'text-brand-primary' });
    }
    if (selectedEmail !== 'none') {
      tree.push({ type: 'file', indent: true, name: `services/email.${selectedEmail === 'resend' ? 'ts' : 'js'}` });
    }
    if (withDocker) {
      tree.push({ type: 'file', indent: true, name: 'docker-compose.yml', highlight: 'text-brand-primary' });
    }
    if (withCi) {
      tree.push({ type: 'file', indent: true, name: '.github/workflows/ci.yml' });
    }
    if (withLinter) {
      tree.push({ type: 'file', indent: true, name: 'biome.json', highlight: 'text-brand-primary' });
    }
    if (withTesting) {
      tree.push({ type: 'file', indent: true, name: 'vitest.config.ts' });
    }
    tree.push({ type: 'file', indent: true, name: 'koko.config.json', highlight: 'text-brand-primary font-bold' });
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

<div class="w-full max-w-[92rem] mx-auto px-8 py-12 font-sans space-y-12 builder-container">
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
    </div>

    <!-- RIGHT: COMMAND & STRUCTURE DISPLAY (4 cols) -->
    <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-20">
      <VisualPreview
        {generatedCommand}
        {structurePreview}
        {lang}
      />
    </div>

  </div>
</div>
