import { Blocks, Cpu, Database, Settings, Shield, GitBranch, Sparkles, TestTube } from '@lucide/svelte';
const SvglNextjsLogo = '/logos/nextjs.svg';
const SvglReactLogo = '/logos/react.svg';
const SvglSvelteLogo = '/logos/svelte.svg';
const SvglAstroLogo = '/logos/astro.svg';
const SvglVueLogo = '/logos/vue.svg';
const SvglAngularLogo = '/logos/angular.svg';
const SvglNuxtLogo = '/logos/nuxt.svg';
const SvglGoLogo = '/logos/go.svg';
const SvglNodejsLogo = '/logos/nodejs.svg';
const SvglRustLogo = '/logos/rust.svg';
const SvglBunLogo = '/logos/bun.svg';
const SvglPythonLogo = '/logos/python.svg';
const SvglPostgreSQLLogo = '/logos/postgresql.svg';
const SvglPrismaLogo = '/logos/prisma.svg';
const SvglMongoDBLogo = '/logos/mongodb.svg';
const SvglDrizzleORMLogo = '/logos/drizzle.svg';
const SvglBetterAuthLogo = '/logos/better-auth_light.svg';
const SvglAuthjsLogo = '/logos/authjs.svg';
const SvglClerkLogo = '/logos/clerk.svg';
const SvglSupabaseLogo = '/logos/supabase.svg';
const SvglZodLogo = '/logos/zod.svg';
const SvglDockerLogo = '/logos/docker.svg';
const SvglTurborepoLogo = '/logos/turborepo.svg';
const SvglNestJSLogo = '/logos/nestjs.svg';
const SvglValibotLogo = '/logos/valibot.svg';
const SvglStripeLogo = '/logos/stripe.svg';
const SvglLemonSqueezyLogo = '/logos/lemonsqueezy.svg';
const SvglMercadoPagoLogo = '/logos/mercado-pago.svg';
const SvglResendLogo = '/logos/resend.svg';
const SvglNPMLogo = '/logos/npm.svg';
const SvglPnpmLogo = '/logos/pnpm.svg';
const SvglExpressjsLogo = '/logos/express.svg';
const SvglFastifyLogo = '/logos/fastify.svg';
const SvglPolarLogo = '/logos/polar-sh_light.svg';
const SvglHonoLogo = '/logos/hono.svg';

// Custom icons
import AstroIcon from '../icons/AstroIcon.svelte';
import DrizzleIcon from '../icons/DrizzleIcon.svelte';
import ZodIcon from '../icons/ZodIcon.svelte';
import PythonIcon from '../icons/PythonIcon.svelte';
import NodejsIcon from '../icons/NodejsIcon.svelte';
import MotionIcon from '../icons/MotionIcon.svelte';
import LucideIcon from '../icons/LucideIcon.svelte';
import SvglIcon from '../icons/SvglIcon.svelte';
import SonnerIcon from '../icons/SonnerIcon.svelte';
import ExpoIcon from '../icons/ExpoIcon.svelte';

export interface TechOption {
  id: string;
  name: string;
  desc: string;
  hoverColor?: string;
  activeColor?: string;
  iconComponent?: any;
  isNone?: boolean;
  default?: boolean;
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
  default?: boolean;
}

