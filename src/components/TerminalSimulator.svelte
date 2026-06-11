<script>
  import { Terminal as TerminalIcon, Check, Copy, Folder, FileCode, Play } from '@lucide/svelte';

  let command = $state('');
  let output = $state([
    'Welcome to Claw CLI v0.1.0',
    'Type "claw init" to bootstrap a new workspace.',
    ''
  ]);
  let isCopied = $state(false);
  let showStructure = $state(false);

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const trimmed = command.trim();
      if (!trimmed) return;

      if (trimmed === 'claw init') {
        output = [
          ...output,
          `$ ${trimmed}`,
          '🔧 Initializing project setup...',
          '📦 Fetching templates...',
          '🚀 Creating directory structure...',
          '   └─ src/',
          '      ├─ index.js',
          '      └─ scaffolder.js',
          '   ├─ package.json',
          '   └─ claw.config.json',
          '✨ Done! Project claw-app initialized successfully.'
        ];
        showStructure = true;
      } else if (trimmed === 'clear') {
        output = [];
        showStructure = false;
      } else if (trimmed === 'help') {
        output = [
          ...output,
          `$ ${trimmed}`,
          'Available commands:',
          '  claw init   - Initialize a new project structure',
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

  function copyInstallCommand() {
    navigator.clipboard.writeText('npm install -g claw-cli');
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }
</script>

<div class="max-w-2xl mx-auto my-8 font-sans">
  <!-- Copy Command Header -->
  <div class="flex items-center justify-between p-4 mb-6 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <code class="text-sm font-mono text-slate-300">npm install -g claw-cli</code>
    </div>
    <button 
      onclick={copyInstallCommand}
      class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
    >
      {#if isCopied}
        <Check size={14} class="text-emerald-400" />
        <span>Copied!</span>
      {:else}
        <Copy size={14} />
        <span>Copy</span>
      {/if}
    </button>
  </div>

  <!-- Terminal Window -->
  <div class="overflow-hidden border border-slate-800/80 rounded-xl bg-slate-950 shadow-2xl shadow-indigo-950/20">
    <!-- Terminal Header -->
    <div class="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/80">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
        <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
      </div>
      <span class="text-xs font-mono text-slate-500 flex items-center gap-1">
        <TerminalIcon size={12} /> claw-terminal
      </span>
      <div class="w-12"></div>
    </div>

    <!-- Terminal Body -->
    <div class="p-6 font-mono text-sm text-slate-300 h-64 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-slate-800">
      {#each output as line}
        <div class="whitespace-pre-wrap leading-relaxed min-h-[1.2rem] 
          {line.startsWith('$') ? 'text-indigo-400 font-semibold' : ''} 
          {line.includes('✨') ? 'text-emerald-400' : ''} 
          {line.includes('Command') ? 'text-rose-400' : ''}">
          {line}
        </div>
      {/each}

      <!-- Command Input Line -->
      <div class="flex items-center gap-2 text-indigo-400">
        <span class="font-bold select-none">$</span>
        <input 
          type="text" 
          bind:value={command}
          onkeydown={handleKeyDown}
          placeholder='Try "claw init"...'
          class="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 focus:ring-0 p-0"
        />
      </div>
    </div>
  </div>

  <!-- Generated Structure Visualization -->
  {#if showStructure}
    <div class="mt-6 p-5 border border-dashed border-slate-800 rounded-xl bg-slate-950/40 backdrop-blur-sm">
      <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Folder size={14} class="text-indigo-400" /> Structure generated:
      </h3>
      <div class="font-mono text-sm text-slate-300 space-y-1">
        <div class="flex items-center gap-2 text-indigo-400">
          <Folder size={16} /> <span>my-app/</span>
        </div>
        <div class="pl-6 flex items-center gap-2 text-slate-400">
          <Folder size={16} class="text-indigo-400/80" /> <span>src/</span>
        </div>
        <div class="pl-12 flex items-center gap-2 text-slate-300">
          <FileCode size={16} class="text-amber-500" /> <span>index.js</span>
        </div>
        <div class="pl-12 flex items-center gap-2 text-slate-300">
          <FileCode size={16} class="text-amber-500" /> <span>scaffolder.js</span>
        </div>
        <div class="pl-6 flex items-center gap-2 text-slate-300">
          <FileCode size={16} class="text-sky-500" /> <span>package.json</span>
        </div>
        <div class="pl-6 flex items-center gap-2 text-slate-300">
          <FileCode size={16} class="text-emerald-500" /> <span>claw.config.json</span>
        </div>
      </div>
    </div>
  {/if}
</div>
