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
        title: 'Estructuración Interactiva',
        section: 'Características',
        desc: 'Crea repositorios limpios y estandarizados dinámicamente con nuestro asistente interactivo CLI.',
        url: '/docs/cli-commands#commands',
        keywords: ['scaffold', 'cli', 'crear', 'repositorio', 'asistente', 'inicializar', 'estructura']
      },
      {
        title: 'Recetas y Presets Activos',
        section: 'Características',
        desc: 'Despliega arquitecturas probadas en producción usando plantillas personalizadas para SaaS y frameworks.',
        url: '/docs/quick-start#overview',
        keywords: ['preset', 'blueprint', 'receta', 'plantilla', 'arquitectura', 'saas', 'fullstack']
      },
      {
        title: 'Control de Desviación (Drift)',
        section: 'Características',
        desc: 'Mantén sincronizados los parámetros, linter y dependencias detectando desvíos desde el inicio.',
        url: '/docs/contributing#commit-conventions',
        keywords: ['drift', 'linter', 'dependencias', 'desvio', 'sincronizacion', 'control']
      },
      {
        title: 'Motor sin Dependencias',
        section: 'Características',
        desc: 'Un binario rápido compilado en Go que se ejecuta completamente offline sin sobrecarga de npm.',
        url: '/docs/quick-start#prerequisites',
        keywords: ['go', 'binario', 'offline', 'npm', 'rapido', 'motor', 'dependencias']
      },
      {
        title: 'Guía de Inicio Rápido',
        section: 'Primeros Pasos',
        desc: 'Aprende a instalar y ejecutar Koko en tu máquina en menos de 5 segundos.',
        url: '/docs/quick-start',
        keywords: ['inicio', 'instalar', 'rapido', 'ejecutar', 'guia', 'npm', 'curl']
      },
      {
        title: 'Configuración Avanzada',
        section: 'Guías',
        desc: 'Modifica reglas personalizadas de linters y arquitecturas usando koko.json.',
        url: '/docs/bts-jsonc',
        keywords: ['configuracion', 'avanzada', 'json', 'koko.json', 'reglas', 'linters']
      }
    ],
    en: [
      {
        title: 'Interactive Scaffolding',
        section: 'Features',
        desc: 'Scaffold clean, standardized repositories dynamically with our single-command interactive CLI helper.',
        url: '/en/docs/cli-commands#commands',
        keywords: ['scaffold', 'cli', 'create', 'repository', 'helper', 'initialize', 'scaffolding']
      },
      {
        title: 'Active Presets & Blueprints',
        section: 'Features',
        desc: 'Deploy production-proven architectures instantly using blueprints customized for SaaS and fullstack.',
        url: '/en/docs/quick-start#overview',
        keywords: ['preset', 'blueprint', 'recipe', 'template', 'architecture', 'saas', 'fullstack']
      },
      {
        title: 'Drift Prevention',
        section: 'Features',
        desc: 'Keep your workspace parameters, linter configs, and dependencies synchronized and detect deviations.',
        url: '/en/docs/contributing#commit-conventions',
        keywords: ['drift', 'linter', 'dependencies', 'deviation', 'sync', 'prevention']
      },
      {
        title: 'Zero-dependency Engine',
        section: 'Features',
        desc: 'A fast, compiled Go binary that runs completely offline with zero configuration lock-in.',
        url: '/en/docs/quick-start#prerequisites',
        keywords: ['go', 'binary', 'offline', 'npm', 'fast', 'engine', 'dependency']
      },
      {
        title: 'Getting Started Guide',
        section: 'First Steps',
        desc: 'Learn how to install and run Koko on your local machine in under 5 seconds.',
        url: '/en/docs/quick-start',
        keywords: ['start', 'install', 'fast', 'run', 'guide', 'npm', 'curl']
      },
      {
        title: 'Advanced Configuration',
        section: 'Guides',
        desc: 'Customize project blueprints and linting rules using koko.json.',
        url: '/en/docs/bts-jsonc',
        keywords: ['configuration', 'advanced', 'json', 'koko.json', 'rules', 'linters']
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
    class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-start justify-center pt-[10vh] px-4 animate-fade-in"
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
