import { Blocks, Cpu, Database, Settings } from '@lucide/svelte';
import {
  SvglNextjsLogo,
  SvglReactLogo,
  SvglSvelteLogo,
  SvglAstroLogo,
  SvglVueLogo,
  SvglAngularLogo,
  SvglNuxtLogo,
  SvglGoLogo,
  SvglNodejsLogo,
  SvglRustLogo,
  SvglBunLogo,
  SvglPythonLogo,
  SvglPostgreSQLLogo,
  SvglPrismaLogo,
  SvglMongoDBLogo,
  SvglDrizzleORMLogo,
  SvglBetterAuthLogo,
  SvglAuthjsLogo,
  SvglSupabaseLogo,
  SvglZodLogo,
  SvglDockerLogo,
  SvglTurborepoLogo,
  SvglNestJSLogo,
  SvglValibotLogo,
  SvglStripeLogo,
  SvglLemonSqueezyLogo,
  SvglMercadoPagoLogo,
  SvglResendLogo,
  SvglNPMLogo,
  SvglPnpmLogo,
  SvglExpressjsLogo,
  SvglFastifyLogo,
  SvglPolarLogo
} from '@selemondev/svgl-svelte';

// Custom icons
import AstroIcon from '../icons/AstroIcon.svelte';
import DrizzleIcon from '../icons/DrizzleIcon.svelte';
import ZodIcon from '../icons/ZodIcon.svelte';
import PythonIcon from '../icons/PythonIcon.svelte';
import NodejsIcon from '../icons/NodejsIcon.svelte';

export interface TechOption {
  id: string;
  name: string;
  desc: string;
  hoverColor?: string;
  activeColor?: string;
  iconComponent?: any;
  isNone?: boolean;
}

export interface Layer {
  key: string;
  label: string;
  step: string;
  icon: any;
  colorClass: string;
  options: TechOption[];
}

export interface InfraOption {
  id: string;
  title: string;
  description: string;
  iconComponent?: any;
  lucideIcon?: any;
  bindingKey: string;
}

