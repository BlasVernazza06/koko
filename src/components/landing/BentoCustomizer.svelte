<script lang="ts">
  interface Option {
    id: string;
    name: string;
    desc: string;
    color: string;
    hoverColorClass: string;
    svg: string;
  }

  interface Layer {
    key: 'frontend' | 'backend' | 'tools';
    titleEs: string;
    titleEn: string;
    step: string;
    colorClass: string;
    type: 'single' | 'multiple';
    options: Option[];
  }

  const { lang = 'es' } = $props<{ lang?: string }>();

  // State for selections
  let selectedFrontend = $state('Next.js');
  let selectedBackend = $state('Go');
  let selectedTools = $state<string[]>(['PostgreSQL', 'Prisma', 'Docker']);

  const layers: Layer[] = [
    {
      key: 'frontend',
      titleEs: '01 / FRAMEWORKS FRONT',
      titleEn: '01 / FRONTEND FRAMEWORKS',
      step: 'Step 1',
      colorClass: 'border-brand-secondary',
          options: [
        {
          id: 'Next.js',
          name: 'Next.js',
          desc: 'React SSR',
          color: 'var(--brand-secondary)',
          hoverColorClass: 'group-hover/btn:text-[#8095f8]',
          svg: `<circle cx="12" cy="12" r="10"/><path d="M16 16L12 8L8 16" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12H16" stroke-linecap="round"/>`
        },
        {
          id: 'React SPA',
          name: 'React SPA',
          desc: 'React Client',
          color: '#61dafb',
          hoverColorClass: 'group-hover/btn:text-[#61dafb]',
          svg: `<circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" class="opacity-10"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)"/>`
        },
        {
          id: 'Nuxt',
          name: 'Nuxt',
          desc: 'Vue SSR',
          color: '#00dc82',
          hoverColorClass: 'group-hover/btn:text-[#00dc82]',
          svg: `<path d="M12 4l-9 15.5h18L12 4z" stroke-linejoin="round"/><path d="M12 10.5l-5 8.5h10l-5-8.5z" class="opacity-40" stroke-linejoin="round"/>`
        },
        {
          id: 'Vue SPA',
          name: 'Vue SPA',
          desc: 'Vue Client',
          color: '#42b883',
          hoverColorClass: 'group-hover/btn:text-[#42b883]',
          svg: `<path d="M12 22L3 4h4.5l4.5 9 4.5-9H21L12 22z" stroke-linejoin="round"/><path d="M12 17L7.5 8h9L12 17z" class="opacity-30"/>`
        },
        {
          id: 'SvelteKit',
          name: 'SvelteKit',
          desc: 'Svelte SSR',
          color: '#ff3e00',
          hoverColorClass: 'group-hover/btn:text-[#ff3e00]',
          svg: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" class="opacity-10"/><path d="M8 8.5C8 6.57 9.57 5 11.5 5S15 6.57 15 8.5C15 10 14 11 12.5 12S10 13.5 10 15h4" stroke-linecap="round" stroke-linejoin="round"/>`
        },
        {
          id: 'Svelte SPA',
          name: 'Svelte SPA',
          desc: 'Svelte Client',
          color: '#ff3e00',
          hoverColorClass: 'group-hover/btn:text-[#ff3e00]',
          svg: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" class="opacity-10"/><path d="M8 8.5C8 6.57 9.57 5 11.5 5S15 6.57 15 8.5C15 10 14 11 12.5 12S10 13.5 10 15h4" stroke-linecap="round" stroke-linejoin="round"/>`
        },
        {
          id: 'Astro',
          name: 'Astro',
          desc: 'Static Content',
          color: '#ff5d01',
          hoverColorClass: 'group-hover/btn:text-[#ff5d01]',
          svg: `<path d="M12 2L2 22h20L12 2z" stroke-linejoin="round"/><path d="M12 6l-6 12h12l-6-12z" class="opacity-30"/>`
        },
        {
          id: 'Angular',
          name: 'Angular',
          desc: 'Enterprise Layer',
          color: '#dd0031',
          hoverColorClass: 'group-hover/btn:text-[#dd0031]',
          svg: `<path d="M12 2L2 6l2 12 8 4 8-4 2-12L12 2zm0 3.3l5.5 11h-2.2l-1.1-2.4H9.8l-1.1 2.4H6.5L12 5.3zm-1 6.8h2l-1-2.2-1 2.2z" fill="currentColor"/>`
        }
      ]
    },
    {
      key: 'backend',
      titleEs: '02 / FRAMEWORKS BACK',
      titleEn: '02 / BACKEND FRAMEWORKS',
      step: 'Step 2',
      colorClass: 'border-brand-primary',
      type: 'single',
      options: [
        {
          id: 'Go',
          name: 'Go Fiber',
          desc: 'Blazing Speed',
          color: 'var(--brand-primary)',
          hoverColorClass: 'group-hover/btn:text-[#9b8df7]',
          svg: `<path d="M12 2a10 10 0 1 0 10 10" stroke-linecap="round"/><path d="M12 6a6 6 0 1 1-6 6 6 6 0 0 1 6-6" class="opacity-30"/><path d="M16 12h6" stroke-linecap="round"/>`
        },
        {
          id: 'Node',
          name: 'Node.js',
          desc: 'Express API',
          color: '#68a063',
          hoverColorClass: 'group-hover/btn:text-[#68a063]',
          svg: `<path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm8.5 13.3L12 20.2l-8.5-4.9V8.7L12 3.8l8.5 4.9v6.6z" />`
        },
        {
          id: 'NestJS',
          name: 'NestJS',
          desc: 'Modular Architecture',
          color: '#e0234e',
          hoverColorClass: 'group-hover/btn:text-[#e0234e]',
          svg: `<path d="M12 2L2.5 7.5v9L12 22l9.5-5.5v-9L12 2zm7 13.5l-7 4-7-4v-7l7-4 7 4v7z" stroke-linejoin="round"/>`
        },
        {
          id: 'Rust',
          name: 'Rust Actix',
          desc: 'Type-safe API',
          color: '#dea584',
          hoverColorClass: 'group-hover/btn:text-[#dea584]',
          svg: `<circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2.5 2.5M16.5 16.5L19 19M19 5l-2.5 2.5M7.5 16.5L5 19" stroke-linecap="round"/>`
        },
        {
          id: 'Bun',
          name: 'Bun Elysia',
          desc: 'Edge Runtime',
          color: '#fbf0e9',
          hoverColorClass: 'group-hover/btn:text-[#fbf0e9]',
          svg: `<path d="M12 2a10 10 0 0 0-7.3 16.8l1.4-1.4A8 8 0 1 1 18 12h2a10 10 0 0 0-8-10z" stroke-linecap="round"/><circle cx="12" cy="14" r="3" class="opacity-20"/>`
        },
        {
          id: 'Python',
          name: 'Python',
          desc: 'FastAPI',
          color: '#3776ab',
          hoverColorClass: 'group-hover/btn:text-[#3776ab]',
          svg: `<path d="M12 2a4 4 0 0 0-4 4v2h4a4 4 0 0 1 4 4v4h2a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4h-6z" stroke-linecap="round"/><path d="M12 22a4 4 0 0 0 4-4v-2h-4a4 4 0 0 1-4-4V8H8a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6z" stroke-linecap="round" class="opacity-30"/>`
        }
      ]
    },
    {
      key: 'tools',
      titleEs: '03 / BASE DE DATOS Y COMPLEMENTOS',
      titleEn: '03 / DATABASE & UTILITY STACK',
      step: 'Step 3',
      colorClass: 'border-text-muted',
      type: 'multiple',
      options: [
        {
          id: 'PostgreSQL',
          name: 'PostgreSQL',
          desc: 'Relational DB',
          color: 'var(--brand-secondary)',
          hoverColorClass: 'group-hover/btn:text-[#8095f8]',
          svg: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" class="opacity-15"/><path d="M18 10a4 4 0 0 0-4-4h-4v10h2a4 4 0 0 0 4-4v-2z" stroke-linecap="round" stroke-linejoin="round"/>`
        },
        {
          id: 'Prisma',
          name: 'Prisma ORM',
          desc: 'Type-safe Query',
          color: 'var(--brand-secondary)',
          hoverColorClass: 'group-hover/btn:text-[#8095f8]',
          svg: `<path d="M12 2L2 22h20L12 2z" stroke-linejoin="round"/><path d="M12 7l6 10H6l6-10z" class="opacity-20"/>`
        },
        {
          id: 'Docker',
          name: 'Docker Compose',
          desc: 'Local Containers',
          color: 'var(--brand-primary)',
          hoverColorClass: 'group-hover/btn:text-[#9b8df7]',
          svg: `<rect x="3" y="10" width="18" height="10" rx="2"/><path d="M7 6h2v4H7zm4-2h2v6h-2zm4 2h2v4h-2z" class="opacity-30"/>`
        },
        {
          id: 'Redis',
          name: 'Redis',
          desc: 'Memory Cache',
          color: '#d82c20',
          hoverColorClass: 'group-hover/btn:text-[#d82c20]',
          svg: `<path d="M3 6l9-3 9 3v12l-9 3-9-3V6z"/><path d="M3 12h18M12 3v18" class="opacity-20"/>`
        },
        {
          id: 'SQLite',
          name: 'SQLite',
          desc: 'Embedded DB',
          color: '#003b57',
          hoverColorClass: 'group-hover/btn:text-[#003b57]',
          svg: `<path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>`
        }
      ]
    }
  ];

  function toggleOption(layerKey: 'frontend' | 'backend' | 'tools', optionId: string) {
    if (layerKey === 'frontend') {
      selectedFrontend = optionId;
    } else if (layerKey === 'backend') {
      selectedBackend = optionId;
    } else {
      if (selectedTools.includes(optionId)) {
        selectedTools = selectedTools.filter(id => id !== optionId);
      } else {
        selectedTools = [...selectedTools, optionId];
      }
    }
  }

  function isSelected(layerKey: 'frontend' | 'backend' | 'tools', optionId: string): boolean {
    if (layerKey === 'frontend') return selectedFrontend === optionId;
    if (layerKey === 'backend') return selectedBackend === optionId;
    return selectedTools.includes(optionId);
  }
