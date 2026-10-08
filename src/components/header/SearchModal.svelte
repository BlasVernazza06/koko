<script lang="ts">
  import { onMount } from 'svelte';
  import { Search, CornerDownLeft, ChevronLeft, ChevronRight } from '@lucide/svelte';

  interface SearchItem {
    title: string;
    section: string;
    desc: string;
    url: string;
    keywords: string[];
  }

  interface Props {
    lang?: string;
  }

  let { lang = 'es' }: Props = $props();

  let isOpen = $state(false);
  let query = $state('');
  let selectedIndex = $state(0);

  // Content to search
  const content: Record<string, SearchItem[]> = {
    es: [
      {
        title: 'Inicio Rápido y Filosofía',
        section: 'Introducción',
        desc: 'Aprende a instalar y ejecutar Koko CLI en tu máquina con Node/NPX o binarios en Go.',
        url: '/docs/quick-start',
        keywords: ['inicio', 'rapido', 'instalacion', 'prerrequisitos', 'binarios', 'npx', 'npm', 'quickstart']
      },
      {
        title: 'Stack y Tecnologías Soportadas',
        section: 'Introducción',
        desc: 'Frameworks de cliente, servidores backend, motores de bases de datos y ORMs compatibles.',
        url: '/docs/tech-stack',
        keywords: ['stack', 'frontend', 'backend', 'nextjs', 'react', 'nuxt', 'svelte', 'express', 'fastapi', 'go', 'postgres', 'drizzle', 'prisma', 'mongodb']
      },
      {
        title: 'Asistente TUI Interactivo',
        section: 'CLI',
        desc: 'Interfaz de terminal interactiva construida en Go con Bubble Tea, Lipgloss y animaciones.',
        url: '/docs/tui-wizard',
        keywords: ['tui', 'terminal', 'bubble tea', 'lipgloss', 'interactivo', 'wizard', 'asistente', 'spinners']
      },
      {
        title: 'Comandos y Flags del CLI',
        section: 'CLI',
        desc: 'Referencia exhaustiva de comandos (koko init, koko version) y flags para automatización y CI/CD.',
        url: '/docs/cli-commands',
        keywords: ['comandos', 'flags', 'init', 'version', 'default', 'recipie', 'automatizacion', 'ci/cd']
      },
      {
        title: 'Diagnóstico e Integridad (koko doctor)',
        section: 'CLI',
        desc: 'Diagnostica la arquitectura del proyecto, detecta drift contra koko.config.json y auto-repara inconsistencias con --fix.',
        url: '/docs/doctor',
        keywords: ['doctor', 'diagnostico', 'drift', 'fix', 'reparar', 'salud', 'consistencia', 'puertos', 'docker', 'catalogo', 'koko doctor']
      },
      {
        title: 'Reglas de Validación y Seguridad',
        section: 'CLI',
        desc: 'Motor de validación cruzada en tiempo real para evitar combinaciones técnicas incompatibles.',
        url: '/docs/validation-rules',
        keywords: ['validacion', 'compatibilidad', 'seguridad', 'reglas', 'errores', 'incompatible', 'orm']
      },
      {
        title: 'Estructuras Generadas (Monorepo y Standalone)',
        section: 'Estructura de Proyecto',
        desc: 'Diseño de carpetas para monorrepos con Turborepo y pnpm workspaces, o layouts standalone.',
        url: '/docs/project-structure',
        keywords: ['estructura', 'monorepo', 'turborepo', 'workspaces', 'pnpm', 'apps', 'packages', 'layout']
      },
      {
        title: 'Manifiesto koko.config.json',
        section: 'Estructura de Proyecto',
        desc: 'Especificación estándar de JSON Schema para describir el stack y habilitar extensiones futuras.',
        url: '/docs/koko-config',
        keywords: ['koko.config.json', 'manifiesto', 'schema', 'configuracion', 'json', 'especificacion']
      },
      {
        title: 'Recetas de Producción (SaaS, Java Spring, NestJS, MERN, PERN, FastAPI, Expo)',
        section: 'Avanzado',
        desc: 'Análisis detallado de las recetas oficiales probadas en producción listas para codificar.',
        url: '/docs/recipes-deep-dive',
        keywords: ['recetas', 'recipes', 'saas', 'java', 'spring', 'nestjs', 'pern', 'mern', 'fastapi', 'expo', 'starter', 'production']
      },
      {
        title: 'Solución de Problemas (Troubleshooting)',
        section: 'Avanzado',
        desc: 'Resolución de conflictos de puertos en Docker, permisos en Unix y resolución de workspaces.',
        url: '/docs/troubleshooting',
        keywords: ['troubleshooting', 'errores', 'problemas', 'docker', 'puertos', 'permisos', 'pnpm']
      },
      {
        title: 'Guía de Contribución',
        section: 'Avanzado',
        desc: 'Cómo compilar Koko en Go localmente, ejecutar pruebas unitarias y colaborar en código abierto.',
        url: '/docs/contributing',
        keywords: ['contribuir', 'open source', 'go', 'testing', 'colaborar', 'pull request', 'github']
      },
      {
        title: 'Preguntas Frecuentes (FAQ)',
        section: 'Preguntas Frecuentes',
        desc: 'Respuestas a dudas sobre rendimiento en Go, modo offline, licencia comercial y compatibilidad.',
        url: '/docs/faq',
        keywords: ['faq', 'preguntas', 'frecuentes', 'dudas', 'go', 'offline', 'licencia', 'gratis']
      }
    ],
    en: [
      {
        title: 'Quick Start & Philosophy',
        section: 'Introduction',
        desc: 'Learn how to install and run Koko CLI on your machine with Node/NPX or Go native binaries.',
        url: '/en/docs/quick-start',
        keywords: ['quickstart', 'start', 'install', 'prerequisites', 'binaries', 'npx', 'npm', 'philosophy']
      },
      {
        title: 'Supported Tech Stack',
        section: 'Introduction',
        desc: 'Frontend frameworks, backend runtimes, database engines, and compatible ORMs.',
        url: '/en/docs/tech-stack',
        keywords: ['stack', 'frontend', 'backend', 'nextjs', 'react', 'nuxt', 'svelte', 'express', 'fastapi', 'go', 'postgres', 'drizzle', 'prisma', 'mongodb']
      },
      {
        title: 'Interactive TUI Wizard',
        section: 'CLI',
        desc: 'Interactive terminal UI built in Go with Bubble Tea, Lipgloss styling, and real-time animations.',
        url: '/en/docs/tui-wizard',
        keywords: ['tui', 'terminal', 'bubble tea', 'lipgloss', 'interactive', 'wizard', 'spinners']
      },
      {
        title: 'CLI Commands & Flags Reference',
        section: 'CLI',
        desc: 'Comprehensive reference of CLI commands (koko init, koko version) and flags for CI/CD scripting.',
        url: '/en/docs/cli-commands',
        keywords: ['commands', 'flags', 'init', 'version', 'default', 'recipie', 'automation', 'scripting']
      },
      {
        title: 'Diagnostics & Drift Control (koko doctor)',
        section: 'CLI',
        desc: 'Diagnose workspace architecture, detect drift against koko.config.json, and auto-repair inconsistencies with --fix.',
        url: '/en/docs/doctor',
        keywords: ['doctor', 'diagnostics', 'drift', 'fix', 'repair', 'health', 'consistency', 'ports', 'docker', 'catalog', 'koko doctor']
      },
      {
        title: 'Cross-Validation Safety Rules',
        section: 'CLI',
        desc: 'Real-time compatibility engine preventing conflicting stack choices before file creation.',
        url: '/en/docs/validation-rules',
        keywords: ['validation', 'compatibility', 'safety', 'rules', 'errors', 'incompatible', 'orm']
      },
      {
        title: 'Generated Project Structure',
        section: 'Project Structure',
        desc: 'Folder layout design for Turborepo + pnpm monorepos or standalone application architectures.',
        url: '/en/docs/project-structure',
        keywords: ['structure', 'monorepo', 'turborepo', 'workspaces', 'pnpm', 'apps', 'packages', 'layout']
      },
      {
        title: 'The koko.config.json Manifest',
        section: 'Project Structure',
        desc: 'Standardized JSON Schema specification for workspace recording and future expansion.',
        url: '/en/docs/koko-config',
        keywords: ['koko.config.json', 'manifest', 'schema', 'configuration', 'json', 'spec']
      },
      {
        title: 'Production Recipes Deep-Dive',
        section: 'Advanced',
        desc: 'In-depth breakdown of official production recipes: SaaS Starter, Java Spring, NestJS, PERN, MERN, FastAPI, and Expo.',
        url: '/en/docs/recipes-deep-dive',
        keywords: ['recipes', 'saas', 'java', 'spring', 'nestjs', 'pern', 'mern', 'fastapi', 'expo', 'blueprints', 'starter', 'production']
      },
      {
        title: 'Troubleshooting Guide',
        section: 'Advanced',
        desc: 'Fixing Docker port allocation conflicts, Unix binary permissions, and workspace resolution.',
        url: '/en/docs/troubleshooting',
        keywords: ['troubleshooting', 'errors', 'issues', 'docker', 'ports', 'permissions', 'pnpm']
      },
      {
        title: 'Contributing Guide',
        section: 'Advanced',
        desc: 'How to build Koko in Go locally, execute unit test suites, and contribute to open source.',
        url: '/en/docs/contributing',
        keywords: ['contribute', 'open source', 'go', 'testing', 'pull request', 'github', 'development']
      },
      {
        title: 'Frequently Asked Questions (FAQ)',
        section: 'FAQ',
        desc: 'Answers about Go engine performance, offline execution, commercial licensing, and OS support.',
        url: '/en/docs/faq',
        keywords: ['faq', 'questions', 'frequently', 'answers', 'go', 'offline', 'license', 'free']
      }
    ]
  };

  const items = $derived(content[lang] || content['es']);

  let activeCategory = $state<'all' | string>('all');
  let categoryContainer: HTMLDivElement | null = $state(null);
  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);

  const categories = $derived.by(() => {
    const list = items.map(i => i.section);
    return Array.from(new Set(list));
  });

  function updateCategoryScrollButtons() {
    if (!categoryContainer) {
      canScrollLeft = false;
      canScrollRight = false;
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = categoryContainer;
    canScrollLeft = scrollLeft > 2;
    canScrollRight = scrollLeft + clientWidth < scrollWidth - 2;
  }

  function scrollCategories(direction: 'left' | 'right') {
    if (!categoryContainer) return;
    const scrollAmount = 140;
    categoryContainer.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  $effect(() => {
    if (categoryContainer && isOpen) {
      // Run once immediately and after layout paint
      updateCategoryScrollButtons();
      const timer = setTimeout(updateCategoryScrollButtons, 60);

      const handleResize = () => updateCategoryScrollButtons();
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  });

  const results = $derived.by(() => {
    let base = items;
    if (activeCategory !== 'all') {
      base = base.filter(i => i.section === activeCategory);
    }
    if (!query.trim()) return base.slice(0, 6);
    const q = query.toLowerCase().trim();
    return base.filter(item => (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(q))
    ));
  });

  $effect(() => {
    results;
    selectedIndex = 0;
  });

  function toggleModal() {
    isOpen = !isOpen;
    if (isOpen) {
      query = '';
      activeCategory = 'all';
      selectedIndex = 0;
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 50);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleModal();
    }
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      toggleModal();
    }

    if (isOpen) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const currentIndex = categories.indexOf(activeCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        activeCategory = categories[nextIndex];
        return;
      }

      if (results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % results.length;
          scrollIntoView();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectedIndex = (selectedIndex - 1 + results.length) % results.length;
          scrollIntoView();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          selectResult(results[selectedIndex]);
        }
      }
    }
  }

  function selectResult(result: SearchItem) {
    toggleModal();
    window.location.href = result.url;
  }

  function scrollIntoView() {
    const el = document.getElementById(`result-item-${selectedIndex}`);
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  function highlightText(text: string, search: string) {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-brand-primary/25 text-text-main font-semibold rounded-xs px-0.5">$1</mark>');
  }

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    };
  }