export const getLayers = (lang: string): Layer[] => {
  const isEs = lang === 'es';
  return [
    {
      key: 'frontend',
      label: isEs ? 'Web Frontend' : 'Web Frontend',
      step: isEs ? '01 / CLIENTE WEB' : '01 / WEB CLIENT',
      icon: Blocks,
      colorClass: 'text-brand-secondary',
      options: [
        { id: 'nextjs', name: 'Next.js', desc: isEs ? 'Framework SSR de React, App Router.' : 'React SSR Framework, App Router.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglNextjsLogo, default: true },
        { id: 'react', name: 'React SPA', desc: isEs ? 'React SPA del lado del cliente, motor Vite.' : 'React Client-side SPA, Vite engine.', hoverColor: 'group-hover/btn:text-[#61dafb]', activeColor: 'text-[#61dafb]', iconComponent: SvglReactLogo },
        { id: 'nuxt', name: 'Nuxt', desc: isEs ? 'Framework SSR de Vue, enrutamiento basado en archivos.' : 'Vue SSR Framework, file-based routing.', hoverColor: 'group-hover/btn:text-[#00dc82]', activeColor: 'text-[#00dc82]', iconComponent: SvglNuxtLogo },
        { id: 'vue', name: 'Vue SPA', desc: isEs ? 'Vue 3 SPA del lado del cliente, Composition API.' : 'Vue 3 Client-side SPA, Composition API.', hoverColor: 'group-hover/btn:text-[#42b883]', activeColor: 'text-[#42b883]', iconComponent: SvglVueLogo },
        { id: 'sveltekit', name: 'SvelteKit', desc: isEs ? 'Framework SSR de Svelte, enrutamiento robusto.' : 'Svelte SSR Framework, robust routing.', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: SvglSvelteLogo },
        { id: 'svelte', name: 'Svelte SPA', desc: isEs ? 'Svelte 5 SPA del lado del cliente, Runes.' : 'Svelte 5 Client-side SPA, Runes.', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: SvglSvelteLogo },
        { id: 'astro', name: 'Astro', desc: isEs ? 'Arquitectura de islas, enfocada en contenido.' : 'Islands Architecture, content-driven.', hoverColor: 'group-hover/btn:text-[#ff5d01]', activeColor: 'text-[#ff5d01]', iconComponent: AstroIcon },
        { id: 'angular', name: 'Angular', desc: isEs ? 'Framework preparado para empresas por Google.' : 'Enterprise-ready framework by Google.', hoverColor: 'group-hover/btn:text-[#dd0031]', activeColor: 'text-[#dd0031]', iconComponent: SvglAngularLogo },
        { id: 'none', name: isEs ? 'Sin Frontend' : 'No Frontend', desc: isEs ? 'No crear estructura para frontend.' : 'No frontend framework scaffold.', isNone: true }
      ]
    },
    {
      key: 'native_frontend',
      label: isEs ? 'Frontend Nativo' : 'Native Frontend',
      step: isEs ? '02 / CLIENTE MÓVIL' : '02 / MOBILE CLIENT',
      icon: Blocks,
      colorClass: 'text-brand-secondary',
      options: [
        { id: 'expo-bare', name: 'Expo + Bare', desc: isEs ? 'Expo con StyleSheet (sin librería de estilos)' : 'Expo with StyleSheet (no styling library)', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: ExpoIcon },
        { id: 'expo-uniwind', name: 'Expo + Uniwind', desc: isEs ? 'Bindings rápidos de Tailwind para React Native con HeroUI Native' : 'Fastest Tailwind bindings for React Native with HeroUI Native', hoverColor: 'group-hover/btn:text-[#38bdf8]', activeColor: 'text-[#38bdf8]', iconComponent: ExpoIcon },
        { id: 'expo-unistyles', name: 'Expo + Unistyles', desc: isEs ? 'Expo con Unistyles (estilos con tipado seguro)' : 'Expo with Unistyles (type-safe styling)', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: ExpoIcon },
        { id: 'none', name: isEs ? 'Sin Frontend Nativo' : 'No Native Frontend', desc: isEs ? 'Sin frontend nativo para móvil' : 'No native mobile frontend', isNone: true, default: true }
      ]
    },
    {
      key: 'backend',
      label: 'Backend',
      step: isEs ? '02 / ARQUITECTURA DE SERVICIO' : '02 / SERVICE ARCHITECTURE',
      icon: Cpu,
      colorClass: 'text-brand-primary',
      options: [
        { id: 'hono', name: 'Hono', desc: isEs ? 'Framework web ultrarrápido' : 'Ultrafast web framework', hoverColor: 'group-hover/btn:text-[#e36002]', activeColor: 'text-[#e36002]', iconComponent: SvglHonoLogo },
        { id: 'elysia', name: 'Elysia', desc: isEs ? 'Framework web para TypeScript' : 'TypeScript web framework', hoverColor: 'group-hover/btn:text-[#42b883]', activeColor: 'text-[#42b883]', iconComponent: SvglBunLogo },
        { id: 'express', name: 'Express', desc: isEs ? 'Framework popular de Node.js' : 'Popular Node.js framework', hoverColor: 'group-hover/btn:text-[#68a063]', activeColor: 'text-[#68a063]', iconComponent: SvglExpressjsLogo, default: true },
        { id: 'fastify', name: 'Fastify', desc: isEs ? 'Framework web rápido y de bajo consumo para Node.js' : 'Fast, low-overhead web framework for Node.js', hoverColor: 'group-hover/btn:text-[#ffffff]', activeColor: 'text-[#ffffff]', iconComponent: SvglFastifyLogo },
        { id: 'convex', name: 'Convex', desc: isEs ? 'Backend reactivo como servicio' : 'Reactive backend-as-a-service', hoverColor: 'group-hover/btn:text-[#f43f5e]', activeColor: 'text-[#f43f5e]', iconComponent: SvglMongoDBLogo },
        { id: 'fullstack-next', name: 'Fullstack Next.js', desc: isEs ? 'Usa las rutas de API integradas de Next.js' : 'Use Next.js built-in API routes', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglNextjsLogo },
        { id: 'fullstack-tanstack', name: 'Fullstack TanStack Start', desc: isEs ? 'Usa las rutas de API de TanStack Start (Requiere frontend TanStack Start)' : 'Use TanStack Start\'s built-in API routes (Requires TanStack Start frontend)', hoverColor: 'group-hover/btn:text-[#ff5d01]', activeColor: 'text-[#ff5d01]', iconComponent: SvglReactLogo },
        { id: 'fullstack-nuxt', name: 'Fullstack Nuxt', desc: isEs ? 'Usa las rutas de servidor de Nuxt (Requiere frontend Nuxt)' : 'Use Nuxt\'s built-in server routes (Requires Nuxt frontend)', hoverColor: 'group-hover/btn:text-[#00dc82]', activeColor: 'text-[#00dc82]', iconComponent: SvglNuxtLogo },
        { id: 'fullstack-sveltekit', name: 'Fullstack SvelteKit', desc: isEs ? 'Usa las rutas de servidor de SvelteKit (Requiere frontend SvelteKit)' : 'Use SvelteKit\'s built-in server routes (Requires SvelteKit frontend)', hoverColor: 'group-hover/btn:text-[#ff3e00]', activeColor: 'text-[#ff3e00]', iconComponent: SvglSvelteLogo },
        { id: 'fullstack-astro', name: 'Fullstack Astro', desc: isEs ? 'Usa las rutas de API de Astro (Requiere frontend Astro)' : 'Use Astro\'s built-in API routes (Requires Astro frontend)', hoverColor: 'group-hover/btn:text-[#ff5d01]', activeColor: 'text-[#ff5d01]', iconComponent: AstroIcon },
        { id: 'none', name: isEs ? 'Sin Backend' : 'No Backend', desc: isEs ? 'Omitir integración de backend (solo frontend)' : 'Skip backend integration (frontend only)', isNone: true }
      ]
    },
    {
      key: 'runtime',
      label: isEs ? 'Entorno de Ejecución' : 'Runtime',
      step: isEs ? '03 / ENTORNO DE EJECUCIÓN' : '03 / RUNTIME ENVIRONMENT',
      icon: Cpu,
      colorClass: 'text-brand-secondary',
      options: [
        { id: 'bun', name: 'Bun', desc: isEs ? 'Runtime y conjunto de herramientas rápidas de JS' : 'Fast JavaScript runtime & toolkit', hoverColor: 'group-hover/btn:text-[#fbf0e9]', activeColor: 'text-[#fbf0e9]', iconComponent: SvglBunLogo },
        { id: 'node', name: 'Node.js', desc: isEs ? 'Entorno de ejecución clásico de JavaScript' : 'JavaScript runtime environment', hoverColor: 'group-hover/btn:text-[#68a063]', activeColor: 'text-[#68a063]', iconComponent: NodejsIcon, default: true },
        { id: 'cloudflare', name: 'Cloudflare Workers', desc: isEs ? 'Entorno serverless para el edge' : 'Serverless runtime for the edge', hoverColor: 'group-hover/btn:text-[#f38020]', activeColor: 'text-[#f38020]', iconComponent: SvglRustLogo },
        { id: 'none', name: isEs ? 'Sin Runtime' : 'No Runtime', desc: isEs ? 'Sin entorno de ejecución específico' : 'No specific runtime', isNone: true }
      ]
    },
    {
      key: 'orm',
      label: 'ORM',
      step: isEs ? '04 / MAPEADOR DE BASE DE DATOS' : '04 / DATABASE MAPPER',
      icon: Database,
      colorClass: 'text-brand-primary',
      options: [
        { id: 'drizzle', name: 'Drizzle', desc: isEs ? 'ORM seguro para tipos en TypeScript' : 'TypeScript ORM', hoverColor: 'group-hover/btn:text-[#c5f74f]', activeColor: 'text-[#c5f74f]', iconComponent: DrizzleIcon, default: true },
        { id: 'prisma', name: 'Prisma', desc: isEs ? 'ORM de nueva generación' : 'Next-gen ORM', hoverColor: 'group-hover/btn:text-[#5a4fc4]', activeColor: 'text-[#5a4fc4]', iconComponent: SvglPrismaLogo },
        { id: 'mongoose', name: 'Mongoose', desc: isEs ? 'Modelado de objetos para MongoDB' : 'Elegant object modeling tool (Mongoose only works with MongoDB)', hoverColor: 'group-hover/btn:text-[#880000]', activeColor: 'text-[#880000]', iconComponent: SvglMongoDBLogo },
        { id: 'none', name: isEs ? 'Sin ORM' : 'No ORM', desc: isEs ? 'Omitir ORM (La base de datos requerirá un ORM)' : 'Skip ORM integration (Database requires an ORM)' }
      ]
    },
    {
      key: 'api',
      label: 'API',
      step: isEs ? '05 / PROTOCOLO API' : '05 / API PROTOCOL',
      icon: Settings,
      colorClass: 'text-brand-secondary',
      options: [
        { id: 'trpc', name: 'tRPC', desc: isEs ? 'APIs seguras para tipos de extremo a extremo' : 'End-to-end typesafe APIs', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglBetterAuthLogo },
        { id: 'orpc', name: 'oRPC', desc: isEs ? 'APIs seguras para tipos de manera simple' : 'Typesafe APIs Made Simple', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglValibotLogo },
        { id: 'none', name: isEs ? 'Sin API' : 'No API', desc: isEs ? 'Sin capa de API (rutas de API deshabilitadas)' : 'No API layer (API routes disabled)', isNone: true, default: true }
      ]
    },
    {
      key: 'package_manager',
      label: isEs ? 'Gestor de Paquetes' : 'Package Manager',
      step: isEs ? '06 / GESTOR DE PAQUETES' : '06 / PACKAGE MANAGER',
      icon: Settings,
      colorClass: 'text-brand-secondary',
      options: [
        { id: 'npm', name: 'npm', desc: isEs ? 'Gestor de paquetes predeterminado de Node.js.' : 'Default Node.js package manager.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglNPMLogo },
        { id: 'pnpm', name: 'pnpm', desc: isEs ? 'Gestor rápido y eficiente en espacio de disco.' : 'Fast, disk space efficient package manager.', hoverColor: 'group-hover/btn:text-[#f68712]', activeColor: 'text-[#f68712]', iconComponent: SvglPnpmLogo, default: true },
        { id: 'bun', name: 'Bun', desc: isEs ? 'Gestor de paquetes rápido integrado de Bun.' : 'Bun built-in fast package manager.', hoverColor: 'group-hover/btn:text-[#fbf0e9]', activeColor: 'text-[#fbf0e9]', iconComponent: SvglBunLogo }
      ]
    },
    {
      key: 'auth',
      label: isEs ? 'Autenticación' : 'Authentication',
      step: isEs ? '07 / CONTROL DE ACCESO' : '07 / ACCESS CONTROL',
      icon: Shield,
      colorClass: 'text-brand-primary',
      options: [
        { id: 'better-auth', name: 'Better Auth', desc: isEs ? 'Framework de autenticación moderno y flexible' : 'Modern and flexible authentication framework', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary', iconComponent: SvglBetterAuthLogo },
        { id: 'clerk', name: 'Clerk', desc: isEs ? 'Autenticación completa como servicio y componentes UI' : 'Complete authentication-as-a-service with UI components', hoverColor: 'group-hover/btn:text-[#6C47FF]', activeColor: 'text-[#6C47FF]', iconComponent: SvglClerkLogo },
        { id: 'authjs', name: 'Auth.js', desc: isEs ? 'Autenticación robusta y de código abierto para Next.js/SvelteKit' : 'Robust open-source authentication for Next.js/SvelteKit', hoverColor: 'group-hover/btn:text-[#a11ec6]', activeColor: 'text-[#a11ec6]', iconComponent: SvglAuthjsLogo },
        { id: 'none', name: isEs ? 'Sin Autenticación' : 'No Authentication', desc: isEs ? 'Sin sistema de autenticación configurado' : 'No authentication system configured', isNone: true, default: true }
      ]
    },
    {
      key: 'tools',
      label: isEs ? 'Herramientas' : 'Tools',
      step: isEs ? '08 / HERRAMIENTAS DE UTILIDAD' : '08 / UTILITY TOOLS',
      icon: Blocks,
      colorClass: 'text-brand-primary',
      options: [
        { id: 'zod', name: 'Zod', desc: isEs ? 'Validación de esquemas enfocada en TypeScript.' : 'TypeScript-first schema validation library.', hoverColor: 'group-hover/btn:text-[#3e67ad]', activeColor: 'text-[#3e67ad]', iconComponent: ZodIcon, default: true },
        { id: 'valibot', name: 'Valibot', desc: isEs ? 'Validador de esquemas modular y ultraligero.' : 'Modular, ultra-light schema validator.', hoverColor: 'group-hover/btn:text-[#e0234e]', activeColor: 'text-[#e0234e]', iconComponent: SvglValibotLogo },
        { id: 'motion', name: 'Motion', desc: isEs ? 'Librería de animaciones fluida y declarativa.' : 'Fluid and declarative animation library.', hoverColor: 'group-hover/btn:text-[#ff0055]', activeColor: 'text-[#ff0055]', iconComponent: MotionIcon },
        { id: 'lucide', name: 'Lucide', desc: isEs ? 'Set de iconos vectoriales consistentes y hermosos.' : 'Consistent and beautiful vector icon set.', hoverColor: 'group-hover/btn:text-[#f43f5e]', activeColor: 'text-[#f43f5e]', iconComponent: LucideIcon },
        { id: 'svgl', name: 'SVGL', desc: isEs ? 'Biblioteca de logotipos SVG para tecnología moderna.' : 'SVG logo library for modern tech stack.', hoverColor: 'group-hover/btn:text-[#38bdf8]', activeColor: 'text-[#38bdf8]', iconComponent: SvglIcon },
        { id: 'sonner', name: 'Sonner', desc: isEs ? 'Componente de notificaciones toast elegante.' : 'Elegant toast notifications component.', hoverColor: 'group-hover/btn:text-[#10b981]', activeColor: 'text-[#10b981]', iconComponent: SonnerIcon },
        { id: 'none', name: isEs ? 'Sin Herramientas' : 'No Tool', desc: isEs ? 'Sin herramientas de utilidad seleccionadas.' : 'No utility tools selected.', isNone: true }
      ]
    },
    {
      key: 'payments',
      label: isEs ? 'Pagos' : 'Payments',
      step: isEs ? '09 / MONETIZACIÓN' : '09 / MONETIZATION',
      icon: Database,
      colorClass: 'text-brand-secondary',
      options: [
        { id: 'stripe', name: 'Stripe', desc: isEs ? 'Infraestructura global de pagos y SDK.' : 'Global payment infrastructure SDK.', hoverColor: 'group-hover/btn:text-brand-secondary', activeColor: 'text-brand-secondary', iconComponent: SvglStripeLogo },
        { id: 'polar', name: 'Polar.sh', desc: isEs ? 'Monetización para desarrolladores y pagos SaaS.' : 'Developer monetization & SaaS payments.', hoverColor: 'group-hover/btn:text-[#1d9bf0]', activeColor: 'text-[#1d9bf0]', iconComponent: SvglPolarLogo },
        { id: 'none', name: isEs ? 'Sin Pagos' : 'No Payments', desc: isEs ? 'Sin pasarela de pagos configurada.' : 'No monetization system configured.', isNone: true, default: true }
      ]
    },
    {
      key: 'db',
      label: isEs ? 'Base de Datos' : 'Database',
      step: isEs ? '10 / ALMACENAMIENTO DE DATOS' : '10 / DATA STORAGE',
      icon: Database,
      colorClass: 'text-brand-primary',
      options: [
        { id: 'sqlite', name: 'SQLite', desc: isEs ? 'Base de datos SQL basada en archivos' : 'File-based SQL database', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary', iconComponent: DrizzleIcon },
        { id: 'postgres', name: 'PostgreSQL', desc: isEs ? 'Base de datos SQL robusta y avanzada' : 'Advanced SQL database', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary', iconComponent: SvglPostgreSQLLogo, default: true },
        { id: 'mysql', name: 'MySQL', desc: isEs ? 'Base de datos relacional muy popular' : 'Popular relational database', hoverColor: 'group-hover/btn:text-brand-primary', activeColor: 'text-brand-primary', iconComponent: SvglPostgreSQLLogo },
        { id: 'mongodb', name: 'MongoDB', desc: isEs ? 'Base de datos NoSQL orientada a documentos' : 'NoSQL document database', hoverColor: 'group-hover/btn:text-[#47a248]', activeColor: 'text-[#47a248]', iconComponent: SvglMongoDBLogo },
        { id: 'none', name: isEs ? 'Sin Base de Datos' : 'No Database', desc: isEs ? 'Omitir integración de base de datos' : 'Skip database integration', isNone: true }
      ]
    }
  ];
};

export const getInfrastructureOptions = (lang: string): InfraOption[] => {
  const isEs = lang === 'es';
  return [
    {
      id: 'docker',
      title: isEs ? 'Configuración de Docker Compose' : 'Docker Compose Setup',
      description: isEs ? 'Configurar contenedor Docker Compose local para la base de datos' : 'Configure local Docker Compose container for database',
      iconComponent: SvglDockerLogo,
      bindingKey: 'withDocker',
      default: true
    },
    {
      id: 'ci',
      title: isEs ? 'Flujo de GitHub Actions' : 'GitHub Actions',
      description: isEs ? 'Configurar workflows de GitHub Actions para CI/CD continuo' : 'Configure GitHub Actions workflows for continuous CI/CD',
      iconComponent: GitBranch,
      bindingKey: 'withCi'
    },
    {
      id: 'linter',
      title: isEs ? 'Configuración de Biome / Linter' : 'Biome / Linter Config',
      description: isEs ? 'Añadir reglas estándar de formateo y linter de Biome' : 'Add standard Biome formatting and linting rules',
      iconComponent: Sparkles,
      bindingKey: 'withLinter'
    },
    {
      id: 'testing',
      title: isEs ? 'Entorno de Pruebas Unitarias' : 'Unit Testing Environment',
      description: isEs ? 'Configurar Vitest y suite de pruebas unitarias' : 'Set up Vitest and unit testing environment suite',
      iconComponent: TestTube,
      bindingKey: 'withTesting'
    },
    {
      id: 'turborepo',
      title: isEs ? 'Monorepo con Turborepo' : 'Turborepo Monorepo',
      description: isEs ? 'Configurar Turborepo para escala óptima de múltiples paquetes' : 'Configure Turborepo for scaling multiple packages',
      iconComponent: SvglTurborepoLogo,
      bindingKey: 'withTurborepo',
      default: true
    }
  ];
};
