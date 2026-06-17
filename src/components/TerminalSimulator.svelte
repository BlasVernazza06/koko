<script>
  import { Terminal as TerminalIcon, Folder, FileCode, ChevronRight } from '@lucide/svelte';

  let command = $state('');
  let output = $state([
    'Welcome to Claw CLI v0.1.0',
    'Type "claw init" to bootstrap a new workspace.',
    ''
  ]);
 
  // Wizard states: 'idle' | 'flow-choice' | 'recipe-choice' | 'manual-front' | 'manual-back' | 'manual-db' | 'manual-docker' | 'manual-github' | 'generating'
  let wizardState = $state('idle');
  
  // Selections
  let selectedFlow = $state(''); // 'rapido' | 'manual'
  let selectedRecipe = $state('');
  let selectedFront = $state('');
  let selectedBack = $state('');
  let selectedDb = $state('');
  let selectedDocker = $state('');
  let selectedGithub = $state('');
  
  // Selection active indices for keyboard navigation
  let activeIndex = $state(0);

  const flowOptions = [
    { label: '🚀 Setup Rápido (Recetas de producción listas para usar)', value: 'rapido' },
    { label: '⚙️ Configuración Manual (Elegir stack paso a paso)', value: 'manual' }
  ];

  const recipeOptions = [
    { label: '💻 Fullstack SaaS Starter (Next.js + Go Fiber + PostgreSQL + Docker Compose)', value: 'saas' },
    { label: '⚡ API Moderna limpia (Fastify + Prisma + PostgreSQL)', value: 'api' },
    { label: '🎨 Single Page App (React SPA + Vite + Tailwind CSS)', value: 'spa' }
  ];

  const frontOptions = ['Next.js (App Router, TS)', 'React SPA (Vite, TS)', 'Ninguno'];
  const backOptions = ['Go Fiber (REST API)', 'Node.js Express (TS)', 'Ninguno'];
  const dbOptions = ['PostgreSQL + Prisma', 'PostgreSQL + SQLx (Go)', 'Ninguno'];
  const yesNoOptions = ['Yes', 'No'];

  let showStructure = $state(false);
  let generatedTree = $state([]);

  function handleKeyDown(e) {
    if (wizardState === 'idle') {
      if (e.key === 'Enter') {
        const trimmed = command.trim();
        if (!trimmed) return;

        if (trimmed === 'claw init') {
          output = [
            ...output,
            `$ ${trimmed}`,
            '',
            '  __ _  __ _ __      __',
            ' / _| |/ _` |\\ \\ /\\ / /',
            '| (__| | (_| | \\ V  V / ',
            ' \\___|_|\\__,_|  \\_/\\_/  v0.1.0',
            ''
          ];
          wizardState = 'flow-choice';
          activeIndex = 0;
        } else if (trimmed === 'clear') {
          output = [];
          showStructure = false;
          wizardState = 'idle';
        } else if (trimmed === 'help') {
          output = [
            ...output,
            `$ ${trimmed}`,
            'Available commands:',
            '  claw init   - Initialize a new project structure (interactive wizard)',
            '  clear       - Clear the terminal screen',
            '  help        - Show this help menu'
          ];
        } else {
          output = [
            ...output,
            `$ ${trimmed}`,
            `Command "${trimmed}" not recognized. Try "claw init" or "help".`
          ];
        }
        command = '';
      }
      return;
    }

    // Wizard Keyboard Control
    e.preventDefault();
    const optionsCount = getOptionsCount();
    
    if (e.key === 'ArrowDown') {
      activeIndex = (activeIndex + 1) % optionsCount;
    } else if (e.key === 'ArrowUp') {
      activeIndex = (activeIndex - 1 + optionsCount) % optionsCount;
    } else if (e.key === 'Enter') {
      confirmOptionByIndex(activeIndex);
    }
  }

  function getOptionsCount() {
    if (wizardState === 'flow-choice') return flowOptions.length;
    if (wizardState === 'recipe-choice') return recipeOptions.length;
    if (wizardState === 'manual-front') return frontOptions.length;
    if (wizardState === 'manual-back') return backOptions.length;
    if (wizardState === 'manual-db') return dbOptions.length;
    if (wizardState === 'manual-docker') return yesNoOptions.length;
    if (wizardState === 'manual-github') return yesNoOptions.length;
    return 0;
  }

  function confirmOptionByIndex(idx) {
    if (wizardState === 'flow-choice') {
      const opt = flowOptions[idx];
      selectedFlow = opt.value;
      output = [...output, `? ¿Cómo deseas inicializar tu proyecto? ${opt.label}`];
      if (opt.value === 'rapido') {
        wizardState = 'recipe-choice';
      } else {
        wizardState = 'manual-front';
      }
      activeIndex = 0;
    } else if (wizardState === 'recipe-choice') {
      const opt = recipeOptions[idx];
      selectedRecipe = opt.value;
      output = [...output, `? Selecciona una receta de producción: ${opt.label}`];
      runGeneration();
    } else if (wizardState === 'manual-front') {
      selectedFront = frontOptions[idx];
      output = [...output, `? Selecciona tu framework de Frontend: ${selectedFront}`];
      wizardState = 'manual-back';
      activeIndex = 0;
    } else if (wizardState === 'manual-back') {
      selectedBack = backOptions[idx];
      output = [...output, `? Selecciona tu framework de Backend: ${selectedBack}`];
      wizardState = 'manual-db';
      activeIndex = 0;
    } else if (wizardState === 'manual-db') {
      selectedDb = dbOptions[idx];
      output = [...output, `? Selecciona tu ORM y Base de Datos: ${selectedDb}`];
      wizardState = 'manual-docker';
      activeIndex = 0;
    } else if (wizardState === 'manual-docker') {
      selectedDocker = yesNoOptions[idx];
      output = [...output, `? ¿Configurar entorno de desarrollo local con Docker Compose? ${selectedDocker}`];
      wizardState = 'manual-github';
      activeIndex = 0;
    } else if (wizardState === 'manual-github') {
      selectedGithub = yesNoOptions[idx];
      output = [...output, `? ¿Configurar Github Actions para CI/CD? ${selectedGithub}`];
      runGeneration();
    }
  }

  function runGeneration() {
    wizardState = 'generating';
    output = [
      ...output,
      '🔧 Analyzing dependencies...',
      '📦 Downloading Go-embedded recipes...',
      '🚀 Injecting templates and building workspace structure...'
    ];

    // Build the folder structure preview dynamically
    if (selectedFlow === 'rapido') {
      if (selectedRecipe === 'saas') {
        generatedTree = [
          { type: 'dir', name: 'my-claw-project/' },
          { type: 'dir', indent: true, name: 'frontend-nextjs/' },
          { type: 'dir', indent: true, name: 'backend-go-fiber/' },
          { type: 'file', indent: true, name: 'docker-compose.yml', highlight: 'text-indigo-400' },
          { type: 'file', indent: true, name: 'claw.config.json', highlight: 'text-emerald-500' },
          { type: 'file', indent: true, name: 'package.json' }
        ];
      } else if (selectedRecipe === 'api') {
        generatedTree = [
          { type: 'dir', name: 'my-claw-project/' },
          { type: 'dir', indent: true, name: 'src-fastify/' },
          { type: 'file', indent: true, name: 'prisma/schema.prisma', highlight: 'text-amber-500' },
          { type: 'file', indent: true, name: 'docker-compose.yml', highlight: 'text-indigo-400' },
          { type: 'file', indent: true, name: 'claw.config.json', highlight: 'text-emerald-500' }
        ];
      } else {
        generatedTree = [
          { type: 'dir', name: 'my-claw-project/' },
          { type: 'dir', indent: true, name: 'src-react/' },
          { type: 'file', indent: true, name: 'vite.config.ts', highlight: 'text-indigo-400' },
          { type: 'file', indent: true, name: 'tailwind.config.js' },
          { type: 'file', indent: true, name: 'claw.config.json', highlight: 'text-emerald-500' }
        ];
      }
    } else {
      generatedTree = [{ type: 'dir', name: 'my-claw-project/' }];
      
      if (selectedFront !== 'Ninguno') {
        const folder = selectedFront.includes('Next.js') ? 'frontend-nextjs/' : 'frontend-react/';
        generatedTree.push({ type: 'dir', indent: true, name: folder });
      }
      if (selectedBack !== 'Ninguno') {
        const folder = selectedBack.includes('Go Fiber') ? 'backend-go-fiber/' : 'backend-express/';
        generatedTree.push({ type: 'dir', indent: true, name: folder });
      }
      if (selectedDb !== 'Ninguno') {
        if (selectedDb.includes('Prisma')) {
          generatedTree.push({ type: 'file', indent: true, name: 'prisma/schema.prisma', highlight: 'text-amber-500' });
        } else {
          generatedTree.push({ type: 'file', indent: true, name: 'db/schema.sql', highlight: 'text-indigo-400' });
        }
      }
      if (selectedDocker === 'Yes') {
        generatedTree.push({ type: 'file', indent: true, name: 'docker-compose.yml', highlight: 'text-indigo-400' });
      }
      if (selectedGithub === 'Yes') {
        generatedTree.push({ type: 'file', indent: true, name: '.github/workflows/ci.yml' });
      }
      generatedTree.push({ type: 'file', indent: true, name: 'claw.config.json', highlight: 'text-emerald-500' });
    }

    setTimeout(() => {
      output = [
        ...output,
        '✨ Done! Project bootstrapped successfully in 0.8s.',
        '👉 Next steps:',
        '   cd my-claw-project',
        '   docker compose up -d (if docker setup)',
        ''
      ];
      wizardState = 'idle';
      showStructure = true;
    }, 1200);
  }
