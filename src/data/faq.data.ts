import type { FAQItem, FAQCategory } from '@/types/faq.types';

export const faqCategoriesEs: FAQCategory[] = [
  { id: 'general', label: 'General' },
  { id: 'stacks', label: 'Arquitectura y Stacks' },
  { id: 'database', label: 'Bases de Datos y ORMs' },
  { id: 'tooling', label: 'Linters y Calidad' },
  { id: 'devops', label: 'Docker, CI/CD e Infra' },
  { id: 'config', label: 'Configuración y CLI' }
];

export const faqCategoriesEn: FAQCategory[] = [
  { id: 'general', label: 'General' },
  { id: 'stacks', label: 'Architecture & Stacks' },
  { id: 'database', label: 'Databases & ORMs' },
  { id: 'tooling', label: 'Tooling & Quality' },
  { id: 'devops', label: 'Docker, CI/CD & Infra' },
  { id: 'config', label: 'Config & CLI Commands' }
];

export const faqsEs: FAQItem[] = [
  // 1. GENERAL
  {
    id: "what-is-koko",
    category: "general",
    question: "¿Qué es Koko CLI y en qué se diferencia de herramientas como create-next-app?",
    answer: "<strong>Koko CLI</strong> es una herramienta de terminal de alto rendimiento escrita en <a href=\"https://go.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Go</code></a> que no se limita a un solo framework. Permite diseñar y estructurar arquitecturas completas (Frontend, Backend, Base de Datos, ORM, <code>docker-compose.yml</code>, Linters y CI/CD) en milisegundos, ya sea como monorepos modulares o proyectos independientes listos para producción."
  },
  {
    id: "how-to-start",
    category: "general",
    question: "¿Cómo puedo empezar a usar Koko CLI en mi terminal?",
    answer: "Puedes ejecutarlo instantáneamente sin instalación previa con <code>npx koko-cli init</code> (o mediante <code>bun create koko-app</code> o <code>pnpm create koko-app</code>). También puedes descargar el binario nativo compilado en Go para Windows (<code>koko.exe</code>), macOS o Linux desde las <a href=\"https://github.com/BlasVernazza06/koko-cli/releases\" target=\"_blank\" rel=\"noopener noreferrer\">Releases oficiales de GitHub</a>."
  },
  {
    id: "offline-support",
    category: "general",
    question: "¿Koko CLI requiere conexión a internet para generar proyectos?",
    answer: "No para el scaffolding de archivos. Todas las plantillas y esqueletos base están compilados directamente dentro del binario nativo de Go mediante la directiva <a href=\"https://pkg.go.dev/embed\" target=\"_blank\" rel=\"noopener noreferrer\"><code>//go:embed</code></a>. Solo necesitarás internet si decides instalar las dependencias con tu gestor de paquetes (<a href=\"https://pnpm.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>pnpm</code></a>, <a href=\"https://www.npmjs.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>npm</code></a> o <a href=\"https://bun.sh\" target=\"_blank\" rel=\"noopener noreferrer\"><code>bun</code></a>)."
  },
  {
    id: "os-support",
    category: "general",
    question: "¿En qué sistemas operativos y terminales está soportado?",
    answer: "Es 100% compatible de forma nativa con <strong>Windows</strong> (PowerShell, CMD, WSL), <strong>macOS</strong> (Terminal, iTerm) y <strong>Linux</strong>. Su interfaz TUI interactiva desarrollada con <a href=\"https://github.com/charmbracelet/bubbletea\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Bubble Tea</code></a> y <a href=\"https://github.com/charmbracelet/lipgloss\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Lipgloss</code></a> se adapta con fluidez a cualquier emulador de terminal moderno."
  },

  // 2. STACKS & ARCHITECTURE
  {
    id: "recipes-vs-manual",
    category: "stacks",
    question: "¿Cuál es la diferencia entre \"Quick Setup\" (Recetas) y \"Configuración Manual\"?",
    answer: "<strong>Quick Setup</strong> inicializa recetas de producción probadas con un solo clic (como <em>SaaS Starter</em> con <a href=\"https://nextjs.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Next.js</code></a> + <a href=\"https://orm.drizzle.team\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Drizzle ORM</code></a> + <a href=\"https://www.better-auth.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Better-Auth</code></a> + <a href=\"https://stripe.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Stripe</code></a>, MERN, PERN o <a href=\"https://fastapi.tiangolo.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>FastAPI</code></a> + React). La <strong>Configuración Manual</strong> te permite personalizar cada capa tecnológica a medida paso a paso."
  },
  {
    id: "supported-frameworks",
    category: "stacks",
    question: "¿Qué frameworks de Frontend y Backend están soportados?",
    answer: "En Frontend soporta <a href=\"https://nextjs.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Next.js</code></a> (App Router), <a href=\"https://vite.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>React (Vite)</code></a>, <a href=\"https://nuxt.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Nuxt (Vue)</code></a> y <a href=\"https://svelte.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Svelte 5</code></a>. En Backend soporta <a href=\"https://expressjs.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Node.js Express</code></a>, <a href=\"https://nestjs.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>NestJS</code></a>, <a href=\"https://hono.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Hono</code></a>, <a href=\"https://github.com/go-chi/chi\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Go Chi Router</code></a> y <a href=\"https://fastapi.tiangolo.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Python FastAPI</code></a> (además de la opción de prescindir de alguna capa)."
  },
  {
    id: "monorepo-structure",
    category: "stacks",
    question: "¿Cómo organiza Koko la arquitectura de Monorepo?",
    answer: "Estructura un monorepo modular con <a href=\"https://turbo.build/repo\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Turborepo</code></a> o workspaces nativos de <a href=\"https://pnpm.io/workspaces\" target=\"_blank\" rel=\"noopener noreferrer\"><code>pnpm</code></a>/<code>npm</code> (<code>apps/web</code>, <code>apps/api</code>, <code>packages/db</code>), configuraciones compartidas de <code>tsconfig.json</code>, linters unificados y scripts raíz para levantar todo el entorno con un solo comando."
  },
  {
    id: "standalone-projects",
    category: "stacks",
    question: "¿Puedo generar proyectos individuales (Standalone) sin estructura de monorepo?",
    answer: "Sí. Si eliges únicamente Frontend o únicamente Backend en la configuración manual, Koko CLI generará una estructura limpia y optimizada para proyectos independientes sin la sobrecarga de carpetas de monorepo."
  },

  // 3. DATABASE & ORMS
  {
    id: "supported-databases",
    category: "database",
    question: "¿Qué bases de datos y ORMs puedo elegir en Koko CLI?",
    answer: "Soporta <a href=\"https://www.postgresql.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>PostgreSQL</code></a>, <a href=\"https://www.mysql.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>MySQL</code></a>, <a href=\"https://www.mongodb.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>MongoDB</code></a> y <a href=\"https://www.sqlite.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>SQLite</code></a>, combinados con los ORMs y query builders más populares como <a href=\"https://orm.drizzle.team\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Drizzle ORM</code></a>, <a href=\"https://www.prisma.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Prisma</code></a>, <a href=\"https://mongoosejs.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Mongoose</code></a>, <a href=\"https://gorm.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>GORM (Go)</code></a> y <a href=\"https://www.sqlalchemy.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>SQLAlchemy</code></a> / <a href=\"https://sqlmodel.tiangolo.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>SQLModel</code></a>."
  },
  {
    id: "compatibility-rules",
    category: "database",
    question: "¿Cómo previene Koko combinaciones incompatibles de ORM y Backend?",
    answer: "Koko integra un motor de validación cruzada en tiempo real (<a href=\"https://github.com/BlasVernazza06/koko-cli/tree/main/internal/validator\" target=\"_blank\" rel=\"noopener noreferrer\"><code>internal/validator</code></a> e <a href=\"https://github.com/BlasVernazza06/koko-cli/tree/main/internal/compatibility\" target=\"_blank\" rel=\"noopener noreferrer\"><code>internal/compatibility</code></a>). Si seleccionas un backend en Go o Python, el asistente desactiva automáticamente ORMs exclusivos del ecosistema Node/TypeScript como Prisma o Mongoose."
  },
  {
    id: "db-schemas-migrations",
    category: "database",
    question: "¿Koko CLI genera esquemas y conexiones listas para usar?",
    answer: "Sí. Genera el cliente de base de datos en <code>packages/db</code> (o módulo correspondiente), esquemas iniciales tipados en TypeScript/Go/Python, scripts de migración y variables de entorno listas para conectar inmediatamente."
  },
  {
    id: "docker-db-integration",
    category: "database",
    question: "¿Cómo se conecta la base de datos local generada con Docker?",
    answer: "Si incluyes Docker Compose, Koko genera el servicio del contenedor de base de datos con puertos expuestos, volúmenes de datos persistentes y la cadena de conexión correspondiente precargada en tu archivo <code>.env</code> local."
  },

  // 4. TOOLING & CODE QUALITY
  {
    id: "linters-formatters",
    category: "tooling",
    question: "¿Qué herramientas de linter y formateo de código incluye Koko?",
    answer: "Koko incluye configuraciones estándar y ultra-rápidas con <a href=\"https://biomejs.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Biome</code></a> o <a href=\"https://eslint.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>ESLint</code></a> + <a href=\"https://prettier.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Prettier</code></a>, con reglas estrictas de TypeScript, formateo automático al guardar y scripts de validación preconfigurados en el <code>package.json</code>."
  },
  {
    id: "master-catalog",
    category: "tooling",
    question: "¿Qué es el Catálogo Maestro de Dependencias (internal/catalog)?",
    answer: "Es un registro centralizado y probado dentro de Koko CLI (<a href=\"https://github.com/BlasVernazza06/koko-cli/tree/main/internal/catalog\" target=\"_blank\" rel=\"noopener noreferrer\"><code>internal/catalog</code></a>) que fija las versiones exactas y compatibles de todas las dependencias y tipos de TypeScript, garantizando que los proyectos generados nunca fallen por paquetes incompatibles."
  },
  {
    id: "testing-setup",
    category: "tooling",
    question: "¿Incluye soporte para pruebas unitarias automatizadas?",
    answer: "Sí. Puedes incluir configuraciones listas para <a href=\"https://vitest.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Vitest</code></a> o <a href=\"https://jestjs.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Jest</code></a>, con ejemplos de pruebas unitarias configuradas para probar endpoints de backend y componentes de UI."
  },
  {
    id: "schema-validators",
    category: "tooling",
    question: "¿Cómo se configuran los validadores de esquemas como Zod o Valibot?",
    answer: "Koko puede inyectar <a href=\"https://zod.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Zod</code></a> o <a href=\"https://valibot.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Valibot</code></a> para validación de datos en runtime y tipado estático, integrándolos en formularios, validación de variables de entorno (<code>env.mjs</code> / <code>env.ts</code>) y controladores de API."
  },

  // 5. DEVOPS, DOCKER & CI/CD
  {
    id: "docker-compose-content",
    category: "devops",
    question: "¿Qué contiene el archivo docker-compose.yml generado?",
    answer: "Incluye los servicios necesarios para tu entorno local (servidor de base de datos PostgreSQL/MySQL/MongoDB, herramientas visuales como <a href=\"https://www.adminer.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Adminer</code></a> o <a href=\"https://www.pgadmin.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>pgAdmin</code></a> si aplica y redes de aislamiento local para contenedores)."
  },
  {
    id: "github-actions-ci",
    category: "devops",
    question: "¿Cómo se configuran los flujos de GitHub Actions?",
    answer: "Genera un workflow en <code>.github/workflows/ci.yml</code> para <a href=\"https://docs.github.com/actions\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub Actions</a> que ejecuta chequeo de tipos con <code>tsc --noEmit</code>, linters, tests automatizados y compilación de build en cada Pull Request o push a la rama <code>main</code>."
  },
  {
    id: "env-management",
    category: "devops",
    question: "¿Cómo gestiona Koko las variables de entorno (.env)?",
    answer: "Genera archivos <code>.env.example</code> y <code>.env.local</code> documentados con valores seguros para desarrollo local, previniendo la fuga accidental de credenciales o secretos en repositorios públicos."
  },
  {
    id: "deployment-platforms",
    category: "devops",
    question: "¿Es fácil desplegar el proyecto generado en Vercel, Railway o VPS?",
    answer: "Totalmente. Las aplicaciones siguen estándares modernos de la industria sin configuraciones propietarias, listas para desplegar el frontend en <a href=\"https://vercel.com\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Vercel</strong></a> / <a href=\"https://www.netlify.com\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Netlify</strong></a> y el backend/base de datos en plataformas como <a href=\"https://railway.com\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Railway</strong></a>, <a href=\"https://fly.io\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Fly.io</strong></a>, <a href=\"https://render.com\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Render</strong></a> o servidores VPS con Docker."
  },

  // 6. CONFIG & COMMANDS
  {
    id: "koko-config-manifest",
    category: "config",
    question: "¿Qué es el archivo koko.config.json y para qué sirve?",
    answer: "Es el manifiesto JSON generado en la raíz del proyecto (<code>koko.config.json</code>) que documenta el stack exacto, versión del CLI, gestor de paquetes y servicios activos. Sirve como fuente de verdad para futuras herramientas y subcomandos de evolución."
  },
  {
    id: "cli-commands-flags",
    category: "config",
    question: "¿Qué comandos y flags ofrece Koko CLI?",
    answer: "Cuenta con <code>koko init</code> (inicia el asistente interactivo o acepta flags directos como <code>--name</code>, <code>--front</code>, <code>--db</code>), <code>koko --version</code> y <code>koko --help</code> para asistencia rápida en terminal."
  },
  {
    id: "stack-evolution",
    category: "config",
    question: "¿Cómo puedo actualizar o evolucionar mi stack tras la creación inicial?",
    answer: "Gracias a que Koko genera código limpio y modular, puedes agregar nuevos paquetes con tu gestor habitual o consultar la documentación de Koko para extender módulos de autenticación (<a href=\"https://www.better-auth.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Better-Auth</code></a>, <a href=\"https://clerk.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Clerk</code></a>) y contenedores adicionales."
  },
  {
    id: "contribute-bugs",
    category: "config",
    question: "¿Cómo puedo reportar un bug o contribuir al desarrollo de Koko CLI?",
    answer: "Puedes abrir un issue o pull request directamente en nuestro repositorio oficial de GitHub en <a href=\"https://github.com/BlasVernazza06/koko-cli\" target=\"_blank\" rel=\"noopener noreferrer\"><code>github.com/BlasVernazza06/koko-cli</code></a>. ¡Toda contribución de la comunidad es bienvenida!"
  }
];

