<script lang="ts">
  import { 
    Copy, 
    Check, 
    Play, 
    Pause, 
    RotateCcw,
    ExternalLink
  } from '@lucide/svelte';

  interface Props {
    lang?: string;
  }

  let { lang = 'es' }: Props = $props();

  let isPlaying = $state(true);
  let isUserInteracting = $state(false);
  let copiedCommand = $state<string | null>(null);
  let activeTooltipId = $state<string | null>(null);
  let selectedIndex = $state<number>(0);

  // References to each video element so all 4 stay preloaded in DOM (zero flash, zero reload bug)
  let videoRefs = $state<Record<string, HTMLVideoElement | null>>({});

  interface CommandItem {
    id: string;
    cmd: string;
    videoSrc: string;
    labelEs: string;
    labelEn: string;
    titleEs: string;
    titleEn: string;
    descEs: string;
    descEn: string;
    whenToUseEs: string;
    whenToUseEn: string;
    accentDot: string;
    badgeText: string;
  }

  const commands: CommandItem[] = [
    {
      id: 'init',
      cmd: 'koko init',
      videoSrc: '/demo.mp4',
      badgeText: 'TUI',
      labelEs: 'Scaffold interactivo',
      labelEn: 'Interactive scaffold',
      titleEs: 'Asistente TUI interactivo',
      titleEn: 'Interactive TUI Wizard',
      descEs: 'Navega paso a paso seleccionando frameworks, bases de datos, ORMs, contenedores y CI/CD con validación en tiempo real.',
      descEn: 'Step-by-step terminal wizard to choose frameworks, databases, ORMs, and container setups with real-time validation.',
      whenToUseEs: 'Ideal al arrancar un proyecto desde cero y personalizar cada capa arquitectónica.',
      whenToUseEn: 'Best for bootstrapping new repositories with custom architecture needs.',
      accentDot: 'bg-indigo-400'
    },
    {
      id: 'blueprint',
      cmd: 'koko init saas-app -r saas',
      videoSrc: '/videos/koko-init-saas.mp4',
      badgeText: 'RECIPE',
      labelEs: 'Blueprint SaaS listo',
      labelEn: 'Production SaaS blueprint',
      titleEs: 'Recetas de arquitectura instantáneas',
      titleEn: 'Instant Architecture Blueprints',
      descEs: 'Genera un monorepo Turborepo completo para SaaS (Next.js 15, Drizzle, Better-Auth, Stripe y Docker) en <1.5s.',
      descEn: 'Generates a battle-tested Turborepo SaaS architecture (Next.js, Drizzle, Better-Auth, Stripe, Docker) in <1.5s.',
      whenToUseEs: 'Ideal para lanzar MVPs o productos a producción sin perder tiempo configurando boilerplate.',
      whenToUseEn: 'Best for shipping production-ready MVPs without boilerplate overhead.',
      accentDot: 'bg-brand-primary'
    },
    {
      id: 'doctor',
      cmd: 'koko doctor --fix',
      videoSrc: '/videos/koko-doctor-fix.mp4',
      badgeText: 'INTEGRITY',
      labelEs: 'Diagnóstico & anti-drift',
      labelEn: 'Diagnostics & integrity',
      titleEs: 'Auditoría & Reconciliación automática',
      titleEn: 'Diagnostics & Auto-Repair',
      descEs: 'Inspecciona package.json/go.mod, puertos de Docker y el manifiesto koko.config.json. Corrige discrepancias en 18ms.',
      descEn: 'Inspects dependencies, Docker ports and koko.config.json schema. Auto-reconciles drift in 18ms.',
      whenToUseEs: 'Ideal antes de hacer commits, en CI/CD o cuando el proyecto acumula dependencias desalineadas.',
      whenToUseEn: 'Best for CI/CD gates and auditing codebase integrity over time.',
      accentDot: 'bg-emerald-400'
    },
    {
      id: 'add',
      cmd: 'koko add stripe',
      videoSrc: '/videos/koko-add-stripe.mp4',
      badgeText: 'ADDON',
      labelEs: 'Inyección modular',
      labelEn: 'Modular add-on injection',
      titleEs: 'Inyección de servicios atómica',
      titleEn: 'Atomic Addon Injection',
      descEs: 'Añade pagos (Stripe, Polar), auth (Better-Auth, Clerk), emails (Resend) o Docker a un proyecto existente sin cablear a mano.',
      descEn: 'Injects Stripe, Auth, Resend emails, or Docker into existing codebases without manual wiring.',
      whenToUseEs: 'Ideal para evolucionar tu proyecto agregando módulos cuando realmente los necesitas.',
      whenToUseEn: 'Best for incrementally upgrading existing stacks without breaking standards.',
      accentDot: 'bg-sky-400'
    }
  ];

  function selectCommand(index: number) {
    selectedIndex = index;
    const currentItem = commands[index];
    isUserInteracting = true;

    // Synchronize video play state
    const targetVideo = videoRefs[currentItem.id];
    if (targetVideo) {
      targetVideo.currentTime = 0;
      targetVideo.play().catch(() => {});
      isPlaying = true;
    }
  }

  // Auto carousel rotation every 8.5 seconds if user hasn't explicitly clicked
  $effect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      selectedIndex = (selectedIndex + 1) % commands.length;
      const targetVideo = videoRefs[commands[selectedIndex].id];
      if (targetVideo) {
        targetVideo.currentTime = 0;
        targetVideo.play().catch(() => {});
      }
    }, 8500);

    return () => clearInterval(interval);
  });

  // Ensure current active video is playing
  $effect(() => {
    const activeItem = commands[selectedIndex];
    if (activeItem) {
      const v = videoRefs[activeItem.id];
      if (v && isPlaying) {
        v.play().catch(() => {});
      }
    }
  });

  function copyText(cmd: string) {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(cmd);
      copiedCommand = cmd;
      setTimeout(() => {
        if (copiedCommand === cmd) copiedCommand = null;
      }, 2000);
    }
  }

  function togglePlay() {
    const activeItem = commands[selectedIndex];
    const currentVideo = videoRefs[activeItem.id];
    if (!currentVideo) return;
    
    if (currentVideo.paused) {
      currentVideo.play().catch(() => {});
      isPlaying = true;
    } else {
      currentVideo.pause();
      isPlaying = false;
    }
  }

  function restartVideo() {
    const activeItem = commands[selectedIndex];
    const currentVideo = videoRefs[activeItem.id];
    if (!currentVideo) return;
    currentVideo.currentTime = 0;
    currentVideo.play().catch(() => {});
    isPlaying = true;
  }