</script>

<div class="space-y-5 text-xs sm:text-sm">
  {#each layers as layer}
    <div>
      <div class="flex justify-between items-center text-text-muted text-[10px] mb-2.5 font-bold tracking-wider select-none border-l-2 {layer.colorClass} pl-2">
        <span>{lang === 'es' ? layer.titleEs : layer.titleEn}</span>
        <span class="font-mono text-brand-secondary">{layer.step}</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {#each layer.options as opt}
          {@const active = isSelected(layer.key, opt.id)}
          <button 
            type="button"
            onclick={() => toggleOption(layer.key, opt.id)}
            aria-pressed={active}
            class="flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer active:scale-95 text-center group/btn
              {active 
                ? layer.key === 'backend' || (layer.key === 'tools' && opt.id === 'Docker')
                  ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary font-bold shadow-sm shadow-brand-primary/5'
                  : 'bg-brand-secondary/10 border-brand-secondary/30 text-brand-secondary font-bold shadow-sm shadow-brand-secondary/5'
                : 'bg-bg-surface border-border-subtle text-text-muted hover:border-brand-secondary/40'}"
          >
            <svg 
              viewBox="0 0 24 24" 
              class="w-5 h-5 mb-1 transition-colors fill-none stroke-current stroke-[1.8] 
                {active 
                  ? layer.key === 'backend' || (layer.key === 'tools' && opt.id === 'Docker')
                    ? 'text-brand-primary' 
                    : 'text-brand-secondary' 
                  : `text-slate-400 ${opt.hoverColorClass}`}"
            >
              {@html opt.svg}
            </svg>
            <span class="font-bold text-[11px] {active ? '' : 'text-text-main'}">
              {active && layer.type === 'multiple' ? `✓ ${opt.name}` : opt.name}
            </span>
            <span class="text-[8px] opacity-80 mt-0.5 {active ? '' : 'text-text-muted'}">
              {opt.desc}
            </span>
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>
