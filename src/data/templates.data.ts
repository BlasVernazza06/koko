import type { KokoTemplate } from '@/types/builder.types';

const SvglNextjsLogo = '/logos/nextjs.svg';
const SvglReactLogo = '/logos/react.svg';
const SvglNestJSLogo = '/logos/nestjs.svg';
const SvglPostgreSQLLogo = '/logos/postgresql.svg';
const SvglMongoDBLogo = '/logos/mongodb.svg';
const SvglPythonLogo = '/logos/python.svg';
const SvglJavaLogo = '/logos/java.svg';

export const templates: KokoTemplate[] = [
  {
    id: 'saas-next',
    nameEs: 'Boilerplate SaaS Next.js',
    nameEn: 'SaaS Next.js Boilerplate',
    descEs: 'Next.js (App Router) + PostgreSQL (Prisma) + Better-Auth + Stripe + Resend. La receta definitiva para monetizar tu SaaS.',
    descEn: 'Next.js (App Router) + PostgreSQL (Prisma) + Better-Auth + Stripe + Resend. The ultimate recipe to bootstrap a SaaS.',
    icon: SvglNextjsLogo,
    config: {
      selectedFront: 'nextjs',
      selectedNativeFront: 'none',
      selectedBack: 'fullstack-next',
      selectedDb: 'postgres',
      selectedAuth: 'better-auth',
      selectedPackageManager: 'pnpm',
      selectedTools: 'zod',
      selectedPayments: 'stripe',
      selectedEmail: 'resend',
      withDocker: true,
      withTurborepo: true,
      selectedRuntime: 'node',
      selectedOrm: 'prisma',
      selectedApi: 'none',
      withCi: true,
      withLinter: true,
      withTesting: false
    }
  },
  {
    id: 'java-spring',
    nameEs: 'Enterprise Java Spring Boot',
    nameEn: 'Enterprise Java Spring Boot',
    descEs: 'React SPA + Java Spring Boot 3 + PostgreSQL + Docker. El estándar backend de alta concurrencia empresarial.',
    descEn: 'React SPA + Java Spring Boot 3 + PostgreSQL + Docker. The enterprise standard for high-concurrency backends.',
    icon: SvglJavaLogo,
    config: {
      selectedFront: 'react',
      selectedNativeFront: 'none',
      selectedBack: 'spring',
      selectedDb: 'postgres',
      selectedAuth: 'none',
      selectedPackageManager: 'pnpm',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: true,
      selectedRuntime: 'none',
      selectedOrm: 'none',
      selectedApi: 'none',
      withCi: true,
      withLinter: false,
      withTesting: true
    }
  },
  {
    id: 'enterprise-nestjs',
    nameEs: 'Enterprise NestJS + Next.js',
    nameEn: 'Enterprise NestJS + Next.js',
    descEs: 'Next.js + NestJS + PostgreSQL (Prisma) + Better-Auth. Arquitectura modular escalable con tipado estricto.',
    descEn: 'Next.js + NestJS + PostgreSQL (Prisma) + Better-Auth. Scalable modular architecture with strict typing.',
    icon: SvglNestJSLogo,
    config: {
      selectedFront: 'nextjs',
      selectedNativeFront: 'none',
      selectedBack: 'nestjs',
      selectedDb: 'postgres',
      selectedAuth: 'better-auth',
      selectedPackageManager: 'pnpm',
      selectedTools: 'zod',
      selectedPayments: 'stripe',
      selectedEmail: 'resend',
      withDocker: true,
      withTurborepo: true,
      selectedRuntime: 'node',
      selectedOrm: 'prisma',
      selectedApi: 'none',
      withCi: true,
      withLinter: true,
      withTesting: true
    }
  },
  {
    id: 'mern',
    nameEs: 'MERN Stack Clásico',
    nameEn: 'Classic MERN Stack',
    descEs: 'React SPA + Node.js Express + MongoDB + Mongoose. El stack legendario para aplicaciones web modernas.',
    descEn: 'React SPA + Node.js Express + MongoDB + Mongoose. The legendary stack for modern web applications.',
    icon: SvglMongoDBLogo,
    config: {
      selectedFront: 'react',
      selectedNativeFront: 'none',
      selectedBack: 'express',
      selectedDb: 'mongodb',
      selectedAuth: 'better-auth',
      selectedPackageManager: 'npm',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: false,
      selectedRuntime: 'node',
      selectedOrm: 'mongoose',
      selectedApi: 'none',
      withCi: false,
      withLinter: false,
      withTesting: false
    }
  },
  {
    id: 'pern',
    nameEs: 'PERN Stack Moderno',
    nameEn: 'Modern PERN Stack',
    descEs: 'React SPA + Node.js Express + PostgreSQL + Prisma ORM. Una base relacional sólida y tipada para escalar.',
    descEn: 'React SPA + Node.js Express + PostgreSQL + Prisma ORM. A solid, typesafe relational foundation to scale.',
    icon: SvglPostgreSQLLogo,
    config: {
      selectedFront: 'react',
      selectedNativeFront: 'none',
      selectedBack: 'express',
      selectedDb: 'postgres',
      selectedAuth: 'better-auth',
      selectedPackageManager: 'pnpm',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: false,
      selectedRuntime: 'node',
      selectedOrm: 'prisma',
      selectedApi: 'none',
      withCi: false,
      withLinter: true,
      withTesting: false
    }
  },
  {
    id: 'python-fastapi',
    nameEs: 'FastAPI + React SPA',
    nameEn: 'FastAPI + React SPA',
    descEs: 'React SPA + Python FastAPI + PostgreSQL + Docker. Stack asíncrono ideal para plataformas de IA y datos.',
    descEn: 'React SPA + Python FastAPI + PostgreSQL + Docker. Asynchronous stack ideal for AI & data platforms.',
    icon: SvglPythonLogo,
    config: {
      selectedFront: 'react',
      selectedNativeFront: 'none',
      selectedBack: 'fastapi',
      selectedDb: 'postgres',
      selectedAuth: 'supabase',
      selectedPackageManager: 'npm',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: false,
      selectedRuntime: 'none',
      selectedOrm: 'none',
      selectedApi: 'none',
      withCi: false,
      withLinter: false,
      withTesting: false
    }
  },
  {
    id: 'mobile-expo',
    nameEs: 'Mobile Expo + Express API',
    nameEn: 'Mobile Expo + Express API',
    descEs: 'Expo React Native + Node Express API + PostgreSQL + Supabase. Desarrollo móvil multiplataforma líder.',
    descEn: 'Expo React Native + Node Express API + PostgreSQL + Supabase. Industry-leading cross-platform mobile stack.',
    icon: SvglReactLogo,
    config: {
      selectedFront: 'none',
      selectedNativeFront: 'expo-bare',
      selectedBack: 'express',
      selectedDb: 'postgres',
      selectedAuth: 'supabase',
      selectedPackageManager: 'pnpm',
      selectedTools: 'zod',
      selectedPayments: 'none',
      selectedEmail: 'none',
      withDocker: true,
      withTurborepo: true,
      selectedRuntime: 'node',
      selectedOrm: 'prisma',
      selectedApi: 'none',
      withCi: true,
      withLinter: true,
      withTesting: false
    }
  }
];
