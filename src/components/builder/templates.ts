export interface KokoTemplateConfig {
  selectedFront: string;
  selectedNativeFront: string;
  selectedBack: string;
  selectedDb: string;
  selectedAuth: string;
  selectedPackageManager: string;
  selectedTools: string;
  selectedPayments: string;
  selectedEmail: string;
  withDocker: boolean;
  withTurborepo: boolean;
  selectedRuntime?: string;
  withCi?: boolean;
  withLinter?: boolean;
  withTesting?: boolean;
}

export interface KokoTemplate {
  id: string;
  nameEs: string;
  nameEn: string;
  descEs: string;
  descEn: string;
  icon: string;
  config: KokoTemplateConfig;
}

const SvglNextjsLogo = '/logos/nextjs.svg';
const SvglReactLogo = '/logos/react.svg';
const SvglSvelteLogo = '/logos/svelte.svg';
const SvglPostgreSQLLogo = '/logos/postgresql.svg';
const SvglMongoDBLogo = '/logos/mongodb.svg';
const SvglPythonLogo = '/logos/python.svg';

export const templates: KokoTemplate[] = [
  {
    id: 'saas-next',
    nameEs: 'Boilerplate SaaS Next.js',
    nameEn: 'SaaS Next.js Boilerplate',
    descEs: 'Next.js + Go Fiber + Prisma + Better-Auth + Stripe. La receta definitiva para lanzar un SaaS.',
    descEn: 'Next.js + Go Fiber + Prisma + Better-Auth + Stripe. The ultimate recipe to launch a SaaS.',
    icon: SvglNextjsLogo,
    config: {
      selectedFront: 'nextjs',
      selectedNativeFront: 'none',
      selectedBack: 'go',
      selectedDb: 'prisma',
      selectedAuth: 'better-auth',
      selectedPackageManager: 'pnpm',
      selectedTools: 'zod',
      selectedPayments: 'stripe',
      selectedEmail: 'resend',
      withDocker: true,
      withTurborepo: true
    }
  },
  {
    id: 'fullstack-svelte',
    nameEs: 'Full-Stack Svelte 5 + NestJS',
    nameEn: 'Svelte 5 + NestJS Fullstack',
    descEs: 'SvelteKit + NestJS + Drizzle + Better-Auth. Ideal para monorepos con reactividad extrema.',
    descEn: 'SvelteKit + NestJS + Drizzle + Better-Auth. Ideal for monorepos with extreme reactivity.',
    icon: SvglSvelteLogo,
    config: {
      selectedFront: 'sveltekit',
      selectedNativeFront: 'none',
      selectedBack: 'nestjs',
      selectedDb: 'drizzle',
      selectedAuth: 'better-auth',
      selectedPackageManager: 'pnpm',
      selectedTools: 'zod',
      selectedPayments: 'stripe',
      selectedEmail: 'resend',
      withDocker: true,
      withTurborepo: true
    }
  },
  {
    id: 'mern',
    nameEs: 'MERN Stack Clásico',
    nameEn: 'Classic MERN Stack',
    descEs: 'React SPA + Node.js Express + MongoDB. El stack legendario para aplicaciones web modernas.',
    descEn: 'React SPA + Node.js Express + MongoDB. The legendary stack for modern web applications.',
    icon: SvglMongoDBLogo,
    config: {
      selectedFront: 'react',
      selectedNativeFront: 'none',
      selectedBack: 'node',
      selectedDb: 'mongo',
      selectedAuth: 'better-auth',
      selectedPackageManager: 'npm',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: false
    }
  },
  {
    id: 'pern',
    nameEs: 'PERN Stack Moderno',
    nameEn: 'Modern PERN Stack',
    descEs: 'React SPA + Node.js Express + PostgreSQL (Prisma). Una base sólida y relacional para escalar.',
    descEn: 'React SPA + Node.js Express + PostgreSQL (Prisma). A solid relational foundation to scale.',
    icon: SvglPostgreSQLLogo,
    config: {
      selectedFront: 'react',
      selectedNativeFront: 'none',
      selectedBack: 'node',
      selectedDb: 'prisma',
      selectedAuth: 'better-auth',
      selectedPackageManager: 'pnpm',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: false
    }
  },
  {
    id: 'python-fastapi',
    nameEs: 'FastAPI + React SPA',
    nameEn: 'FastAPI + React SPA',
    descEs: 'React SPA + Python FastAPI + Supabase Auth. Un stack liviano ideal para análisis de datos.',
    descEn: 'React SPA + Python FastAPI + Supabase Auth. A lightweight stack ideal for data analysis.',
    icon: SvglPythonLogo,
    config: {
      selectedFront: 'react',
      selectedNativeFront: 'none',
      selectedBack: 'python',
      selectedDb: 'none',
      selectedAuth: 'supabase',
      selectedPackageManager: 'npm',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: false
    }
  },
  {
    id: 'mobile-go',
    nameEs: 'Mobile React Native + Go',
    nameEn: 'Mobile React Native + Go',
    descEs: 'Aplicación nativa móvil con React Native + backend de alto rendimiento en Go Fiber.',
    descEn: 'Native mobile app with React Native + high performance Go Fiber backend api.',
    icon: SvglReactLogo,
    config: {
      selectedFront: 'none',
      selectedNativeFront: 'expo-bare',
      selectedBack: 'go',
      selectedDb: 'sqlx',
      selectedAuth: 'supabase',
      selectedPackageManager: 'bun',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: true
    }
  }
];