</script>

<div class="w-full font-sans">
  <!-- Main Grid: Left Prominent Video (Larger), Right Minimal Cards with Tooltip Popovers -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
    
    <!-- LEFT: Prominent Video Player (All 4 pre-rendered in DOM, stacked with opacity - Zero reload bug) -->
    <div class="lg:col-span-8 flex flex-col justify-center">
      <div class="relative group/player rounded-2xl sm:rounded-3xl overflow-hidden bg-[#181825] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] aspect-[1120/680] max-h-[580px]">
        
        <!-- Preloaded Stacked Videos (Zero Flash / Instant Switch) -->
        {#each commands as cmd, i}
          <video
            bind:this={videoRefs[cmd.id]}
            src={cmd.videoSrc}
            autoplay
            muted
            loop
            playsinline
            preload="auto"
            class="absolute inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-300 pointer-events-auto bg-[#181825]
              {selectedIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}"
            onclick={togglePlay}
          ></video>
        {/each}

        <!-- Floating Player Controls (Bottom Right Hover Overlay) -->
        <div class="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-neutral-900/85 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 opacity-0 group-hover/player:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onclick={togglePlay}
            class="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {#if isPlaying}
              <Pause size={13} />
            {:else}
              <Play size={13} />
            {/if}
          </button>
          
          <button
            type="button"
            onclick={restartVideo}
            class="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Reiniciar video"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      <!-- Carousel Navigation Dots directly underneath the video (Subtle, sleek, clickable) -->
      <div class="mt-3.5 flex items-center justify-center px-2 text-xs text-text-muted">
        <!-- Interactive Dots Indicator -->
        <div class="flex items-center gap-2 pt-5">
          {#each commands as item, idx}
            <button
              type="button"
              onclick={() => selectCommand(idx)}
              class="group/dot flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
              title={item.cmd}
              aria-label={item.cmd}
            >
              <span 
                class="h-1.5 rounded-full transition-all duration-300
                  {selectedIndex === idx 
                    ? 'w-6 bg-brand-primary' 
                    : 'w-1.5 bg-border-subtle hover:bg-text-muted/60'}"
              ></span>
            </button>
          {/each}
        </div>

      </div>
    </div>

    <!-- RIGHT: Minimal Command Cards (Click activates card, switches video, and opens persistent tooltip) -->
    <div class="lg:col-span-4 flex flex-col justify-center relative">
      <!-- Section Mini Header with Dual Color (Text Main / Purple) matching HeroHeadline -->
      <div class="mb-4">
        <h3 class="text-2xl sm:text-3xl lg:text-[32px] leading-[1.12] tracking-[-0.03em] font-medium text-balance">
          {#if lang === 'es'}
            <span class="block text-text-main font-bold">Ejecuta lo que necesitas...</span>
            <span class="block text-primary font-medium mt-1">Directo en tu terminal</span>
          {:else}
            <span class="block text-text-main font-semibold">Run what you need...</span>
            <span class="block text-primary font-medium mt-1">Straight into your terminal</span>
          {/if}
        </h3>
        <p class="text-xs text-text-muted mt-2 leading-relaxed font-normal">
          {#if lang === 'es'}
            Haz clic en un comando para reproducir su demo y ver sus detalles.
          {:else}
            Click any command to play its video demo and inspect its details.
          {/if}
        </p>
      </div>

      <!-- Ultra-Minimal Command Chips -->
      <div class="space-y-2 relative">
        {#each commands as item, idx}
          <div 
            class="relative group/chip"
            onmouseenter={() => activeTooltipId = item.id}
            onmouseleave={() => activeTooltipId = null}
          >
            
            <!-- Minimal Chip Container (Click activates) -->
            <div
              role="button"
              tabindex="0"
              onclick={() => selectCommand(idx)}
              onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCommand(idx); } }}
              class="w-full text-left flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xs backdrop-blur-md select-none
                {selectedIndex === idx 
                  ? 'bg-bg-surface/95 border-2 border-brand-primary/60 shadow-sm ring-1 ring-brand-primary/20' 
                  : 'bg-bg-surface/50 hover:bg-bg-surface/90 border border-border-subtle/70 hover:border-brand-primary/40'}"
            >
              <!-- Minimal Precision Dot Accent + Command + Label in a Single Horizontal Line -->
              <div class="flex items-center gap-2.5 min-w-0 flex-1">              
                <span class="text-xs font-semibold text-text-main tracking-tight truncate">
                  {item.cmd}
                </span>

                <span class="text-text-muted/40 text-xs hidden sm:inline">•</span>

                <span class="text-[11px] text-text-muted truncate hidden sm:inline font-normal">
                  {lang === 'es' ? item.labelEs : item.labelEn}
                </span>
              </div>

              <!-- Compact Copy Button -->
              <button
                type="button"
                onclick={(e) => { e.stopPropagation(); copyText(item.cmd); }}
                class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer active:scale-95 shrink-0
                  {copiedCommand === item.cmd 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-bg-base/80 hover:bg-bg-base text-text-muted hover:text-text-main border border-border-subtle/80 hover:border-brand-primary/40'}"
                title={lang === 'es' ? 'Copiar comando' : 'Copy command'}
                aria-label={lang === 'es' ? 'Copiar comando' : 'Copy command'}
              >
                {#if copiedCommand === item.cmd}
                  <Check size={11} class="text-emerald-400" />
                  <span class="text-[11px]">{lang === 'es' ? 'Listo' : 'Done'}</span>
                {:else}
                  <Copy size={11} />
                  <span class="text-[11px]">{lang === 'es' ? 'Copiar' : 'Copy'}</span>
                {/if}
              </button>
            </div>

            <!-- Tooltip Popover Card (Shown strictly on hover, positioned to the right of the chip) -->
            {#if activeTooltipId === item.id}
              <div 
                class="absolute left-0 right-0 sm:left-auto sm:left-full sm:ml-4 top-full sm:top-1/2 sm:-translate-y-1/2 mt-2 sm:mt-0 z-50 w-full sm:w-72 p-3.5 rounded-2xl bg-bg-surface/98 dark:bg-[#16161a]/98 border border-border-subtle dark:border-white/15 shadow-2xl backdrop-blur-xl transition-all duration-150 pointer-events-none"
              >
                <!-- Tooltip Header -->
                <div class="flex items-center justify-between gap-1.5 mb-1.5">
                  <div class="flex items-center gap-1.5 text-xs font-semibold text-text-main">
                    <span class="w-1.5 h-1.5 rounded-full {item.accentDot} shrink-0"></span>
                    <span>{lang === 'es' ? item.titleEs : item.titleEn}</span>
                  </div>
                  <span class="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-bg-base border border-border-subtle text-text-muted">
                    {item.badgeText}
                  </span>
                </div>

                <!-- Tooltip Description -->
                <p class="text-xs text-text-muted leading-relaxed mb-2.5 font-normal">
                  {lang === 'es' ? item.descEs : item.descEn}
                </p>

                <!-- Tooltip Footer Use Case -->
                <div class="pt-2 border-t border-border-subtle/50 text-[11px] text-text-muted flex items-start gap-1.5 leading-snug">
                  <span class="text-brand-primary font-bold shrink-0">💡</span>
                  <span>{lang === 'es' ? item.whenToUseEs : item.whenToUseEn}</span>
                </div>
              </div>
            {/if}

          </div>
        {/each}
      </div>

      <!-- Quick Command Note -->
      <div class="pt-4 flex items-center justify-end text-xs text-text-muted">
        <a 
          href="/docs/cli-commands" 
          class="inline-flex items-center hover:underline hover:underline-offset-2 gap-1 hover:text-brand-primary transition-colors text-[11px]"
        >
          <span>{lang === 'es' ? 'Ver todos los flags' : 'View all flags'}</span>
          <ExternalLink size={11} />
        </a>
      </div>

    </div>

  </div>
</div>
