import type { CtaBlueprint } from '@/types/cta.types';

export const ctaBlueprints: CtaBlueprint[] = [
  {
    id: 'saas',
    logo: '/logos/nextjs.svg',
    title: 'SaaS Platform',
    metaEs: 'Next.js 15 · Stripe · Prisma',
    metaEn: 'Next.js 15 · Stripe · Prisma',
    tag: 'Production',
    rotate: '-rotate-6 sm:-rotate-8 translate-y-3 sm:translate-y-4',
    accentColor: 'border-blue-500/25 hover:border-blue-500/60 shadow-blue-500/5',
    recipeId: 'saas-next',
    hiddenOnMobile: true
  },
  {
    id: 'gofiber',
    logo: '/logos/go.svg',
    title: 'Go Fiber API',
    metaEs: 'Go Fiber · Postgres · Docker',
    metaEn: 'Go Fiber · Postgres · Docker',
    tag: '1.2ms Core',
    rotate: '-rotate-3 sm:-rotate-4 translate-y-1',
    accentColor: 'border-cyan-500/25 hover:border-cyan-500/60 shadow-cyan-500/5',
    recipeId: 'api-go',
    hiddenOnMobile: false
  },
  {
    id: 'enterprise',
    logo: '/logos/nestjs.svg',
    title: 'Enterprise Core',
    metaEs: 'Turborepo · NestJS · Auth',
    metaEn: 'Turborepo · NestJS · Auth',
    tag: 'Clean Arch',
    rotate: 'rotate-0 -translate-y-2 sm:-translate-y-3 scale-105 z-20',
    accentColor: 'border-brand-primary/40 hover:border-brand-primary/70 shadow-lg shadow-brand-primary/10 ring-1 ring-brand-primary/20',
    recipeId: 'enterprise',
    hiddenOnMobile: false
  },
  {
    id: 'fastapi',
    logo: '/logos/python.svg',
    title: 'FastAPI AI Engine',
    metaEs: 'Python · Pydantic · Docker',
    metaEn: 'Python · Pydantic · Docker',
    tag: 'Async Ready',
    rotate: 'rotate-3 sm:rotate-4 translate-y-1',
    accentColor: 'border-amber-500/25 hover:border-amber-500/60 shadow-amber-500/5',
    recipeId: 'fastapi',
    hiddenOnMobile: false
  },
  {
    id: 'astro',
    logo: '/logos/astro.svg',
    title: 'Modern Static',
    metaEs: 'Astro 6 · Svelte 5 · Tailwind',
    metaEn: 'Astro 6 · Svelte 5 · Tailwind',
    tag: 'Zero JS',
    rotate: 'rotate-6 sm:rotate-8 translate-y-3 sm:translate-y-4',
    accentColor: 'border-orange-500/25 hover:border-orange-500/60 shadow-orange-500/5',
    recipeId: 'astro-blog',
    hiddenOnMobile: true
  }
];