</script>

<!-- Searchbar Trigger Button (SpaceFS Style) -->
<button 
  type="button"
  onclick={toggleModal}
  class="flex items-center justify-between gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-2 rounded-full border border-border-subtle bg-bg-surface hover:bg-bg-base text-text-muted hover:text-text-main cursor-pointer select-none shadow-xs group shrink-0"
  aria-label="Search"
>
  <div class="flex items-center gap-1.5 sm:gap-2">
    <Search size={13} class="text-text-muted group-hover:text-text-main shrink-0" />
    <span class="font-semibold text-xs sm:text-sm text-text-muted group-hover:text-text-main">{lang === 'es' ? 'Buscar docs' : 'Search docs'}</span>
  </div>
  <kbd class="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] shadow-xs border border-border-subtle bg-bg-base text-text-muted">
    <span>Ctrl K</span>
  </kbd>
</button>

{#if isOpen}
  <!-- Modal Overlay Backdrop (Centered + Soft Feathered Blur) -->
  <div 
    use:portal
    class="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 select-none bg-black/25 dark:bg-black/60 backdrop-blur-md -webkit-backdrop-blur-md animate-fade-in"
    onclick={(e) => { if (e.target === e.currentTarget) toggleModal(); }}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <!-- Modal Window (Ultra-Smooth Frosted Glass Card) -->
    <div class="search-modal-card w-full max-w-[580px] rounded-[28px] border border-border-subtle bg-bg-surface/95 dark:bg-[#12111b]/95 backdrop-blur-2xl shadow-[0_24px_70px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_70px_-15px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">
      
      <!-- Search Input Area -->
      <div class="p-4 sm:p-5 pb-3">
        <div class="flex items-center gap-3">
          <Search class="text-text-muted shrink-0" size={19} />
          <input 
            id="search-input"
            bind:value={query}
            type="text" 
            placeholder={lang === 'es' ? 'Buscar documentación...' : 'Search documentation...'}
            class="w-full bg-transparent text-base sm:text-[17px] text-text-main placeholder-text-muted/60 focus:outline-none font-sans"
            autocomplete="off"
          />
          <button 
            type="button"
            onclick={toggleModal}
            class="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-border-subtle/80 bg-bg-base/70 text-text-muted hover:text-text-main cursor-pointer"
          >
            esc
          </button>
        </div>

        <!-- Filter Pill Chips Row: Fixed 'Todo/All' + Scrollable Categories with Shadow Navigation Buttons -->
        <div class="relative flex items-center mt-3.5 pt-0.5">
          <!-- Fixed 'Todo' / 'All' Button -->
          <div class="shrink-0 pr-1.5 z-20">
            <button
              type="button"
              onclick={() => activeCategory = 'all'}
              class="px-3.5 py-1 rounded-full text-xs font-medium cursor-pointer shrink-0 border
                {activeCategory === 'all' 
                  ? 'bg-brand-primary text-bg-base border-brand-primary/80 shadow-2xs font-semibold' 
                  : 'bg-bg-base/60 border-border-subtle text-text-muted hover:text-text-main hover:bg-bg-base'}"
            >
              {lang === 'es' ? 'Todo' : 'All'}
            </button>
          </div>

          <!-- Divider between Fixed 'Todo' and Scrollable Categories -->
          <div class="w-px h-4 bg-border-subtle/80 shrink-0 mr-1.5 z-20"></div>

          <!-- Scrollable Categories Track Container -->
          <div class="relative flex-1 min-w-0 overflow-hidden flex items-center">
            
            <!-- Left Scroll Button with Backdrop Shadow Gradient -->
            {#if canScrollLeft}
              <div class="absolute left-0 inset-y-0 flex items-center z-20 pr-4 pl-0.5 bg-gradient-to-r from-bg-surface via-bg-surface/90 to-transparent">
                <button
                  type="button"
                  onclick={() => scrollCategories('left')}
                  class="size-6 rounded-full flex items-center justify-center bg-bg-base border border-border-subtle text-text-muted hover:text-text-main hover:border-brand-primary/40 shadow-md cursor-pointer transition-transform duration-150 active:scale-95"
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft size={13} />
                </button>
              </div>
            {/if}

            <!-- Scrollable Track -->
            <div 
              bind:this={categoryContainer}
              onscroll={updateCategoryScrollButtons}
              class="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-1 scroll-smooth w-full"
            >
              {#each categories as cat}
                <button
                  type="button"
                  onclick={() => activeCategory = cat}
                  class="px-3.5 py-1 rounded-full text-xs font-medium cursor-pointer shrink-0 border
                    {activeCategory === cat 
                      ? 'bg-brand-primary text-bg-base border-brand-primary/80 shadow-2xs font-semibold' 
                      : 'bg-bg-base/60 border-border-subtle text-text-muted hover:text-text-main hover:bg-bg-base'}"
                >
                  {cat}
                </button>
              {/each}
            </div>

            <!-- Right Scroll Button with Backdrop Shadow Gradient -->
            {#if canScrollRight}
              <div class="absolute right-0 inset-y-0 flex items-center z-20 pl-4 pr-0.5 bg-gradient-to-l from-bg-surface via-bg-surface/90 to-transparent">
                <button
                  type="button"
                  onclick={() => scrollCategories('right')}
                  class="size-6 rounded-full flex items-center justify-center bg-bg-base border border-border-subtle text-text-muted hover:text-text-main hover:border-brand-primary/40 shadow-md cursor-pointer transition-transform duration-150 active:scale-95"
                  aria-label="Scroll categories right"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Subtle separator -->
      <div class="h-px bg-border-subtle/70 mx-4 sm:mx-5"></div>

      <!-- Jump To Label -->
      <div class="px-5 sm:px-6 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-text-muted/70 font-mono">
        {lang === 'es' ? 'IR A' : 'JUMP TO'}
      </div>

      <!-- Search Results Area -->
      <div class="overflow-y-auto px-3 sm:px-4 py-1.5 min-h-[160px] max-h-[52vh] space-y-1">
        {#if results.length === 0}
          <!-- No results found -->
          <div class="p-8 text-center text-text-muted text-xs flex flex-col items-center justify-center gap-3">
            <div class="w-20 h-20 rounded-2xl p-2 flex items-center justify-center opacity-80">
              <img src="/koko-binoculares.png" alt="Koko buscando" class="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <p class="text-sm font-semibold text-text-main">
              {lang === 'es' ? 'No se encontraron resultados para ' : 'No results found for '} <span class="text-brand-primary font-bold">"{query}"</span>
            </p>
            <span class="text-[11px] text-text-muted">
              {lang === 'es' ? 'Intenta buscar términos como "quick-start", "saas", "docker" o "doctor".' : 'Try searching keywords like "quick-start", "saas", "docker" or "doctor".'}
            </span>
          </div>
        {:else}
          {#each results as result, idx}
            <button 
              type="button"
              id="result-item-{idx}"
              onclick={() => selectResult(result)}
              class="w-full text-left flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl border group/item cursor-pointer
                {idx === selectedIndex 
                  ? 'bg-bg-base/90 border-border-subtle shadow-xs' 
                  : 'bg-transparent border-transparent hover:bg-bg-base/40'}"
            >
              <!-- Icon Container Pill -->
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-bg-base border border-border-subtle text-text-muted group-hover/item:text-brand-primary shrink-0 shadow-2xs">
                {#if result.section.toLowerCase().includes('cli') || result.section.toLowerCase().includes('terminal')}
                  <span class="text-xs font-mono font-bold">&gt;_</span>
                {:else if result.section.toLowerCase().includes('intro') || result.title.toLowerCase().includes('inicio')}
                  <span class="text-xs">⚐</span>
                {:else if result.section.toLowerCase().includes('avanzad') || result.title.toLowerCase().includes('receta')}
                  <span class="text-xs">✦</span>
                {:else}
                  <span class="text-xs">📄</span>
                {/if}
              </div>

              <!-- Main Content -->
              <div class="flex flex-col flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h4 class="text-xs sm:text-sm font-bold text-text-main truncate group-hover/item:text-brand-primary">
                    {@html highlightText(result.title, query)}
                  </h4>
                  <span class="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle bg-bg-surface text-text-muted shrink-0 font-medium">
                    {result.section}
                  </span>
                </div>
                <p class="text-[11px] text-text-muted/80 line-clamp-1 leading-normal font-sans mt-0.5">
                  {@html highlightText(result.desc, query)}
                </p>
              </div>

              <!-- Enter indicator when selected -->
              {#if idx === selectedIndex}
                <span class="text-text-muted shrink-0 pl-1 text-xs">↵</span>
              {/if}
            </button>
          {/each}
        {/if}
      </div>

      <!-- Ask AI / Visual Builder Prompt Capsule (Inspired by Bottom Banner) -->
      <div class="px-3 sm:px-4 pt-1 pb-2">
        <a 
          href={lang === 'es' ? '/builder' : '/en/builder'}
          onclick={toggleModal}
          class="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-dashed border-border-subtle bg-bg-base/40 hover:bg-bg-base hover:border-brand-primary/40 text-xs text-text-muted hover:text-text-main cursor-pointer group"
        >
          <div class="flex items-center gap-2">
            <span class="text-brand-primary text-xs font-bold">✦</span>
            <span class="font-medium">{lang === 'es' ? 'Configurar stack con Visual Builder' : 'Configure stack with Visual Builder'}</span>
          </div>
          <span class="text-text-muted group-hover:text-text-main text-xs">→</span>
        </a>
      </div>

      <!-- Footer Keyboard Hints (SpaceFS Bottom Bar) -->
      <div class="px-5 py-2.5 border-t border-border-subtle/80 bg-bg-surface/50 flex items-center justify-between text-[11px] text-text-muted">
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="flex items-center gap-1">
            <kbd class="px-1.5 py-0.5 rounded-md border border-border-subtle bg-bg-base text-[10px] font-mono">↑</kbd>
            <kbd class="px-1.5 py-0.5 rounded-md border border-border-subtle bg-bg-base text-[10px] font-mono">↓</kbd>
            <span class="ml-0.5">{lang === 'es' ? 'Navegar' : 'Navigate'}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1">
            <kbd class="px-1.5 py-0.5 rounded-md border border-border-subtle bg-bg-base text-[10px] font-mono">↵</kbd>
            <span class="ml-0.5">{lang === 'es' ? 'Abrir' : 'Open'}</span>
          </div>
          <div class="hidden sm:flex items-center gap-1">
            <kbd class="px-1.5 py-0.5 rounded-md border border-border-subtle bg-bg-base text-[10px] font-mono">tab</kbd>
            <span class="ml-0.5">{lang === 'es' ? 'Filtro' : 'Filter'}</span>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <kbd class="px-1.5 py-0.5 rounded-md border border-border-subtle bg-bg-base text-[10px] font-mono">esc</kbd>
          <span class="ml-0.5">{lang === 'es' ? 'Cerrar' : 'Close'}</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .animate-fade-in {
    animation: fadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-scale-up {
    animation: scaleUp 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleUp {
    from { transform: scale(0.97); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
</style>

