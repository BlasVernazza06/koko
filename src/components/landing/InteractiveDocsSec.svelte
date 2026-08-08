<script lang="ts">
  import { fade } from 'svelte/transition';
  import { 
    Cpu, 
    Layers, 
    ShieldCheck, 
    Terminal, 
    Check, 
    ArrowRight,
    RefreshCw,
    Database,
    Binary,
    Server
  } from '@lucide/svelte';

  interface Props {
    lang: 'es' | 'en';
    docs: {
      id: string;
      title: string;
      desc: string;
      path: string;
    }[];
  }

  let { lang, docs } = $props<Props>();

  // Find doc data based on original list
  const docScaffold = $derived(docs.find(d => d.id === 'scaffolding') || docs[0]);
  const docPresets = $derived(docs.find(d => d.id === 'presets') || docs[1]);
  const docDrift = $derived(docs.find(d => d.id === 'drift') || docs[2]);
  const docOffline = $derived(docs.find(d => d.id === 'offline') || docs[3]);

  // Card 1: Interactive CLI state
  let selectedFramework = $state('Next.js');
  let selectedBackend = $state('Go Fiber');
  let selectedDb = $state('PostgreSQL');
  let isBuilding = $state(false);
  let buildProgress = $state(0);
  let buildComplete = $state(false);

  function startCliBuild() {
    if (isBuilding) return;
    isBuilding = true;
    buildComplete = false;
    buildProgress = 0;
    
    const interval = setInterval(() => {
      buildProgress += 10;
      if (buildProgress >= 100) {
        clearInterval(interval);
        isBuilding = false;
        buildComplete = true;
      }
    }, 120);
  }

  // Card 3: Presets stack explorer state
  let activeStack = $state('saas'); // saas, mobile, minimal

  // Card 4: Drift Integrity scanner state
  let isScanning = $state(false);
  let scanState = $state<'idle' | 'scanning' | 'done'>('idle');
  let scanProgress = $state(0);
  
  function runDriftScan() {
    if (isScanning) return;
    isScanning = true;
    scanState = 'scanning';
    scanProgress = 0;
    
    const interval = setInterval(() => {
      scanProgress += 4;
      if (scanProgress >= 100) {
        clearInterval(interval);
        isScanning = false;
        scanState = 'done';
      }
    }, 60);
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch w-full select-none text-left">
  
  <!-- CARD 1: Interactive CLI Builder (Scaffolding) - Span 7 -->
  <div class="lg:col-span-7 md:col-span-2 flex flex-col justify-between p-6 rounded-3xl border border-border-subtle bg-bg-surface/40 hover:bg-bg-surface/60 transition-all duration-300 relative overflow-hidden group">
    <div class="absolute inset-0 bg-radial-[circle_at_70%_120%] from-brand-primary/8 to-transparent opacity-60 pointer-events-none"></div>
    
    <div>
      <div class="flex items-center gap-2 mb-3">
        <div class="p-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
          <Terminal size={18} />
        </div>
        <h3 class="text-lg font-extrabold text-text-main">
          {docScaffold.title}
        </h3>
      </div>
      <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-6 font-medium">
        {docScaffold.desc}
      </p>

      <!-- Selector controls -->
      <div class="grid grid-cols-3 gap-3 mb-5">
        <div class="space-y-1.5">
          <label class="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Frontend</label>
          <select 
            bind:value={selectedFramework}
            disabled={isBuilding}
            class="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-border-subtle bg-bg-base/80 text-text-main focus:outline-none focus:border-brand-primary disabled:opacity-60 cursor-pointer"
          >
            <option>Next.js</option>
            <option>Astro</option>
            <option>SvelteKit</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Backend</label>
          <select 
            bind:value={selectedBackend}
            disabled={isBuilding}
            class="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-border-subtle bg-bg-base/80 text-text-main focus:outline-none focus:border-brand-primary disabled:opacity-60 cursor-pointer"
          >
            <option>Go Fiber</option>
            <option>Gin Gonic</option>
            <option>Go Standard</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Database</label>
          <select 
            bind:value={selectedDb}
            disabled={isBuilding}
            class="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-border-subtle bg-bg-base/80 text-text-main focus:outline-none focus:border-brand-primary disabled:opacity-60 cursor-pointer"
          >
            <option>PostgreSQL</option>
            <option>SQLite</option>
            <option>MySQL</option>
          </select>
        </div>
      </div>

      <!-- Live Terminal Mockup -->
      <div class="rounded-xl border border-border-subtle/80 bg-bg-base/90 p-4 font-mono text-[11px] min-h-[140px] flex flex-col justify-between">
        <div class="space-y-2">
          <div class="flex items-center justify-between text-[10px] text-text-muted border-b border-border-subtle/40 pb-1.5 mb-2">
            <span>koko-cli simulator</span>
            <span class="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
          </div>

          <div class="flex gap-1.5 text-text-muted">
            <span class="text-brand-primary font-bold">$</span>
            <span class="text-text-main">koko init my-app --stack={selectedFramework.toLowerCase()}</span>
          </div>

          {#if isBuilding}
            <div class="text-text-muted animate-pulse">
              [io] Injecting {selectedFramework} templates...<br/>
              [io] Binding {selectedBackend} endpoints...<br/>
              [io] Mapping {selectedDb} drivers...
            </div>
          {:else if buildComplete}
            <div class="text-[#27c93f] font-semibold space-y-1">
              <div>✓ Scaffold complete in 24ms</div>
              <div class="text-[10px] text-text-muted/80">Stack configured with {selectedFramework} + {selectedBackend} + {selectedDb}</div>
            </div>
          {:else}
            <div class="text-text-muted/65 italic">
              {lang === 'es' ? 'Haz clic en "Iniciar Scaffolding" para simular.' : 'Click "Start Scaffolding" to simulate creation.'}
            </div>
          {/if}
        </div>

        {#if isBuilding}
          <div class="w-full bg-border-subtle/20 h-1 rounded-full overflow-hidden mt-3">
            <div class="bg-gradient-to-r from-brand-primary to-brand-secondary h-full rounded-full transition-all duration-75" style="width: {buildProgress}%"></div>
          </div>
        {/if}
      </div>
    </div>

    <div class="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle/50">
      <button 
        onclick={startCliBuild}
        disabled={isBuilding}
        class="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/95 transition-all shadow-md shadow-brand-primary/10 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
      >
        <span>{lang === 'es' ? 'Iniciar Scaffolding' : 'Start Scaffolding'}</span>
        <ArrowRight size={13} />
      </button>

      <a href={lang === 'es' ? docScaffold.path : `/en${docScaffold.path}`} class="text-xs font-bold text-brand-primary hover:underline flex items-center gap-0.5">
        <span>{lang === 'es' ? 'Ver Comandos CLI' : 'View CLI Commands'}</span>
        <ArrowRight size={12} class="rotate-[-45deg]" />
      </a>
    </div>
  </div>

  <!-- CARD 2: Zero-dependency Engine (Engine Performance) - Span 5 -->
  <div class="lg:col-span-5 md:col-span-1 flex flex-col justify-between p-6 rounded-3xl border border-border-subtle bg-bg-surface/40 hover:bg-bg-surface/60 transition-all duration-300 relative overflow-hidden group">
    <div class="absolute inset-0 bg-radial-[circle_at_80%_-20%] from-brand-secondary/8 to-transparent opacity-60 pointer-events-none"></div>

    <div>
      <div class="flex items-center gap-2 mb-3">
        <div class="p-2 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary">
          <Cpu size={18} />
        </div>
        <h3 class="text-lg font-extrabold text-text-main">
          {docOffline.title}
        </h3>
      </div>
      <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-6 font-medium">
        {docOffline.desc}
      </p>

      <!-- Dashboard Visuals -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Radial Speed Meter -->
        <div class="p-4 rounded-2xl bg-bg-base/60 border border-border-subtle/80 flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
          <div class="relative w-18 h-18 flex items-center justify-center">
            <!-- Background circle -->
            <svg class="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="36" cy="36" r="30" class="stroke-border-subtle" stroke-width="4.5" fill="transparent" />
              <circle cx="36" cy="36" r="30" class="stroke-brand-primary" stroke-width="4.5" fill="transparent" stroke-dasharray="188.4" stroke-dashoffset="15" />
            </svg>
            <div class="text-[11px] font-mono font-extrabold text-brand-primary tracking-tight">0.45ms</div>
          </div>
          <span class="text-[10px] font-bold text-text-muted uppercase tracking-wider">
            {lang === 'es' ? 'Arranque' : 'Startup'}
          </span>
        </div>

        <!-- Compiled Binary Stats -->
        <div class="p-4 rounded-2xl bg-bg-base/60 border border-border-subtle/80 flex flex-col items-center justify-center text-center space-y-2">
          <div class="text-brand-secondary p-1.5 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20">
            <Binary size={24} class="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div class="text-sm font-mono font-extrabold text-text-main">6.8 MB</div>
          <span class="text-[10px] font-bold text-text-muted uppercase tracking-wider">
            {lang === 'es' ? 'Binario único' : 'Single Binary'}
          </span>
        </div>
      </div>

      <div class="mt-4 p-3 rounded-xl bg-brand-primary/[0.03] border border-brand-primary/10 text-[11px] font-semibold text-text-muted leading-relaxed font-sans">
        🚀 {lang === 'es' 
          ? 'Compilado en ensamblador de Go nativo sin necesidad de tener Node instalado globalmente.' 
          : 'Runs purely in native machine assembly. No Node global environment or extra npm bloat required.'}
      </div>
    </div>

    <div class="flex justify-end mt-6 pt-4 border-t border-border-subtle/50">
      <a href={lang === 'es' ? docOffline.path : `/en${docOffline.path}`} class="text-xs font-bold text-brand-secondary hover:underline flex items-center gap-0.5">
        <span>{lang === 'es' ? 'Especificaciones del Motor' : 'Engine Specs'}</span>
        <ArrowRight size={12} class="rotate-[-45deg]" />
      </a>
    </div>
  </div>

  <!-- CARD 3: Architecture Blueprint Selector (Active Presets) - Span 5 -->
  <div class="lg:col-span-5 md:col-span-1 flex flex-col justify-between p-6 rounded-3xl border border-border-subtle bg-bg-surface/40 hover:bg-bg-surface/60 transition-all duration-300 relative overflow-hidden group">
    <div class="absolute inset-0 bg-radial-[circle_at_20%_120%] from-brand-secondary/8 to-transparent opacity-60 pointer-events-none"></div>

    <div>
      <div class="flex items-center gap-2 mb-3">
        <div class="p-2 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary">
          <Layers size={18} />
        </div>
        <h3 class="text-lg font-extrabold text-text-main">
          {docPresets.title}
        </h3>
      </div>
      <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-5 font-medium">
        {docPresets.desc}
      </p>

      <!-- Preset Toggles -->
      <div class="flex rounded-xl bg-bg-base/70 border border-border-subtle/60 p-1 mb-4">
        <button 
          onclick={() => activeStack = 'saas'}
          class="flex-1 text-[10px] sm:text-xs font-bold py-1.5 rounded-lg transition-all cursor-pointer
            {activeStack === 'saas' ? 'bg-bg-surface text-brand-primary shadow-sm border border-border-subtle/50' : 'text-text-muted hover:text-text-main'}"
        >
          SaaS Stack
        </button>
        <button 
          onclick={() => activeStack = 'mobile'}
          class="flex-1 text-[10px] sm:text-xs font-bold py-1.5 rounded-lg transition-all cursor-pointer
            {activeStack === 'mobile' ? 'bg-bg-surface text-brand-primary shadow-sm border border-border-subtle/50' : 'text-text-muted hover:text-text-main'}"
        >
          Mobile API
        </button>
        <button 
          onclick={() => activeStack = 'minimal'}
          class="flex-1 text-[10px] sm:text-xs font-bold py-1.5 rounded-lg transition-all cursor-pointer
            {activeStack === 'minimal' ? 'bg-bg-surface text-brand-primary shadow-sm border border-border-subtle/50' : 'text-text-muted hover:text-text-main'}"
        >
          Full Stack
        </button>
      </div>

      <!-- File Structure Visualizer -->
      <div class="rounded-xl border border-border-subtle/80 bg-bg-base/80 p-3.5 font-mono text-[11px] min-h-[145px] overflow-hidden">
        {#if activeStack === 'saas'}
          <div in:fade={{ duration: 150 }} class="space-y-1.5 text-text-muted">
            <div class="text-text-main font-semibold">📁 saas-blueprint/</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 web-dashboard (Next.js)</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 worker-billing (Go)</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📄 docker-compose.yml</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📄 koko.config.json</div>
          </div>
        {:else if activeStack === 'mobile'}
          <div in:fade={{ duration: 150 }} class="space-y-1.5 text-text-muted">
            <div class="text-text-main font-semibold">📁 mobile-api-blueprint/</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 mobile-flutter (App)</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 core-gateway (Gin Gonic)</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📄 docker-compose.yml</div>
          </div>
        {:else}
          <div in:fade={{ duration: 150 }} class="space-y-1.5 text-text-muted">
            <div class="text-text-main font-semibold">📁 fullstack-app/</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 app-svelte (SvelteKit)</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📁 server-fiber (Go Fiber)</div>
            <div class="pl-4 border-l border-border-subtle/40 ml-1.5">• 📄 koko.config.json</div>
          </div>
        {/if}
      </div>
    </div>

    <div class="flex justify-end mt-6 pt-4 border-t border-border-subtle/50">
      <a href={lang === 'es' ? docPresets.path : `/en${docPresets.path}`} class="text-xs font-bold text-brand-secondary hover:underline flex items-center gap-0.5">
        <span>{lang === 'es' ? 'Ver Plantillas Estructurales' : 'View Blueprints'}</span>
        <ArrowRight size={12} class="rotate-[-45deg]" />
      </a>
    </div>
  </div>

  <!-- CARD 4: Code Drift Integrity Scanner (Drift Prevention) - Span 7 -->
  <div class="lg:col-span-7 md:col-span-2 flex flex-col justify-between p-6 rounded-3xl border border-border-subtle bg-bg-surface/40 hover:bg-bg-surface/60 transition-all duration-300 relative overflow-hidden group">
    <div class="absolute inset-0 bg-radial-[circle_at_-20%_-20%] from-brand-primary/8 to-transparent opacity-60 pointer-events-none"></div>

    <div>
      <div class="flex items-center gap-2 mb-3">
        <div class="p-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
          <ShieldCheck size={18} />
        </div>
        <h3 class="text-lg font-extrabold text-text-main">
          {docDrift.title}
        </h3>
      </div>
      <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-5 font-medium">
        {docDrift.desc}
      </p>

      <!-- Scanner Simulation Interface -->
      <div class="rounded-xl border border-border-subtle/80 bg-bg-base/90 p-4 font-mono text-[11px] relative overflow-hidden min-h-[145px]">
        {#if scanState === 'scanning'}
          <!-- Scan Sweeper line -->
          <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent animate-bounce opacity-80 z-10"></div>
        {/if}

        <div class="flex items-center justify-between text-[10px] text-text-muted border-b border-border-subtle/40 pb-2 mb-3">
          <span>{lang === 'es' ? 'Monitoreo de Consistencia' : 'Consistency Daemon'}</span>
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full {scanState === 'scanning' ? 'bg-amber-500' : scanState === 'done' ? 'bg-emerald-500' : 'bg-brand-primary'}"></span>
            <span>{scanState === 'scanning' ? 'Scanning...' : scanState === 'done' ? 'Sync Verified' : 'Idle'}</span>
          </span>
        </div>

        <div class="space-y-2">
          <!-- Item 1 -->
          <div class="flex justify-between items-center text-xs py-0.5">
            <span class="text-text-muted">• TypeScript Config Mapping</span>
            {#if scanState === 'scanning' && scanProgress < 30}
              <span class="text-text-muted/40 animate-pulse">Scanning...</span>
            {:else}
              <span class="text-[#27c93f] font-bold flex items-center gap-1">
                <Check size={11} /> MATCHED
              </span>
            {/if}
          </div>

          <!-- Item 2 -->
          <div class="flex justify-between items-center text-xs py-0.5">
            <span class="text-text-muted">• Biome / Linter Sync</span>
            {#if scanState === 'scanning' && scanProgress < 65}
              <span class="text-text-muted/40 animate-pulse">Scanning...</span>
            {:else}
              <span class="text-[#27c93f] font-bold flex items-center gap-1">
                <Check size={11} /> MATCHED
              </span>
            {/if}
          </div>

          <!-- Item 3 -->
          <div class="flex justify-between items-center text-xs py-0.5">
            <span class="text-text-muted">• Docker DB Port Alignment</span>
            {#if scanState === 'scanning'}
              <span class="text-text-muted/40 animate-pulse">Scanning...</span>
            {:else}
              <span class="text-[#27c93f] font-bold flex items-center gap-1">
                <Check size={11} /> MATCHED
              </span>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle/50">
      <button 
        onclick={runDriftScan}
        disabled={isScanning}
        class="px-4 py-2 rounded-xl bg-bg-surface hover:bg-bg-base border border-border-subtle hover:border-brand-primary/40 text-text-main text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
      >
        <RefreshCw size={13} class={isScanning ? 'animate-spin text-brand-primary' : ''} />
        <span>{lang === 'es' ? 'Ejecutar Auditoría' : 'Scan Workspace'}</span>
      </button>

      <a href={lang === 'es' ? docDrift.path : `/en${docDrift.path}`} class="text-xs font-bold text-brand-primary hover:underline flex items-center gap-0.5">
        <span>{lang === 'es' ? 'Ver Monitoreo de Desviación' : 'Drift Documentation'}</span>
        <ArrowRight size={12} class="rotate-[-45deg]" />
      </a>
    </div>
  </div>

</div>
