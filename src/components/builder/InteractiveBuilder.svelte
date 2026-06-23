<script>
  import { Terminal, Folder, FileCode, Check, Copy, Settings, Cpu, Database, Blocks, Info } from '@lucide/svelte';
  import {
    SvglNextjsLogo,
    SvglReactLogo,
    SvglSvelteLogo,
    SvglAstroLogo,
    SvglVueLogo,
    SvglGoLogo,
    SvglNodejsLogo,
    SvglRustLogo,
    SvglBunLogo,
    SvglPythonLogo,
    SvglPostgreSQLLogo,
    SvglPrismaLogo,
    SvglMongoDBLogo,
    SvglDrizzleORMLogo
  } from '@selemondev/svgl-svelte';

  let { lang = 'es' } = $props();

  // State variables
  let projectName = $state('my-claw-app');
  let selectedFront = $state('nextjs'); // 'nextjs' | 'react' | 'svelte' | 'astro' | 'vue' | 'none'
  let selectedBack = $state('go');      // 'go' | 'node' | 'rust' | 'bun' | 'python' | 'none'
  let selectedDb = $state('prisma');    // 'prisma' | 'sqlx' | 'mongo' | 'drizzle' | 'none'
  let selectedAuth = $state('better-auth'); // 'better-auth' | 'nextauth' | 'supabase' | 'none'
  let selectedValidator = $state('zod'); // 'zod' | 'valibot' | 'none'
  let selectedPayment = $state('stripe'); // 'stripe' | 'lemon' | 'mercadopago' | 'none'
  let selectedEmail = $state('resend'); // 'resend' | 'nodemailer' | 'none'
  let withDocker = $state(true);
  let withCi = $state(false);
  let withLinter = $state(true);
  let withTesting = $state(false);

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
      authLabel: 'Autenticación (Auth)',
      validatorLabel: 'Validación de Esquemas (Type-Checkers)',
      paymentLabel: 'Pasarela de Pagos (SaaS/E-commerce)',
      emailLabel: 'Servicio de Emails',
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
      authLabel: 'Authentication (Auth)',
      validatorLabel: 'Schema Validation (Type-Checkers)',
      paymentLabel: 'Payment Gateway (SaaS/E-commerce)',
      emailLabel: 'Email Service',
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

  // Dynamic list of technologies by layer
  const layers = $derived([
    {
      key: 'frontend',
      label: t.frontendLabel,
      step: '01 / CLIENT-SIDE',
      icon: Blocks,
      colorClass: 'text-brand-secondary',
      selected: selectedFront,
      select: (val) => selectedFront = val,
      options: [
        { id: 'nextjs', name: 'Next.js', desc: 'App Router, SSR, TypeScript, layouts.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglNextjsLogo },
        { id: 'react', name: 'React SPA', desc: 'Client-side client, Vite build engine.', hoverColor: 'group-hover/btn:text-[#61dafb]', activeColor: 'text-[#61dafb]', iconComponent: SvglReactLogo },
        { id: 'svelte', name: 'Svelte 5', desc: 'Runes, snippet rendering, lightweight.', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: SvglSvelteLogo },
        { id: 'astro', name: 'Astro', desc: 'Islands Architecture, SSG static generator.', hoverColor: 'group-hover/btn:text-[#ff5d01]', activeColor: 'text-[#ff5d01]', iconComponent: SvglAstroLogo },
        { id: 'vue', name: 'Vue 3', desc: 'Composition API, reactive templates.', hoverColor: 'group-hover/btn:text-[#42b883]', activeColor: 'text-[#42b883]', iconComponent: SvglVueLogo },
        { id: 'none', name: t.none, desc: 'No frontend framework scaffold.', isNone: true }
      ]
    },
    {
      key: 'backend',
      label: t.backendLabel,
      step: '02 / SERVER-SIDE',
      icon: Cpu,
      colorClass: 'text-brand-primary',
      selected: selectedBack,
      select: (val) => selectedBack = val,
      options: [
        { id: 'go', name: 'Go Fiber', desc: 'High performance, clean REST APIs.', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary', iconComponent: SvglGoLogo },
        { id: 'node', name: 'Node.js Express', desc: 'Classic Express framework in TS.', hoverColor: 'group-hover/btn:text-[#68a063]', activeColor: 'text-[#68a063]', iconComponent: SvglNodejsLogo },
        { id: 'rust', name: 'Rust Actix', desc: 'Ultra fast, memory safe REST engine.', hoverColor: 'group-hover/btn:text-[#dea584]', activeColor: 'text-[#dea584]', iconComponent: SvglRustLogo },
        { id: 'bun', name: 'Bun Elysia', desc: 'High performance JS runtime setup.', hoverColor: 'group-hover/btn:text-[#fbf0e9]', activeColor: 'text-[#fbf0e9]', iconComponent: SvglBunLogo },
        { id: 'python', name: 'Python', desc: 'FastAPI framework, clean typing.', hoverColor: 'group-hover/btn:text-[#3776ab]', activeColor: 'text-[#3776ab]', iconComponent: SvglPythonLogo },
        { id: 'none', name: t.none, desc: 'No server framework scaffolded.', isNone: true }
      ]
    },
    {
      key: 'db',
      label: t.dbLabel,
      step: '03 / DATABASE LAYER',
      icon: Database,
      colorClass: 'text-brand-secondary',
      selected: selectedDb,
      select: (val) => selectedDb = val,
      options: [
        { id: 'prisma', name: 'Postgres + Prisma', desc: 'PostgreSQL database with Prisma ORM.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglPrismaLogo },
        { id: 'sqlx', name: 'Postgres + SQLx', desc: 'PostgreSQL database with SQLx raw Go schema.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglPostgreSQLLogo },
        { id: 'mongo', name: 'MongoDB + ODM', desc: 'MongoDB database with Mongoose schemas.', hoverColor: 'group-hover/btn:text-[#47a248]', activeColor: 'text-[#47a248]', iconComponent: SvglMongoDBLogo },
        { id: 'drizzle', name: 'SQLite + Drizzle', desc: 'SQLite database with Drizzle ORM schema.', hoverColor: 'group-hover/btn:text-[#c5f74f]', activeColor: 'text-[#c5f74f]', iconComponent: SvglDrizzleORMLogo },
        { id: 'none', name: t.none, desc: 'No database ORM configured.', isNone: true }
      ]
    },
    {
      key: 'auth',
      label: t.authLabel,
      step: '04 / AUTHENTICATION',
      icon: Blocks,
      colorClass: 'text-brand-primary',
      selected: selectedAuth,
      select: (val) => selectedAuth = val,
      options: [
        { id: 'better-auth', name: 'Better-Auth', desc: 'Svelte 5 / Next.js production auth framework.', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary' },
        { id: 'nextauth', name: 'NextAuth / Auth.js', desc: 'Standard authentication for NextJS configs.', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary' },
        { id: 'supabase', name: 'Supabase Auth', desc: 'Firebase alternative auth mechanism.', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary' },
        { id: 'none', name: t.none, desc: 'No authentication schema config.', isNone: true }
      ]
    },
    {
      key: 'validator',
      label: t.validatorLabel,
      step: '05 / TYPE CHECKERS & SCHEMAS',
      icon: Settings,
      colorClass: 'text-brand-secondary',
      selected: selectedValidator,
      select: (val) => selectedValidator = val,
      options: [
        { id: 'zod', name: 'Zod', desc: 'TypeScript-first schema validation library.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary' },
        { id: 'valibot', name: 'Valibot', desc: 'Modular, ultra-light validator schema.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary' },
        { id: 'none', name: t.none, desc: 'No validator library added.', isNone: true }
      ]
    },
    {
      key: 'payment',
      label: t.paymentLabel,
      step: '06 / SAAS MONETIZATION',
      icon: Database,
      colorClass: 'text-brand-primary',
      selected: selectedPayment,
      select: (val) => selectedPayment = val,
      options: [
        { id: 'stripe', name: 'Stripe', desc: 'Global payments, subscription & invoicing SDK.', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary' },
        { id: 'lemon', name: 'Lemon Squeezy', desc: 'Merchant of Record payments structure.', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary' },
        { id: 'mercadopago', name: 'MercadoPago', desc: 'Latam preferred payment engine config.', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary' },
        { id: 'none', name: t.none, desc: 'No monetisation engine configured.', isNone: true }
      ]
    },
    {
      key: 'email',
      label: t.emailLabel,
      step: '07 / TRANSACTIONAL MAILS',
      icon: Blocks,
      colorClass: 'text-brand-secondary',
      selected: selectedEmail,
      select: (val) => selectedEmail = val,
      options: [
        { id: 'resend', name: 'Resend', desc: 'Modern email client SDK for React/Svelte.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary' },
        { id: 'nodemailer', name: 'Nodemailer', desc: 'Classic SMTP controller for backends.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary' },
        { id: 'none', name: t.none, desc: 'No transactional email configured.', isNone: true }
      ]
    }
  ]);

  // Computes the dynamic command based on state
  const generatedCommand = $derived.by(() => {
    let cmd = `claw init ${projectName || 'my-claw-app'}`;
    if (selectedFront !== 'none') cmd += ` --frontend ${selectedFront}`;
    if (selectedBack !== 'none') cmd += ` --backend ${selectedBack}`;
    if (selectedDb !== 'none') {
      if (selectedDb === 'prisma') {
        cmd += ` --db postgres --orm prisma`;
      } else if (selectedDb === 'sqlx') {
        cmd += ` --db postgres --orm sqlx`;
      } else if (selectedDb === 'mongo') {
        cmd += ` --db mongodb --orm mongoose`;
      } else if (selectedDb === 'drizzle') {
        cmd += ` --db sqlite --orm drizzle`;
      }
    }
    if (selectedAuth !== 'none') cmd += ` --auth ${selectedAuth}`;
    if (selectedValidator !== 'none') cmd += ` --validator ${selectedValidator}`;
    if (selectedPayment !== 'none') cmd += ` --payment ${selectedPayment}`;
    if (selectedEmail !== 'none') cmd += ` --email ${selectedEmail}`;
    if (withDocker) cmd += ` --docker`;
    if (withCi) cmd += ` --ci`;
    if (withLinter) cmd += ` --linter`;
    if (withTesting) cmd += ` --test`;
    return cmd;
  });

  // Computes directory structure preview dynamically
  const structurePreview = $derived.by(() => {
    let tree = [{ type: 'dir', name: `${projectName || 'my-claw-app'}/` }];
    if (selectedFront !== 'none') {
      tree.push({ type: 'dir', indent: true, name: `frontend-${selectedFront}/` });
    }
    if (selectedBack !== 'none') {
      let bname = selectedBack;
      if (selectedBack === 'go') bname = 'go-fiber';
      if (selectedBack === 'node') bname = 'express';
      tree.push({ type: 'dir', indent: true, name: `backend-${bname}/` });
    }
    
    // DB Files
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

    // Auth configuration files
    if (selectedAuth !== 'none') {
      tree.push({ type: 'file', indent: true, name: `lib/auth.${selectedAuth === 'supabase' ? 'js' : 'ts'}`, highlight: 'text-emerald-500' });
    }

    // Validator schema files
    if (selectedValidator !== 'none') {
      tree.push({ type: 'file', indent: true, name: 'shared/schemas/user.ts', highlight: 'text-brand-secondary' });
    }

    // Payments files
    if (selectedPayment !== 'none') {
      tree.push({ type: 'file', indent: true, name: `routes/payments/${selectedPayment}.ts`, highlight: 'text-brand-primary' });
    }

    // Email service
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
      tree.push({ type: 'file', indent: true, name: 'biome.json', highlight: 'text-brand-secondary' });
    }
    if (withTesting) {
      tree.push({ type: 'file', indent: true, name: 'vitest.config.ts' });
    }
    tree.push({ type: 'file', indent: true, name: 'claw.config.json', highlight: 'text-emerald-500' });
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

<div class="w-full max-w-6xl mx-auto px-4 py-8 font-sans">
  <!-- Header -->
  <div class="text-center mb-12">
    <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-semibold text-brand-primary tracking-wide uppercase select-none">
      <span>Wizard Builder</span>
    </div>
    <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-text-main">
      {t.title}
    </h1>
    <p class="text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
      {t.subtitle}
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    
    <!-- LEFT: CONFIGURATION CONTROLS (7 cols) -->
    <div class="lg:col-span-7 space-y-8">
      
      <!-- Project Name -->
      <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-5 backdrop-blur-xs shadow-sm hover:border-brand-primary/20 transition-colors duration-300">
        <label for="pname" class="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2 select-none border-l-2 border-brand-primary pl-2">
          {t.projectNameLabel}
        </label>
        <div class="relative flex items-center bg-bg-base border border-border-subtle rounded-xl px-3.5 py-3 hover:border-brand-primary/40 focus-within:border-brand-primary transition-colors duration-200">
          <Settings size={16} class="text-text-muted mr-2" aria-hidden="true" />
          <input
            id="pname"
            type="text"
            bind:value={projectName}
            placeholder="my-claw-app"
            class="w-full bg-transparent border-none outline-none text-sm text-text-main placeholder-text-muted/50 p-0 focus:ring-0 font-mono"
          />
        </div>
      </div>

      <!-- Layers (Frontend, Backend, Database) Rendered Dynamically with .map (each) -->
      {#each layers as layer}
        {@const LayerIcon = layer.icon}
        <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-6 backdrop-blur-xs shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-border-subtle/50 select-none">
            <div class="flex items-center gap-2">
              <LayerIcon size={16} class="{layer.colorClass} animate-pulse" aria-hidden="true" />
              <span class="text-xs font-bold uppercase tracking-wider text-text-main">{layer.label}</span>
            </div>
            <span class="text-[10px] {layer.colorClass} font-bold font-mono">{layer.step}</span>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {#each layer.options as opt}
              {@const isActive = layer.selected === opt.id}
              {#if opt.isNone}
                <button
                  type="button"
                  onclick={() => layer.select(opt.id)}
                  aria-pressed={isActive}
                  class="flex flex-col items-start justify-center gap-2 p-4 rounded-2xl border transition-all text-left cursor-pointer active:scale-[0.98]
                    {isActive ? 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary shadow-sm font-bold' : 'bg-bg-base border-border-subtle hover:border-brand-secondary/30 text-text-main'}"
                >
                  <span class="text-xs font-bold">{opt.name}</span>
                  <span class="text-[9px] text-text-muted leading-tight">{opt.desc}</span>
                </button>
              {:else}
                <button
                  type="button"
                  onclick={() => layer.select(opt.id)}
                  aria-pressed={isActive}
                  class="group/btn flex flex-col items-start gap-2 p-4 rounded-2xl border transition-all text-left cursor-pointer active:scale-[0.98]
                    {isActive 
                      ? layer.key === 'backend' || layer.key === 'auth' || layer.key === 'payment'
                        ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-sm font-bold'
                        : 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary shadow-sm font-bold' 
                      : 'bg-bg-base border-border-subtle hover:border-brand-secondary/30 text-text-main'}"
                >
                  <div class="flex items-center gap-2">
                    {#if opt.iconComponent}
                      <div class="w-5 h-5 flex items-center justify-center">
                        <svelte:component this={opt.iconComponent} width="20" height="20" />
                      </div>
                    {/if}
                    <span class="text-xs font-bold">{opt.name}</span>
                  </div>
                  <span class="text-[9px] text-text-muted leading-tight">{opt.desc}</span>
                </button>
              {/if}
            {/each}
          </div>
        </div>
      {/each}

      <!-- Infrastructure / Add-ons -->
      <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-6 backdrop-blur-xs shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-border-subtle/50 select-none">
          <div class="flex items-center gap-2">
            <Settings size={16} class="text-text-muted" aria-hidden="true" />
            <span class="text-xs font-bold uppercase tracking-wider text-text-main">{t.extrasLabel}</span>
          </div>
          <span class="text-[10px] text-text-muted font-bold font-mono">08 / QUALITY & DEV</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Docker Toggle -->
          <button
            type="button"
            onclick={() => withDocker = !withDocker}
            aria-pressed={withDocker}
            class="group/btn flex items-center justify-between p-4 bg-bg-base border border-border-subtle rounded-2xl cursor-pointer text-left hover:border-brand-primary/20 transition-all duration-200"
          >
            <div class="flex items-center gap-3">
              <svg viewBox="0 0 24 24" class="w-6 h-6 {withDocker ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M7 6h2v4H7zm4-2h2v6h-2zm4 2h2v4h-2z" class="opacity-20"/></svg>
              <div class="flex flex-col gap-0.5">
                <span class="text-xs font-bold text-text-main">Docker Compose Setup</span>
                <span class="text-[9px] text-text-muted leading-tight">{t.dockerLabel}</span>
              </div>
            </div>
            <div class="w-8 h-5 flex items-center rounded-full p-0.5 transition-all duration-300 {withDocker ? 'bg-brand-primary justify-end' : 'bg-border-subtle justify-start'}">
              <span class="w-3.5 h-3.5 rounded-full bg-white shadow-md"></span>
            </div>
          </button>

          <!-- CI/CD Toggle -->
          <button
            type="button"
            onclick={() => withCi = !withCi}
            aria-pressed={withCi}
            class="group/btn flex items-center justify-between p-4 bg-bg-base border border-border-subtle rounded-2xl cursor-pointer text-left hover:border-brand-primary/20 transition-all duration-200"
          >
            <div class="flex items-center gap-3">
              <svg viewBox="0 0 24 24" class="w-6 h-6 {withCi ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0-7.3 16.8" class="opacity-20"/><path d="M12 8v4l2.5 2.5" stroke-linecap="round"/></svg>
              <div class="flex flex-col gap-0.5">
                <span class="text-xs font-bold text-text-main">GitHub Actions</span>
                <span class="text-[9px] text-text-muted leading-tight">{t.ciLabel}</span>
              </div>
            </div>
            <div class="w-8 h-5 flex items-center rounded-full p-0.5 transition-all duration-300 {withCi ? 'bg-brand-primary justify-end' : 'bg-border-subtle justify-start'}">
              <span class="w-3.5 h-3.5 rounded-full bg-white shadow-md"></span>
            </div>
          </button>

          <!-- Biome/ESLint Toggle -->
          <button
            type="button"
            onclick={() => withLinter = !withLinter}
            aria-pressed={withLinter}
            class="group/btn flex items-center justify-between p-4 bg-bg-base border border-border-subtle rounded-2xl cursor-pointer text-left hover:border-brand-primary/20 transition-all duration-200"
          >
            <div class="flex items-center gap-3">
              <svg viewBox="0 0 24 24" class="w-6 h-6 {withLinter ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12h8" stroke-linecap="round"/></svg>
              <div class="flex flex-col gap-0.5">
                <span class="text-xs font-bold text-text-main">Biome / Linter Config</span>
                <span class="text-[9px] text-text-muted leading-tight">{t.linterLabel}</span>
              </div>
            </div>
            <div class="w-8 h-5 flex items-center rounded-full p-0.5 transition-all duration-300 {withLinter ? 'bg-brand-primary justify-end' : 'bg-border-subtle justify-start'}">
              <span class="w-3.5 h-3.5 rounded-full bg-white shadow-md"></span>
            </div>
          </button>

          <!-- Testing Toggle -->
          <button
            type="button"
            onclick={() => withTesting = !withTesting}
            aria-pressed={withTesting}
            class="group/btn flex items-center justify-between p-4 bg-bg-base border border-border-subtle rounded-2xl cursor-pointer text-left hover:border-brand-primary/20 transition-all duration-200"
          >
            <div class="flex items-center gap-3">
              <svg viewBox="0 0 24 24" class="w-6 h-6 {withTesting ? 'text-brand-primary' : 'text-text-muted group-hover/btn:text-brand-primary'} fill-none stroke-current stroke-[1.8]" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              <div class="flex flex-col gap-0.5">
                <span class="text-xs font-bold text-text-main">Unit Testing Environment</span>
                <span class="text-[9px] text-text-muted leading-tight">{t.testingLabel}</span>
              </div>
            </div>
            <div class="w-8 h-5 flex items-center rounded-full p-0.5 transition-all duration-300 {withTesting ? 'bg-brand-primary justify-end' : 'bg-border-subtle justify-start'}">
              <span class="w-3.5 h-3.5 rounded-full bg-white shadow-md"></span>
            </div>
          </button>
        </div>
      </div>

    </div>

    <!-- RIGHT: COMMAND & STRUCTURE DISPLAY (5 cols) -->
    <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
      
      <!-- Command Display Box -->
      <div class="rounded-2xl border border-border-subtle bg-[#0c0b11] p-5 shadow-lg relative overflow-hidden">
        <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 font-mono select-none border-b border-white/[0.04] pb-2">{t.commandLabel}</span>
        
        <div class="flex items-center gap-3 bg-black/40 border border-white/[0.04] p-4 rounded-xl text-xs text-brand-primary font-mono select-all">
          <Terminal size={14} class="text-brand-primary" aria-hidden="true" />
          <span class="break-all font-semibold leading-relaxed">{generatedCommand}</span>
        </div>

        <button
          type="button"
          onclick={copyCommand}
          class="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold rounded-xl shadow-md cursor-pointer transition-colors duration-200 hover:scale-[1.01] active:scale-95 text-sm"
        >
          {#if isCopied}
            <Check size={15} aria-hidden="true" />
            <span>{t.copiedBtn}</span>
          {:else}
            <Copy size={15} aria-hidden="true" />
            <span>{t.copyBtn}</span>
          {/if}
        </button>
      </div>

      <!-- Generated Structure -->
      <div class="rounded-2xl border border-border-subtle bg-bg-surface/30 p-5 backdrop-blur-xs shadow-sm">
        <div class="flex items-center gap-2 mb-3 pb-2 border-b border-border-subtle select-none">
          <Folder size={14} class="text-brand-secondary" aria-hidden="true" />
          <span class="text-xs font-bold uppercase tracking-wider text-text-muted">{t.structureTitle}</span>
        </div>

        <div class="space-y-1.5 font-mono text-[11px] text-text-muted">
          {#each structurePreview as item}
            <div class="{item.indent ? 'pl-4' : ''} flex items-center gap-2 select-none">
              {#if item.type === 'dir'}
                <Folder size={12} class="text-brand-secondary/80" aria-hidden="true" />
                <span class="text-text-main font-semibold">{item.name}</span>
              {:else}
                <FileCode size={12} class={item.highlight || 'text-text-muted'} aria-hidden="true" />
                <span>{item.name}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>

    </div>

  </div>
</div>
