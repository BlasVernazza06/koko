<script lang="ts">
  import { Plus, Minus } from '@lucide/svelte';
  import { faqsEs, faqsEn, faqCategoriesEs, faqCategoriesEn } from '@/data/faq.data';
  import type { FAQCategoryId } from '@/types/faq.types';

  let { lang = 'es' } = $props<{ lang?: string }>();

  let activeCategory = $state<FAQCategoryId>('general');
  let openFaqId = $state<string | null>(null);

  // Sliding indicator state for categories
  let containerRef = $state<HTMLElement | null>(null);
  let buttonRefs = $state<Record<string, HTMLButtonElement | null>>({});
  let indicatorStyle = $state({ left: 0, top: 0, width: 0, height: 0, ready: false });

  const faqs = $derived(lang === 'es' ? faqsEs : faqsEn);
  const categories = $derived(lang === 'es' ? faqCategoriesEs : faqCategoriesEn);
  const filteredFaqs = $derived(faqs.filter(f => f.category === activeCategory));

  function toggleFaq(id: string) {
    openFaqId = openFaqId === id ? null : id;
  }

  function setCategory(catId: FAQCategoryId) {
    activeCategory = catId;
    openFaqId = null;
  }

  function updateIndicator() {
    const activeBtn = buttonRefs[activeCategory];
    if (activeBtn && containerRef) {
      indicatorStyle = {
        left: activeBtn.offsetLeft,
        top: activeBtn.offsetTop,
        width: activeBtn.offsetWidth,
        height: activeBtn.offsetHeight,
        ready: true
      };
    }
  }

  $effect(() => {
    // React to category or language changes
    const _ = activeCategory;
    const __ = lang;
    updateIndicator();
  });

  $effect(() => {
    if (typeof window === 'undefined') return;

    // Initial calculation after render
    const frameId = requestAnimationFrame(updateIndicator);

    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateIndicator());
      resizeObserver.observe(containerRef);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  });
</script>

<div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start w-full">
  <!-- Sidebar Navigation with Cute Sitting Mascot on top -->
  <div class="md:col-span-3 sticky top-24 pt-12 sm:pt-14 relative select-none">
    <!-- Cute Koala perched on top squishing the categories list -->
    <div class="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
      <img 
        src="/koko-pensando.png" 
        alt="Koko pensando en las categorías" 
        class="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-out select-none" 
      />
    </div>

    <!-- Categories Container -->
    <nav 
      bind:this={containerRef}
      class="relative flex flex-col gap-1.5 p-1.5 rounded-2xl border border-border-subtle/40 bg-badge-bg backdrop-blur-xs z-10 shadow-2xs" 
      id="faq-categories"
    >
      <!-- Sliding Indicator Background -->
      {#if indicatorStyle.ready}
        <div
          class="sliding-indicator absolute rounded-xl bg-bg-base shadow-xs border border-border-subtle pointer-events-none"
          style="left: {indicatorStyle.left}px; top: {indicatorStyle.top}px; width: {indicatorStyle.width}px; height: {indicatorStyle.height}px;"
        ></div>
      {/if}

      {#each categories as cat}
        <button 
          type="button"
          bind:this={buttonRefs[cat.id]}
          onclick={() => setCategory(cat.id)}
          class="relative z-10 flex items-center w-full px-4 py-2.5 rounded-xl text-left text-xs sm:text-sm cursor-pointer select-none active:scale-98 transition-colors duration-200 {activeCategory === cat.id ? 'text-text-main font-semibold' : 'text-text-muted hover:text-text-main font-normal'}"
        >
          {cat.label}
        </button>
      {/each}
    </nav>
  </div>

  <!-- Accordion List Column -->
  <div class="md:col-span-9 space-y-6">
    <div class="border-t border-border-subtle/50 divide-y divide-border-subtle/50 select-text">
      {#each filteredFaqs as faq (faq.id)}
        <div class="py-4">
          <button 
            type="button"
            onclick={() => toggleFaq(faq.id)}
            class="flex items-center justify-between w-full text-left font-bold text-sm sm:text-base text-text-main hover:text-brand-primary cursor-pointer py-2 gap-4 select-none"
            aria-expanded={openFaqId === faq.id}
          >
            <span>{faq.question}</span>
            <span class="text-text-muted relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
              <span class="absolute rounded-full p-1.5 border border-muted shadow-md transition-[transform,opacity] duration-300 {openFaqId === faq.id ? 'opacity-0 scale-70 rotate-90' : 'opacity-100 scale-100 rotate-0'}">
                <Plus size={16} />
              </span>
              <span class="absolute rounded-full p-1.5 border border-muted shadow-md transition-[transform,opacity] duration-300 {openFaqId === faq.id ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-70 -rotate-90'}">
                <Minus size={16} />
              </span>
            </span>
          </button>
          
          <div class="faq-content-grid {openFaqId === faq.id ? 'is-open' : ''}">
            <div class="overflow-hidden min-h-0">
              <div class="faq-answer-body pt-2 pb-1 text-xs sm:text-sm text-text-muted leading-relaxed max-w-3xl">
                {@html faq.answer}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .sliding-indicator {
    transition: top 300ms cubic-bezier(0.16, 1, 0.3, 1),
                left 300ms cubic-bezier(0.16, 1, 0.3, 1),
                width 300ms cubic-bezier(0.16, 1, 0.3, 1),
                height 300ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: top, left, width, height;
  }

  .faq-content-grid {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .faq-content-grid.is-open {
    grid-template-rows: 1fr;
  }

  :global(.faq-answer-body code) {
    font-family: var(--font-mono);
    font-size: 0.82em;
    padding: 0.12rem 0.42rem;
    border-radius: 0.375rem;
    background-color: color-mix(in srgb, var(--bg-surface) 80%, var(--text-muted) 20%);
    border: 1px solid var(--border-subtle);
    color: var(--text-main);
    font-weight: 600;
    display: inline-block;
    vertical-align: baseline;
    white-space: nowrap;
  }

  :global(.faq-answer-body a) {
    color: var(--brand-primary);
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--brand-primary) 40%, transparent);
    text-underline-offset: 3px;
    font-weight: 600;
  }

  :global(.faq-answer-body a:hover) {
    color: var(--brand-secondary);
    text-decoration-color: var(--brand-secondary);
  }

  :global(.faq-answer-body a:hover code) {
    border-color: var(--brand-primary);
    color: var(--brand-primary);
    background-color: color-mix(in srgb, var(--bg-surface) 60%, var(--brand-primary) 15%);
  }
</style>
