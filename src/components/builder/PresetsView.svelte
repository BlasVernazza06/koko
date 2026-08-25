<script lang="ts">
  import { ArrowRight } from '@lucide/svelte';
  import type { KokoTemplate, KokoTemplateConfig } from './templates';

  let {
    templates,
    lang = 'es',
    onapply
  } = $props<{
    templates: KokoTemplate[];
    lang: string;
    onapply: (config: KokoTemplateConfig) => void;
  }>();

  // Helper to extract technology labels for quick visual scan
  function getTemplateBadges(config: KokoTemplateConfig): string[] {
    const badges: string[] = [];
    if (config.selectedFront !== 'none') {
      if (config.selectedFront === 'nextjs') badges.push('Next.js');
      else if (config.selectedFront === 'sveltekit') badges.push('SvelteKit');
      else if (config.selectedFront === 'react') badges.push('React SPA');
      else if (config.selectedFront === 'nuxt') badges.push('Nuxt');
      else if (config.selectedFront === 'astro') badges.push('Astro');
    }
    if (config.selectedNativeFront && config.selectedNativeFront !== 'none') {
      if (config.selectedNativeFront.includes('expo')) badges.push('Expo');
      else if (config.selectedNativeFront.includes('react-native')) badges.push('React Native');
      else if (config.selectedNativeFront.includes('flutter')) badges.push('Flutter');
    }
    if (config.selectedBack !== 'none') {
      if (config.selectedBack === 'go') badges.push('Go Fiber');
      else if (config.selectedBack === 'nestjs') badges.push('NestJS');
      else if (config.selectedBack === 'node') badges.push('Express');
      else if (config.selectedBack === 'python') badges.push('FastAPI');
      else if (config.selectedBack === 'hono') badges.push('Hono');
    }
    if (config.selectedDb !== 'none') {
      if (config.selectedDb === 'prisma') badges.push('Prisma');
      else if (config.selectedDb === 'drizzle') badges.push('Drizzle');
      else if (config.selectedDb === 'mongo') badges.push('MongoDB');
      else if (config.selectedDb === 'postgres') badges.push('PostgreSql');
      else if (config.selectedDb === 'sqlx') badges.push('SQLx');
    }
    if (config.selectedAuth !== 'none') {
      if (config.selectedAuth === 'better-auth') badges.push('Better Auth');
      else if (config.selectedAuth === 'supabase') badges.push('Supabase');
      else if (config.selectedAuth === 'clerk') badges.push('Clerk');
    }
    if (config.selectedPayments === 'stripe') badges.push('Stripe');
    if (config.selectedEmail === 'resend') badges.push('Resend');
    return badges.slice(0, 5); // Max 5 badges to avoid overflow
  }

  // Keep translations inline (standby on translations.ts)
  const t = $derived({
    es: {
      templatesLabel: 'Recetas Recomendadas',
      templatesSubtitle: 'Selecciona una configuración inicial y acelera tu flujo de desarrollo.',
      useRecipe: 'Usar Receta'
    },
    en: {
      templatesLabel: 'Recommended Recipes',
      templatesSubtitle: 'Select a bootstrap configuration to accelerate your setup workflow.',
      useRecipe: 'Use Recipe'
    }
  }[lang] || {
    templatesLabel: 'Recetas Recomendadas',
    templatesSubtitle: 'Selecciona una configuración inicial y acelera tu flujo de desarrollo.',
    useRecipe: 'Usar Receta'
  });
</script>

<div class="space-y-6">
  <div class="border-l-3 border-brand-primary pl-3.5 mb-8 select-none">
    <span class="block text-sm font-extrabold uppercase tracking-widest text-text-main">{t.templatesLabel}</span>
    <span class="block text-xs text-text-muted mt-1.5 font-medium leading-relaxed">{t.templatesSubtitle}</span>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    {#each templates as template}
      <button
        type="button"
        onclick={() => {
          onapply(template.config);
        }}
        class="flex flex-col justify-between items-start gap-5 p-6 rounded-2xl border border-border-subtle bg-bg-base text-left hover:border-brand-primary/45 hover:shadow-[0_12px_35px_-15px_rgba(90,79,196,0.12)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.99] cursor-pointer w-full group"
      >
        <div class="space-y-4 w-full">
          <!-- Recipe Header: Icon + Name -->
          <div class="flex items-center gap-3.5">
            {#if template.icon}
              <div class="w-11 h-11 flex items-center justify-center rounded-xl bg-bg-base border border-border-subtle/50 shrink-0 p-1.5 shadow-2xs group-hover:border-brand-primary/20 transition-all duration-300">
                {#if typeof template.icon === 'string'}
                  <img src={template.icon} class="w-full h-full object-contain" alt="" />
                {:else}
                  {@const Icon = template.icon}
                  <Icon width="100%" height="100%" />
                {/if}
              </div>
            {/if}
            <div class="space-y-0.5">
              <span class="block text-sm font-extrabold text-text-main group-hover:text-brand-primary transition-colors font-sans tracking-tight">
                {lang === 'es' ? template.nameEs : template.nameEn}
              </span>
              <span class="inline-flex items-center text-[10px] font-bold text-brand-secondary font-mono tracking-wider uppercase bg-brand-secondary/5 px-2 py-0.5 rounded-md border border-brand-secondary/10">
                Recipe ID: {template.id}
              </span>
            </div>
          </div>

          <!-- Recipe Description -->
          <p class="text-xs sm:text-[13px] text-text-muted leading-relaxed font-sans font-medium line-clamp-2 h-10">
            {lang === 'es' ? template.descEs : template.descEn}
          </p>

          <!-- Tech Pill Badges -->
          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle/40">
            {#each getTemplateBadges(template.config) as badge}
              <span class="text-[9px] sm:text-[10px] font-extrabold font-sans text-text-muted bg-bg-base dark:bg-bg-base/70 border border-border-subtle/50 px-2 py-0.5 rounded-lg select-none transition-colors group-hover:border-brand-primary/15 group-hover:bg-bg-base">
                {badge}
              </span>
            {/each}
          </div>
        </div>

        <!-- Action Button inside card -->
        <div class="flex items-center justify-center gap-1 w-full mt-2 py-2 px-4 border border-brand-primary/10 bg-brand-primary/[0.06] text-brand-primary group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white rounded-xl text-xs font-extrabold transition-all duration-300 select-none">
          <span>{t.useRecipe}</span>
          <ArrowRight size={13} class="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </button>
    {/each}
  </div>
</div>

