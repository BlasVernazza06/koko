import type { DocsDropdownItem, RecipeDropdownItem, FaqCarouselSlide } from '@/types/navigation.types';

export const docsDropdownItems: DocsDropdownItem[] = [
  {
    titleEs: 'Inicio Rápido',
    titleEn: 'Quick Start',
    descEs: 'Empieza en minutos con Claw',
    descEn: 'Get started in minutes with Claw',
    href: '/docs/quick-start',
    hrefEn: '/en/docs/quick-start'
  },
  {
    titleEs: 'Comandos CLI',
    titleEn: 'CLI Commands',
    descEs: 'Referencia completa del CLI',
    descEn: 'Complete CLI reference guide',
    href: '/docs/cli-commands',
    hrefEn: '/en/docs/cli-commands'
  },
  {
    titleEs: 'Limitaciones',
    titleEn: 'Limitations',
    descEs: 'Restricciones y límites conocidos',
    descEn: 'Known limitations & boundaries',
    href: '/docs/cli-limitations',
    hrefEn: '/en/docs/cli-limitations'
  },
  {
    titleEs: 'Roadmap',
    titleEn: 'Roadmap',
    descEs: 'Planificación y desarrollo futuro',
    descEn: 'Future development & plans',
    href: '/docs/cli-roadmap',
    hrefEn: '/en/docs/cli-roadmap'
  },
  {
    titleEs: 'Estructura',
    titleEn: 'Structure',
    descEs: 'Organización de archivos generada',
    descEn: 'Generated file structure layout',
    href: '/docs/project-structure',
    hrefEn: '/en/docs/project-structure'
  },
  {
    titleEs: 'Koko Config',
    titleEn: 'Koko Config',
    descEs: 'Manifiesto y koko.config.json',
    descEn: 'Manifest & koko.config.json',
    href: '/docs/claw-config',
    hrefEn: '/en/docs/claw-config'
  },
  {
    titleEs: 'Contribución',
    titleEn: 'Contributing',
    descEs: 'Cómo colaborar en Claw',
    descEn: 'How to collaborate on Claw',
    href: '/docs/contributing',
    hrefEn: '/en/docs/contributing'
  },
  {
    titleEs: 'FAQ',
    titleEn: 'FAQ',
    descEs: 'Preguntas y respuestas comunes',
    descEn: 'Frequently asked questions',
    href: '/docs/faq',
    hrefEn: '/en/docs/faq'
  },
  {
    titleEs: 'Ver Todo',
    titleEn: 'View All',
    descEs: 'Explora toda la documentación',
    descEn: 'Explore all documentation',
    href: '/docs',
    hrefEn: '/en/docs'
  }
];

export const recipesDropdownItems: RecipeDropdownItem[] = [
  {
    id: 'saas-next',
    nameEs: 'SaaS Next.js',
    nameEn: 'SaaS Next.js',
    descEs: 'Next.js + Go + Prisma',
    descEn: 'Next.js + Go + Prisma',
    icon: '/logos/nextjs.svg',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:border-text-main/20 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.04)]',
    color: 'group-hover/card:text-brand-secondary'
  },
  {
    id: 'fullstack-svelte',
    nameEs: 'Svelte 5 + NestJS',
    nameEn: 'Svelte 5 + NestJS',
    descEs: 'SvelteKit + NestJS + Drizzle',
    descEn: 'SvelteKit + NestJS + Drizzle',
    icon: '/logos/svelte.svg',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,62,0,0.1)] hover:border-[rgba(255,62,0,0.35)]',
    color: 'group-hover/card:text-[orange]'
  },
  {
    id: 'mern',
    nameEs: 'Classic MERN',
    nameEn: 'Classic MERN',
    descEs: 'React + Express + MongoDB',
    descEn: 'React + Express + MongoDB',
    icon: '/logos/mongodb.svg',
    shadow: 'hover:shadow-[0_0_20px_rgba(79,191,81,0.1)] hover:border-[rgba(79,191,81,0.35)]',
    color: 'group-hover/card:text-[#4fbf51]'
  },
  {
    id: 'pern',
    nameEs: 'Modern PERN',
    nameEn: 'Modern PERN',
    descEs: 'React + Express + Postgres',
    descEn: 'React + Express + Postgres',
    icon: '/logos/postgresql.svg',
    shadow: 'hover:shadow-[0_0_20px_rgba(51,103,145,0.1)] hover:border-[rgba(51,103,145,0.35)]',
    color: 'group-hover/card:text-[#4169e1]'
  },
  {
    id: 'python-fastapi',
    nameEs: 'FastAPI + React',
    nameEn: 'FastAPI + React',
    descEs: 'React + FastAPI + Supabase',
    descEn: 'React + FastAPI + Supabase',
    icon: '/logos/python.svg',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,150,136,0.1)] hover:border-[rgba(0,150,136,0.35)]',
    color: 'group-hover/card:text-[#009688]'
  },
  {
    id: 'mobile-go',
    nameEs: 'Native + Go',
    nameEn: 'Native + Go',
    descEs: 'Expo + Go Fiber + Supabase',
    descEn: 'Expo + Go Fiber + Supabase',
    icon: '/logos/react.svg',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,208,255,0.1)] hover:border-[rgba(0,208,255,0.35)]',
    color: 'group-hover/card:text-[#00d0ff]'
  }
];

export const faqCarouselSlides: FaqCarouselSlide[] = [
  {
    questionEs: '¿Qué es Koko?',
    questionEn: 'What is Koko?',
    answerEs: 'Koko es un CLI en Go nativo que inicializa repositorios listos para producción en segundos.',
    answerEn: 'Koko is a native Go CLI that bootstraps production-ready repos in seconds.'
  },
  {
    questionEs: '¿Es gratis y de código libre?',
    questionEn: 'Is it free & open?',
    answerEs: 'Sí, es de código abierto en GitHub. Puedes utilizar ambas herramientas sin costo alguno en tus proyectos comerciales.',
    answerEn: 'Yes, it is open source on GitHub. You can use both tools for free in your commercial projects.'
  },
  {
    questionEs: '¿Soporta monorepos?',
    questionEn: 'Does it support monorepos?',
    answerEs: 'Sí, viene pre-configurado para monorepos con Turborepo, linters globales (Biome) y múltiples workspaces.',
    answerEn: 'Yes, it comes pre-configured for monorepos with Turborepo, global linters (Biome), and workspaces.'
  },
  {
    questionEs: '¿Cómo añado Docker?',
    questionEn: 'How to add Docker?',
    answerEs: 'Puedes seleccionar la opción en el generador de recetas de Koko y generará la base de Docker Compose automáticamente.',
    answerEn: 'You can select Docker in Koko\'s recipe builder and it compiles the Docker Compose files automatically.'
  }
];
