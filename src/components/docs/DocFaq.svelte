<script lang="ts">
  import type { DocSection, Block } from '@/lib/docsData';
  import { 
    Search, 
    ChevronDown, 
    ArrowLeft, 
    ArrowRight, 
    Link as LinkIcon, 
    Check, 
    ThumbsUp, 
    ThumbsDown, 
    CircleQuestionMark, 
    Terminal, 
    FileCode, 
    Cpu, 
    Layers 
  } from '@lucide/svelte';

  // Svelte 5 Props Runes
  interface Props {
    activeSection: DocSection;
    lang: 'es' | 'en';
  }
  let { activeSection, lang }: Props = $props();

  // State Runes
  let searchQuery = $state('');
  let selectedTag = $state('all');
  let openStates = $state<Record<string, boolean>>({});
  let activeCarouselIndex = $state(0);
  let feedbackStates = $state<Record<string, 'up' | 'down' | null>>({});
  let copiedId = $state<string | null>(null);
  let searchInputRef = $state<HTMLInputElement | null>(null);
  let questionsHeaderRef = $state<HTMLElement | null>(null);

  // Pagination State
  const ITEMS_PER_PAGE = 6;
  let currentPage = $state(1);

  // Reset pagination when search query or category tag changes
  $effect(() => {
    // Track dependencies
    const _ = searchQuery + selectedTag;
    currentPage = 1;
  });

  // Initialize feedback state and event listeners on mount
  $effect(() => {
    const saved = localStorage.getItem('koko-faq-feedback');
    if (saved) {
      try {
        feedbackStates = JSON.parse(saved);
      } catch (e) {
        // Ignore parsing errors
      }
    }

    // Keyboard shortcut to focus search input (/)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef) {
        e.preventDefault();
        searchInputRef?.focus();
      }
    };

    // Listen for custom tag selection event from RightSidebar
    const handleTagFilter = (e: Event) => {
      const customEvent = e as CustomEvent<{ tag: string }>;
      if (customEvent.detail?.tag) {
        selectedTag = customEvent.detail.tag;
        searchQuery = '';
        currentPage = 1;
        questionsHeaderRef?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('koko:filter-faq-tag', handleTagFilter);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('koko:filter-faq-tag', handleTagFilter);
    };
  });

  // Save feedback changes
  function submitFeedback(id: string, type: 'up' | 'down') {
    feedbackStates = { ...feedbackStates, [id]: type };
    localStorage.setItem('koko-faq-feedback', JSON.stringify(feedbackStates));
  }

  // Get icons based on tag or anchor
  function getIcon(tags?: string[]) {
    if (!tags) return CircleQuestionMark;
    if (tags.includes('cli') || tags.includes('go')) return Terminal;
    if (tags.includes('templates') || tags.includes('plantillas') || tags.includes('personalización') || tags.includes('customization')) return FileCode;
    if (tags.includes('architecture') || tags.includes('arquitectura') || tags.includes('módulos') || tags.includes('modules')) return Cpu;
    return Layers;
  }

  // Extract unique tags from data
  const allTags = $derived.by(() => {
    const tags = new Set<string>();
    activeSection.content.forEach((block: Block) => {
      if (block.tags) {
        block.tags.forEach((t: string) => tags.add(t));
      }
    });
    return Array.from(tags);
  });

  // Filter content based on search and selected tag
  const filteredBlocks = $derived.by(() => {
    return activeSection.content.filter((block: Block) => {
      // Filter by tag
      if (selectedTag !== 'all' && (!block.tags || !block.tags.includes(selectedTag))) {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = block.title.toLowerCase().includes(query);
        const inBody = block.body.some((p: string) => p.toLowerCase().includes(query));
        const inTags = block.tags?.some((t: string) => t.toLowerCase().includes(query)) || false;
        return inTitle || inBody || inTags;
      }
      return true;
    });
  });

  // Pagination Calculations
  const totalPages = $derived(Math.max(1, Math.ceil(filteredBlocks.length / ITEMS_PER_PAGE)));

  const paginatedBlocks = $derived.by(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlocks.slice(start, start + ITEMS_PER_PAGE);
  });

  const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE + 1);
  const endIndex = $derived(Math.min(currentPage * ITEMS_PER_PAGE, filteredBlocks.length));

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    currentPage = page;
    questionsHeaderRef?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Featured/Popular questions for the carousel (take first 3)
  const featuredQuestions = $derived(activeSection.content.slice(0, 3));

  // Toggle accordion open/close
  function toggleAccordion(id: string) {
    openStates = { ...openStates, [id]: !openStates[id] };
  }

  // Focus and open question from carousel (supporting cross-page pagination)
  function openQuestion(id: string) {
    // Find index in filtered blocks
    const index = filteredBlocks.findIndex((b: Block) => b.anchorId === id);
    if (index !== -1) {
      const targetPage = Math.floor(index / ITEMS_PER_PAGE) + 1;
      currentPage = targetPage;
    }

    openStates = { ...openStates, [id]: true };
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Apply brief highlight effect
        el.classList.add('ring-2', 'ring-brand-primary/50');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-brand-primary/50');
        }, 2000);
      }
    }, 100);
  }

  // Copy anchor link to clipboard
  function copyLink(id: string) {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      copiedId = id;
      setTimeout(() => {
        if (copiedId === id) copiedId = null;
      }, 2000);
    });
  }

  // Text highlighting helper
  function highlightText(text: string, query: string) {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark class="bg-brand-primary/20 text-brand-primary font-bold px-0.5 rounded">$1</mark>');
  }

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Carousel controls
  function nextCarousel() {
    activeCarouselIndex = (activeCarouselIndex + 1) % featuredQuestions.length;
  }
  function prevCarousel() {
    activeCarouselIndex = (activeCarouselIndex - 1 + featuredQuestions.length) % featuredQuestions.length;
  }
