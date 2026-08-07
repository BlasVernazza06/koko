<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { 
    Cpu, 
    Layers, 
    ShieldCheck, 
    Settings, 
    Terminal, 
    Play, 
    Pause, 
    ChevronRight,
    ArrowUpRight 
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

  let activeIndex = $state(0);
  let isPaused = $state(false);
  let progress = $state(0);

  const duration = 6500; // 6.5s per slide
  let timerId: any;
  let lastTime: number;

  function startTimer() {
    lastTime = Date.now();
    timerId = requestAnimationFrame(updateProgress);
  }

  function updateProgress() {
    if (isPaused) {
      lastTime = Date.now();
      timerId = requestAnimationFrame(updateProgress);
      return;
    }
    
    const now = Date.now();
    const elapsed = now - lastTime;
    lastTime = now;
    
    progress += (elapsed / duration) * 100;
    
    if (progress >= 100) {
      progress = 0;
      activeIndex = (activeIndex + 1) % docs.length;
    }
    
    timerId = requestAnimationFrame(updateProgress);
  }

  function selectTab(idx: number) {
    activeIndex = idx;
    progress = 0;
    isPaused = true; // freeze auto-slide when clicked
  }

  onMount(() => {
    startTimer();
    return () => cancelAnimationFrame(timerId);
  });

  // Icons mapper
  function getTabIcon(id: string) {
    if (id === 'scaffolding') return Terminal;
    if (id === 'presets') return Layers;
    if (id === 'drift') return ShieldCheck;
    return Settings;
  }
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none">
  <!-- Left Side: Tabs Selectors (5 cols) -->
  <div class="lg:col-span-5 flex flex-col justify-center space-y-4">
    {#each docs as item, idx}
      {@const Icon = getTabIcon(item.id)}
      {@const isActive = activeIndex === idx}
      <button
        onclick={() => selectTab(idx)}
        class="w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex gap-4 items-start cursor-pointer
          {isActive 
            ? 'bg-bg-surface border-brand-primary/20 shadow-md shadow-brand-primary/2' 
            : 'bg-bg-surface/25 border-border-subtle/50 hover:border-brand-primary/15 hover:bg-bg-surface/35'}"
      >
        <!-- Icon -->
        <div class="p-2.5 rounded-xl border shrink-0 transition-transform duration-300
          {isActive 
            ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary scale-105' 
            : 'bg-bg-base/60 border-border-subtle/70 text-text-muted hover:text-text-main'}"
        >
          <Icon size={18} />
        </div>

        <!-- Description text -->
        <div class="space-y-1.5 flex-1 pr-2">
          <h3 class="text-sm sm:text-base font-bold text-text-main transition-colors duration-200
            {isActive ? 'text-brand-primary' : 'group-hover:text-brand-primary'}"
          >
            {item.title}
          </h3>
          <p class="text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium">
            {item.desc}
          </p>
        </div>

        <!-- Loading Progress Bar on active item -->
        {#if isActive}
          <div class="absolute bottom-0 left-0 right-0 h-[2.5px] bg-border-subtle/40">
            <div 
              class="h-full bg-brand-primary transition-all duration-75 ease-linear" 
              style="width: {progress}%"
            ></div>
          </div>
        {/if}
      </button>
    {/each}

    <!-- Pause/Play and Link button bar -->
    <div class="flex items-center justify-between pt-2 px-1">
      <button 
        onclick={() => isPaused = !isPaused}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle/70 bg-bg-surface/20 text-[10px] sm:text-xs font-bold text-text-muted hover:text-text-main transition-all cursor-pointer"
      >
        {#if isPaused}
          <Play size={11} class="text-brand-primary animate-pulse" />
          <span>{lang === 'es' ? 'Reanudar Carrusel' : 'Resume Auto-slide'}</span>
        {:else}
          <Pause size={11} />
          <span>{lang === 'es' ? 'Pausar Carrusel' : 'Pause Auto-slide'}</span>
        {/if}
      </button>

      <a 
        href={lang === 'es' ? docs[activeIndex].path : `/en${docs[activeIndex].path}`}
        class="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-brand-primary hover:text-brand-primary/80 transition-colors"
      >
        <span>{lang === 'es' ? 'Ver Guía Completa' : 'View Full Guide'}</span>
        <ChevronRight size={12} />
      </a>
    </div>
  </div>

  <!-- Right Side: Dark Terminal mockup panel (7 cols) -->
  <div class="lg:col-span-7 flex flex-col justify-center min-h-[300px] sm:min-h-[350px]">
    <div class="w-full h-full rounded-2xl border border-border-subtle bg-bg-surface/90 shadow-lg overflow-hidden flex flex-col relative">
      
      <!-- macOS Terminal Header -->
      <div class="flex items-center justify-between px-4 py-3.5 bg-bg-base/70 border-b border-border-subtle/50 text-[11px] font-mono text-text-muted/80 select-none shrink-0">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-75"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-75"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-75"></span>
        </div>
        <span class="font-semibold text-[10px] uppercase tracking-wider text-text-muted/65">
          {docs[activeIndex].id === 'scaffolding' ? 'koko-cli-terminal' : ''}
          {docs[activeIndex].id === 'presets' ? 'saas-blueprint-explorer' : ''}
          {docs[activeIndex].id === 'drift' ? 'claw-sync-daemon' : ''}
          {docs[activeIndex].id === 'offline' ? 'koko-engine-bench' : ''}
        </span>
        <div class="w-12"></div>
      </div>

      <!-- Display Content Area -->
      <div class="flex-1 p-5 font-mono text-xs overflow-auto bg-bg-base/10">
        {#if docs[activeIndex].id === 'scaffolding'}
          <div in:fade={{ duration: 150 }} class="space-y-3.5 text-text-muted">
            <div class="flex gap-2 text-brand-primary">
              <span class="text-text-muted select-none">$</span>
              <span class="font-bold">npx claw-cli init mi-proyecto</span>
            </div>
            
            <div class="space-y-1.5 pl-1.5 border-l border-border-subtle/30 ml-1">
              <div class="flex gap-1.5 items-center">
                <span class="text-brand-secondary font-bold">?</span>
                <span class="text-text-main font-semibold">Select frontend framework:</span>
                <span class="text-brand-primary font-bold">Next.js (App Router, TS)</span>
              </div>
              <div class="flex gap-1.5 items-center">
                <span class="text-brand-secondary font-bold">?</span>
                <span class="text-text-main font-semibold">Select backend server:</span>
                <span class="text-brand-primary font-bold">Go Fiber</span>
              </div>
              <div class="flex gap-1.5 items-center">
                <span class="text-brand-secondary font-bold">?</span>
                <span class="text-text-main font-semibold">Select database engine:</span>
                <span class="text-brand-primary font-bold">PostgreSQL</span>
              </div>
              <div class="flex gap-1.5 items-center">
                <span class="text-brand-secondary font-bold">?</span>
                <span class="text-text-main font-semibold">Enable local Docker Compose?</span>
                <span class="text-brand-primary font-bold">Yes</span>
              </div>
            </div>

            <div class="pt-2 text-[#27c93f] font-semibold flex items-center gap-2">
              <span>✓</span>
              <span>Scaffolding complete! Created 'mi-proyecto' in 32ms.</span>
            </div>
            <div class="text-[10px] text-text-muted/65 italic pt-1">
              {lang === 'es' ? 'Listo para codificar. Ejecuta: cd mi-proyecto && npm run dev' : 'Ready to code. Run: cd mi-proyecto && npm run dev'}
            </div>
          </div>
        {/if}

        {#if docs[activeIndex].id === 'presets'}
          <div in:fade={{ duration: 150 }} class="space-y-2 text-text-muted relative">
            <div class="text-[11px] text-text-muted/65 border-b border-border-subtle/30 pb-2 mb-3 font-semibold select-none uppercase tracking-wider">
              {lang === 'es' ? 'Estructura Generada (SaaS + Go)' : 'Generated Structure (SaaS + Go)'}
            </div>

            <!-- Virtual Tree Directory layout -->
            <div class="space-y-1.5 font-semibold">
              <div class="flex items-center gap-2 text-text-main">
                <span class="text-brand-primary">📁</span>
                <span>mi-proyecto/</span>
              </div>
              
              <div class="flex items-center gap-2 pl-4 border-l border-border-subtle/40 ml-2 py-0.5">
                <span class="text-brand-primary">📁</span>
                <span class="text-text-main">frontend-nextjs/</span>
                <span class="text-[10px] text-text-muted/65 font-sans font-medium">— App Client (React, App Router)</span>
              </div>
              
              <div class="flex items-center gap-2 pl-8 border-l border-border-subtle/40 ml-2 py-0.5">
                <span class="text-brand-secondary">📄</span>
                <span>package.json</span>
              </div>

              <div class="flex items-center gap-2 pl-4 border-l border-border-subtle/40 ml-2 py-0.5">
                <span class="text-brand-primary">📁</span>
                <span class="text-text-main">backend-go/</span>
                <span class="text-[10px] text-text-muted/65 font-sans font-medium">— Core API (Go Fiber)</span>
              </div>

              <div class="flex items-center gap-2 pl-8 border-l border-border-subtle/40 ml-2 py-0.5">
                <span class="text-brand-secondary">📄</span>
                <span>main.go</span>
              </div>

              <div class="flex items-center gap-2 pl-8 border-l border-border-subtle/40 ml-2 py-0.5">
                <span class="text-brand-secondary">📄</span>
                <span>go.mod</span>
              </div>

              <div class="flex items-center gap-2 pl-4 border-l border-border-subtle/40 ml-2 py-0.5">
                <span class="text-brand-secondary">📄</span>
                <span>docker-compose.yml</span>
                <span class="text-[10px] text-text-muted/65 font-sans font-medium">— Postgres container config</span>
              </div>

              <div class="flex items-center gap-2 pl-4 border-l border-border-subtle/40 ml-2 py-0.5">
                <span class="text-brand-secondary text-brand-primary">📄</span>
                <span class="text-brand-primary">claw.config.json</span>
                <span class="text-[10px] text-text-muted/65 font-sans font-medium">— Stack manifest mapping</span>
              </div>
            </div>
          </div>
        {/if}

        {#if docs[activeIndex].id === 'drift'}
          <div in:fade={{ duration: 150 }} class="space-y-4 text-text-muted">
            <div class="flex gap-2 text-brand-primary">
              <span class="text-text-muted select-none">$</span>
              <span class="font-bold">claw drift-check</span>
            </div>

            <div class="space-y-2 border-l-2 border-brand-secondary/40 pl-3.5 my-3">
              <div class="text-[11px] uppercase tracking-wide font-bold text-text-main">
                {lang === 'es' ? 'Iniciando comprobación de sincronización...' : 'Starting sync consistency audit...'}
              </div>
              <div class="flex items-center justify-between text-xs py-0.5">
                <span>• ESLint / Biome configurations</span>
                <span class="text-[#27c93f] font-bold">MATCHED ✓</span>
              </div>
              <div class="flex items-center justify-between text-xs py-0.5">
                <span>• Strict TypeScript configurations</span>
                <span class="text-[#27c93f] font-bold">MATCHED ✓</span>
              </div>
              <div class="flex items-center justify-between text-xs py-0.5">
                <span>• Docker database engine specs</span>
                <span class="text-[#27c93f] font-bold">MATCHED ✓</span>
              </div>
              <div class="flex items-center justify-between text-xs py-0.5">
                <span>• Shared rel ORM model rules</span>
                <span class="text-[#27c93f] font-bold">MATCHED ✓</span>
              </div>
            </div>

            <div class="text-[#27c93f] font-bold flex items-center gap-2 pt-1">
              <span>✓</span>
              <span>{lang === 'es' ? 'CÓDIGO SANO: No se detectaron desvíos técnicos.' : 'HEALTHY STATE: No technical drifts detected.'}</span>
            </div>
          </div>
        {/if}

        {#if docs[activeIndex].id === 'offline'}
          <div in:fade={{ duration: 150 }} class="space-y-3.5 text-text-muted">
            <div class="text-[11px] text-text-muted/65 border-b border-border-subtle/30 pb-2 font-semibold uppercase tracking-wider">
              {lang === 'es' ? 'Métricas de Ejecución (Motor Go)' : 'Execution Metrics (Go Scaffolding Engine)'}
            </div>

            <div class="grid grid-cols-2 gap-4 pt-1">
              <div class="p-3 rounded-xl bg-bg-surface/50 border border-border-subtle/60 space-y-1">
                <div class="text-[10px] text-text-muted uppercase tracking-wider font-bold">
                  {lang === 'es' ? 'Tamaño del Binario' : 'Binary Size'}
                </div>
                <div class="text-base font-extrabold text-brand-primary font-mono">6.8 MB</div>
                <div class="text-[9px] text-text-muted/70">{lang === 'es' ? 'Compilado y Autónomo' : 'Compiled & Standalone'}</div>
              </div>

              <div class="p-3 rounded-xl bg-bg-surface/50 border border-border-subtle/60 space-y-1">
                <div class="text-[10px] text-text-muted uppercase tracking-wider font-bold">
                  {lang === 'es' ? 'Velocidad de Arranque' : 'Cold Start Speed'}
                </div>
                <div class="text-base font-extrabold text-brand-primary font-mono">0.45 ms</div>
                <div class="text-[9px] text-text-muted/70">{lang === 'es' ? 'Inicialización instantánea' : 'Instant execution ready'}</div>
              </div>
            </div>

            <div class="pt-2 space-y-1.5 text-[11px]">
              <div class="flex items-center gap-2">
                <span class="text-brand-secondary font-bold">•</span>
                <span><strong>No Node Globals required</strong>: runs purely in machine assembly.</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-brand-secondary font-bold">•</span>
                <span><strong>100% Offline Scaffolding</strong>: generates structures offline instant.</span>
              </div>
            </div>
          </div>
        {/if}
      </div>

    </div>
  </div>
</div>

<style>
  /* Custom scrollbar adjustments for code panel */
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--border-subtle);
    border-radius: 8px;
  }
</style>
