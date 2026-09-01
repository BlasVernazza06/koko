<script lang="ts">
  import { Plus, Minus, ArrowUpRight } from '@lucide/svelte';
  import { faqsEs, faqsEn, type FAQItem } from './faqData';

  let { lang = 'es' } = $props<{ lang?: string }>();

  let activeCategory = $state<'general' | 'stacks' | 'database' | 'tooling' | 'devops' | 'config'>('general');
  let openFaqId = $state<string | null>(null);

  const faqs = $derived(lang === 'es' ? faqsEs : faqsEn);

  const categories = $derived([
    { id: 'general' as const, label: lang === 'es' ? 'General' : 'General' },
    { id: 'stacks' as const, label: lang === 'es' ? 'Arquitectura y Stacks' : 'Architecture & Stacks' },
    { id: 'database' as const, label: lang === 'es' ? 'Bases de Datos y ORMs' : 'Databases & ORMs' },
    { id: 'tooling' as const, label: lang === 'es' ? 'Linters y Calidad' : 'Tooling & Quality' },
    { id: 'devops' as const, label: lang === 'es' ? 'Docker, CI/CD e Infra' : 'Docker, CI/CD & Infra' },
    { id: 'config' as const, label: lang === 'es' ? 'Configuración y CLI' : 'Config & CLI Commands' }
  ]);

  const filteredFaqs = $derived(faqs.filter(f => f.category === activeCategory));

  const labels = $derived(lang === 'es' ? {
    badge: "FAQ",
    title: "Preguntas Frecuentes",
    subtitle: "Hemos recopilado respuestas detalladas sobre el funcionamiento, arquitectura y capacidades de Koko CLI.",
    stillHaveQuestions: "¿Aún tienes preguntas?",
    stillHaveQuestionsSub: "¡Explora el repositorio o únete a la discusión en GitHub!",
    contactSupport: "GitHub Repo"
  } : {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Detailed answers regarding Koko CLI, supported stacks, architecture, and local infrastructure.",
    stillHaveQuestions: "Still have questions?",
    stillHaveQuestionsSub: "Explore the official repository or join the discussion on GitHub!",
    contactSupport: "GitHub Repo"
  });

  function toggleFaq(id: string) {
    openFaqId = openFaqId === id ? null : id;
  }

  function setCategory(catId: typeof activeCategory) {
    activeCategory = catId;
    openFaqId = null;
  }
</script>

<section id="faq" class="w-full max-w-6xl px-6 py-24 mx-auto font-sans select-none">
  <!-- Top Badge -->
  <div class="text-center mb-4">
    <span class="text-xs font-bold text-brand-primary tracking-widest uppercase">
      {labels.badge}
    </span>
  </div>

  <!-- Title & Subtitle -->
  <div class="text-center mb-16 max-w-2xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mb-4 leading-tight">
      {labels.title}
    </h2>
    <p class="text-sm text-text-muted">
      {labels.subtitle}
    </p>
  </div>

  <!-- Two Column Layout -->
  <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
    
    <!-- Sidebar Navigation -->
    <div class="md:col-span-3 space-y-6 sticky top-24">
      <nav class="flex flex-col gap-1.5" id="faq-categories">
        {#each categories as cat}
          <button 
            type="button"
            onclick={() => setCategory(cat.id)}
            class="flex items-center w-full px-4 py-2.5 rounded-xl text-left text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none {activeCategory === cat.id ? 'bg-bg-surface/60 text-text-main border border-border-subtle/40 shadow-xs' : 'text-text-muted hover:text-text-main hover:bg-bg-surface/30 border border-transparent'}"
          >
            {cat.label}
          </button>
        {/each}
      </nav>

      <!-- Koko Thinking Mascot below categories (standalone icon) -->
      <div class="hidden md:flex flex-col items-center justify-center pt-4 select-none">
        <div class="w-40 h-40 sm:w-44 sm:h-44 relative flex items-center justify-center transition-transform duration-500 hover:scale-105 hover:-rotate-2">
          <img 
            src="/koko-pensando.png" 
            alt="Koko Pensando" 
            class="w-full h-full object-contain select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]" 
          />
        </div>
      </div>
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

      <!-- Support call-out card -->
      <div class="bg-bg-surface/20 border border-border-subtle/40 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-8 relative overflow-hidden">
        <div>
          <h4 class="text-base font-extrabold text-text-main">
            {labels.stillHaveQuestions}
          </h4>
          <p class="text-xs sm:text-sm text-text-muted mt-0.5">
            {labels.stillHaveQuestionsSub}
          </p>
        </div>
        <div>
          <a 
            href="https://github.com/BlasVernazza06/koko-cli"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-1.5 px-5 py-2.5 border border-border-subtle bg-bg-surface hover:bg-bg-surface/80 text-text-main hover:text-brand-primary text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 shadow-xs cursor-pointer select-none"
          >
            {labels.contactSupport}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

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
