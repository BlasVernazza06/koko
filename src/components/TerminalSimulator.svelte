<script lang="ts">
  import { 
    Terminal as TerminalIcon, 
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
    Play,
    Maximize2,
    Minus,
    Square,
    X
  } from '@lucide/svelte';

  // State machine for the simulation loop
  // 'initial' -> 'typing' -> 'wizard-flow' -> 'wizard-recipe' -> 'scaffolding' -> 'done' -> 'sidebar-building' -> 'complete'
  let phase = $state('initial');
  let currentLang = $state('es');

  // Interactive/Visual zoom control variables
  let zoomClass = $state('scale-100 translate-x-0 translate-y-0');
  
  // Terminal text state
  let terminalInput = $state('');
  let terminalLines = $state<string[]>([]);
  let terminalElement = $state<HTMLDivElement | null>(null);
  
  // Wizard options states
  let flowActiveIndex = $state(0);
  let recipeActiveIndex = $state(0);
  let showFlowChoice = $state(false);
  let showRecipeChoice = $state(false);
  let showScaffoldingIndicator = $state(false);

  // Sidebar building states
  let sidebarFiles = $state<{ id: string; name: string; type: 'dir' | 'file'; indent: number; visible: boolean; isOpen?: boolean; highlight?: boolean }[]>([
    { id: 'apps', name: 'apps', type: 'dir', indent: 1, visible: false, isOpen: false },
    { id: 'apps-web', name: 'web (Next.js)', type: 'dir', indent: 2, visible: false, isOpen: false },
    { id: 'apps-web-src', name: 'src', type: 'dir', indent: 3, visible: false, isOpen: false },
    { id: 'apps-web-app', name: 'app', type: 'dir', indent: 4, visible: false, isOpen: false },
    { id: 'apps-web-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },
    
    { id: 'apps-api', name: 'api (NestJS)', type: 'dir', indent: 2, visible: false, isOpen: false },
    { id: 'apps-api-src', name: 'src', type: 'dir', indent: 3, visible: false, isOpen: false },
    { id: 'apps-api-main', name: 'main.ts', type: 'file', indent: 4, visible: false },
    { id: 'apps-api-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },

    { id: 'pkgs', name: 'packages', type: 'dir', indent: 1, visible: false, isOpen: false },
    { id: 'pkgs-auth', name: 'auth (Better-Auth)', type: 'dir', indent: 2, visible: false, isOpen: false },
    { id: 'pkgs-auth-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },
    { id: 'pkgs-schemas', name: 'schemas (Zod)', type: 'dir', indent: 2, visible: false, isOpen: false },
    { id: 'pkgs-schemas-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },

    { id: 'docker', name: 'docker-compose.yml', type: 'file', indent: 1, visible: false, highlight: true },
    { id: 'turbo', name: 'turbo.json', type: 'file', indent: 1, visible: false, highlight: true },
    { id: 'claw', name: 'claw.config.json', type: 'file', indent: 1, visible: false, highlight: true }
  ]);

  // Auto-scroll terminal container on changes
  $effect(() => {
    if (terminalElement) {
      // Establish Svelte 5 dependencies to trigger effect on updates
      terminalLines;
      phase;
      showFlowChoice;
      showRecipeChoice;
      showScaffoldingIndicator;
      terminalInput;
      
      // Allow DOM to update first before scrolling
      setTimeout(() => {
        if (terminalElement) {
          terminalElement.scrollTop = terminalElement.scrollHeight;
        }
      }, 0);
    }
  });

  // Listen to lang changes
  $effect(() => {
    currentLang = document.documentElement.getAttribute('data-lang') || 'es';
    
    const handleLangChange = (e: any) => {
      currentLang = e.detail;
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => {
      window.removeEventListener('lang-change', handleLangChange);
    };
  });

  // Translation dictionary
  const t = $derived({
    es: {
      welcome: 'Bienvenido a Claw CLI v0.1.0',
      projectNamePrompt: '? Nombre del proyecto: ',
      typeInit: 'Iniciando asistente de configuración interactiva...',
      flowChoice: '¿Cómo deseas inicializar tu proyecto?',
      flowRapido: '🚀 Setup Rápido (Recetas de producción listas para usar)',
      flowManual: '⚙️ Configuración Manual (Elegir stack paso a paso)',
      recipeChoice: 'Selecciona una receta de producción:',
      recipeSaas: '💻 Fullstack SaaS Starter (Next.js + Go Fiber + PostgreSQL)',
      analyzing: '🔧 Analizando dependencias...',
      downloading: '📦 Descargando recetas embebidas de Go...',
      injecting: '🚀 Inyectando plantillas y construyendo estructura...',
      done: '✨ ¡Listo! Proyecto inicializado con éxito en 0.8s.'
    },
    en: {
      welcome: 'Welcome to Claw CLI v0.1.0',
      projectNamePrompt: '? Project name: ',
      typeInit: 'Starting interactive configuration wizard...',
      flowChoice: 'How do you want to initialize your project?',
      flowRapido: '🚀 Rapid Setup (Ready-to-use production recipes)',
      flowManual: '⚙️ Manual Configuration (Choose stack step-by-step)',
      recipeChoice: 'Select a production recipe:',
      recipeSaas: '💻 Fullstack SaaS Starter (Next.js + Go Fiber + PostgreSQL)',
      analyzing: '🔧 Analyzing dependencies...',
      downloading: '📦 Downloading Go-embedded recipes...',
      injecting: '🚀 Injecting templates and building workspace structure...',
      done: '✨ Done! Project bootstrapped successfully in 0.8s.'
    }
  }[currentLang] || t.es);

  // Helper delay function
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Run the loop sequence infinitely
  $effect(() => {
    let active = true;

    async function runSequence() {
      while (active) {
        // --- 1. Initial State ---
        phase = 'initial';
        terminalInput = '';
        terminalLines = [t.welcome];
        showFlowChoice = false;
        showRecipeChoice = false;
        showScaffoldingIndicator = false;
        zoomClass = 'scale-[0.97] translate-x-0 translate-y-0';
        for (let file of sidebarFiles) {
          file.visible = false;
          if (file.type === 'dir') file.isOpen = false;
        }
        
        await delay(2000); // Allow full view representation first
        if (!active) return;

        // --- 2. Zoom to Terminal and start typing claw init ---
        phase = 'typing';
        zoomClass = 'scale-[1.35] translate-x-[-15%] translate-y-[-18%]';
        await delay(600);

        const commandText = 'claw init';
        for (let i = 0; i < commandText.length; i++) {
          terminalInput += commandText[i];
          await delay(80 + Math.random() * 50);
          if (!active) return;
        }

        await delay(500);
        terminalLines = [...terminalLines, `$ ${commandText}`, ''];
        terminalInput = '';

        // Print ASCII Banner
        terminalLines = [
          ...terminalLines,
          '  __ _  __ _ __      __',
          ' / _| |/ _` |\\ \\ /\\ / /',
          '| (__| | (_| | \\ V  V / ',
          ' \\___|_|\\__,_|  \\_/\\_/  v0.1.0',
          ''
        ];
        await delay(600);
        if (!active) return;

        // --- 2b. Prompt Project Name ---
        phase = 'typing-project-name';
        const typedProjectName = 'koko-project';
        for (let i = 0; i < typedProjectName.length; i++) {
          terminalInput += typedProjectName[i];
          await delay(70 + Math.random() * 40);
          if (!active) return;
        }
        await delay(500);
        terminalLines = [...terminalLines, `${t.projectNamePrompt}${typedProjectName}`, '', t.typeInit];
        terminalInput = '';
        await delay(600);

        // --- 3. Flow Selection ---
        phase = 'wizard-flow';
        showFlowChoice = true;
        flowActiveIndex = 0;
        await delay(1000);
        flowActiveIndex = 1; // simulation movements
        await delay(800);
        flowActiveIndex = 0;
        await delay(600);
        
        showFlowChoice = false;
        terminalLines = [...terminalLines, `? ${t.flowChoice} ${t.flowRapido}`];
        await delay(400);

        // --- 4. Recipe Selection ---
        phase = 'wizard-recipe';
        showRecipeChoice = true;
        recipeActiveIndex = 0;
        await delay(1200);
        showRecipeChoice = false;
        terminalLines = [...terminalLines, `? ${t.recipeChoice} ${t.recipeSaas}`];
        await delay(400);

        // --- 5. Scaffolding Execution ---
        phase = 'scaffolding';
        showScaffoldingIndicator = true;
        await delay(600);
        terminalLines = [...terminalLines, t.analyzing];
        await delay(700);
        terminalLines = [...terminalLines, t.downloading];
        await delay(800);
        terminalLines = [...terminalLines, t.injecting];
        await delay(900);
        
        showScaffoldingIndicator = false;
        terminalLines = [...terminalLines, '', t.done, ''];
        phase = 'done';
        await delay(1200);

        // --- 6. Zoom to Explorer Sidebar ---
        zoomClass = 'scale-[1.4] translate-x-[22%] translate-y-[6%]';
        await delay(800);
        phase = 'sidebar-building';

        // Step 1: Root files and folders appear (collapsed directories)
        const rootLevelIds = ['apps', 'pkgs', 'docker', 'turbo', 'claw'];
        for (let item of sidebarFiles) {
          if (rootLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(200);
          }
        }
        await delay(400);
        if (!active) return;

        // Step 2: Open apps/
        const appsDir = sidebarFiles.find(i => i.id === 'apps');
        if (appsDir) appsDir.isOpen = true;
        
        const appsLevelIds = ['apps-web', 'apps-api'];
        for (let item of sidebarFiles) {
          if (appsLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(180);
          }
        }
        await delay(400);
        if (!active) return;

        // Step 3: Open web/ Next.js app
        const webDir = sidebarFiles.find(i => i.id === 'apps-web');
        if (webDir) webDir.isOpen = true;
        
        const webLevelIds = ['apps-web-src', 'apps-web-pkg'];
        for (let item of sidebarFiles) {
          if (webLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(180);
          }
        }
        await delay(400);
        if (!active) return;

        // Step 4: Open web/src/
        const webSrcDir = sidebarFiles.find(i => i.id === 'apps-web-src');
        if (webSrcDir) webSrcDir.isOpen = true;
        
        const webSrcLevelIds = ['apps-web-app'];
        for (let item of sidebarFiles) {
          if (webSrcLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(180);
          }
        }
        await delay(400);
        if (!active) return;

        // Step 5: Open api/ NestJS app
        const apiDir = sidebarFiles.find(i => i.id === 'apps-api');
        if (apiDir) apiDir.isOpen = true;
        
        const apiLevelIds = ['apps-api-src', 'apps-api-pkg'];
        for (let item of sidebarFiles) {
          if (apiLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(180);
          }
        }
        await delay(400);
        if (!active) return;

        // Step 6: Open api/src/
        const apiSrcDir = sidebarFiles.find(i => i.id === 'apps-api-src');
        if (apiSrcDir) apiSrcDir.isOpen = true;
        
        const apiSrcLevelIds = ['apps-api-main'];
        for (let item of sidebarFiles) {
          if (apiSrcLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(180);
          }
        }
        await delay(400);
        if (!active) return;

        // Step 7: Open packages/
        const pkgsDir = sidebarFiles.find(i => i.id === 'pkgs');
        if (pkgsDir) pkgsDir.isOpen = true;
        
        const pkgsLevelIds = ['pkgs-auth', 'pkgs-schemas'];
        for (let item of sidebarFiles) {
          if (pkgsLevelIds.includes(item.id)) {
            item.visible = true;
            await delay(180);
          }
        }
        await delay(400);
        if (!active) return;

        // Step 8: Open shared auth/ schemas dirs
        const authDir = sidebarFiles.find(i => i.id === 'pkgs-auth');
        if (authDir) authDir.isOpen = true;
        const schemasDir = sidebarFiles.find(i => i.id === 'pkgs-schemas');
        if (schemasDir) schemasDir.isOpen = true;

        const pkgConfigsIds = ['pkgs-auth-pkg', 'pkgs-schemas-pkg'];
        for (let item of sidebarFiles) {
          if (pkgConfigsIds.includes(item.id)) {
            item.visible = true;
            await delay(180);
          }
        }
        await delay(1500);

        // --- 7. Zoom Out & Complete ---
        phase = 'complete';
        zoomClass = 'scale-[0.97] translate-x-0 translate-y-0';
        await delay(4000); // Keep full view open before restarting
      }
    }

    runSequence();

    return () => {
      active = false;
    };
  });
</script>

<!-- Outer Grid Lines Wrapper -->
<div class="relative w-full p-6 sm:p-8 md:p-12 pb-24 select-none overflow-visible font-sans pointer-events-none">
  
  <!-- Grid Lines -->
  <div class="absolute top-0 bottom-0 left-12 w-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute top-0 bottom-0 right-12 w-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute top-12 left-0 right-0 h-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute bottom-12 left-0 right-0 h-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>

  <!-- Liquid Glass Outer Panel -->
  <div class="relative w-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-3 md:p-5 overflow-hidden">
    
    <!-- Smooth Zoomable Wrapper -->
    <div class="transition-all duration-[900ms] ease-in-out origin-center transform {zoomClass}">
      
      <!-- VS Code IDE Window Mockup (Hyper Realistic) -->
      <div class="w-full max-w-full rounded-xl border border-white/[0.08] bg-[#1e1e1e] shadow-2xl overflow-hidden flex flex-col h-[620px] pointer-events-none select-none">
        
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

          <!-- Document / Project Title -->
          <div class="text-[11px] font-normal tracking-wide truncate max-w-xs md:max-w-md">
            my-claw-project — Visual Studio Code
          </div>

          <!-- Extra control placeholder -->
          <div class="flex items-center gap-4 text-[#858585] text-[11px]">
            <span class="hover:text-white cursor-pointer">Layout</span>
            <span class="hover:text-white cursor-pointer">🗖</span>
          </div>
        </div>

        <!-- Main IDE Layout (Columns: Activity Bar -> Sidebar -> Editor & Terminal) -->
        <div class="flex-1 flex overflow-hidden">
          
          <!-- 1. Activity Bar -->
          <div class="w-12 bg-[#181818] border-r border-white/[0.04] flex flex-col items-center justify-between py-4 text-[#858585]">
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
          <div class="w-52 bg-[#252526] border-r border-white/[0.04] flex flex-col text-xs text-[#cccccc]">
            <div class="p-2.5 font-bold uppercase tracking-wider text-[10px] text-[#858585] flex items-center justify-between border-b border-white/[0.02]">
              <span>Explorer</span>
              <span>···</span>
            </div>
            
            <!-- Folder title -->
            <div class="px-2.5 py-1.5 flex items-center gap-1 font-bold text-[#e1e1e1] uppercase tracking-wide text-[10px] hover:bg-white/[0.02] cursor-pointer">
              <ChevronDown size={14} />
              <span>{phase === 'sidebar-building' || phase === 'complete' ? 'KOKO-PROJECT' : 'MY-CLAW-PROJECT'}</span>
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
                <span>claw.config.json</span>
                <span class="hover:text-red-400 ml-1.5 text-[9px]">✕</span>
              </div>
              <div class="h-full px-4 flex items-center gap-2 hover:bg-white/[0.02] cursor-pointer transition-colors border-r border-white/[0.02]">
                <File size={13} class="text-slate-400" />
                <span>README.md</span>
              </div>
            </div>

            <!-- Code Editor Workspace -->
            <div class="flex-1 p-5 font-mono text-xs text-[#a9b2c3] overflow-y-auto leading-relaxed select-text no-scrollbar">
              <div class="text-[#5c6370] italic mb-3">// Autogenerated configuration by Claw-CLI</div>
              <div>
                <span class="text-[#e06c75]">{"{"}</span><br />
                <span class="pl-4 text-[#abb2bf]">"name":</span> <span class="text-[#98c379]">"{phase === 'sidebar-building' || phase === 'complete' ? 'koko-project' : 'my-claw-project'}"</span>,<br />
                <span class="pl-4 text-[#abb2bf]">"version":</span> <span class="text-[#98c379]">"0.1.0"</span>,<br />
                <span class="pl-4 text-[#abb2bf]">"lang":</span> <span class="text-[#98c379]">"typescript"</span>,<br />
                <span class="pl-4 text-[#abb2bf]">"recipe":</span> <span class="text-[#e5c07b]">"turborepo-monorepo"</span>,<br />
                <span class="pl-4 text-[#abb2bf]">"features":</span> <span class="text-[#e06c75]">{"["}</span><br />
                <span class="pl-8 text-[#98c379]">"nextjs"</span>,<br />
                <span class="pl-8 text-[#98c379]">"nestjs"</span>,<br />
                <span class="pl-8 text-[#98c379]">"zod"</span>,<br />
                <span class="pl-8 text-[#98c379]">"better-auth"</span>,<br />
                <span class="pl-8 text-[#98c379]">"docker-compose"</span>,<br />
                <span class="pl-8 text-[#98c379]">"github-actions"</span><br />
                <span class="pl-4 text-[#e06c75]">{"]"}</span><br />
                <span class="text-[#e06c75]">{"}"}</span>
              </div>
            </div>

            <!-- Terminal / Output Console at the Bottom -->
            <div class="h-[260px] bg-[#181818] border-t border-white/[0.06] flex flex-col overflow-hidden">
              
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

              <!-- Terminal body area -->
              <div bind:this={terminalElement} class="flex-1 p-4 font-mono text-[11px] text-slate-300 overflow-y-auto space-y-1.5 no-scrollbar">
                
                <!-- History -->
                {#each terminalLines as line}
                  <div class="whitespace-pre-wrap leading-relaxed min-h-[1.1rem] 
                    {line.startsWith('$') ? 'text-indigo-400 font-semibold' : ''} 
                    {line.includes('✨') ? 'text-emerald-400 font-bold' : ''} 
                    {line.includes('✔') || line.startsWith('? ') ? 'text-emerald-500/95 font-medium' : ''}">
                    {line}
                  </div>
                {/each}

                <!-- Wizard Selection 1 (Flow Choice) -->
                {#if showFlowChoice}
                  <div class="flex flex-col gap-0.5 text-slate-300 select-none">
                    <span class="text-cyan-400 font-bold">? {t.flowChoice}</span>
                    <div class="pl-3 flex flex-col gap-0.5">
                      <div class={flowActiveIndex === 0 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        <span>{flowActiveIndex === 0 ? '❯' : ' '} {t.flowRapido}</span>
                      </div>
                      <div class={flowActiveIndex === 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        <span>{flowActiveIndex === 1 ? '❯' : ' '} {t.flowManual}</span>
                      </div>
                    </div>
                  </div>
                {/if}

                <!-- Wizard Selection 2 (Recipe Choice) -->
                {#if showRecipeChoice}
                  <div class="flex flex-col gap-0.5 text-slate-300 select-none">
                    <span class="text-cyan-400 font-bold">? {t.recipeChoice}</span>
                    <div class="pl-3 flex flex-col gap-0.5">
                      <div class={recipeActiveIndex === 0 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        <span>{recipeActiveIndex === 0 ? '❯' : ' '} {t.recipeSaas}</span>
                      </div>
                    </div>
                  </div>
                {/if}

                <!-- Running indicator -->
                {#if showScaffoldingIndicator}
                  <div class="flex items-center gap-2 text-indigo-400 font-mono select-none animate-pulse">
                    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                    <span>Running scaffolding setup...</span>
                  </div>
                {/if}

                <!-- Typing cursor line -->
                {#if phase === 'typing'}
                  <div class="flex items-center gap-1.5 text-indigo-400">
                    <span class="font-bold select-none">$</span>
                    <span class="text-slate-100 font-semibold">{terminalInput}</span>
                    <span class="w-1.5 h-3.5 bg-slate-400 animate-pulse"></span>
                  </div>
                {/if}

                {#if phase === 'typing-project-name'}
                  <div class="flex items-center gap-1.5 text-cyan-400">
                    <span class="font-bold select-none">{t.projectNamePrompt}</span>
                    <span class="text-slate-100 font-semibold">{terminalInput}</span>
                    <span class="w-1.5 h-3.5 bg-slate-400 animate-pulse"></span>
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
