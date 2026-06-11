<script>
  import { Terminal as TerminalIcon, Folder, FileCode, ChevronRight } from '@lucide/svelte';

  let command = $state('');
  let output = $state([
    'Welcome to Claw CLI v0.1.0',
    'Type "claw init" to bootstrap a new workspace.',
    ''
  ]);
 
  // Wizard flow states: 'idle' | 'front' | 'back' | 'tools' | 'generating' | 'done'
  let wizardState = $state('idle');
  
  // Selections
  let selectedFront = $state('React');
  let selectedBack = $state('Node');
  let tools = $state([
    { id: 'ts', label: 'TypeScript', checked: true },
    { id: 'eslint', label: 'ESLint', checked: true },
    { id: 'prettier', label: 'Prettier', checked: false }
  ]);
  
  // Selection active indices for arrow keys
  let activeIndexFront = $state(0);
  let activeIndexBack = $state(0);
  let activeIndexTools = $state(0);

  const frontOptions = ['React', 'Svelte', 'Vue', 'None'];
  const backOptions = ['Node', 'Go', 'Rust', 'None'];

  let showStructure = $state(false);

  function handleKeyDown(e) {
    if (wizardState !== 'idle') {
      e.preventDefault();
      
      if (wizardState === 'front') {
        if (e.key === 'ArrowDown') {
          activeIndexFront = (activeIndexFront + 1) % frontOptions.length;
        } else if (e.key === 'ArrowUp') {
          activeIndexFront = (activeIndexFront - 1 + frontOptions.length) % frontOptions.length;
        } else if (e.key === 'Enter') {
          selectedFront = frontOptions[activeIndexFront];
          output = [...output, `✔ Select Frontend Framework: ${selectedFront}`];
          wizardState = 'back';
        }
      } else if (wizardState === 'back') {
        if (e.key === 'ArrowDown') {
          activeIndexBack = (activeIndexBack + 1) % backOptions.length;
        } else if (e.key === 'ArrowUp') {
          activeIndexBack = (activeIndexBack - 1 + backOptions.length) % backOptions.length;
        } else if (e.key === 'Enter') {
          selectedBack = backOptions[activeIndexBack];
          output = [...output, `✔ Select Backend Template: ${selectedBack}`];
          wizardState = 'tools';
        }
      } else if (wizardState === 'tools') {
        if (e.key === 'ArrowDown') {
          activeIndexTools = (activeIndexTools + 1) % tools.length;
        } else if (e.key === 'ArrowUp') {
          activeIndexTools = (activeIndexTools - 1 + tools.length) % tools.length;
        } else if (e.key === ' ') {
          tools[activeIndexTools].checked = !tools[activeIndexTools].checked;
        } else if (e.key === 'Enter') {
          const selectedLabels = tools.filter(t => t.checked).map(t => t.label).join(', ') || 'None';
          output = [...output, `✔ Select Tooling: ${selectedLabels}`];
          runGeneration();
        }
      }
      return;
    }

    if (e.key === 'Enter') {
      const trimmed = command.trim();
      if (!trimmed) return;

      if (trimmed === 'claw init') {
        output = [...output, `$ ${trimmed}`];
        wizardState = 'front';
        activeIndexFront = 0;
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
  }

  function selectFrontClick(opt) {
    selectedFront = opt;
    output = [...output, `✔ Select Frontend Framework: ${selectedFront}`];
    wizardState = 'back';
  }

  function selectBackClick(opt) {
    selectedBack = opt;
    output = [...output, `✔ Select Backend Template: ${selectedBack}`];
    wizardState = 'tools';
  }

  function selectToolClick(index) {
    tools[index].checked = !tools[index].checked;
  }

  function confirmToolsClick() {
    const selectedLabels = tools.filter(t => t.checked).map(t => t.label).join(', ') || 'None';
    output = [...output, `✔ Select Tooling: ${selectedLabels}`];
    runGeneration();
  }

  function runGeneration() {
    wizardState = 'generating';
    output = [
      ...output,
      '🔧 Initializing project setup...',
      '📦 Fetching templates...',
      '🚀 Creating directory structure...'
    ];

    setTimeout(() => {
      output = [...output, '✨ Done! Project claw-app initialized successfully.'];
      wizardState = 'idle';
      showStructure = true;
    }, 1500);
  }
</script>

<!-- Outer Grid Lines Wrapper -->
<div class="relative w-full p-6 sm:p-8 select-none overflow-visible">
  
  <!-- Left Vertical Line -->
  <div class="absolute top-0 bottom-0 left-12 w-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <!-- Right Vertical Line -->
  <div class="absolute top-0 bottom-0 right-12 w-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <!-- Top Horizontal Line -->
  <div class="absolute top-12 left-0 right-0 h-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>
  <!-- Bottom Horizontal Line -->
  <div class="absolute bottom-12 left-0 right-0 h-px bg-slate-300/40 dark:bg-white/[0.08] pointer-events-none hidden md:block"></div>

  <!-- Desktop Simulation Wrapper -->
  <div class="relative w-full rounded-3xl overflow-hidden border border-border-subtle/50 bg-gradient-to-tr from-brand-secondary/15 via-bg-surface/70 to-brand-primary/15 p-6 sm:p-12 md:py-16 shadow-2xl shadow-slate-900/5 dark:shadow-black/40">
    
    <!-- macOS Top Menu Bar simulation -->
    <div class="absolute top-0 left-0 right-0 h-9 px-6 flex items-center justify-between text-[11px] font-sans font-medium text-slate-700/80 backdrop-blur-md bg-white/25 border-b border-slate-200/10">
      <div class="flex items-center gap-4">
        <span class="text-sm font-bold opacity-90"></span>
        <span class="font-semibold tracking-wide">ClawOS</span>
        <span class="hidden sm:inline opacity-70 hover:opacity-100 cursor-pointer transition-opacity">File</span>
        <span class="hidden sm:inline opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Terminal</span>
        <span class="hidden sm:inline opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Help</span>
      </div>
      <div class="flex items-center gap-3.5">
        <span class="opacity-75">100% 🔋</span>
        <span class="opacity-75">Jun 11, 13:38 PM</span>
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
      <div class="p-5 font-mono text-xs text-slate-300 h-64 overflow-y-auto flex flex-col gap-2 scrollbar-none select-text">
        {#each output as line}
          <div class="whitespace-pre-wrap leading-relaxed min-h-[1.1rem] 
            {line.startsWith('$') ? 'text-indigo-400 font-semibold' : ''} 
            {line.includes('✨') ? 'text-emerald-400' : ''} 
            {line.includes('✔') ? 'text-emerald-500/95 font-medium' : ''}
            {line.includes('Command') ? 'text-rose-400' : ''}">
            {line}
          </div>
        {/each}

        <!-- Interactive Wizard Steps -->
        {#if wizardState === 'front'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? Select Frontend Framework:</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each frontOptions as opt, idx}
                <button 
                  onclick={() => selectFrontClick(opt)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndexFront === idx ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndexFront === idx ? '❯' : ''}</span>
                  <span>{opt}</span>
                </button>
              {/each}
            </div>
            <span class="text-[10px] text-slate-500 mt-1">(Use arrows / click to select, Enter to confirm)</span>
          </div>
        {/if}

        {#if wizardState === 'back'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? Select Backend Template:</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each backOptions as opt, idx}
                <button 
                  onclick={() => selectBackClick(opt)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndexBack === idx ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
                >
                  <span class="w-2.5">{activeIndexBack === idx ? '❯' : ''}</span>
                  <span>{opt}</span>
                </button>
              {/each}
            </div>
            <span class="text-[10px] text-slate-500 mt-1">(Use arrows / click to select, Enter to confirm)</span>
          </div>
        {/if}

        {#if wizardState === 'tools'}
          <div class="flex flex-col gap-1 text-slate-300 font-mono select-none">
            <span class="text-cyan-400 font-bold">? Select Tooling & Utilities:</span>
            <div class="pl-3 flex flex-col gap-1">
              {#each tools as tool, idx}
                <button 
                  onclick={() => selectToolClick(idx)}
                  class="flex items-center gap-1.5 text-left w-fit cursor-pointer
                    {activeIndexTools === idx ? 'text-amber-400 font-bold' : 'text-slate-400'}"
                >
                  <span class="w-2.5">{activeIndexTools === idx ? '❯' : ''}</span>
                  <span>[{tool.checked ? 'x' : ' '}] {tool.label}</span>
                </button>
              {/each}
            </div>
            <button 
              onclick={confirmToolsClick}
              class="mt-2 w-fit px-3 py-1 bg-white/10 hover:bg-white/20 text-slate-100 rounded text-[11px] font-bold border border-white/10 cursor-pointer"
            >
              Confirm Options (Press Enter)
            </button>
          </div>
        {/if}

        {#if wizardState === 'generating'}
          <div class="flex items-center gap-2 text-indigo-400 font-mono select-none animate-pulse">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>Running scaffolding setup...</span>
          </div>
        {/if}

        <!-- Command Input Line (Hidden during Wizard) -->
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
              <div class="flex items-center gap-2 text-indigo-400">
                <Folder size={14} /> <span>claw-app/</span>
              </div>
              {#if selectedFront !== 'None'}
                <div class="pl-4 flex items-center gap-2 text-slate-400">
                  <Folder size={14} class="text-indigo-400/80" /> <span>frontend-{selectedFront.toLowerCase()}/</span>
                </div>
              {/if}
              {#if selectedBack !== 'None'}
                <div class="pl-4 flex items-center gap-2 text-slate-400">
                  <Folder size={14} class="text-indigo-400/80" /> <span>backend-{selectedBack.toLowerCase()}/</span>
                </div>
              {/if}
              {#if tools.find(t => t.id === 'ts' && t.checked)}
                <div class="pl-8 flex items-center gap-2 text-slate-300">
                  <FileCode size={14} class="text-indigo-400" /> <span>tsconfig.json</span>
                </div>
              {/if}
              {#if tools.find(t => t.id === 'eslint' && t.checked)}
                <div class="pl-8 flex items-center gap-2 text-slate-300">
                  <FileCode size={14} class="text-amber-500" /> <span>eslint.config.js</span>
                </div>
              {/if}
              {#if tools.find(t => t.id === 'prettier' && t.checked)}
                <div class="pl-8 flex items-center gap-2 text-slate-300">
                  <FileCode size={14} class="text-amber-500" /> <span>.prettierrc</span>
                </div>
              {/if}
              <div class="pl-4 flex items-center gap-2 text-slate-300">
                <FileCode size={14} class="text-sky-500" /> <span>package.json</span>
              </div>
              <div class="pl-4 flex items-center gap-2 text-slate-300">
                <FileCode size={14} class="text-emerald-500" /> <span>claw.config.json</span>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
