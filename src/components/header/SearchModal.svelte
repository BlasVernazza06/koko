<script lang="ts">
  import { onMount } from 'svelte';
  import { Search, CornerDownLeft } from '@lucide/svelte';

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

  let { lang = 'es' } = $props<Props>();

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

  const results = $derived.by(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return items.filter(item => (
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

    if (isOpen && results.length > 0) {
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
    return text.replace(regex, '<mark class="bg-brand-primary/30 text-text-main rounded-sm px-0.5">$1</mark>');
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

<!-- Searchbar Trigger Button -->
<button 
  type="button"
  onclick={toggleModal}
  class="flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl border border-border-subtle bg-bg-surface/50 hover:bg-bg-surface hover:border-brand-primary/40 text-text-muted hover:text-text-main text-xs transition-all duration-200 cursor-pointer select-none min-w-[140px] md:min-w-[180px] shadow-2xs group"
  aria-label="Search"
>
  <div class="flex items-center gap-2">
    <Search size={14} class="opacity-70 group-hover:text-brand-primary group-hover:opacity-100 transition-all" />
    <span>{lang === 'es' ? 'Buscar...' : 'Search...'}</span>
  </div>
  <kbd class="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-mono border border-border-subtle bg-bg-base text-text-muted/80 shadow-2xs group-hover:border-brand-primary/30">
    <span>Ctrl</span>
    <span>K</span>
  </kbd>
</button>

{#if isOpen}
  <!-- Modal Overlay Backdrop -->
  <div 
    use:portal
    class="fixed inset-0 z-[999] bg-[#0a0911]/75 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4 animate-fade-in select-none"
    onclick={(e) => { if (e.target === e.currentTarget) toggleModal(); }}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <!-- Modal Window -->
    <div class="w-full max-w-xl rounded-2xl border border-border-subtle bg-bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[80vh] animate-scale-up">
      <!-- Search Input Header -->
      <div class="flex items-center px-4 border-b border-border-subtle/80 py-3.5 gap-3 bg-bg-base/50">
        <Search class="text-brand-primary shrink-0" size={18} />
        <input 
          id="search-input"
          bind:value={query}
          type="text" 
          placeholder={lang === 'es' ? 'Buscar comandos, guías o arquitectura...' : 'Search commands, guides, or architecture...'}
          class="w-full bg-transparent text-sm text-text-main placeholder-text-muted focus:outline-none"
          autocomplete="off"
        />
        <button 
          type="button"
          onclick={toggleModal}
          class="px-2 py-0.5 rounded-md text-[10px] font-mono border border-border-subtle bg-bg-base text-text-muted hover:text-text-main cursor-pointer transition-colors"
        >
          ESC
        </button>
      </div>

      <!-- Search Results Area -->
      <div class="overflow-y-auto p-2.5 min-h-[160px] max-h-[50vh]">
        {#if !query}
          <!-- Default view / suggestions -->
          <div class="p-6 text-center text-text-muted text-xs space-y-3 flex flex-col items-center">
            <div class="w-24 h-24 rounded-2xl p-2 flex items-center justify-center">
              <img src="/koko-binoculares.png" alt="Koko explorando" class="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <p class="font-medium text-text-muted">{lang === 'es' ? 'Busca comandos, guías o recetas oficiales de Koko.' : 'Search commands, guides, or official Koko recipes.'}</p>
            <div class="flex flex-wrap justify-center gap-1.5 pt-1">
              {#each ['quick-start', 'saas', 'docker', 'tui-wizard', 'doctor', 'koko.config.json'] as term}
                <button 
                  type="button"
                  onclick={() => { query = term; document.getElementById('search-input')?.focus(); }}
                  class="px-2.5 py-1 rounded-lg bg-bg-base border border-border-subtle text-xs hover:border-brand-primary/40 hover:text-brand-primary text-text-muted transition-colors cursor-pointer"
                >
                  {term}
                </button>
              {/each}
            </div>
          </div>
        {:else if results.length === 0}
          <!-- No results found -->
          <div class="p-8 text-center text-text-muted text-xs flex flex-col items-center justify-center gap-3">
            <div class="w-24 h-24 rounded-2xl p-2 flex items-center justify-center">
              <img src="/koko-binoculares.png" alt="Koko buscando" class="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <p class="text-sm font-semibold text-text-main">
              {lang === 'es' ? 'No se encontraron resultados para ' : 'No results found for '} <span class="text-brand-primary font-bold">"{query}"</span>
            </p>
            <span class="text-[11px] text-text-muted">
              {lang === 'es' ? 'Intenta buscar términos como "init", "saas", "docker" o "doctor".' : 'Try searching keywords like "init", "saas", "docker" or "doctor".'}
            </span>
          </div>
        {:else}
          <!-- Results list -->
          <div class="space-y-1">
            {#each results as result, idx}
              <button 
                type="button"
                id="result-item-{idx}"
                onclick={() => selectResult(result)}
                class="w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all duration-150 group/item cursor-pointer
                  {idx === selectedIndex 
                    ? 'bg-brand-primary/10 border-brand-primary/40 shadow-xs' 
                    : 'bg-transparent border-transparent hover:bg-bg-base/60'}"
              >
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider uppercase bg-bg-base border border-border-subtle text-brand-primary">
                      {result.section}
                    </span>
                    <h4 class="text-xs sm:text-sm font-bold text-text-main group-hover/item:text-brand-primary transition-colors truncate">
                      {@html highlightText(result.title, query)}
                    </h4>
                  </div>
                  <p class="text-[11px] text-text-muted line-clamp-2 leading-relaxed font-sans">
                    {@html highlightText(result.desc, query)}
                  </p>
                </div>

                {#if idx === selectedIndex}
                  <div class="shrink-0 flex items-center text-brand-primary self-center">
                    <CornerDownLeft size={14} />
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Footer Info -->
      {#if results.length > 0}
        <div class="px-4 py-2.5 border-t border-border-subtle bg-bg-base/70 flex justify-between text-[11px] text-text-muted">
          <div class="flex gap-3">
            <span>↑↓ {lang === 'es' ? 'Navegar' : 'Navigate'}</span>
            <span>↵ {lang === 'es' ? 'Seleccionar' : 'Select'}</span>
          </div>
          <span>{results.length} {lang === 'es' ? 'resultados' : 'results'}</span>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .animate-fade-in {
    animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-scale-up {
    animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleUp {
    from { transform: scale(0.96); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
</style>