</script>

<div class="space-y-12">
  <!-- Search and Tag Filtering UI -->
  <div class="space-y-6">
    <div class="relative max-w-lg mx-auto">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
        <Search size={18} />
      </div>
      <input
        bind:this={searchInputRef}
        type="text"
        bind:value={searchQuery}
        placeholder={lang === 'es' ? 'Buscar dudas... (Presiona \'/\' para enfocar)' : 'Search FAQs... (Press \'/\' to focus)'}
        class="w-full pl-10 pr-12 py-3 bg-bg-surface/50 border border-border-subtle rounded-2xl text-sm text-text-main focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200 placeholder:text-text-muted/60"
      />
      {#if searchQuery}
        <button 
          onclick={() => searchQuery = ''}
          class="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-text-muted hover:text-text-main cursor-pointer"
        >
          {lang === 'es' ? 'Limpiar' : 'Clear'}
        </button>
      {:else}
        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none select-none">
          <kbd class="text-[10px] bg-bg-surface px-1.5 py-0.5 border border-border-subtle rounded text-text-muted">/</kbd>
        </div>
      {/if}
    </div>

    <!-- Tags / Categories Filters -->
    <div class="flex flex-wrap gap-2 justify-center select-none">
      <button
        onclick={() => selectedTag = 'all'}
        class="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer
          {selectedTag === 'all' 
            ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/30 shadow-xs' 
            : 'bg-bg-surface/40 text-text-muted border-border-subtle hover:border-brand-primary/20 hover:text-text-main'}"
      >
        {lang === 'es' ? 'Todos' : 'All'}
      </button>
      {#each allTags as tag}
        <button
          onclick={() => selectedTag = tag}
          class="px-4 py-1.5 rounded-full text-xs font-semibold border capitalize transition-all duration-200 cursor-pointer
            {selectedTag === tag 
              ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/30 shadow-xs' 
              : 'bg-bg-surface/40 text-text-muted border-border-subtle hover:border-brand-primary/20 hover:text-text-main'}"
        >
          {tag}
        </button>
      {/each}
    </div>
  </div>

  <!-- Featured Carousel Section -->
  {#if searchQuery.trim() === '' && selectedTag === 'all'}
    <div class="space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-brand-primary/80 select-none">
        {lang === 'es' ? 'Destacado' : 'Featured Questions'}
      </h3>
      <div class="relative overflow-hidden rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/5 via-brand-secondary/2 to-bg-surface p-6 sm:p-8 shadow-xs">
        
        <!-- Glow effect -->
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none select-none"></div>

        <!-- Slide Content -->
        <div class="flex flex-col justify-between min-h-[160px] relative z-10 transition-all duration-300">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-0.5 rounded bg-brand-primary/20 text-brand-primary text-[10px] font-bold tracking-wide uppercase select-none font-mono">FAQ {activeCarouselIndex + 1}</span>
              {#if featuredQuestions[activeCarouselIndex].tags}
                {#each featuredQuestions[activeCarouselIndex].tags as t}
                  <span class="text-text-muted text-[10px] font-medium uppercase select-none">· {t}</span>
                {/each}
              {/if}
            </div>
            <h4 class="text-base sm:text-lg font-bold text-text-main leading-snug">
              {featuredQuestions[activeCarouselIndex].title}
            </h4>
            <p class="text-xs sm:text-sm text-text-muted mt-3 line-clamp-2 leading-relaxed font-sans">
              {featuredQuestions[activeCarouselIndex].body[0]}
            </p>
          </div>

          <div class="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle/45">
            <button
              onclick={() => openQuestion(featuredQuestions[activeCarouselIndex].anchorId)}
              class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-primary/80 transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Ver respuesta completa' : 'View full answer'}
              <ArrowRight size={14} />
            </button>

            <!-- Navigation buttons -->
            <div class="flex items-center gap-2 select-none">
              <button 
                onclick={prevCarousel}
                aria-label="Previous question"
                class="p-1.5 rounded-lg bg-bg-base border border-border-subtle hover:border-brand-primary/30 text-text-muted hover:text-text-main transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
              </button>
              <button 
                onclick={nextCarousel}
                aria-label="Next question"
                class="p-1.5 rounded-lg bg-bg-base border border-border-subtle hover:border-brand-primary/30 text-text-muted hover:text-text-main transition-colors cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Bento Accordion Grid -->
  <div class="space-y-5" bind:this={questionsHeaderRef}>
    <div class="flex items-center justify-between flex-wrap gap-2 select-none border-b border-border-subtle/40 pb-3">
      <div class="flex items-center gap-2">
        <h3 class="text-sm font-bold uppercase tracking-wider text-text-muted">
          {lang === 'es' ? 'Preguntas' : 'Questions'}
        </h3>
        <span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-bg-surface border border-border-subtle text-text-muted">
          {filteredBlocks.length}
        </span>
      </div>

      {#if totalPages > 1}
        <span class="text-xs font-medium text-text-muted/80">
          {lang === 'es' ? `Página ${currentPage} de ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
        </span>
      {/if}
    </div>
    
    {#if filteredBlocks.length === 0}
      <div class="text-center py-12 border border-dashed border-border-subtle rounded-3xl">
        <CircleQuestionMark class="mx-auto text-text-muted/40 mb-3" size={32} />
        <p class="text-sm text-text-muted font-medium font-sans">
          {lang === 'es' ? 'No encontramos preguntas que coincidan con tu búsqueda.' : 'No questions found matching your search.'}
        </p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each paginatedBlocks as item (item.anchorId)}
          {@const Icon = getIcon(item.tags)}
          <div 
            id={item.anchorId}
            class="faq-card border rounded-2xl overflow-hidden transition-all duration-300 relative group flex flex-col justify-between scroll-mt-28
              {openStates[item.anchorId]
                ? 'bg-bg-surface/50 border-brand-primary/30 shadow-xs shadow-brand-primary/2' 
                : 'bg-bg-surface/20 border-border-subtle hover:border-brand-primary/20 hover:bg-bg-surface/40 hover:-translate-y-[2px]'}"
          >
            <!-- Card content wrapper -->
            <div>
              <!-- Header / Trigger -->
              <button
                onclick={() => toggleAccordion(item.anchorId)}
                class="w-full text-left p-5 flex gap-3 items-start justify-between cursor-pointer select-none"
                aria-expanded={openStates[item.anchorId] ? "true" : "false"}
              >
                <div class="flex gap-3 items-start">
                  <!-- Category Icon -->
                  <div class="p-2 rounded-xl bg-bg-surface border border-border-subtle/80 text-brand-primary transition-transform duration-300 group-hover:scale-105 shrink-0">
                    <Icon size={16} />
                  </div>
                  <div class="space-y-1">
                    <h4 class="text-sm sm:text-base font-bold text-text-main leading-tight transition-colors duration-200 group-hover:text-brand-primary font-sans">
                      {@html highlightText(item.title, searchQuery)}
                    </h4>
                    {#if item.tags}
                      <div class="flex gap-1.5 flex-wrap pt-1 select-none">
                        {#each item.tags as t}
                          <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-bg-base border border-border-subtle/60 text-text-muted capitalize">
                            {@html highlightText(t, searchQuery)}
                          </span>
                        {/each}
                      </div>
                    {/if}
                  </div>
                </div>
                <div class="text-text-muted transition-transform duration-300 shrink-0 mt-1 {openStates[item.anchorId] ? 'rotate-180 text-brand-primary' : ''}">
                  <ChevronDown size={16} />
                </div>
              </button>

              <!-- Answer content block -->
              <div 
                class="transition-all duration-300 ease-in-out overflow-hidden"
                style="max-height: {openStates[item.anchorId] ? '500px' : '0px'}; opacity: {openStates[item.anchorId] ? '1' : '0'};"
              >
                <div class="px-5 pb-5 pt-2 border-t border-border-subtle/30 text-xs sm:text-sm text-text-muted leading-relaxed space-y-3 font-sans">
                  {#each item.body as paragraph}
                    <p>{@html highlightText(paragraph, searchQuery)}</p>
                  {/each}
                </div>
              </div>
            </div>

            <!-- Card Actions footer (visible when open) -->
            {#if openStates[item.anchorId]}
              <div class="px-5 py-3 border-t border-border-subtle/20 bg-bg-base/20 flex items-center justify-between text-xs select-none">
                <!-- Voting widget -->
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-text-muted font-medium font-sans">
                    {lang === 'es' ? '¿Te sirvió?' : 'Was this helpful?'}
                  </span>
                  {#if feedbackStates[item.anchorId]}
                    <span class="text-[10px] text-brand-primary font-bold flex items-center gap-1">
                      <Check size={10} />
                      {lang === 'es' ? '¡Gracias!' : 'Thanks!'}
                    </span>
                  {:else}
                    <button 
                      onclick={() => submitFeedback(item.anchorId, 'up')}
                      aria-label="Helpful"
                      class="p-1 rounded hover:bg-bg-surface hover:text-brand-primary transition-colors cursor-pointer text-text-muted/70"
                    >
                      <ThumbsUp size={12} />
                    </button>
                    <button 
                      onclick={() => submitFeedback(item.anchorId, 'down')}
                      aria-label="Not helpful"
                      class="p-1 rounded hover:bg-bg-surface hover:text-brand-primary transition-colors cursor-pointer text-text-muted/70"
                    >
                      <ThumbsDown size={12} />
                    </button>
                  {/if}
                </div>

                <!-- Anchor link copy button -->
                <button
                  onclick={() => copyLink(item.anchorId)}
                  class="flex items-center gap-1 text-[10px] font-bold text-text-muted hover:text-brand-primary transition-colors cursor-pointer"
                  title={lang === 'es' ? 'Copiar enlace directo' : 'Copy direct link'}
                >
                  {#if copiedId === item.anchorId}
                    <Check size={10} class="text-brand-primary" />
                    <span class="text-brand-primary">{lang === 'es' ? 'Enlace Copiado' : 'Link Copied'}</span>
                  {:else}
                    <LinkIcon size={10} />
                    <span>{lang === 'es' ? 'Copiar Enlace' : 'Copy Link'}</span>
                  {/if}
                </button>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Interactive Pagination Bar -->
      {#if totalPages > 1}
        <div class="pt-6 border-t border-border-subtle/40 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <p class="text-xs text-text-muted font-medium order-2 sm:order-1">
            {lang === 'es' 
              ? `Mostrando ${startIndex} - ${endIndex} de ${filteredBlocks.length} dudas frecuentes`
              : `Showing ${startIndex} - ${endIndex} of ${filteredBlocks.length} questions`}
          </p>

          <div class="flex items-center gap-1.5 order-1 sm:order-2">
            <!-- Prev Page Button -->
            <button
              onclick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Previous page"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed
                bg-bg-surface/50 border-border-subtle text-text-muted hover:text-text-main hover:border-brand-primary/30"
            >
              <ArrowLeft size={13} />
              <span class="hidden xs:inline">{lang === 'es' ? 'Anterior' : 'Previous'}</span>
            </button>

            <!-- Page Number Pills -->
            <div class="flex items-center gap-1">
              {#each Array(totalPages) as _, i}
                {@const pageNum = i + 1}
                <button
                  onclick={() => goToPage(pageNum)}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  class="w-8 h-8 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center cursor-pointer border
                    {currentPage === pageNum 
                      ? 'bg-brand-primary text-bg-base border-brand-primary shadow-xs ring-2 ring-brand-primary/20 scale-105' 
                      : 'bg-bg-surface/40 border-border-subtle text-text-muted hover:border-brand-primary/30 hover:text-text-main'}"
                >
                  {pageNum}
                </button>
              {/each}
            </div>

            <!-- Next Page Button -->
            <button
              onclick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed
                bg-bg-surface/50 border-border-subtle text-text-muted hover:text-text-main hover:border-brand-primary/30"
            >
              <span class="hidden xs:inline">{lang === 'es' ? 'Siguiente' : 'Next'}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  /* Highlight matching text inside query */
  :global(mark) {
    background-color: rgba(90, 79, 196, 0.15); /* Fallback to brand primary opacity */
    color: var(--brand-primary);
    padding-left: 0.125rem;
    padding-right: 0.125rem;
    border-radius: 0.25rem;
  }
  :global([data-theme="dark"] mark) {
    background-color: rgba(155, 141, 247, 0.2);
    color: var(--brand-primary);
  }
</style>