export const faqsEn: FAQItem[] = [
  // 1. GENERAL
  {
    id: "what-is-koko",
    category: "general",
    question: "What is Koko CLI and how does it differ from tools like create-next-app?",
    answer: "<strong>Koko CLI</strong> is a high-performance terminal tool written in <a href=\"https://go.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Go</code></a> that is not restricted to a single framework. It allows you to design and scaffold full-stack architectures (Frontend, Backend, Database, ORM, <code>docker-compose.yml</code>, Linters, and CI/CD) in milliseconds, either as modular monorepos or standalone production-ready apps."
  },
  {
    id: "how-to-start",
    category: "general",
    question: "How do I get started using Koko CLI in my terminal?",
    answer: "You can run it instantly without prior installation using <code>npx koko-cli init</code> (or via <code>bun create koko-app</code> or <code>pnpm create koko-app</code>). You can also download pre-compiled native Go binaries for Windows (<code>koko.exe</code>), macOS, or Linux directly from our official <a href=\"https://github.com/BlasVernazza06/koko-cli/releases\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub Releases</a>."
  },
  {
    id: "offline-support",
    category: "general",
    question: "Does Koko CLI require an internet connection to scaffold projects?",
    answer: "Not for file scaffolding. All base templates and project skeletons are compiled directly inside the native Go binary using the <a href=\"https://pkg.go.dev/embed\" target=\"_blank\" rel=\"noopener noreferrer\"><code>//go:embed</code></a> directive. An internet connection is only needed when installing packages with your package manager (<a href=\"https://pnpm.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>pnpm</code></a>, <a href=\"https://www.npmjs.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>npm</code></a>, or <a href=\"https://bun.sh\" target=\"_blank\" rel=\"noopener noreferrer\"><code>bun</code></a>)."
  },
  {
    id: "os-support",
    category: "general",
    question: "Which operating systems and terminals are supported?",
    answer: "It is 100% natively compatible with <strong>Windows</strong> (PowerShell, CMD, WSL), <strong>macOS</strong> (Terminal, iTerm), and <strong>Linux</strong>. Its interactive TUI powered by <a href=\"https://github.com/charmbracelet/bubbletea\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Bubble Tea</code></a> and <a href=\"https://github.com/charmbracelet/lipgloss\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Lipgloss</code></a> renders seamlessly across all modern terminal emulators."
  },

  // 2. STACKS & ARCHITECTURE
  {
    id: "recipes-vs-manual",
    category: "stacks",
    question: "What is the difference between \"Quick Setup\" (Recipes) and \"Manual Configuration\"?",
    answer: "<strong>Quick Setup</strong> bootstraps production-tested recipes in a single click (such as <em>SaaS Starter</em> with <a href=\"https://nextjs.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Next.js</code></a> + <a href=\"https://orm.drizzle.team\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Drizzle ORM</code></a> + <a href=\"https://www.better-auth.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Better-Auth</code></a> + <a href=\"https://stripe.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Stripe</code></a>, MERN, PERN, or <a href=\"https://fastapi.tiangolo.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>FastAPI</code></a> + React). <strong>Manual Configuration</strong> allows you to customize every layer of your technology stack step-by-step."
  },
  {
    id: "supported-frameworks",
    category: "stacks",
    question: "Which Frontend and Backend frameworks are supported?",
    answer: "For Frontend: <a href=\"https://nextjs.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Next.js</code></a> (App Router), <a href=\"https://vite.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>React (Vite)</code></a>, <a href=\"https://nuxt.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Nuxt (Vue)</code></a>, and <a href=\"https://svelte.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Svelte 5</code></a>. For Backend: <a href=\"https://expressjs.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Node.js Express</code></a>, <a href=\"https://nestjs.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>NestJS</code></a>, <a href=\"https://hono.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Hono</code></a>, <a href=\"https://github.com/go-chi/chi\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Go Chi Router</code></a>, and <a href=\"https://fastapi.tiangolo.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Python FastAPI</code></a> (with options to omit either layer)."
  },
  {
    id: "monorepo-structure",
    category: "stacks",
    question: "How does Koko structure a Monorepo architecture?",
    answer: "It scaffolds a clean monorepo powered by <a href=\"https://turbo.build/repo\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Turborepo</code></a> or native <a href=\"https://pnpm.io/workspaces\" target=\"_blank\" rel=\"noopener noreferrer\"><code>pnpm</code></a>/<code>npm</code> workspaces (<code>apps/web</code>, <code>apps/api</code>, <code>packages/db</code>), shared <code>tsconfig.json</code> configs, unified linters, and root scripts to spin up the entire ecosystem with one command."
  },
  {
    id: "standalone-projects",
    category: "stacks",
    question: "Can I generate standalone projects without monorepo overhead?",
    answer: "Yes. If you choose only a Frontend or only a Backend during manual configuration, Koko CLI generates a lean, optimized standalone structure without monorepo workspace files."
  },

  // 3. DATABASE & ORMS
  {
    id: "supported-databases",
    category: "database",
    question: "Which databases and ORMs can I choose in Koko CLI?",
    answer: "It supports <a href=\"https://www.postgresql.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>PostgreSQL</code></a>, <a href=\"https://www.mysql.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>MySQL</code></a>, <a href=\"https://www.mongodb.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>MongoDB</code></a>, and <a href=\"https://www.sqlite.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>SQLite</code></a>, paired with top ORMs and query builders such as <a href=\"https://orm.drizzle.team\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Drizzle ORM</code></a>, <a href=\"https://www.prisma.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Prisma</code></a>, <a href=\"https://mongoosejs.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Mongoose</code></a>, <a href=\"https://gorm.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>GORM (Go)</code></a>, and <a href=\"https://www.sqlalchemy.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>SQLAlchemy</code></a> / <a href=\"https://sqlmodel.tiangolo.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>SQLModel</code></a>."
  },
  {
    id: "compatibility-rules",
    category: "database",
    question: "How does Koko prevent incompatible ORM and Backend combinations?",
    answer: "Koko features a real-time cross-validation engine (<a href=\"https://github.com/BlasVernazza06/koko-cli/tree/main/internal/validator\" target=\"_blank\" rel=\"noopener noreferrer\"><code>internal/validator</code></a> and <a href=\"https://github.com/BlasVernazza06/koko-cli/tree/main/internal/compatibility\" target=\"_blank\" rel=\"noopener noreferrer\"><code>internal/compatibility</code></a>). Selecting a Go or Python backend automatically disables Node/TypeScript-only ORMs like Prisma or Mongoose."
  },
  {
    id: "db-schemas-migrations",
    category: "database",
    question: "Does Koko CLI provide ready-to-use schemas and database connections?",
    answer: "Yes. It scaffolds the database client package in <code>packages/db</code> (or the corresponding module), typed initial schemas in TypeScript/Go/Python, migration scripts, and environment variables ready for immediate connectivity."
  },
  {
    id: "docker-db-integration",
    category: "database",
    question: "How does the local database connect with Docker?",
    answer: "When Docker Compose is enabled, Koko configures the database container service with mapped ports, persistent data storage volumes, and the matching connection string pre-filled in your local <code>.env</code> file."
  },

  // 4. TOOLING & CODE QUALITY
  {
    id: "linters-formatters",
    category: "tooling",
    question: "What linting and formatting tooling does Koko include?",
    answer: "Koko includes lightning-fast configurations for <a href=\"https://biomejs.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Biome</code></a> or <a href=\"https://eslint.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>ESLint</code></a> + <a href=\"https://prettier.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Prettier</code></a>, with strict TypeScript rules, format-on-save defaults, and validation scripts preconfigured in <code>package.json</code>."
  },
  {
    id: "master-catalog",
    category: "tooling",
    question: "What is the Master Dependency Catalog (internal/catalog)?",
    answer: "It is a centralized, verified registry inside Koko CLI (<a href=\"https://github.com/BlasVernazza06/koko-cli/tree/main/internal/catalog\" target=\"_blank\" rel=\"noopener noreferrer\"><code>internal/catalog</code></a>) that locks compatible versions for all dependencies and TypeScript types, guaranteeing reproducible and error-free project scaffolding."
  },
  {
    id: "testing-setup",
    category: "tooling",
    question: "Is automated unit testing support included?",
    answer: "Yes. You can include ready-to-run configurations for <a href=\"https://vitest.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Vitest</code></a> or <a href=\"https://jestjs.io\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Jest</code></a>, complete with sample unit tests for both API routes and UI components."
  },
  {
    id: "schema-validators",
    category: "tooling",
    question: "How are schema validators like Zod or Valibot integrated?",
    answer: "Koko can inject <a href=\"https://zod.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Zod</code></a> or <a href=\"https://valibot.dev\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Valibot</code></a> for runtime validation and static type inference across forms, environment variable validation (<code>env.mjs</code> / <code>env.ts</code>), and API request handlers."
  },

  // 5. DEVOPS, DOCKER & CI/CD
  {
    id: "docker-compose-content",
    category: "devops",
    question: "What is included in the generated docker-compose.yml file?",
    answer: "It includes local development services for your chosen database (PostgreSQL, MySQL, MongoDB, optional visual tools like <a href=\"https://www.adminer.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Adminer</code></a> or <a href=\"https://www.pgadmin.org\" target=\"_blank\" rel=\"noopener noreferrer\"><code>pgAdmin</code></a>, and isolated container networks)."
  },
  {
    id: "github-actions-ci",
    category: "devops",
    question: "How are GitHub Actions CI/CD workflows set up?",
    answer: "It generates a <code>.github/workflows/ci.yml</code> pipeline for <a href=\"https://docs.github.com/actions\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub Actions</a> that executes TypeScript type-checking (<code>tsc --noEmit</code>), linting, unit tests, and production builds on every Pull Request and push to <code>main</code>."
  },
  {
    id: "env-management",
    category: "devops",
    question: "How does Koko manage environment variables (.env)?",
    answer: "It outputs documented <code>.env.example</code> and <code>.env.local</code> files with safe local defaults, preventing secret leaks into public version control."
  },
  {
    id: "deployment-platforms",
    category: "devops",
    question: "Can I deploy the generated project easily to Vercel, Railway, or VPS?",
    answer: "Absolutely. Projects follow modern industry conventions without vendor lock-in, ready to deploy frontends to <a href=\"https://vercel.com\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Vercel</strong></a> / <a href=\"https://www.netlify.com\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Netlify</strong></a> and backends/databases to platforms like <a href=\"https://railway.com\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Railway</strong></a>, <a href=\"https://fly.io\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Fly.io</strong></a>, <a href=\"https://render.com\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Render</strong></a>, or Dockerized VPS servers."
  },

  // 6. CONFIG & COMMANDS
  {
    id: "koko-config-manifest",
    category: "config",
    question: "What is the koko.config.json file and what is its purpose?",
    answer: "It is a JSON manifest created in the root folder (<code>koko.config.json</code>) capturing the exact stack specification, CLI version, package manager, and active services. It acts as a single source of truth for future tooling and workspace evolution."
  },
  {
    id: "cli-commands-flags",
    category: "config",
    question: "Which commands and flags does Koko CLI provide?",
    answer: "It provides <code>koko init</code> (launches the interactive TUI or accepts direct flags like <code>--name</code>, <code>--front</code>, <code>--db</code>), <code>koko --version</code>, and <code>koko --help</code> for quick command-line assistance."
  },
  {
    id: "stack-evolution",
    category: "config",
    question: "How can I update or evolve my stack after the initial scaffolding?",
    answer: "Because Koko generates clean and modular code, you can add new libraries with your package manager or follow Koko documentation guides to extend authentication modules (<a href=\"https://www.better-auth.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Better-Auth</code></a>, <a href=\"https://clerk.com\" target=\"_blank\" rel=\"noopener noreferrer\"><code>Clerk</code></a>) and extra containers."
  },
  {
    id: "contribute-bugs",
    category: "config",
    question: "How can I report bugs or contribute to Koko CLI?",
    answer: "You can open an issue or pull request directly on our official GitHub repository at <a href=\"https://github.com/BlasVernazza06/koko-cli\" target=\"_blank\" rel=\"noopener noreferrer\"><code>github.com/BlasVernazza06/koko-cli</code></a>. Contributions from the community are always welcome!"
  }
];

export const faqLabels = {
  es: {
    badge: "FAQ",
    title: "Preguntas Frecuentes",
    subtitle: "Hemos recopilado respuestas detalladas sobre el funcionamiento, arquitectura y capacidades de Koko CLI.",
    stillHaveQuestions: "¿Aún tienes preguntas?",
    stillHaveQuestionsSub: "¡Explora el repositorio o únete a la discusión en GitHub!",
    contactSupport: "GitHub Repo"
  },
  en: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Detailed answers regarding Koko CLI, supported stacks, architecture, and local infrastructure.",
    stillHaveQuestions: "Still have questions?",
    stillHaveQuestionsSub: "Explore the official repository or join the discussion on GitHub!",
    contactSupport: "GitHub Repo"
  }
};