</script>

<!-- Outer Grid Lines Wrapper -->
<div class="relative w-full p-6 sm:p-8 select-none overflow-visible">
  
  <!-- Grid Lines -->
  <div class="absolute top-0 bottom-0 left-12 w-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute top-0 bottom-0 right-12 w-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute top-12 left-0 right-0 h-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <div class="absolute bottom-12 left-0 right-0 h-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>

  <!-- Desktop Simulation Wrapper -->
  <div class="relative w-full rounded-3xl overflow-hidden border border-border-subtle/50 bg-gradient-to-tr from-brand-secondary/15 via-bg-surface/70 to-brand-primary/15 p-6 sm:p-12 md:py-16 shadow-2xl shadow-slate-900/5 dark:shadow-black/40">
    
    <!-- macOS Top Menu Bar simulation -->
    <div class="absolute top-0 left-0 right-0 h-9 px-6 flex items-center justify-between text-[11px] font-sans font-medium text-slate-700/90 dark:text-slate-200/90 backdrop-blur-md bg-white/30 dark:bg-black/40 border-b border-slate-200/10 dark:border-white/5">
      <div class="flex items-center gap-4">
        <span class="text-sm font-bold opacity-90"></span>
        <span class="font-semibold tracking-wide">ClawOS</span>
        <span class="hidden sm:inline opacity-70 hover:opacity-100 cursor-pointer transition-opacity">File</span>
        <span class="hidden sm:inline opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Terminal</span>
        <span class="hidden sm:inline opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Help</span>
      </div>
      <div class="flex items-center gap-3.5">
        <span class="opacity-75">100% 🔋</span>
        <span class="opacity-75">Jun 17, 08:43 AM</span>
      </div>
    </div>

    <!-- Terminal Window (Floating) -->
    <div class="mt-4 overflow-hidden border border-white/5 rounded-2xl bg-[#0d0e12]/95 backdrop-blur-xl shadow-2xl shadow-black/60 max-w-xl mx-auto w-full transition-all duration-300">
      <!-- Terminal Header -->
      <div class="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.04]">
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56] opacity-90"></div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-90"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f] opacity-90"></div>
        </div>
        <span class="text-[11px] font-mono text-slate-400/90 flex items-center gap-1.5 select-none">
          <TerminalIcon size={12} /> bash — claw-cli
        </span>
        <div class="w-12"></div>
      </div>

      <!-- Terminal Body -->
      <div class="p-5 font-mono text-xs text-slate-300 h-80 overflow-y-auto flex flex-col gap-2 scrollbar-none select-text">
        {#each output as line}
          <div class="whitespace-pre-wrap leading-relaxed min-h-[1.1rem] 
            {line.startsWith('$') ? 'text-indigo-400 font-semibold' : ''} 
            {line.includes('✨') ? 'text-emerald-400 font-bold' : ''} 
            {line.includes('✔') || line.startsWith('? ') ? 'text-emerald-500/95 font-medium' : ''}
            {line.includes('Command') ? 'text-rose-400' : ''}">
            {line}
          </div>
        {/each}

        <!-- Interactive Wizard Options -->
        {#if wizardState === 'flow-choice'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? ¿Cómo deseas inicializar tu proyecto?</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each flowOptions as opt, idx}
                <button 
                  onclick={() => confirmOptionByIndex(idx)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndex === idx ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndex === idx ? '❯' : ''}</span>
                  <span>{opt.label}</span>
                </button>
              {/each}
            </div>
            <span class="text-[10px] text-slate-500 mt-1">(Use arrows / click to select, Enter to confirm)</span>
          </div>
        {/if}

        {#if wizardState === 'recipe-choice'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? Selecciona una receta de producción:</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each recipeOptions as opt, idx}
                <button 
                  onclick={() => confirmOptionByIndex(idx)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndex === idx ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndex === idx ? '❯' : ''}</span>
                  <span>{opt.label}</span>
                </button>
              {/each}
            </div>
            <span class="text-[10px] text-slate-500 mt-1">(Use arrows / click to select, Enter to confirm)</span>
          </div>
        {/if}

        {#if wizardState === 'manual-front'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? Selecciona tu framework de Frontend:</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each frontOptions as opt, idx}
                <button 
                  onclick={() => confirmOptionByIndex(idx)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndex === idx ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndex === idx ? '❯' : ''}</span>
                  <span>{opt}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if wizardState === 'manual-back'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? Selecciona tu framework de Backend:</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each backOptions as opt, idx}
                <button 
                  onclick={() => confirmOptionByIndex(idx)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndex === idx ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndex === idx ? '❯' : ''}</span>
                  <span>{opt}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if wizardState === 'manual-db'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? Selecciona tu ORM y Base de Datos:</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each dbOptions as opt, idx}
                <button 
                  onclick={() => confirmOptionByIndex(idx)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndex === idx ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndex === idx ? '❯' : ''}</span>
                  <span>{opt}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if wizardState === 'manual-docker'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? ¿Configurar entorno de desarrollo local con Docker Compose? (Y/n)</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each yesNoOptions as opt, idx}
                <button 
                  onclick={() => confirmOptionByIndex(idx)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndex === idx ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndex === idx ? '❯' : ''}</span>
                  <span>{opt}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if wizardState === 'manual-github'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? ¿Configurar Github Actions para CI/CD? (Y/n)</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each yesNoOptions as opt, idx}
                <button 
                  onclick={() => confirmOptionByIndex(idx)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndex === idx ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndex === idx ? '❯' : ''}</span>
                  <span>{opt}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if wizardState === 'generating'}
          <div class="flex items-center gap-2 text-indigo-400 font-mono select-none animate-pulse">
            <span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
            <span>Running scaffolding setup...</span>
          </div>
        {/if}

        <!-- Command Input Line -->
        {#if wizardState === 'idle'}
          <div class="flex items-center gap-2 text-indigo-400">
            <span class="font-bold select-none">$</span>
            <input 
              type="text" 
              bind:value={command}
              onkeydown={handleKeyDown}
              placeholder='Try "claw init"...'
              class="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 focus:ring-0 p-0 text-xs font-mono"
            />
          </div>
        {/if}

        <!-- Generated Structure inline inside terminal -->
        {#if showStructure}
          <div class="mt-4 pt-3 border-t border-white/[0.06] text-slate-400 select-none">
            <div class="text-[10px] font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-indigo-400/80">
              <Folder size={12} /> Structure generated:
            </div>
            <div class="space-y-1 text-slate-300">
              {#each generatedTree as item}
                <div class="{item.indent ? 'pl-4' : ''} flex items-center gap-2">
                  {#if item.type === 'dir'}
                    <Folder size={14} class="text-indigo-400/80" />
                    <span class="text-slate-300">{item.name}</span>
                  {:else}
                    <FileCode size={14} class={item.highlight || 'text-slate-400'} />
                    <span class="text-slate-300">{item.name}</span>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
