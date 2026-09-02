<script lang="ts">
  import { faqCarouselSlides } from '@/data/navigation.data';

  let { lang = 'es' } = $props<{ lang?: string }>();

  let currentIndex = $state(0);
  let isPaused = $state(false);

  const slides = faqCarouselSlides;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  }

  function goToSlide(index: number) {
    currentIndex = index;
  }

  // Auto-play timer
  $effect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  });
</script>

<!-- Right Column: Interactive FAQ Carousel (42%) -->
<div 
  class="w-[42%] flex flex-col justify-between"
  onmouseenter={() => isPaused = true}
  onmouseleave={() => isPaused = false}
  role="region"
  aria-label="FAQ Carousel"
>
  <div>
    <div class="flex items-center gap-1.5 text-xs font-bold text-text-main mb-4 uppercase tracking-wider pl-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-brand-primary animate-pulse shrink-0">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
      </svg>
      <span>{lang === 'es' ? 'Preguntas Frecuentes' : 'FAQ Carousel'}</span>
    </div>

    <!-- Carousel Box -->
    <div class="relative bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border border-brand-primary/10 rounded-xl p-4 min-h-[142px] overflow-hidden flex flex-col justify-between select-none shadow-inner">
      <div class="relative w-full h-[84px] overflow-hidden">
        {#each slides as slide, index}
          <div 
            class="transition-all duration-350 absolute inset-0 flex flex-col gap-1.5 {index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none translate-x-4'}"
          >
            <h5 class="text-xs font-extrabold text-brand-primary leading-tight flex items-center gap-1">
              <span>{lang === 'es' ? slide.questionEs : slide.questionEn}</span>
            </h5>
            <p class="text-[10px] text-text-muted leading-relaxed">
              <span>{lang === 'es' ? slide.answerEs : slide.answerEn}</span>
            </p>
          </div>
        {/each}
      </div>

      <!-- Carousel Controls -->
      <div class="flex items-center justify-between mt-3 pt-2.5 border-t border-brand-primary/10">
        <!-- Dots indicators -->
        <div class="flex gap-1.5 items-center">
          {#each slides as _, index}
            <button 
              type="button"
              onclick={() => goToSlide(index)}
              class="transition-all duration-300 cursor-pointer {index === currentIndex ? 'bg-brand-primary w-3.5 h-2 rounded-full' : 'bg-text-muted/30 w-1.5 h-1.5 rounded-full'}"
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          {/each}
        </div>
        <!-- Navigation arrow buttons -->
        <div class="flex gap-1">
          <button 
            type="button"
            onclick={prevSlide}
            class="w-5 h-5 rounded-md border border-border-subtle bg-bg-surface/80 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-bg-surface transition-all cursor-pointer" 
            aria-label="Previous question"
          >
            <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            type="button"
            onclick={nextSlide}
            class="w-5 h-5 rounded-md border border-border-subtle bg-bg-surface/80 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-bg-surface transition-all cursor-pointer" 
            aria-label="Next question"
          >
            <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <span class="block text-[10px] text-text-muted leading-tight mt-2 text-center">
    {#if lang === 'es'}
      ¿Tienes más dudas? Ve al <a href="#faq" class="text-brand-primary underline font-semibold">FAQ del sitio</a>.
    {:else}
      Any other questions? See the <a href="#faq" class="text-brand-primary underline font-semibold">site FAQ</a>.
    {/if}
  </span>
</div>
