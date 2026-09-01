<script>
  import { onMount } from 'svelte';
  import { Search, CornerDownLeft } from '@lucide/svelte';

  export let lang = 'es';

  let isOpen = false;
  let query = '';
  let selectedIndex = 0;
  let results = [];

  // Content to search
  const content = {
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
        title: 'Recetas de Producción (SaaS, PERN, MERN, FastAPI)',
        section: 'Avanzado',
        desc: 'Análisis detallado de las 4 recetas oficiales probadas en producción listas para codificar.',
        url: '/docs/recipes-deep-dive',
        keywords: ['recetas', 'recipes', 'saas', 'pern', 'mern', 'fastapi', 'starter', 'production']
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
        desc: 'In-depth breakdown of the 4 production recipes: SaaS Starter, PERN, MERN, and FastAPI + React.',
        url: '/en/docs/recipes-deep-dive',
        keywords: ['recipes', 'saas', 'pern', 'mern', 'fastapi', 'blueprints', 'starter', 'production']
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

  $: items = content[lang] || content['es'];

  // Perform search on query change
  $: {
    if (!query.trim()) {
      results = [];
    } else {
      const q = query.toLowerCase().trim();
      results = items.filter(item => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(q))
        );
      });
      selectedIndex = 0;
    }
  }

  function toggleModal() {
    isOpen = !isOpen;
    if (isOpen) {
      query = '';
      results = [];
      selectedIndex = 0;
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 50);
    }
  }

  function handleKeydown(e) {
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

  function selectResult(result) {
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

  // Highlight matches helper
  function highlightText(text, search) {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-brand-primary/30 text-text-main rounded-sm px-0.5">$1</mark>');
  }
  // Portal action to render modal outside sticky header context
  function portal(node) {
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
  on:click={toggleModal}
  class="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-surface/50 hover:bg-bg-surface hover:border-brand-primary/40 text-text-muted hover:text-text-main text-xs transition-all duration-200 cursor-pointer select-none min-w-[140px] md:min-w-[180px]"
  aria-label="Search"
>
  <div class="flex items-center gap-2">
    <Search size={14} class="opacity-80" />
    <span>{lang === 'es' ? 'Buscar...' : 'Search...'}</span>
  </div>
  <kbd class="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono border border-border-subtle bg-bg-base/80 text-text-muted shadow-xs">
    <span>Ctrl</span>
    <span>K</span>
  </kbd>
</button>

{#if isOpen}
  <!-- Modal Overlay Backdrop -->
  <div 
    use:portal
    class="fixed inset-0 z-[999] bg-[#0a0911]/65 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4 animate-fade-in"
    on:click|self={toggleModal}
    on:keydown={handleKeydown}
  >
    <!-- Modal Window -->
    <div class="w-full max-w-xl rounded-xl border border-border-subtle bg-bg-surface shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-scale-up">
      <!-- Search Input Header -->
      <div class="flex items-center px-4 border-b border-border-subtle py-3 gap-3">
        <Search class="text-brand-primary shrink-0" size={18} />
        <input 
          id="search-input"
          bind:value={query}
          type="text" 
          placeholder={lang === 'es' ? 'Buscar en la documentación...' : 'Search documentation...'}
          class="w-full bg-transparent text-sm text-text-main placeholder-text-muted focus:outline-hidden"
          autocomplete="off"
        />
        <button 
          on:click={toggleModal}
          class="px-1.5 py-0.5 rounded text-[10px] font-mono border border-border-subtle bg-bg-base text-text-muted hover:text-text-main cursor-pointer"
        >
          ESC
        </button>
      </div>

      <!-- Search Results Area -->
      <div class="overflow-y-auto p-2 min-h-[150px] max-h-[50vh]">
        {#if !query}
          <!-- Default view / suggestions -->
          <div class="p-6 text-center text-text-muted text-xs space-y-2">
            <p>{lang === 'es' ? 'Busca comandos, guías o configuraciones de Koko.' : 'Search commands, guides, or Koko configurations.'}</p>
            <div class="flex flex-wrap justify-center gap-1.5 pt-2">
              {#each ['scaffold', 'drift', 'getting started', 'koko.json'] as term}
                <button 
                  on:click={() => { query = term; document.getElementById('search-input')?.focus(); }}
                  class="px-2 py-1 rounded bg-bg-base border border-border-subtle text-xs hover:border-brand-primary/40 text-text-muted hover:text-text-main cursor-pointer"
                >
                  {term}
                </button>
              {/each}
            </div>
          </div>
        {:else if results.length === 0}
          <!-- No results found -->
          <div class="p-8 text-center text-text-muted text-xs">
            {lang === 'es' ? 'No se encontraron resultados para ' : 'No results found for '} <strong>"{query}"</strong>
          </div>
        {:else}
          <!-- Results list -->
          <div class="space-y-1">
            {#each results as result, idx}
              <a 
                href={result.url}
                id="result-item-{idx}"
                on:click|preventDefault={() => selectResult(result)}
                class="flex items-start gap-3 p-3 rounded-lg border transition-all duration-150 group/item cursor-pointer block
                  {idx === selectedIndex 
                    ? 'bg-brand-primary/10 border-brand-primary/40' 
                    : 'bg-transparent border-transparent hover:bg-bg-base/50'}"
              >
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="text-[10px] px-1.5 py-0.25 rounded-md font-semibold tracking-wider uppercase bg-bg-base border border-border-subtle text-brand-primary">
                      {result.section}
                    </span>
                    <h4 class="text-xs sm:text-sm font-bold text-text-main group-hover/item:text-brand-primary transition-colors">
                      {@html highlightText(result.title, query)}
                    </h4>
                  </div>
                  <p class="text-[11px] sm:text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {@html highlightText(result.desc, query)}
                  </p>
                </div>

                {#if idx === selectedIndex}
                  <div class="shrink-0 flex items-center text-brand-primary self-center">
                    <CornerDownLeft size={14} />
                  </div>
                {/if}
              </a>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Footer Info -->
      {#if results.length > 0}
        <div class="px-4 py-2 border-t border-border-subtle bg-bg-base/50 flex justify-between text-[10px] text-text-muted">
          <div class="flex gap-3">
            <span>↑↓ {lang === 'es' ? 'Navegar' : 'Navigate'}</span>
            <span>↵ {lang === 'es' ? 'Seleccionar' : 'Select'}</span>
          </div>
          <span>{results.length} {lang === 'es' ? 'resultados encontrados' : 'results found'}</span>
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
