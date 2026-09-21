<script lang="ts">
  import { 
    Folder, 
    FileCode, 
    ChevronRight, 
    ChevronDown, 
    Files, 
    Search, 
    GitBranch, 
    Blocks, 
    Settings, 
    File,
    Play
  } from '@lucide/svelte';
  import { initialSidebarFiles, terminalTranslations } from '@/data/terminal-simulator.data';
  import type { SidebarFileItem } from '@/types/terminal-simulator.types';

  interface Props {
    lang?: string;
  }

  let { lang = 'es' }: Props = $props();

  // State machine for the simulation loop
  // 'initial' -> 'typing-command' -> 'input-name' -> 'mode-select' -> 'manual-step' -> 'running' -> 'done' -> 'sidebar-building' -> 'complete'
  let phase = $state('initial');
  let currentLang = $state('es');

  // Interactive/Visual zoom control variables
  let zoomClass = $state('scale-100 translate-x-0 translate-y-0');
  
  // Terminal text state
  let terminalInput = $state('');
  let terminalElement = $state<HTMLDivElement | null>(null);

  // Simulation sub-states
  let modeIndex = $state(0); // 0 = Quick, 1 = Manual
  let manualStepIdx = $state(0); // 0 to 8
  let manualSelectedHistory = $state<Array<{ label: string; value: string }>>([]);
  let runnerStepStatus = $state<Array<'pending' | 'running' | 'success'>>([
    'pending', 'pending', 'pending', 'pending'
  ]);

  // Sidebar building states
  let sidebarFiles = $state<SidebarFileItem[]>(JSON.parse(JSON.stringify(initialSidebarFiles)));

  // Listen to lang changes
  $effect(() => {
    currentLang = document.documentElement.getAttribute('data-lang') || lang || 'es';
    
    const handleLangChange = (e: any) => {
      currentLang = e.detail;
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => {
      window.removeEventListener('lang-change', handleLangChange);
    };
  });

  // Translation dictionary
  const t = $derived(terminalTranslations[currentLang as 'es' | 'en'] || terminalTranslations.es);

  // Helper delay function
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Manual steps definitions matching Koko-cli
  const manualStepsData = [
    {
      title: 'Select Frontend Framework',
      label: 'Frontend',
      options: [
        { label: 'Next.js', hint: 'React framework with SSR & Server Components' },
        { label: 'React + Vite', hint: 'Ultra-fast Single Page Application' },
        { label: 'Nuxt', hint: 'Vue full-stack framework with Nitro engine' },
        { label: 'Svelte', hint: 'Cybernetically enhanced web apps' },
        { label: 'Astro', hint: 'Content-driven web apps with islands architecture' },
        { label: 'React Native / Expo', hint: 'Universal cross-platform mobile & web apps' }
      ],
      chosenIdx: 0,
      chosenValue: 'Next.js'
    },
    {
      title: 'Select Backend Framework / Runtime',
      label: 'Backend',
      options: [
        { label: 'Node.js / Express', hint: 'Lightweight REST API with TypeScript' },
        { label: 'Hono', hint: 'Ultrafast multi-runtime web framework' },
        { label: 'Python / FastAPI', hint: 'Async framework with Pydantic v2 validation' },
        { label: 'Go / Chi Router', hint: 'High performance with strict types' },
        { label: 'Java / Spring Boot', hint: 'Enterprise robust backend with Spring Boot 3' },
        { label: 'NestJS', hint: 'Enterprise modular architecture with TypeScript' }
      ],
      chosenIdx: 5,
      chosenValue: 'NestJS'
    },
    {
      title: 'Select API Layer',
      label: 'API',
      options: [
        { label: 'tRPC', hint: 'End-to-end typesafe APIs for TypeScript fullstack & monorepos' },
        { label: 'oRPC', hint: 'OpenAPI + RPC typesafe contract & client generator' },
        { label: 'None / REST API', hint: 'Standard HTTP endpoints without an RPC abstraction' }
      ],
      chosenIdx: 0,
      chosenValue: 'tRPC'
    },
    {
      title: 'Select Package Manager',
      label: 'Package Manager',
      options: [
        { label: 'PNPM', hint: 'Fast and disk space efficient (Recommended)' },
        { label: 'NPM', hint: 'Standard Node package manager' },
        { label: 'Bun', hint: 'All-in-one JavaScript runtime & package manager' }
      ],
      chosenIdx: 0,
      chosenValue: 'pnpm'
    },
    {
      title: 'Select Database',
      label: 'Database',
      options: [
        { label: 'PostgreSQL', hint: 'Standard relational database with Docker' },
        { label: 'MongoDB', hint: 'NoSQL document database' },
        { label: 'MySQL / MariaDB', hint: 'Traditional SQL database' },
        { label: 'SQLite', hint: 'Embedded lightweight database' }
      ],
      chosenIdx: 0,
      chosenValue: 'PostgreSQL'
    },
    {
      title: 'Select ORM / Query Builder',
      label: 'ORM / Tool',
      options: [
        { label: 'Drizzle ORM', hint: 'Lightweight, type-safe with native SQL support' },
        { label: 'Prisma', hint: 'Next-gen ORM with auto type generation' },
        { label: 'None / Raw SQL', hint: 'Direct driver connection without ORM' }
      ],
      chosenIdx: 0,
      chosenValue: 'Drizzle ORM'
    },
    {
      title: 'Select Auth Provider',
      label: 'Auth',
      options: [
        { label: 'Better Auth', hint: 'Comprehensive TypeScript auth framework (Recommended)' },
        { label: 'Clerk', hint: 'Complete user management & authentication platform' },
        { label: 'NextAuth / Auth.js', hint: 'Authentication solution for Next.js apps' }
      ],
      chosenIdx: 0,
      chosenValue: 'Better Auth'
    },
    {
      title: 'Select Addons / Tooling',
      label: 'Addons',
      isAddons: true,
      options: [
        { label: 'shadcn/ui', hint: 'Re-usable component library built on Radix UI & Tailwind', checked: true },
        { label: 'Docker Compose', hint: 'Local containerized services and database', checked: true },
        { label: 'GitHub Actions CI', hint: 'Automated linting and test workflows', checked: true }
      ],
      chosenIdx: 0,
      chosenValue: 'shadcn/ui, Docker Compose, GitHub Actions CI'
    },
    {
      title: 'Initialize Git Repository?',
      label: 'Git',
      options: [
        { label: 'Yes', hint: 'Initialize a new Git repository (git init)' },
        { label: 'No', hint: 'Skip Git repository initialization' }
      ],
      chosenIdx: 0,
      chosenValue: 'Yes'
    }
  ];

  // Auto-scroll terminal container on changes
  $effect(() => {
    if (terminalElement) {
      phase;
      manualStepIdx;
      manualSelectedHistory;
      runnerStepStatus;
      terminalInput;
      
      setTimeout(() => {
        if (terminalElement) {
          terminalElement.scrollTop = terminalElement.scrollHeight;
        }
      }, 0);
    }
  });

  // Run the loop sequence infinitely
  $effect(() => {
    let active = true;

    async function runSequence() {
      while (active) {
        // --- 1. Initial State ---
        phase = 'initial';
        terminalInput = '';
        modeIndex = 0;
        manualStepIdx = 0;
        manualSelectedHistory = [];
        runnerStepStatus = ['pending', 'pending', 'pending', 'pending'];
        zoomClass = 'scale-[0.97] translate-x-0 translate-y-0';
        
        for (let file of sidebarFiles) {
          file.visible = false;
          if (file.type === 'dir') file.isOpen = false;
        }
        
        await delay(1800);
        if (!active) return;

        // --- 2. Zoom to Terminal and type command ---
        phase = 'typing-command';
        zoomClass = 'scale-[1.35] translate-x-[-15%] translate-y-[-18%]';
        await delay(500);

        const cmd = 'koko init';
        for (let i = 0; i < cmd.length; i++) {
          terminalInput += cmd[i];
          await delay(70 + Math.random() * 40);
          if (!active) return;
        }
        await delay(450);
        terminalInput = '';

        // --- 3. Step: Project Name Input ---
        phase = 'input-name';
        const typedName = 'koko-project';
        for (let i = 0; i < typedName.length; i++) {
          terminalInput += typedName[i];
          await delay(65 + Math.random() * 35);
          if (!active) return;
        }
        await delay(550);
        terminalInput = 'koko-project';

        // --- 4. Step: Mode Selection (Simulating choosing Manual Configuration) ---
        phase = 'mode-select';
        modeIndex = 0; // Starts focused on Quick Setup
        await delay(800);
        if (!active) return;
        
        // Simulates down arrow [↓] navigation to Manual Configuration
        modeIndex = 1;
        await delay(700);
        if (!active) return;

        // --- 5. Manual Configuration Steps Loop ---
        phase = 'manual-step';
        for (let step = 0; step < manualStepsData.length; step++) {
          manualStepIdx = step;
          const currentStepConfig = manualStepsData[step];
          
          if (step === 1) {
            // Give a realistic pause for backend selection
            await delay(750);
          } else if (currentStepConfig.isAddons) {
            // Give extra reading time on Addons step so checkboxes are clearly seen
            await delay(1300);
          } else {
            await delay(800);
          }
          if (!active) return;

          // Record the choice into history
          manualSelectedHistory = [
            ...manualSelectedHistory,
            { label: currentStepConfig.label, value: currentStepConfig.chosenValue }
          ];
        }

        // Keep the full summary visible briefly before starting the runner
        await delay(800);
        if (!active) return;

        // --- 6. Scaffolding Runner Progress ---
        phase = 'running';
        await delay(450);
        if (!active) return;

        // Step 1: Memory VFS
        runnerStepStatus = ['running', 'pending', 'pending', 'pending'];
        await delay(500);
        if (!active) return;
        runnerStepStatus = ['success', 'running', 'pending', 'pending'];

        // Step 2: Write disk
        await delay(500);
        if (!active) return;
        runnerStepStatus = ['success', 'success', 'running', 'pending'];

        // Step 3: Git init
        await delay(450);
        if (!active) return;
        runnerStepStatus = ['success', 'success', 'success', 'running'];

        // Step 4: koko.config.json
        await delay(450);
        if (!active) return;
        runnerStepStatus = ['success', 'success', 'success', 'success'];

        // --- 7. Done State ---
        phase = 'done';
        await delay(1400);
        if (!active) return;

        // --- 8. Zoom to Explorer Sidebar and reveal files ---
        zoomClass = 'scale-[1.4] translate-x-[22%] translate-y-[6%]';
        await delay(800);
        phase = 'sidebar-building';

        // Root files/folders
        const rootLevelIds = ['apps', 'pkgs', 'docker', 'turbo', 'koko'];
        for (let item of sidebarFiles) {
          if (rootLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(160);
          }
        }
        await delay(300);
        if (!active) return;

        // Open apps/
        const appsDir = sidebarFiles.find(i => i.id === 'apps');
        if (appsDir) appsDir.isOpen = true;
        const appsLevelIds = ['apps-web', 'apps-api'];
        for (let item of sidebarFiles) {
          if (appsLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(160);
          }
        }
        await delay(300);
        if (!active) return;

        // Open apps/web/
        const webDir = sidebarFiles.find(i => i.id === 'apps-web');
        if (webDir) webDir.isOpen = true;
        const webLevelIds = ['apps-web-src', 'apps-web-pkg'];
        for (let item of sidebarFiles) {
          if (webLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(150);
          }
        }
        await delay(250);

        // Open apps/web/src/
        const webSrcDir = sidebarFiles.find(i => i.id === 'apps-web-src');
        if (webSrcDir) webSrcDir.isOpen = true;
        const webSrcLevelIds = ['apps-web-app'];
        for (let item of sidebarFiles) {
          if (webSrcLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(150);
          }
        }
        await delay(300);
        if (!active) return;

        // Open apps/api/
        const apiDir = sidebarFiles.find(i => i.id === 'apps-api');
        if (apiDir) apiDir.isOpen = true;
        const apiLevelIds = ['apps-api-src', 'apps-api-pkg'];
        for (let item of sidebarFiles) {
          if (apiLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(150);
          }
        }
        await delay(250);

        // Open apps/api/src/
        const apiSrcDir = sidebarFiles.find(i => i.id === 'apps-api-src');
        if (apiSrcDir) apiSrcDir.isOpen = true;
        const apiSrcLevelIds = ['apps-api-main'];
        for (let item of sidebarFiles) {
          if (apiSrcLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(150);
          }
        }
        await delay(300);
        if (!active) return;

        // Open packages/
        const pkgsDir = sidebarFiles.find(i => i.id === 'pkgs');
        if (pkgsDir) pkgsDir.isOpen = true;
        const pkgsLevelIds = ['pkgs-auth', 'pkgs-db', 'pkgs-ui'];
        for (let item of sidebarFiles) {
          if (pkgsLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(150);
          }
        }
        await delay(300);
        if (!active) return;

        // Open sub-packages
        const authDir = sidebarFiles.find(i => i.id === 'pkgs-auth');
        if (authDir) authDir.isOpen = true;
        const dbDir = sidebarFiles.find(i => i.id === 'pkgs-db');
        if (dbDir) dbDir.isOpen = true;
        const uiDir = sidebarFiles.find(i => i.id === 'pkgs-ui');
        if (uiDir) uiDir.isOpen = true;

        const subPkgFiles = ['pkgs-auth-pkg', 'pkgs-db-schema', 'pkgs-db-pkg', 'pkgs-ui-pkg'];
        for (let item of sidebarFiles) {
          if (subPkgFiles.includes(item.id)) {
            item.visible = true;
            await delay(140);
          }
        }
        await delay(1400);

        // --- 9. Zoom Out & Complete ---
        phase = 'complete';
        zoomClass = 'scale-[0.97] translate-x-0 translate-y-0';
        await delay(4500);
      }
    }

    runSequence();

    return () => {
      active = false;
    };
  });
</script>

<!-- Outer Grid Lines Wrapper -->
<div class="relative w-full p-4 sm:p-6 md:p-10 pb-20 select-none overflow-visible font-sans pointer-events-none">
  
  <!-- Grid Lines -->
  <div class="absolute top-0 bottom-0 left-12 w-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute top-0 bottom-0 right-12 w-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute top-12 left-0 right-0 h-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute bottom-12 left-0 right-0 h-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>

  <!-- Liquid Glass Outer Panel with HUD Brackets -->
  <div class="relative w-full rounded-3xl border border-border-subtle bg-bg-surface/30 dark:border-white/10 dark:bg-white/[0.02] backdrop-blur-2xl shadow-xl dark:shadow-[0_0_60px_5px_rgba(0,0,0,0.4)] p-2 sm:p-3 md:p-5 overflow-hidden">
    <!-- Corner HUD crosshairs -->
    <div class="absolute top-2.5 left-2.5 w-2 h-2 border-t-2 border-l-2 border-brand-primary/40 pointer-events-none rounded-tl-sm"></div>
    <div class="absolute top-2.5 right-2.5 w-2 h-2 border-t-2 border-r-2 border-brand-primary/40 pointer-events-none rounded-tr-sm"></div>
    <div class="absolute bottom-2.5 left-2.5 w-2 h-2 border-b-2 border-l-2 border-brand-primary/40 pointer-events-none rounded-bl-sm"></div>
    <div class="absolute bottom-2.5 right-2.5 w-2 h-2 border-b-2 border-r-2 border-brand-primary/40 pointer-events-none rounded-br-sm"></div>
    
    <!-- Smooth Zoomable Wrapper -->
    <div class="transition-all duration-[900ms] ease-in-out origin-center transform {zoomClass}">
      
      <!-- VS Code IDE Window Mockup -->
      <div class="w-full max-w-full rounded-xl border border-white/[0.08] bg-[#1e1e1e] shadow-[0_0_40px_0px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[580px] sm:h-[640px] pointer-events-none select-none">
        
        <!-- VS Code Window Header / Titlebar -->
        <div class="h-9 bg-[#1c1c1c] border-b border-white/[0.04] flex items-center justify-between px-3 text-xs text-[#a0a0a0] select-none">
          <div class="flex items-center gap-2">
            <!-- Window controls (macOS style) -->
            <div class="flex items-center gap-1.5 mr-4">
              <span class="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center text-[8px] text-black/60 font-bold"></span>
              <span class="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[8px] text-black/60 font-bold"></span>
              <span class="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center text-[8px] text-black/60 font-bold"></span>
            </div>
            <!-- Menu Options -->
            <div class="hidden md:flex items-center gap-3 text-[11px] font-light">
              <span class="hover:text-white cursor-pointer transition-colors">File</span>
              <span class="hover:text-white cursor-pointer transition-colors">Edit</span>
              <span class="hover:text-white cursor-pointer transition-colors">Selection</span>
              <span class="hover:text-white cursor-pointer transition-colors">View</span>
              <span class="hover:text-white cursor-pointer transition-colors">Go</span>
              <span class="hover:text-white cursor-pointer transition-colors">Run</span>
              <span class="hover:text-white cursor-pointer transition-colors">Terminal</span>
              <span class="hover:text-white cursor-pointer transition-colors">Help</span>
            </div>
          </div>

          <!-- Document / Project Title & Live Phase Status -->
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-normal tracking-wide truncate max-w-xs md:max-w-md text-slate-300">
              koko-project — Visual Studio Code
            </span>
            <span class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-brand-primary/15 text-brand-primary border border-brand-primary/30">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
              {phase === 'sidebar-building' ? 'Tree Build' : phase === 'complete' ? 'Completed' : 'Simulating CLI'}
            </span>
          </div>

          <!-- Extra control placeholder -->
          <div class="flex items-center gap-4 text-[#858585] text-[11px]">
            <span class="hover:text-white cursor-pointer hidden sm:inline">Layout</span>
            <span class="hover:text-white cursor-pointer">🗖</span>
          </div>
        </div>

        <!-- Main IDE Layout (Columns: Activity Bar -> Sidebar -> Editor & Terminal) -->
        <div class="flex-1 flex overflow-hidden">
          
          <!-- 1. Activity Bar -->
          <div class="w-12 bg-[#181818] border-r border-white/[0.04] flex flex-col items-center justify-between py-4 text-[#858585] hidden sm:flex">
            <div class="flex flex-col gap-5 items-center w-full">
              <div class="text-white border-l-2 border-brand-primary pl-[10px] pr-[12px] py-1 cursor-pointer">
                <Files size={20} />
              </div>
              <div class="hover:text-white cursor-pointer transition-colors">
                <Search size={20} />
              </div>
              <div class="hover:text-white cursor-pointer transition-colors">
                <GitBranch size={20} />
              </div>
              <div class="hover:text-white cursor-pointer transition-colors">
                <Play size={20} />
              </div>
              <div class="hover:text-white cursor-pointer transition-colors">
                <Blocks size={20} />
              </div>
            </div>
            
            <div class="hover:text-white cursor-pointer transition-colors">
              <Settings size={20} />
            </div>
          </div>

          <!-- 2. Sidebar (Explorer File Tree) -->
          <div class="w-48 sm:w-56 bg-[#252526] border-r border-white/[0.04] flex flex-col text-xs text-[#cccccc] shrink-0 {phase.startsWith('typing') || phase.startsWith('input') || phase.startsWith('mode') || phase === 'manual-step' || phase === 'running' ? 'hidden md:flex' : 'flex'}">
            <div class="p-2.5 font-bold uppercase tracking-wider text-[10px] text-[#858585] flex items-center justify-between border-b border-white/[0.02]">
              <span>Explorer</span>
              <span>···</span>
            </div>
            
            <!-- Folder title -->
            <div class="px-2.5 py-1.5 flex items-center gap-1 font-bold text-[#e1e1e1] uppercase tracking-wide text-[10px] hover:bg-white/[0.02] cursor-pointer">
              <ChevronDown size={14} />
              <span>KOKO-PROJECT</span>
            </div>

            <!-- File list animation container -->
            <div class="flex-1 py-1 font-mono text-[11px] overflow-y-auto space-y-[2px] no-scrollbar">
              {#each sidebarFiles as item}
                {#if item.visible}
                  <div class="group px-3 py-0.5 flex items-center gap-1 hover:bg-white/[0.03] cursor-pointer transition-all duration-300">
                    <div class="flex shrink-0" style="width: {(item.indent - 1) * 8}px"></div>
                    {#if item.type === 'dir'}
                      {#if item.isOpen}
                        <ChevronDown size={11} class="text-[#a0a0a0] shrink-0" />
                        <Folder size={12} class="text-indigo-400 shrink-0" />
                      {:else}
                        <ChevronRight size={11} class="text-[#a0a0a0] shrink-0" />
                        <Folder size={12} class="text-indigo-400 shrink-0" />
                      {/if}
                      <span class="truncate text-[#e1e1e1]">{item.name}</span>
                    {:else}
                      <div class="w-[11px] shrink-0"></div>
                      <FileCode size={12} class={item.highlight ? 'text-emerald-400 shrink-0' : 'text-slate-400 shrink-0'} />
                      <span class={item.highlight ? 'text-emerald-400 font-semibold truncate' : 'truncate text-[#cccccc]'}>{item.name}</span>
                    {/if}
                  </div>
                {/if}
              {/each}
            </div>
          </div>

          <!-- Right column containing Tabs, Editor Area and Terminal -->
          <div class="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
            
            <!-- Tabs Bar -->
            <div class="h-9 bg-[#2d2d2d] flex items-center text-xs text-[#969696] select-none border-b border-white/[0.02]">
              <div class="h-full px-4 bg-[#1e1e1e] border-t-2 border-brand-primary flex items-center gap-2 text-white font-semibold cursor-pointer">
                <FileCode size={13} class="text-emerald-500" />
                <span>koko.config.json</span>
                <span class="hover:text-red-400 ml-1.5 text-[9px]">✕</span>
              </div>
              <div class="h-full px-4 flex items-center gap-2 hover:bg-white/[0.02] cursor-pointer transition-colors border-r border-white/[0.02]">
                <File size={13} class="text-slate-400" />
                <span>README.md</span>
              </div>
            </div>

            <!-- Code Editor Workspace (Authentic koko.config.json) -->
            <div class="flex-1 p-4 font-mono text-xs text-[#abb2bf] overflow-y-auto leading-relaxed select-text no-scrollbar">
              <div class="text-[#5c6370] italic mb-2">// Generated by Koko CLI v1.0.0</div>
              <div class="space-y-0.5 text-[11px]">
                <div><span class="text-[#e06c75]">&#123;</span></div>
                <div class="pl-4"><span class="text-[#e5c07b]">"$schema"</span>: <span class="text-[#98c379]">"https://koko-cli.dev/schema.json"</span>,</div>
                <div class="pl-4"><span class="text-[#e5c07b]">"project"</span>: <span class="text-[#e06c75]">&#123;</span></div>
                <div class="pl-8"><span class="text-[#e5c07b]">"name"</span>: <span class="text-[#98c379]">"koko-project"</span>,</div>
                <div class="pl-8"><span class="text-[#e5c07b]">"cliVersion"</span>: <span class="text-[#98c379]">"v1.0.0"</span>,</div>
                <div class="pl-8"><span class="text-[#e5c07b]">"createdAt"</span>: <span class="text-[#98c379]">"2026-09-18T16:45:00Z"</span></div>
                <div class="pl-4"><span class="text-[#e06c75]">&#125;</span>,</div>
                <div class="pl-4"><span class="text-[#e5c07b]">"architecture"</span>: <span class="text-[#e06c75]">&#123;</span></div>
                <div class="pl-8"><span class="text-[#e5c07b]">"layout"</span>: <span class="text-[#98c379]">"monorepo"</span>,</div>
                <div class="pl-8"><span class="text-[#e5c07b]">"packageManager"</span>: <span class="text-[#98c379]">"pnpm"</span></div>
                <div class="pl-4"><span class="text-[#e06c75]">&#125;</span>,</div>
                <div class="pl-4"><span class="text-[#e5c07b]">"stack"</span>: <span class="text-[#e06c75]">&#123;</span></div>
                <div class="pl-8"><span class="text-[#e5c07b]">"frontend"</span>: <span class="text-[#e06c75]">&#123;</span> <span class="text-[#e5c07b]">"framework"</span>: <span class="text-[#98c379]">"nextjs"</span>, <span class="text-[#e5c07b]">"language"</span>: <span class="text-[#98c379]">"typescript"</span>, <span class="text-[#e5c07b]">"styling"</span>: <span class="text-[#98c379]">"tailwindcss"</span>, <span class="text-[#e5c07b]">"uiLibrary"</span>: <span class="text-[#98c379]">"shadcn"</span> <span class="text-[#e06c75]">&#125;</span>,</div>
                <div class="pl-8"><span class="text-[#e5c07b]">"backend"</span>: <span class="text-[#e06c75]">&#123;</span> <span class="text-[#e5c07b]">"framework"</span>: <span class="text-[#98c379]">"nestjs"</span>, <span class="text-[#e5c07b]">"language"</span>: <span class="text-[#98c379]">"typescript"</span> <span class="text-[#e06c75]">&#125;</span>,</div>
                <div class="pl-8"><span class="text-[#e5c07b]">"database"</span>: <span class="text-[#e06c75]">&#123;</span> <span class="text-[#e5c07b]">"provider"</span>: <span class="text-[#98c379]">"postgres"</span>, <span class="text-[#e5c07b]">"orm"</span>: <span class="text-[#98c379]">"drizzle"</span> <span class="text-[#e06c75]">&#125;</span>,</div>
                <div class="pl-8"><span class="text-[#e5c07b]">"api"</span>: <span class="text-[#e06c75]">&#123;</span> <span class="text-[#e5c07b]">"layer"</span>: <span class="text-[#98c379]">"trpc"</span> <span class="text-[#e06c75]">&#125;</span></div>
                <div class="pl-4"><span class="text-[#e06c75]">&#125;</span>,</div>
                <div class="pl-4"><span class="text-[#e5c07b]">"features"</span>: <span class="text-[#e06c75]">&#123;</span></div>
                <div class="pl-8"><span class="text-[#e5c07b]">"auth"</span>: <span class="text-[#e06c75]">&#123;</span> <span class="text-[#e5c07b]">"provider"</span>: <span class="text-[#98c379]">"better-auth"</span>, <span class="text-[#e5c07b]">"status"</span>: <span class="text-[#98c379]">"installed"</span> <span class="text-[#e06c75]">&#125;</span>,</div>
                <div class="pl-8"><span class="text-[#e5c07b]">"infrastructure"</span>: <span class="text-[#e06c75]">&#123;</span> <span class="text-[#e5c07b]">"dockerCompose"</span>: <span class="text-[#d19a66]">true</span>, <span class="text-[#e5c07b]">"ciCd"</span>: <span class="text-[#98c379]">"github-actions"</span> <span class="text-[#e06c75]">&#125;</span></div>
                <div class="pl-4"><span class="text-[#e06c75]">&#125;</span></div>
                <div><span class="text-[#e06c75]">&#125;</span></div>
              </div>
            </div>

            <!-- Terminal / Output Console at the Bottom -->
            <div class="h-[280px] sm:h-[300px] bg-[#181818] border-t border-white/[0.06] flex flex-col overflow-hidden">
              
              <!-- Terminal tabs -->
              <div class="h-8 px-4 flex items-center justify-between text-xs text-[#858585] border-b border-white/[0.02]">
                <div class="flex items-center gap-4">
                  <span class="hover:text-white cursor-pointer">Problems</span>
                  <span class="hover:text-white cursor-pointer">Output</span>
                  <span class="hover:text-white cursor-pointer">Debug Console</span>
                  <span class="hover:text-white text-white font-bold border-b border-brand-primary pb-1 cursor-pointer">Terminal</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="hover:text-white cursor-pointer">➕</span>
                  <span class="hover:text-white cursor-pointer">🗖</span>
                </div>
              </div>

              <!-- Terminal body area (Faithful Charmbracelet Lipgloss UI) -->
              <div bind:this={terminalElement} class="flex-1 p-3.5 font-mono text-[11px] text-slate-300 overflow-y-auto leading-tight no-scrollbar">
                
                <!-- Initial typing prompt -->
                {#if phase === 'initial' || phase === 'typing-command'}
                  <div class="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
                    <span class="text-[#8A2BE2]">$</span>
                    <span class="text-slate-100">{terminalInput}</span>
                    <span class="w-1.5 h-3.5 bg-slate-300 animate-pulse"></span>
                  </div>
                {/if}

                <!-- TUI Box for Step 1: Project Name -->
                {#if phase === 'input-name'}
                  <div class="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
                    <span class="text-[#8A2BE2]">$</span>
                    <span class="text-slate-100">koko init</span>
                  </div>
                  <div class="space-y-0.5 text-slate-300">
                    <div class="text-[#7D7D7D]"><span class="text-[#7D7D7D]">┌</span>  <span class="text-white font-bold">{t.creatingProject}</span></div>
                    <div class="text-[#7D7D7D]">│</div>
                    <div><span class="text-[#8A2BE2] font-bold">◇</span>  <span class="text-white font-bold">{t.projectNameLabel}</span></div>
                    <div class="flex items-center gap-1.5">
                      <span class="text-[#7D7D7D]">│</span>  
                      <span class="text-[#A78BFA] font-bold">{terminalInput}</span>
                      <span class="w-1.5 h-3 bg-[#A78BFA] animate-pulse"></span>
                    </div>
                    <div class="text-[#7D7D7D]">│</div>
                    <div class="text-[#7D7D7D]"><span class="text-[#7D7D7D]">└</span>  <span class="text-[#7D7D7D]">[Enter] Continue • [Esc] Main menu</span></div>
                  </div>
                {/if}

                <!-- TUI Box for Step 2: Choose Setup Mode -->
                {#if phase === 'mode-select'}
                  <div class="space-y-0.5 text-slate-300">
                    <div class="text-[#7D7D7D]"><span class="text-[#7D7D7D]">┌</span>  <span class="text-white font-bold">{t.creatingProject}</span></div>
                    <div class="text-[#7D7D7D]">│</div>
                    <div>
                      <span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">{t.projectNameLabel}</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">koko-project</span>
                    </div>
                    <div class="text-[#7D7D7D]">│</div>
                    <div><span class="text-[#8A2BE2] font-bold">◇</span>  <span class="text-white font-bold">{t.chooseModeLabel}</span></div>
                    <!-- Option 0: Quick Setup -->
                    <div class="flex items-center gap-2">
                      <span class="text-[#7D7D7D]">│</span>  
                      <span class={modeIndex === 0 ? 'text-[#8A2BE2]' : 'text-[#7D7D7D]'}>{modeIndex === 0 ? '●' : '○'}</span>
                      <span class={modeIndex === 0 ? 'text-white font-bold' : 'text-[#7D7D7D]'}>{t.quickModeLabel}</span>
                      <span class="text-[#666666] text-[10px]">{t.quickModeHint}</span>
                    </div>
                    <!-- Option 1: Manual Configuration -->
                    <div class="flex items-center gap-2">
                      <span class="text-[#7D7D7D]">│</span>  
                      <span class={modeIndex === 1 ? 'text-[#8A2BE2]' : 'text-[#7D7D7D]'}>{modeIndex === 1 ? '●' : '○'}</span>
                      <span class={modeIndex === 1 ? 'text-white font-bold' : 'text-[#7D7D7D]'}>{t.manualModeLabel}</span>
                      <span class="text-[#666666] text-[10px] hidden sm:inline">{t.manualModeHint}</span>
                    </div>
                    <div class="text-[#7D7D7D]">│</div>
                    <div class="text-[#7D7D7D]"><span class="text-[#7D7D7D]">└</span>  <span class="text-[#7D7D7D]">[↑/↓] Navigate • [Enter] Continue • [Esc] Change name</span></div>
                  </div>
                {/if}

                <!-- TUI Box for Step 3: Manual Configuration Wizard Steps -->
                {#if phase === 'manual-step'}
                  <div class="space-y-0.5 text-slate-300">
                    <div class="text-[#7D7D7D]"><span class="text-[#7D7D7D]">┌</span>  <span class="text-white font-bold">{t.creatingProject}</span></div>
                    <div class="text-[#7D7D7D]">│</div>
                    <div>
                      <span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">{t.projectNameLabel}</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">koko-project</span>
                    </div>
                    <div>
                      <span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Setup mode</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">Manual Configuration</span>
                    </div>
                    
                    <!-- History of completed steps -->
                    {#each manualSelectedHistory as hist}
                      <div>
                        <span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">{hist.label}</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">{hist.value}</span>
                      </div>
                    {/each}

                    <div class="text-[#7D7D7D]">│</div>
                    
                    <!-- Current Active Step -->
                    {#if manualStepIdx < manualStepsData.length}
                      {@const step = manualStepsData[manualStepIdx]}
                      <div><span class="text-[#8A2BE2] font-bold">◇</span>  <span class="text-white font-bold">{step.title}</span></div>
                      
                      {#if step.isAddons}
                        <div class="text-[#7D7D7D]">│  <span class="text-[#A78BFA] font-bold">── Tooling & DevOps ──</span></div>
                        {#each step.options as opt, idx}
                          <div class="flex items-center gap-2">
                            <span class="text-[#7D7D7D]">│</span>  
                            <span class="text-[#00FF7F] font-bold">[✓]</span>
                            <span class="text-white font-bold">{opt.label}</span>
                            <span class="text-[#666666] text-[10px] hidden sm:inline">{opt.hint}</span>
                          </div>
                        {/each}
                      {:else}
                        {#each step.options.slice(0, 4) as opt, idx}
                          <div class="flex items-center gap-2">
                            <span class="text-[#7D7D7D]">│</span>  
                            <span class={idx === (step.chosenIdx > 3 ? 0 : step.chosenIdx) ? 'text-[#8A2BE2]' : 'text-[#7D7D7D]'}>
                              {idx === (step.chosenIdx > 3 ? 0 : step.chosenIdx) ? '●' : '○'}
                            </span>
                            <span class={idx === (step.chosenIdx > 3 ? 0 : step.chosenIdx) ? 'text-white font-bold' : 'text-[#7D7D7D]'}>
                              {opt.label}
                            </span>
                            <span class="text-[#666666] text-[10px] hidden sm:inline">{opt.hint}</span>
                          </div>
                        {/each}
                      {/if}
                    {/if}

                    <div class="text-[#7D7D7D]">│</div>
                    <div class="text-[#7D7D7D]"><span class="text-[#7D7D7D]">└</span>  <span class="text-[#7D7D7D]">[↑/↓] Navigate • [Enter] Next • [Esc] Go back</span></div>
                  </div>
                {/if}

                <!-- TUI Box for Step 4 & 5: Running & Done -->
                {#if phase === 'running' || phase === 'done' || phase === 'sidebar-building' || phase === 'complete'}
                  <div class="space-y-0.5 text-slate-300">
                    <div class="text-[#7D7D7D]"><span class="text-[#7D7D7D]">┌</span>  <span class="text-white font-bold">{t.creatingProject}</span></div>
                    <div class="text-[#7D7D7D]">│</div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">{t.projectNameLabel}</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">koko-project</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Setup mode</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">Manual Configuration</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Frontend</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">Next.js</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Backend</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">NestJS</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">API</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">tRPC</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Package Manager</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">pnpm</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Database</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">PostgreSQL</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">ORM / Tool</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">Drizzle ORM</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Auth</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">Better Auth</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Addons</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">shadcn/ui, Docker Compose, GitHub Actions CI</span></div>
                    <div><span class="text-[#00FF7F] font-bold">◆</span>  <span class="text-white font-bold">Git</span>  <span class="text-[#7D7D7D]">·</span>  <span class="text-[#A78BFA] font-bold">Yes</span></div>
                    <div class="text-[#7D7D7D]">│</div>
                    
                    <!-- Runner Steps -->
                    <div class="flex items-center gap-2">
                      <span class="text-[#7D7D7D]">│</span>
                      <span class={runnerStepStatus[0] === 'success' ? 'text-[#00FF7F] font-bold' : runnerStepStatus[0] === 'running' ? 'text-[#8A2BE2] animate-spin' : 'text-[#7D7D7D]'}>
                        {runnerStepStatus[0] === 'success' ? '✓' : runnerStepStatus[0] === 'running' ? '⠋' : '◇'}
                      </span>
                      <span class={runnerStepStatus[0] === 'success' ? 'text-white font-bold' : runnerStepStatus[0] === 'running' ? 'text-white' : 'text-[#7D7D7D]'}>{t.stepGenMemory}</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <span class="text-[#7D7D7D]">│</span>
                      <span class={runnerStepStatus[1] === 'success' ? 'text-[#00FF7F] font-bold' : runnerStepStatus[1] === 'running' ? 'text-[#8A2BE2] animate-spin' : 'text-[#7D7D7D]'}>
                        {runnerStepStatus[1] === 'success' ? '✓' : runnerStepStatus[1] === 'running' ? '⠋' : '◇'}
                      </span>
                      <span class={runnerStepStatus[1] === 'success' ? 'text-white font-bold' : runnerStepStatus[1] === 'running' ? 'text-white' : 'text-[#7D7D7D]'}>{t.stepWritingDisk}</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <span class="text-[#7D7D7D]">│</span>
                      <span class={runnerStepStatus[2] === 'success' ? 'text-[#00FF7F] font-bold' : runnerStepStatus[2] === 'running' ? 'text-[#8A2BE2] animate-spin' : 'text-[#7D7D7D]'}>
                        {runnerStepStatus[2] === 'success' ? '✓' : runnerStepStatus[2] === 'running' ? '⠋' : '◇'}
                      </span>
                      <span class={runnerStepStatus[2] === 'success' ? 'text-white font-bold' : runnerStepStatus[2] === 'running' ? 'text-white' : 'text-[#7D7D7D]'}>{t.stepInitGit}</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <span class="text-[#7D7D7D]">│</span>
                      <span class={runnerStepStatus[3] === 'success' ? 'text-[#00FF7F] font-bold' : runnerStepStatus[3] === 'running' ? 'text-[#8A2BE2] animate-spin' : 'text-[#7D7D7D]'}>
                        {runnerStepStatus[3] === 'success' ? '✓' : runnerStepStatus[3] === 'running' ? '⠋' : '◇'}
                      </span>
                      <span class={runnerStepStatus[3] === 'success' ? 'text-white font-bold' : runnerStepStatus[3] === 'running' ? 'text-white' : 'text-[#7D7D7D]'}>{t.stepManifest}</span>
                    </div>

                    <div class="text-[#7D7D7D]">│</div>
                    
                    {#if phase === 'running'}
                      <div class="text-[#7D7D7D]"><span class="text-[#7D7D7D]">└</span>  <span class="text-[#7D7D7D]">{t.scaffoldingInProgress}</span></div>
                    {:else}
                      <div><span class="text-[#7D7D7D]">└</span>  <span class="text-[#00FF7F] font-bold">{t.projectCreatedSuccess}</span></div>
                      <div class="pt-2 text-white font-bold">  {t.nextSteps}</div>
                      <div class="text-[#A78BFA]">  1. cd koko-project</div>
                      <div class="text-[#A78BFA]">  2. pnpm install</div>
                      <div class="text-[#A78BFA]">  3. pnpm dev</div>
                    {/if}
                  </div>
                {/if}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

<style>
  :global(.no-scrollbar)::-webkit-scrollbar {
    display: none !important;
  }
  :global(.no-scrollbar) {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
</style>