export const getLayers = (t: any): Layer[] => [
  {
    key: 'frontend',
    label: 'Web Frontend',
    step: '01 / WEB CLIENT',
    icon: Blocks,
    colorClass: 'text-brand-secondary',
    options: [
      { id: 'nextjs', name: 'Next.js', desc: 'React SSR Framework, App Router.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglNextjsLogo },
      { id: 'react', name: 'React SPA', desc: 'React Client-side SPA, Vite engine.', hoverColor: 'group-hover/btn:text-[#61dafb]', activeColor: 'text-[#61dafb]', iconComponent: SvglReactLogo },
      { id: 'nuxt', name: 'Nuxt', desc: 'Vue SSR Framework, file-based routing.', hoverColor: 'group-hover/btn:text-[#00dc82]', activeColor: 'text-[#00dc82]', iconComponent: SvglNuxtLogo },
      { id: 'vue', name: 'Vue SPA', desc: 'Vue 3 Client-side SPA, Composition API.', hoverColor: 'group-hover/btn:text-[#42b883]', activeColor: 'text-[#42b883]', iconComponent: SvglVueLogo },
      { id: 'sveltekit', name: 'SvelteKit', desc: 'Svelte SSR Framework, robust routing.', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: SvglSvelteLogo },
      { id: 'svelte', name: 'Svelte SPA', desc: 'Svelte 5 Client-side SPA, Runes.', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: SvglSvelteLogo },
      { id: 'astro', name: 'Astro', desc: 'Islands Architecture, content-driven.', hoverColor: 'group-hover/btn:text-[#ff5d01]', activeColor: 'text-[#ff5d01]', iconComponent: AstroIcon },
      { id: 'angular', name: 'Angular', desc: 'Enterprise-ready framework by Google.', hoverColor: 'group-hover/btn:text-[#dd0031]', activeColor: 'text-[#dd0031]', iconComponent: SvglAngularLogo },
      { id: 'none', name: 'No Frontend', desc: 'No frontend framework scaffold.', isNone: true }
    ]
  },
  {
    key: 'native_frontend',
    label: 'Native Frontend',
    step: '02 / MOBILE CLIENT',
    icon: Blocks,
    colorClass: 'text-brand-secondary',
    options: [
      { id: 'expo-bare', name: 'Expo + Bare', desc: 'Expo with StyleSheet (no styling library)', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglReactLogo },
      { id: 'expo-uniwind', name: 'Expo + Uniwind', desc: 'Fastest Tailwind bindings for React Native with HeroUI Native', hoverColor: 'group-hover/btn:text-[#38bdf8]', activeColor: 'text-[#38bdf8]', iconComponent: SvglReactLogo },
      { id: 'expo-unistyles', name: 'Expo + Unistyles', desc: 'Expo with Unistyles (type-safe styling)', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: SvglReactLogo },
      { id: 'none', name: 'No Native Frontend', desc: 'No native mobile frontend', isNone: true }
    ]
  },
  {
    key: 'backend',
    label: 'Backend',
    step: '02 / SERVICE ARCHITECTURE',
    icon: Cpu,
    colorClass: 'text-brand-primary',
    options: [
      { id: 'hono', name: 'Hono', desc: 'Ultrafast web framework', hoverColor: 'group-hover/btn:text-[#e36002]', activeColor: 'text-[#e36002]', iconComponent: SvglGoLogo },
      { id: 'elysia', name: 'Elysia', desc: 'TypeScript web framework', hoverColor: 'group-hover/btn:text-[#42b883]', activeColor: 'text-[#42b883]', iconComponent: SvglBunLogo },
      { id: 'express', name: 'Express', desc: 'Popular Node.js framework', hoverColor: 'group-hover/btn:text-[#68a063]', activeColor: 'text-[#68a063]', iconComponent: SvglExpressjsLogo },
      { id: 'fastify', name: 'Fastify', desc: 'Fast, low-overhead web framework for Node.js', hoverColor: 'group-hover/btn:text-[#ffffff]', activeColor: 'text-[#ffffff]', iconComponent: SvglFastifyLogo },
      { id: 'convex', name: 'Convex', desc: 'Reactive backend-as-a-service', hoverColor: 'group-hover/btn:text-[#f43f5e]', activeColor: 'text-[#f43f5e]', iconComponent: SvglMongoDBLogo },
      { id: 'fullstack-next', name: 'Fullstack Next.js', desc: 'Use Next.js built-in API routes', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglNextjsLogo },
      { id: 'fullstack-tanstack', name: 'Fullstack TanStack Start', desc: 'Use TanStack Start\'s built-in API routes (Requires TanStack Start frontend)', hoverColor: 'group-hover/btn:text-[#ff5d01]', activeColor: 'text-[#ff5d01]', iconComponent: SvglReactLogo },
      { id: 'fullstack-nuxt', name: 'Fullstack Nuxt', desc: 'Use Nuxt\'s built-in server routes (Requires Nuxt frontend)', hoverColor: 'group-hover/btn:text-[#00dc82]', activeColor: 'text-[#00dc82]', iconComponent: SvglNuxtLogo },
      { id: 'fullstack-sveltekit', name: 'Fullstack SvelteKit', desc: 'Use SvelteKit\'s built-in server routes (Requires SvelteKit frontend)', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: SvglSvelteLogo },
      { id: 'fullstack-astro', name: 'Fullstack Astro', desc: 'Use Astro\'s built-in API routes (Requires Astro frontend)', hoverColor: 'group-hover/btn:text-[#ff5d01]', activeColor: 'text-[#ff5d01]', iconComponent: AstroIcon },
      { id: 'none', name: 'No Backend', desc: 'Skip backend integration (frontend only)', isNone: true }
    ]
  },
  {
    key: 'runtime',
    label: 'Runtime',
    step: '03 / RUNTIME ENVIRONMENT',
    icon: Cpu,
    colorClass: 'text-brand-secondary',
    options: [
      { id: 'bun', name: 'Bun', desc: 'Fast JavaScript runtime & toolkit', hoverColor: 'group-hover/btn:text-[#fbf0e9]', activeColor: 'text-[#fbf0e9]', iconComponent: SvglBunLogo },
      { id: 'node', name: 'Node.js', desc: 'JavaScript runtime environment', hoverColor: 'group-hover/btn:text-[#68a063]', activeColor: 'text-[#68a063]', iconComponent: NodejsIcon },
      { id: 'cloudflare', name: 'Cloudflare Workers', desc: 'Serverless runtime for the edge', hoverColor: 'group-hover/btn:text-[#f38020]', activeColor: 'text-[#f38020]', iconComponent: SvglRustLogo },
      { id: 'none', name: 'No Runtime', desc: 'No specific runtime', isNone: true }
    ]
  },
  {
    key: 'orm',
    label: 'ORM',
    step: '04 / DATABASE MAPPER',
    icon: Database,
    colorClass: 'text-brand-primary',
    options: [
      { id: 'drizzle', name: 'Drizzle', desc: 'TypeScript ORM', hoverColor: 'group-hover/btn:text-[#c5f74f]', activeColor: 'text-[#c5f74f]', iconComponent: DrizzleIcon },
      { id: 'prisma', name: 'Prisma', desc: 'Next-gen ORM', hoverColor: 'group-hover/btn:text-[#5a4fc4]', activeColor: 'text-[#5a4fc4]', iconComponent: SvglPrismaLogo },
      { id: 'mongoose', name: 'Mongoose', desc: 'Elegant object modeling tool (Mongoose only works with MongoDB)', hoverColor: 'group-hover/btn:text-[#880000]', activeColor: 'text-[#880000]', iconComponent: SvglMongoDBLogo },
      { id: 'none', name: 'No ORM', desc: 'Skip ORM integration (Database requires an ORM)', isNone: true }
    ]
  },
  {
    key: 'api',
    label: 'API',
    step: '05 / API PROTOCOL',
    icon: Settings,
    colorClass: 'text-brand-secondary',
    options: [
      { id: 'trpc', name: 'tRPC', desc: 'End-to-end typesafe APIs', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglBetterAuthLogo },
      { id: 'orpc', name: 'oRPC', desc: 'Typesafe APIs Made Simple', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglValibotLogo },
      { id: 'none', name: 'No API', desc: 'No API layer (API routes disabled)', isNone: true }
    ]
  },
  {
    key: 'package_manager',
    label: 'Package Manager',
    step: '06 / PACKAGE MANAGER',
    icon: Settings,
    colorClass: 'text-brand-secondary',
    options: [
      { id: 'npm', name: 'npm', desc: 'Default Node.js package manager.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglNPMLogo },
      { id: 'pnpm', name: 'pnpm', desc: 'Fast, disk space efficient package manager.', hoverColor: 'group-hover/btn:text-[#f68712]', activeColor: 'text-[#f68712]', iconComponent: SvglPnpmLogo },
      { id: 'bun', name: 'Bun', desc: 'Bun built-in fast package manager.', hoverColor: 'group-hover/btn:text-[#fbf0e9]', activeColor: 'text-[#fbf0e9]', iconComponent: SvglBunLogo }
    ]
  },
  {
    key: 'tools',
    label: 'Tools',
    step: '07 / UTILITY TOOLS',
    icon: Blocks,
    colorClass: 'text-brand-primary',
    options: [
      { id: 'zod', name: 'Zod', desc: 'TypeScript-first schema validation library.', hoverColor: 'group-hover/btn:text-[#3e67ad]', activeColor: 'text-[#3e67ad]', iconComponent: ZodIcon },
      { id: 'valibot', name: 'Valibot', desc: 'Modular, ultra-light schema validator.', hoverColor: 'group-hover/btn:text-[#e0234e]', activeColor: 'text-[#e0234e]', iconComponent: SvglValibotLogo },
      { id: 'none', name: 'No Tool', desc: 'No utility tools selected.', isNone: true }
    ]
  },
  {
    key: 'payments',
    label: 'Payments',
    step: '08 / MONETIZATION',
    icon: Database,
    colorClass: 'text-brand-secondary',
    options: [
      { id: 'stripe', name: 'Stripe', desc: 'Global payment infrastructure SDK.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglStripeLogo },
      { id: 'polar', name: 'Polar.sh', desc: 'Developer monetization & SaaS payments.', hoverColor: 'group-hover/btn:text-[#1d9bf0]', activeColor: 'text-[#1d9bf0]', iconComponent: SvglPolarLogo },
      { id: 'none', name: 'No Payments', desc: 'No monetization system configured.', isNone: true }
    ]
  },
  {
    key: 'db',
    label: 'Database',
    step: '09 / DATA STORAGE',
    icon: Database,
    colorClass: 'text-brand-primary',
    options: [
      { id: 'sqlite', name: 'SQLite', desc: 'File-based SQL database', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary', iconComponent: DrizzleIcon },
      { id: 'postgres', name: 'PostgreSQL', desc: 'Advanced SQL database', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary', iconComponent: SvglPostgreSQLLogo },
      { id: 'mysql', name: 'MySQL', desc: 'Popular relational database', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary', iconComponent: SvglPostgreSQLLogo },
      { id: 'mongodb', name: 'MongoDB', desc: 'NoSQL document database', hoverColor: 'group-hover/btn:text-[#47a248]', activeColor: 'text-[#47a248]', iconComponent: SvglMongoDBLogo },
      { id: 'none', name: 'No Database', desc: 'Skip database integration', isNone: true }
    ]
  }
];

export const getInfrastructureOptions = (t: any): InfraOption[] => [
  {
    id: 'docker',
    title: 'Docker Compose Setup',
    description: t.dockerLabel,
    iconComponent: SvglDockerLogo,
    bindingKey: 'withDocker'
  },
  {
    id: 'ci',
    title: 'GitHub Actions',
    description: t.ciLabel,
    lucideIcon: 'ci', // We will map this to dynamic icon in ExtraCard
    bindingKey: 'withCi'
  },
  {
    id: 'linter',
    title: 'Biome / Linter Config',
    description: t.linterLabel,
    lucideIcon: 'linter',
    bindingKey: 'withLinter'
  },
  {
    id: 'testing',
    title: 'Unit Testing Environment',
    description: t.testingLabel,
    lucideIcon: 'testing',
    bindingKey: 'withTesting'
  },
  {
    id: 'turborepo',
    title: 'Turborepo Monorepo',
    description: t.turboLabel,
    iconComponent: SvglTurborepoLogo,
    bindingKey: 'withTurborepo'
  }
];
