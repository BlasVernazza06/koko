<script lang="ts">
  import { Plus, Minus } from '@lucide/svelte';
  import { faqsEs, faqsEn, faqCategoriesEs, faqCategoriesEn } from '@/data/faq.data';
  import type { FAQCategoryId } from '@/types/faq.types';

  let { lang = 'es' } = $props<{ lang?: string }>();

  let activeCategory = $state<FAQCategoryId>('general');
  let openFaqId = $state<string | null>(null);

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
    <nav class="flex flex-col gap-1.5 p-1.5 rounded-2xl border border-border-subtle/40 bg-bg-surface/20 backdrop-blur-xs relative z-10 shadow-2xs" id="faq-categories">
      {#each categories as cat}
        <button 
          type="button"
          onclick={() => setCategory(cat.id)}
          class="flex items-center w-full px-4 py-2.5 rounded-xl text-left text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none {activeCategory === cat.id ? 'bg-bg-surface/80 text-text-main border border-border-subtle/50 shadow-xs' : 'text-text-muted hover:text-text-main hover:bg-bg-surface/40 border border-transparent'}"
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
        <div class="py-4 transition-all duration-200">
          <button 
            type="button"
            onclick={() => toggleFaq(faq.id)}
            class="flex items-center justify-between w-full text-left font-bold text-sm sm:text-base text-text-main hover:text-brand-primary transition-colors duration-200 cursor-pointer py-2 gap-4 select-none"
            aria-expanded={openFaqId === faq.id}
          >
            <span>{faq.question}</span>
            <span class="text-text-muted relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
              <span class="absolute transition-all duration-250 {openFaqId === faq.id ? 'opacity-0 scale-70 rotate-90' : 'opacity-100 scale-100 rotate-0'}">
                <Plus size={16} />
              </span>
              <span class="absolute transition-all duration-250 {openFaqId === faq.id ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-70 -rotate-90'}">
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
    transition: all 0.2s ease;
  }

  :global(.faq-answer-body a) {
    color: var(--brand-primary);
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--brand-primary) 40%, transparent);
    text-underline-offset: 3px;
    font-weight: 600;
    transition: all 0.2s ease;
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
