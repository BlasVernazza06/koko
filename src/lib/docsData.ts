export interface TreeItem {
  name: string;
  type: 'folder' | 'file';
  depth: number;
  description?: string;
}

export interface Block {
  anchorId: string;
  title: string;
  subtitle?: string;
  body: string[];
  pre?: string;
  bullets?: string[];
  tree?: TreeItem[];
  tags?: string[];
  nestedBlocks?: {
    anchorId: string;
    title: string;
    body: string[];
    pre?: string;
  }[];
}

export interface DocSection {
  id: string;
  title: string;
  category: 'Introducción' | 'CLI' | 'Estructura de Proyecto' | 'Avanzado' | 'Preguntas Frecuentes' | 'Introduction' | 'Project Structure' | 'Advanced' | 'FAQ';
  isHighlighted?: boolean;
  subItems?: { id: string; title: string }[];
  content: Block[];
}

export const docsData: Record<'es' | 'en', DocSection[]> = {
  es: [
    // ==========================================
    // CATEGORÍA: INTRODUCCIÓN
    // ==========================================
    {
      id: 'quick-start',
      title: 'Inicio Rápido',
      category: 'Introducción',
      isHighlighted: true,
      content: [
        {
          anchorId: 'philosophy',
          title: 'Filosofía de Koko CLI',
          body: [
            '• Arranque Instantáneo en Milisegundos: Construido en Go con binario nativo que se ejecuta de inmediato sin sobrecargas de configuración previa.',
            '• TUI Interactiva Premium: Asistente visual en consola impulsado por Bubble Tea y Lipgloss con animaciones y spinners en tiempo real.',
            '• Monorepo y Workspaces por Defecto: Configuración automática de Turborepo, pnpm workspaces, TypeScript unificado y ESLint/Prettier.',
            '• Validación Cruzada Inteligente: Sistema de reglas que previene activamente la combinación de tecnologías incompatibles en tiempo de diseño.',
            '• Catálogo Maestro de Dependencias: Gestión centralizada de versiones para garantizar instalaciones reproducibles y código libre de drift.'
          ]
        },
        {
          anchorId: 'prerequisites',
          title: 'Prerrequisitos e Instalación',
          body: [
            'Puedes ejecutar Koko CLI directamente desde la nube usando Node.js o descargar el binario nativo compilado en Go según tu preferencia:'
          ],
          bullets: [
            'Node.js (LTS v18 o superior) - Recomendado para ejecutar y compilar los proyectos generados en JavaScript/TypeScript.',
            'Docker & Docker Compose - Opcional pero recomendado para levantar bases de datos locales (PostgreSQL, MongoDB, MySQL).',
            'Go 1.21+ / Python 3.11+ - Necesarios únicamente si generas backends nativos en Go Chi o Python FastAPI.'
          ],
          pre: '# Opción 1: Ejecutar directamente con NPX (sin instalación permanente)\nnpx koko-cli init\n\n# Opción 2: Instalación global con npm/pnpm\nnpm install -g koko-cli\nkoko init'
        },
        {
          anchorId: 'native-binaries',
          title: 'Binarios Nativos (GitHub Releases)',
          body: [
            'Si prefieres no depender de Node.js global, puedes descargar el ejecutable nativo de Koko para tu sistema operativo desde los Releases oficiales de GitHub:'
          ],
          nestedBlocks: [
            {
              anchorId: 'bin-windows',
              title: 'Windows (PowerShell o CMD)',
              body: ['Descarga koko-windows-amd64.exe, renómbralo a koko.exe y ejecútalo directamente:'],
              pre: '.\\koko.exe init'
            },
            {
              anchorId: 'bin-unix',
              title: 'macOS y Linux',
              body: ['Descarga el binario para tu arquitectura, otorga permisos de ejecución y lánzalo:'],
              pre: 'chmod +x koko\n./koko init'
            }
          ]
        },
        {
          anchorId: 'init-modes',
          title: 'Modos de Inicialización',
          body: [
            'Koko CLI ofrece dos modos de uso interactivo diseñados para maximizar tu productividad:',
            '• Quick Setup (Recetas de Producción): Selecciona un preset completo probado en producción (SaaS Starter, MERN, PERN o FastAPI + React) y comienza a codificar en 2 segundos.',
            '• Manual Configuration (Configuración Paso a Paso): Diseña tu stack pieza por pieza eligiendo Frontend, Backend, Base de Datos, ORM, Addons y Git con validación en tiempo real.'
          ]
        },
        {
          anchorId: 'builder-integration',
          title: 'Integración con Stack Builder Web',
          body: [
            '• También puedes usar nuestro constructor visual interactivo en /builder para seleccionar tus tecnologías mediante tarjetas interactivas.',
            '• El constructor genera el comando CLI exacto con todos los flags correspondientes para que lo copies y ejecutes en tu terminal con un solo clic.'
          ]
        },
        {
          anchorId: 'quick-commands',
          title: 'Resumen de Comandos y Flags',
          body: [
            'Comandos rápidos para crear proyectos de inmediato omitiendo el asistente interactivo:'
          ],
          pre: '# Crear con la receta predeterminada (SaaS Starter con Next.js + Drizzle + Better-Auth)\nkoko init mi-saas -d\n\n# Crear seleccionando una receta específica\nkoko init mi-app -r pern\n\n# Crear con stack manual por flags\nkoko init mi-api -f none -b express --database postgres --orm drizzle -p pnpm --git yes'
        }
      ]
    },
    {
      id: 'tech-stack',
      title: 'Stack Soportado',
      category: 'Introducción',
      content: [
        {
          anchorId: 'overview',
          title: 'Ecosistema de Tecnologías (v2.0.0)',
          body: [
            'Koko CLI soporta una amplia gama de frameworks modernos, entornos de ejecución y motores de bases de datos organizados modularmente:'
          ]
        },
        {
          anchorId: 'frontend-layer',
          title: 'Capas de Frontend',
          body: [
            '• Next.js (App Router): Framework React fullstack de alto rendimiento con Server Components, Server Actions y optimización de assets.',
            '• React + Vite: Single Page Application (SPA) ultrarrápida impulsada por Vite con Hot Module Replacement (HMR) instantáneo.',
            '• Nuxt (Vue 3): Framework fullstack para Vue con motor Nitro y renderizado híbrido SSR/SSG.',
            '• Svelte (Svelte 5): Aplicaciones web ultraligeras y reactivas sin virtual DOM.',
            '• None: Configuración headless para proyectos que únicamente requieren servidor backend o APIs REST.'
          ]
        },
        {
          anchorId: 'backend-layer',
          title: 'Capas de Backend y Runtimes',
          body: [
            '• Node.js / Express: Arquitectura clásica de API REST con TypeScript estricto, middlewares y routing modular.',
            '• NestJS: Arquitectura empresarial modular basada en controladores, servicios, inyección de dependencias y decoradores.',
            '• Hono: Servidor web ultrarrápido y liviano optimizado para TypeScript y arquitecturas edge.',
            '• Go / Chi Router: Servidor en Go de alto rendimiento con tipado estricto, baja latencia y consumo de memoria mínimo.',
            '• Python / FastAPI: Framework asíncrono en Python con validación de esquemas vía Pydantic v2 y documentación interactiva OpenAPI/Swagger automática.',
            '• None: Para proyectos cliente que utilizan Server Actions de Next.js o servicios Backend as a Service (BaaS).'
          ]
        },
        {
          anchorId: 'database-layer',
          title: 'Bases de Datos y ORMs',
          body: [
            'Koko desacopla los motores de bases de datos y los mapeadores relacionales para máxima flexibilidad:',
            '• PostgreSQL: Base de datos relacional robusta con soporte para Drizzle ORM y Prisma.',
            '• MongoDB: Base de datos NoSQL documental con modelado elegante mediante Mongoose o Prisma.',
            '• MySQL / MariaDB: Motor SQL tradicional con esquemas tipados.',
            '• SQLite: Base de datos embebida ligera, ideal para prototipos rápidos y testing local sin contenedores.',
            '• GORM (Go): ORM con todas las funciones para proyectos con backend en Go.',
            '• SQLAlchemy / SQLModel (Python): ORM estándar de la industria para Python con soporte asíncrono.'
          ]
        },
        {
          anchorId: 'package-managers',
          title: 'Gestores de Paquetes y Addons',
          body: [
            '• Gestores de Paquetes: pnpm (recomendado para monorrepos y deduplicación de dependencias), npm, bun, go_mod (Go) y pip/uv (Python).',
            '• Docker Compose: Orquestación de contenedores locales para bases de datos (PostgreSQL, MySQL, MongoDB) con persistencia de volúmenes.',
            '• GitHub Actions CI: Workflows automatizados de integración continua para linting, type-checking y pruebas.'
          ]
        }
      ]
    },

    // ==========================================
    // CATEGORÍA: CLI
    // ==========================================
    {
      id: 'tui-wizard',
      title: 'Asistente TUI Interactivo',
      category: 'CLI',
      content: [
        {
          anchorId: 'tui-experience',
          title: 'Experiencia de Consola con Bubble Tea',
          body: [
            'Koko CLI implementa The Elm Architecture (TEA) en la terminal gracias al framework Bubble Tea y estilos tipográficos con Lipgloss.',
            '• Sin parpadeos ni prompts caóticos: la interfaz dibuja un layout coherente y actualizado en tiempo real.',
            '• Navegación fluida: utiliza las teclas de flecha [↑/↓] o atajos estilo Vim [k/j] para desplazarte, [Enter] para confirmar y [Esc] para regresar al paso anterior.'
          ]
        },
        {
          anchorId: 'modes-explained',
          title: 'Flujo de Selección: Quick vs Manual',
          body: [
            'Al iniciar `koko init`, el asistente te presentará la pantalla principal con dos rutas:'
          ],
          nestedBlocks: [
            {
              anchorId: 'quick-flow',
              title: 'Ruta 1: Quick Setup',
              body: [
                '1. Ingresa el nombre de tu proyecto (ej: `my-saas`).',
                '2. Selecciona "Quick Setup".',
                '3. Elige una de las 4 recetas curadas: ⚡ SaaS Starter, 💻 MERN Stack, 🚀 PERN Stack o 🐍 FastAPI + React.',
                '4. Koko genera automáticamente todos los archivos, inicializa Git y crea el manifiesto en menos de 1 segundo.'
              ]
            },
            {
              anchorId: 'manual-flow',
              title: 'Ruta 2: Manual Configuration',
              body: [
                '1. Frontend Framework: Elige entre Next.js, React + Vite, Nuxt, Svelte o None.',
                '2. Backend Runtime: Elige entre Express, FastAPI, Go Chi, NestJS, Hono o None.',
                '3. Package Manager: Elige pnpm, npm, bun (o go_mod / pip si es backend puro).',
                '4. Database: Elige PostgreSQL, MongoDB, MySQL, SQLite o None.',
                '5. ORM / Query Builder: Opciones filtradas dinámicamente según tu base de datos y backend.',
                '6. Addons & Tooling: Docker Compose, GitHub Actions CI o ambos.',
                '7. Git: Inicialización de repositorio Git con .gitignore adaptado.'
              ]
            }
          ]
        },
        {
          anchorId: 'live-validation-tui',
          title: 'Deshabilitación Dinámica con Motivo',
          body: [
            'El asistente TUI evalúa cada combinación en tiempo real. Si una opción es incompatible con tus selecciones previas, no solo aparecerá deshabilitada en gris oscuro, sino que mostrará la razón exacta:',
            '• Ejemplo: Si seleccionas `React + Vite` (SPA) y `None` en Backend, las opciones de Base de Datos se deshabilitarán con el mensaje: "Incompatible: Client-side SPA (react) cannot connect directly to DBs without a backend".'
          ]
        },
        {
          anchorId: 'runner-animation',
          title: 'Ejecución con Spinner y Métricas',
          body: [
            'Durante la creación física de los archivos, Koko muestra un spinner animado paso a paso indicando la generación en memoria (Virtual File System), escritura segura en disco, inicialización de Git y creación del archivo `koko.config.json` con el tiempo total transcurrido en segundos.'
          ]
        }
      ]
    },
    {
      id: 'cli-commands',
      title: 'Comandos y Flags',
      category: 'CLI',
      content: [
        {
          anchorId: 'command-init',
          title: 'Comando koko init',
          body: [
            'El comando principal para inicializar un nuevo proyecto en tu disco local:',
            'Sintaxis: `koko init [nombre-del-proyecto] [flags]`'
          ],
          pre: 'koko init mi-proyecto'
        },
        {
          anchorId: 'flags-reference',
          title: 'Referencia Completa de Flags',
          body: [
            'Todos los flags disponibles para automatizar la creación de proyectos sin interacción humana:'
          ],
          bullets: [
            '-d, --default - Inicializa inmediatamente usando la receta predeterminada (SaaS Starter con Next.js + Drizzle + Better-Auth).',
            '-r, --recipie <nombre> - Elige una receta de producción: saas, pern, mern, fastapi_react.',
            '-f, --frontend <framework> - Framework frontend: nextjs, react, nuxt, svelte, none.',
            '-b, --backend <runtime> - Framework backend: express, fastapi, go_chi, nestjs, hono, none.',
            '-p, --package-manager <pm> - Gestor de paquetes: pnpm, npm, bun, go_mod, pip, uv.',
            '--database <motor> - Base de datos: postgres, mongodb, mysql, sqlite, none.',
            '--orm <mapeador> - ORM o query builder: drizzle, prisma, mongoose, sqlalchemy, gorm, none.',
            '--auth <proveedor> - Proveedor de autenticación: better-auth, next-auth, none.',
            '--git <yes|no> - Inicializar repositorio Git local (por defecto: yes).'
          ]
        },
        {
          anchorId: 'scripting-examples',
          title: 'Ejemplos para CI/CD y Scripts',
          body: [
            'Puedes integrar Koko CLI en scripts bash, Makefiles o flujos de CI/CD para generar estructuras reproducibles:'
          ],
          nestedBlocks: [
            {
              anchorId: 'ex-mern',
              title: 'Scaffold MERN Stack Completo',
              body: ['Genera un monorepo con React SPA, Express TS API, MongoDB y Docker Compose:'],
              pre: 'koko init app-mern -r mern'
            },
            {
              anchorId: 'ex-fastapi-react',
              title: 'Scaffold FastAPI + React Vite',
              body: ['Genera frontend en React y backend en Python FastAPI con soporte asíncrono:'],
              pre: 'koko init app-python -r fastapi_react'
            },
            {
              anchorId: 'ex-go-api',
              title: 'Scaffold API REST pura en Go Chi',
              body: ['Genera un backend modular en Go con PostgreSQL y GORM:'],
              pre: 'koko init api-go -f none -b go_chi --database postgres --orm gorm -p go_mod'
            }
          ]
        },
        {
          anchorId: 'command-version',
          title: 'Comando koko version',
          body: [
            'Imprime en consola los detalles de la versión del CLI, sistema operativo, arquitectura de procesador y versión del compilador de Go con el que fue construido:'
          ],
          pre: 'koko version'
        }
      ]
    },
    {
      id: 'validation-rules',
      title: 'Reglas de Validación y Seguridad',
      category: 'CLI',
      content: [
        {
          anchorId: 'rules-overview',
          title: 'Motor de Compatibilidad en Tiempo Real',
          body: [
            'A diferencia de otros generadores que crean código roto al combinar opciones incompatibles, Koko cuenta con un motor de validación estricto en `internal/compatibility`. Si pasas flags inválidos por terminal o intentas elegirlos en el TUI, el CLI abortará con un mensaje de error explicativo y sugerencias de corrección.'
          ]
        },
        {
          anchorId: 'the-7-rules',
          title: 'Las 7 Reglas de Seguridad',
          body: [
            '• Regla 1: Frontend y Backend simultáneos en None: Un proyecto no puede tener ambos extremos vacíos; debe seleccionarse al menos un Frontend o un Backend.',
            '• Regla 2: SPAs sin backend conectadas a Base de Datos: Una SPA pura de cliente (React + Vite o Svelte) no puede incluir credenciales de base de datos ni ORMs sin un servidor intermedio.',
            '• Regla 3: Consistencia DB vs ORM: No es posible seleccionar un ORM si la base de datos está marcada como "none".',
            '• Regla 4: ORMs Relacionales (SQL) vs Documentales (NoSQL): Drizzle, SQLAlchemy y GORM no pueden usarse con MongoDB. Mongoose no puede usarse con PostgreSQL, MySQL o SQLite.',
            '• Regla 5: Ecosistema de Lenguaje vs ORM: SQLAlchemy solo es compatible con Python. GORM solo es compatible con Go. Drizzle, Prisma y Mongoose solo son compatibles con Node.js / TypeScript.',
            '• Regla 6: Gestor de Paquetes por Lenguaje: Un backend puro en Go solo admite `go_mod`. Un backend puro en Python solo admite `pip` o `uv`.',
            '• Regla 7: Proveedores de Autenticación: Better-Auth requiere un entorno TypeScript (Next.js, Express o Hono). NextAuth.js requiere específicamente Next.js como frontend.'
          ]
        },
        {
          anchorId: 'error-example',
          title: 'Ejemplo de Diagnóstico de Error',
          body: [
            'Si intentas ejecutar un comando con tecnologías incompatibles:'
          ],
          pre: 'koko init my-app -f react -b none --database postgres --orm drizzle\n\n# Salida del CLI:\n# ✗ Incompatible stack error:\n#   Una aplicación SPA cliente (react) sin backend no puede conectarse directamente a la base de datos \'postgres\'\n#   Sugerencia: Agrega un backend (como Express, Hono, FastAPI o Go Chi) o usa un framework fullstack (como Next.js o Nuxt)'
        }
      ]
    },

    // ==========================================
    // CATEGORÍA: ESTRUCTURA DE PROYECTO
    // ==========================================
    {
      id: 'project-structure',
      title: 'Estructuras Generadas',
      category: 'Estructura de Proyecto',
      content: [
        {
          anchorId: 'monorepo-layout',
          title: 'Arquitectura Monorepo (Workspaces + Turborepo)',
          body: [
            'Cuando configuras un proyecto con Frontend y Backend desacoplados, Koko genera un monorepo profesional configurado con pnpm workspaces y Turborepo para compilaciones en paralelo ultrarrápidas:'
          ],
          tree: [
            { name: 'my-project/', type: 'folder', depth: 0, description: 'Directorio raíz del monorepo' },
            { name: 'apps/', type: 'folder', depth: 1, description: 'Aplicaciones y servicios ejecutables' },
            { name: 'web/', type: 'folder', depth: 2, description: 'Aplicación frontend (Next.js, React, etc.)' },
            { name: 'api/', type: 'folder', depth: 2, description: 'Servidor backend (Express, Go Chi, FastAPI, etc.)' },
            { name: 'packages/', type: 'folder', depth: 1, description: 'Paquetes y configuraciones compartidas' },
            { name: 'db/', type: 'folder', depth: 2, description: 'Cliente de base de datos y esquemas de ORM' },
            { name: 'tsconfig/', type: 'folder', depth: 2, description: 'Configuraciones base de TypeScript compartidas' },
            { name: 'docker-compose.yml', type: 'file', depth: 1, description: 'Orquestación de base de datos local y servicios' },
            { name: 'koko.config.json', type: 'file', depth: 1, description: 'Manifiesto descriptivo del stack generado' },
            { name: 'package.json', type: 'file', depth: 1, description: 'Configuración raíz con definición de workspaces' },
            { name: 'pnpm-workspace.yaml', type: 'file', depth: 1, description: 'Definición de paquetes pnpm' },
            { name: 'turbo.json', type: 'file', depth: 1, description: 'Pipeline de compilación y cache de Turborepo' },
            { name: 'README.md', type: 'file', depth: 1, description: 'Guía de inicio y comandos del proyecto' }
          ]
        },
        {
          anchorId: 'saas-starter-layout',
          title: 'Estructura Standalone: SaaS Starter (Next.js)',
          body: [
            'Para la receta SaaS Starter (Next.js App Router + Drizzle + Better-Auth), Koko organiza un layout limpio y escalable:'
          ],
          tree: [
            { name: 'my-saas/', type: 'folder', depth: 0, description: 'Raíz del proyecto SaaS' },
            { name: 'src/', type: 'folder', depth: 1, description: 'Código fuente de la aplicación' },
            { name: 'app/', type: 'folder', depth: 2, description: 'Rutas de Next.js App Router y Server Actions' },
            { name: 'api/', type: 'folder', depth: 3, description: 'Endpoints de autenticación y webhooks' },
            { name: 'page.tsx', type: 'file', depth: 3, description: 'Landing page principal' },
            { name: 'layout.tsx', type: 'file', depth: 3, description: 'Layout raíz con providers' },
            { name: 'components/', type: 'folder', depth: 2, description: 'Componentes UI reutilizables (shadcn UI / Tailwind)' },
            { name: 'lib/', type: 'folder', depth: 2, description: 'Utilidades, configuración de auth y base de datos' },
            { name: 'db/', type: 'folder', depth: 3, description: 'Esquemas de Drizzle y migraciones SQL' },
            { name: 'docker-compose.yml', type: 'file', depth: 1, description: 'Contenedor local de PostgreSQL' },
            { name: 'koko.config.json', type: 'file', depth: 1, description: 'Registro de configuración Koko' },
            { name: 'next.config.mjs', type: 'file', depth: 1, description: 'Configuración del compilador Next.js' }
          ]
        },
        {
          anchorId: 'go-backend-layout',
          title: 'Estructura Backend: Go Chi Router',
          body: [
            'Para proyectos con backend en Go, Koko implementa la arquitectura recomendada por los estándares oficiales de Golang:'
          ],
          tree: [
            { name: 'api-go/', type: 'folder', depth: 0, description: 'Raíz del servidor en Go' },
            { name: 'cmd/', type: 'folder', depth: 1, description: 'Puntos de entrada de compilación' },
            { name: 'api/', type: 'folder', depth: 2 },
            { name: 'main.go', type: 'file', depth: 3, description: 'Punto de inicio e instanciación del router Chi' },
            { name: 'pkg/', type: 'folder', depth: 1, description: 'Módulos y lógica de negocio' },
            { name: 'handlers/', type: 'folder', depth: 2, description: 'Controladores HTTP y rutas' },
            { name: 'db/', type: 'folder', depth: 2, description: 'Conexión a base de datos y modelos GORM' },
            { name: 'go.mod', type: 'file', depth: 1, description: 'Manifiesto de dependencias del módulo Go' },
            { name: 'go.sum', type: 'file', depth: 1, description: 'Checksums de seguridad de dependencias' }
          ]
        }
      ]
    },
    {
      id: 'koko-config',
      title: 'Manifiesto koko.config.json',
      category: 'Estructura de Proyecto',
      content: [
        {
          anchorId: 'manifest-purpose',
          title: 'El Archivo koko.config.json',
          body: [
            'Al inicializar un proyecto, Koko crea el archivo `koko.config.json` en la raíz. Este archivo actúa como el registro de verdad inmutable de la arquitectura seleccionada y permite que futuras herramientas reconozcan tu stack automáticamente sin analizar archivos de configuración manualmente.'
          ]
        },
        {
          anchorId: 'json-schema',
          title: 'Especificación JSON Schema',
          body: [
            'El esquema estándar publicado en `https://koko-cli.dev/schema.json` incluye cuatro bloques principales: `project`, `architecture`, `stack` y `features`:'
          ],
          pre: '{\n  "$schema": "https://koko-cli.dev/schema.json",\n  "project": {\n    "name": "my-super-app",\n    "cliVersion": "v2.0.0",\n    "createdAt": "2026-09-01T12:00:00Z"\n  },\n  "architecture": {\n    "layout": "monorepo",\n    "packageManager": "pnpm"\n  },\n  "stack": {\n    "frontend": {\n      "framework": "nextjs",\n      "language": "typescript",\n      "styling": "tailwindcss"\n    },\n    "backend": {\n      "framework": "express",\n      "language": "typescript"\n    },\n    "database": {\n      "provider": "postgres",\n      "orm": "drizzle"\n    }\n  },\n  "features": {\n    "auth": {\n      "provider": "better-auth",\n      "status": "installed"\n    },\n    "infrastructure": {\n      "dockerCompose": true,\n      "ciCd": "github_actions"\n    }\n  }\n}'
        }
      ]
    },

    // ==========================================
    // CATEGORÍA: AVANZADO
    // ==========================================
    {
      id: 'recipes-deep-dive',
      title: 'Recetas de Producción',
      category: 'Avanzado',
      content: [
        {
          anchorId: 'recipes-overview',
          title: 'Arquitectura de las Recetas Oficiales',
          body: [
            'Las recetas de Koko CLI son plantillas completas listas para producción, con dependencias fijadas en el Catálogo Maestro y configuraciones de linters, testing y contenedores Docker listos para trabajar.'
          ]
        },
        {
          anchorId: 'recipe-saas',
          title: '⚡ SaaS Starter (Fullstack TypeScript)',
          body: [
            '• Stack: Next.js (App Router, React 19) + Drizzle ORM + Better-Auth + Stripe + Docker PostgreSQL.',
            '• Características: Autenticación completa configurada con sesiones seguras, esquema relacional en PostgreSQL con Drizzle Kit para migraciones, componentes accesibles con Tailwind CSS y Lucide Icons.',
            '• Comando rápido: `koko init my-saas -r saas`'
          ]
        },
        {
          anchorId: 'recipe-pern',
          title: '🚀 PERN Stack (PostgreSQL + Express + React + Node)',
          body: [
            '• Stack: React (Vite, TS) + Node.js Express (TS) + PostgreSQL + Prisma ORM + Docker.',
            '• Arquitectura: Monorepo desacoplado con Turborepo, paquete compartido `packages/db` para el cliente de Prisma generado, y scripts unificados de desarrollo.',
            '• Comando rápido: `koko init my-pern -r pern`'
          ]
        },
        {
          anchorId: 'recipe-mern',
          title: '💻 MERN Stack (MongoDB + Express + React + Node)',
          body: [
            '• Stack: React (Vite, TS) + Node.js Express (TS) + MongoDB + Mongoose + Docker.',
            '• Arquitectura: Configuración monorepo con contenedor Docker de MongoDB listo para usar, modelos Mongoose tipados y validación de esquemas.',
            '• Comando rápido: `koko init my-mern -r mern`'
          ]
        },
        {
          anchorId: 'recipe-fastapi',
          title: '🐍 FastAPI + React (Python Async + Vite SPA)',
          body: [
            '• Stack: Python FastAPI + React (Vite) SPA + Pydantic v2 + Uvicorn.',
            '• Características: Backend asíncrono con CORS configurado para el frontend de Vite, documentación Swagger interactiva en `/docs`, y gestión de dependencias vía `requirements.txt`.',
            '• Comando rápido: `koko init my-python -r fastapi_react`'
          ]
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Solución de Problemas',
      category: 'Avanzado',
      content: [
        {
          anchorId: 'docker-ports',
          title: 'Conflictos de Puertos en Docker',
          body: [
            'Si al ejecutar `docker compose up -d` recibes el error `port is already allocated` (puerto 5432 o 27017 en uso):',
            '• Causa: Tienes otra instancia local de PostgreSQL o MongoDB ejecutándose en tu máquina fuera de Docker.',
            '• Solución: Detén el servicio local de PostgreSQL o edita el archivo `docker-compose.yml` para mapear el puerto del host a otro número (ej: `"5433:5432"`).'
          ]
        },
        {
          anchorId: 'unix-permissions',
          title: 'Permisos de Ejecución en macOS y Linux',
          body: [
            'Si descargas el binario directamente desde GitHub Releases y obtienes `permission denied` o advertencias del sistema de seguridad:',
            '• En Linux/macOS: Otorga permisos de ejecución con `chmod +x koko`.',
            '• En macOS (Gatekeeper): Si el sistema bloquea el binario por no estar firmado, ejecuta `xattr -d com.apple.quarantine koko` o abre Preferencias del Sistema > Privacidad y Seguridad > Permitir de todos modos.'
          ]
        },
        {
          anchorId: 'pnpm-workspace-issues',
          title: 'Resolución de Dependencias en Monorrepos (pnpm)',
          body: [
            'Si experimentas problemas al enlazar paquetes locales en `packages/db`:',
            '• Asegúrate de estar usando `pnpm` (versión 9 o superior).',
            '• Ejecuta `pnpm install` desde la raíz del proyecto para que los enlaces simbólicos de los workspaces se resuelvan correctamente.'
          ]
        }
      ]
    },
    {
      id: 'contributing',
      title: 'Guía de Contribución',
      category: 'Avanzado',
      content: [
        {
          anchorId: 'open-source',
          title: 'Desarrollo Open Source',
          body: [
            'Koko CLI es un proyecto 100% de código abierto bajo la licencia MIT. Agradecemos contribuciones en forma de nuevas plantillas, mejoras en el motor en Go, corrección de errores o sugerencias en la documentación.'
          ]
        },
        {
          anchorId: 'local-setup',
          title: 'Configuración del Entorno de Desarrollo Local',
          body: [
            'Pasos para clonar, compilar y probar Koko CLI en tu máquina local:'
          ],
          nestedBlocks: [
            {
              anchorId: 'step-clone',
              title: '1. Clonar el Repositorio',
              body: ['Clona el repositorio oficial de GitHub e ingresa al directorio:'],
              pre: 'git clone https://github.com/BlasVernazza06/koko-cli.git\ncd koko-cli'
            },
            {
              anchorId: 'step-run-go',
              title: '2. Ejecutar y Compilar en Go',
              body: ['Requiere Go 1.21+. Puedes ejecutar el CLI directamente desde el código fuente o compilar el binario:'],
              pre: '# Ejecutar directamente\ngo run main.go init\n\n# Compilar binario local\ngo build -o koko main.go'
            },
            {
              anchorId: 'step-tests',
              title: '3. Ejecutar la Suite de Pruebas',
              body: ['Ejecuta las pruebas unitarias y de compatibilidad para verificar que no haya regresiones:'],
              pre: 'go test ./... -v'
            }
          ]
        },
        {
          anchorId: 'project-architecture-code',
          title: 'Estructura Interna del Código en Go',
          body: [
            '• `cmd/`: Comandos de Cobra CLI (`init.go`, `version.go`, `root.go`), máquina de estados TUI (`tui.go`) y vistas de Lipgloss (`cmd/views/`).',
            '• `internal/compatibility/`: Motor de validación cruzada y evaluación de reglas lógicas.',
            '• `internal/config/`: Generador y serializador del manifiesto `koko.config.json`.',
            '• `internal/scaffold/`: Motor de scaffolding, renderizadores de plantillas y generador de Virtual File System (`vfs`).',
            '• `internal/catalog/`: Catálogo maestro de versiones de dependencias de npm y librerías externas.'
          ]
        }
      ]
    },

    // ==========================================
    // CATEGORÍA: PREGUNTAS FRECUENTES
    // ==========================================
    {
      id: 'faq',
      title: 'Preguntas Frecuentes',
      category: 'Preguntas Frecuentes',
      content: [
        {
          anchorId: 'why-go',
          title: '¿Por qué el CLI de Koko está escrito en Go?',
          body: [
            'Go nos permite compilar un único archivo binario nativo y autónomo sin dependencias locales para el usuario final. Esto asegura un arranque instantáneo (cold start en milisegundos) y que no requieras configurar Node.js globalmente o lidiar con versiones conflictivas de paquetes solo para crear tu scaffolding.'
          ],
          tags: ['go', 'cli', 'rendimiento']
        },
        {
          anchorId: 'offline-mode',
          title: '¿Puedo utilizar Koko sin conexión a Internet?',
          body: [
            '¡Totalmente! Si tienes el binario de Koko descargado o el paquete instalado, el CLI genera todos los archivos, configuraciones, esquemas y scripts de forma 100% local en tu disco sin enviar ni solicitar información a ningún servidor externo.'
          ],
          tags: ['offline', 'general', 'infraestructura']
        },
        {
          anchorId: 'monorepo-support',
          title: '¿Cómo gestiona Koko los proyectos Monorepo?',
          body: [
            'Cuando eliges un frontend y un backend independientes (o seleccionas recetas como PERN o MERN), Koko configura automáticamente una arquitectura monorepo basada en pnpm workspaces y Turborepo (`turbo.json`). Esto permite compartir esquemas de base de datos (`packages/db`) y configuraciones de TypeScript sin duplicar código.'
          ],
          tags: ['monorepo', 'arquitectura', 'turborepo']
        },
        {
          anchorId: 'docker-compose-default',
          title: '¿Es obligatorio usar Docker con Koko?',
          body: [
            'No es obligatorio. Si prefieres utilizar una base de datos alojada en la nube (como Supabase, Neon o MongoDB Atlas), puedes seleccionar la opción de Docker como `false` en los flags o desactivar los addons en la configuración manual.'
          ],
          tags: ['docker', 'bases de datos']
        },
        {
          anchorId: 'is-free',
          title: '¿Es Koko de código abierto y gratuito para uso comercial?',
          body: [
            'Sí, Koko es un proyecto 100% de código abierto bajo la licencia MIT. Puedes usarlo de forma totalmente gratuita para proyectos personales, de código abierto o productos comerciales en producción.'
          ],
          tags: ['general', 'licencia', 'comercial']
        },
        {
          anchorId: 'supported-os',
          title: '¿Qué sistemas operativos son compatibles?',
          body: [
            'Koko es totalmente multiplataforma y ha sido probado exhaustivamente en Windows (PowerShell, CMD y WSL2), macOS (arquitecturas Apple Silicon M1/M2/M3 y x86_64 Intel) y todas las distribuciones principales de Linux.'
          ],
          tags: ['general', 'sistemas operativos', 'compatibilidad']
        }
      ]
    }
  ],

  en: [
    // ==========================================
    // CATEGORY: INTRODUCTION
    // ==========================================
    {
      id: 'quick-start',
      title: 'Quick Start',
      category: 'Introduction',
      isHighlighted: true,
      content: [
        {
          anchorId: 'philosophy',
          title: 'Koko CLI Philosophy',
          body: [
            '• Millisecond Cold-Start: Built with Go as a standalone native binary that launches instantly with zero runtime configuration overhead.',
            '• Premium Interactive TUI: Gorgeous terminal interface powered by Bubble Tea and Lipgloss featuring real-time spinner benchmarks and visual step indicators.',
            '• Monorepo Workspaces Out-of-the-Box: Automatically scaffolds Turborepo pipelines, pnpm workspaces, unified TypeScript configs, and ESLint/Prettier.',
            '• Smart Cross-Validation Engine: Active compatibility rules prevent creating broken or conflicting tech combinations in real-time.',
            '• Master Dependency Catalog: Centrally pinned package versions to guarantee reproducible builds and zero configuration drift.'
          ]
        },
        {
          anchorId: 'prerequisites',
          title: 'Prerequisites & Installation',
          body: [
            'You can run Koko CLI directly via Node.js/NPX or download the native Go binary for your operating system:'
          ],
          bullets: [
            'Node.js (LTS v18 or newer) - Recommended to run and build the generated JavaScript/TypeScript codebases.',
            'Docker & Docker Compose - Optional but recommended for local relational and NoSQL databases (PostgreSQL, MongoDB, MySQL).',
            'Go 1.21+ / Python 3.11+ - Required only if you scaffold pure Go Chi or Python FastAPI backends.'
          ],
          pre: '# Option 1: Run directly with NPX (No installation required)\nnpx koko-cli init\n\n# Option 2: Global installation via npm/pnpm\nnpm install -g koko-cli\nkoko init'
        },
        {
          anchorId: 'native-binaries',
          title: 'Native Binaries (GitHub Releases)',
          body: [
            'If you prefer not to depend on global Node.js, download the pre-compiled binary matching your platform from our GitHub Releases page:'
          ],
          nestedBlocks: [
            {
              anchorId: 'bin-windows',
              title: 'Windows (PowerShell or CMD)',
              body: ['Download koko-windows-amd64.exe, rename to koko.exe, and run directly:'],
              pre: '.\\koko.exe init'
            },
            {
              anchorId: 'bin-unix',
              title: 'macOS & Linux',
              body: ['Download the executable for your architecture, grant execution permissions, and run:'],
              pre: 'chmod +x koko\n./koko init'
            }
          ]
        },
        {
          anchorId: 'init-modes',
          title: 'Initialization Modes',
          body: [
            'Koko CLI features two distinct interactive modes tailored for maximum developer agility:',
            '• Quick Setup (Production Recipes): Pick a pre-configured production blueprint (SaaS Starter, MERN, PERN, or FastAPI + React) and start building in under 2 seconds.',
            '• Manual Configuration (Step-by-Step): Customize your architecture layer by layer selecting Frontend, Backend, Database, ORM, Addons, and Git with live validation checks.'
          ]
        },
        {
          anchorId: 'builder-integration',
          title: 'Web Stack Builder Integration',
          body: [
            '• You can also use our interactive web builder at /en/builder to visually mix and match technologies via interactive cards.',
            '• The builder compiles your selections into the exact CLI command with all corresponding flags for 1-click terminal execution.'
          ]
        },
        {
          anchorId: 'quick-commands',
          title: 'Command Shortcuts & Quick Flags',
          body: [
            'Headless one-liners to bootstrap applications immediately skipping interactive terminal questions:'
          ],
          pre: '# Bootstrap default production recipe (SaaS Starter with Next.js + Drizzle + Better-Auth)\nkoko init my-saas -d\n\n# Bootstrap specific blueprint recipe\nkoko init my-app -r pern\n\n# Bootstrap custom manual stack with flags\nkoko init my-api -f none -b express --database postgres --orm drizzle -p pnpm --git yes'
        }
      ]
    },
    {
      id: 'tech-stack',
      title: 'Supported Tech Stack',
      category: 'Introduction',
      content: [
        {
          anchorId: 'overview',
          title: 'Technology Ecosystem (v2.0.0)',
          body: [
            'Koko CLI supports a diverse, modern catalog of client frameworks, backend runtimes, and database engines:'
          ]
        },
        {
          anchorId: 'frontend-layer',
          title: 'Frontend Frameworks',
          body: [
            '• Next.js (App Router): High-performance full-stack React framework with React Server Components (RSC), Server Actions, and asset optimization.',
            '• React + Vite: Ultra-fast Single Page Application (SPA) powered by Vite with instant Hot Module Replacement (HMR).',
            '• Nuxt (Vue 3): Fullstack Vue framework with the Nitro engine and hybrid SSR/SSG rendering.',
            '• Svelte (Svelte 5): Modern, reactive, compiler-driven web applications with minimal footprint.',
            '• None: Headless configuration for standalone backend APIs and microservices.'
          ]
        },
        {
          anchorId: 'backend-layer',
          title: 'Backend Runtimes & Frameworks',
          body: [
            '• Node.js / Express: Classic REST API architecture with strict TypeScript, middleware support, and modular routing.',
            '• NestJS: Enterprise-grade modular framework featuring controllers, services, dependency injection, and decorators.',
            '• Hono: Ultrafast, lightweight web framework built for TypeScript and edge runtime execution.',
            '• Go / Chi Router: High-performance Go web server with strict typing, minimal latency, and zero memory bloat.',
            '• Python / FastAPI: Async Python API framework with Pydantic v2 data validation and automatic interactive OpenAPI/Swagger docs.',
            '• None: For client applications utilizing Next.js Server Actions or Backend as a Service (BaaS).'
          ]
        },
        {
          anchorId: 'database-layer',
          title: 'Databases & ORMs',
          body: [
            'Koko cleanly separates database servers from Object-Relational Mappers for maximum flexibility:',
            '• PostgreSQL: Battle-tested relational database with first-class Drizzle ORM and Prisma support.',
            '• MongoDB: Document-based NoSQL database with elegant schema modeling via Mongoose or Prisma.',
            '• MySQL / MariaDB: Industry-standard SQL database engine.',
            '• SQLite: Embedded lightweight database, ideal for prototypes and zero-container local development.',
            '• GORM (Go): Feature-rich ORM for Go backends with automatic migrations and query builders.',
            '• SQLAlchemy / SQLModel (Python): The standard ORM ecosystem for Python with native async support.'
          ]
        },
        {
          anchorId: 'package-managers',
          title: 'Package Managers & Addons',
          body: [
            '• Package Managers: pnpm (recommended for monorepos and disk-efficient dependency deduplication), npm, bun, go_mod (Go), and pip/uv (Python).',
            '• Docker Compose: Local container orchestration for relational and document databases with persistent volumes.',
            '• GitHub Actions CI: Automated CI workflows for linting, typechecking, and testing.'
          ]
        }
      ]
    },

    // ==========================================
    // CATEGORY: CLI
    // ==========================================
    {
      id: 'tui-wizard',
      title: 'Interactive TUI Wizard',
      category: 'CLI',
      content: [
        {
          anchorId: 'tui-experience',
          title: 'Console Experience with Bubble Tea',
          body: [
            'Koko CLI leverages The Elm Architecture (TEA) in the terminal using Bubble Tea and Lipgloss styling.',
            '• Clean terminal rendering: no flickering or scattered stdout messages; the interface renders a solid, stateful dashboard.',
            '• Intuitive navigation: use arrow keys [↑/↓] or Vim bindings [k/j] to move the cursor, [Enter] to confirm, and [Esc] to navigate back.'
          ]
        },
        {
          anchorId: 'modes-explained',
          title: 'Selection Modes: Quick Setup vs Manual',
          body: [
            'Upon running `koko init`, the wizard prompts you with two distinct paths:'
          ],
          nestedBlocks: [
            {
              anchorId: 'quick-flow',
              title: 'Path 1: Quick Setup',
              body: [
                '1. Enter your project name (e.g. `my-saas`).',
                '2. Select "Quick Setup".',
                '3. Pick one of the 4 production recipes: ⚡ SaaS Starter, 💻 MERN Stack, 🚀 PERN Stack, or 🐍 FastAPI + React.',
                '4. Koko scaffolds files, initializes Git, and generates the manifest in less than a second.'
              ]
            },
            {
              anchorId: 'manual-flow',
              title: 'Path 2: Manual Configuration',
              body: [
                '1. Frontend Framework: Choose between Next.js, React + Vite, Nuxt, Svelte, or None.',
                '2. Backend Runtime: Choose between Express, FastAPI, Go Chi, NestJS, Hono, or None.',
                '3. Package Manager: Choose pnpm, npm, bun (or go_mod / pip for pure backends).',
                '4. Database: Choose PostgreSQL, MongoDB, MySQL, SQLite, or None.',
                '5. ORM / Query Builder: Options dynamically filtered according to DB and backend choices.',
                '6. Addons & Tooling: Docker Compose, GitHub Actions CI, or both.',
                '7. Git: Automatic Git repository initialization with tailored .gitignore.'
              ]
            }
          ]
        },
        {
          anchorId: 'live-validation-tui',
          title: 'Dynamic Disabling with Descriptive Reasons',
          body: [
            'The TUI evaluates cross-compatibility on every keystroke. If an option conflicts with previous choices, it is rendered in muted gray with an explicit explanation:',
            '• Example: Selecting `React + Vite` (SPA) and `None` for Backend automatically disables all Database options with: "Incompatible: Client-side SPA (react) cannot connect directly to DBs without a backend".'
          ]
        },
        {
          anchorId: 'runner-animation',
          title: 'Animated Runner Benchmarks',
          body: [
            'During physical file generation, Koko displays an animated progress spinner reporting Virtual File System (VFS) creation, disk writes, Git setup, and `koko.config.json` generation with precise timing benchmarks in seconds.'
          ]
        }
      ]
    },
    {
      id: 'cli-commands',
      title: 'Commands & Flags',
      category: 'CLI',
      content: [
        {
          anchorId: 'command-init',
          title: 'The koko init Command',
          body: [
            'The primary command to scaffold a new workspace on your local machine:',
            'Syntax: `koko init [project-name] [flags]`'
          ],
          pre: 'koko init my-project'
        },
        {
          anchorId: 'flags-reference',
          title: 'Complete Flags Reference',
          body: [
            'All supported flags for automating project generation without interactive prompts:'
          ],
          bullets: [
            '-d, --default - Instantly bootstraps using the default recipe (SaaS Starter with Next.js + Drizzle + Better-Auth).',
            '-r, --recipie <name> - Chooses a production blueprint recipe: saas, pern, mern, fastapi_react.',
            '-f, --frontend <framework> - Frontend framework: nextjs, react, nuxt, svelte, none.',
            '-b, --backend <runtime> - Backend runtime: express, fastapi, go_chi, nestjs, hono, none.',
            '-p, --package-manager <pm> - Package manager: pnpm, npm, bun, go_mod, pip, uv.',
            '--database <engine> - Database server: postgres, mongodb, mysql, sqlite, none.',
            '--orm <tool> - ORM or query tool: drizzle, prisma, mongoose, sqlalchemy, gorm, none.',
            '--auth <provider> - Authentication provider: better-auth, next-auth, none.',
            '--git <yes|no> - Initialize local Git repository (default: yes).'
          ]
        },
        {
          anchorId: 'scripting-examples',
          title: 'CI/CD & Scripting Examples',
          body: [
            'Integrate Koko CLI into bash scripts, Makefiles, or CI/CD pipelines for automated scaffolding:'
          ],
          nestedBlocks: [
            {
              anchorId: 'ex-mern',
              title: 'Scaffold Complete MERN Stack',
              body: ['Scaffold a monorepo with React SPA, Express TS API, MongoDB, and Docker Compose:'],
              pre: 'koko init app-mern -r mern'
            },
            {
              anchorId: 'ex-fastapi-react',
              title: 'Scaffold FastAPI + React Vite',
              body: ['Scaffold React client and Python FastAPI backend with async support:'],
              pre: 'koko init app-python -r fastapi_react'
            },
            {
              anchorId: 'ex-go-api',
              title: 'Scaffold Pure Go Chi REST API',
              body: ['Scaffold a modular Go backend with PostgreSQL and GORM:'],
              pre: 'koko init api-go -f none -b go_chi --database postgres --orm gorm -p go_mod'
            }
          ]
        },
        {
          anchorId: 'command-version',
          title: 'The koko version Command',
          body: [
            'Prints detailed build information, semantic version, operating system, architecture, and Go runtime version:'
          ],
          pre: 'koko version'
        }
      ]
    },
    {
      id: 'validation-rules',
      title: 'Cross-Validation Safety Rules',
      category: 'CLI',
      content: [
        {
          anchorId: 'rules-overview',
          title: 'Real-Time Compatibility Engine',
          body: [
            'Unlike traditional scaffolding generators that generate broken templates when conflicting options are selected, Koko enforces strict validation rules via `internal/compatibility`. If invalid flags are passed via terminal or selected in the TUI, the CLI exits immediately with clear error diagnostics and recommended solutions.'
          ]
        },
        {
          anchorId: 'the-7-rules',
          title: 'The 7 Safety Rules',
          body: [
            '• Rule 1: Both Frontend and Backend set to None: A project cannot have both sides empty; at least one Frontend or Backend must be selected.',
            '• Rule 2: Client SPAs connecting to DBs without a Backend: Pure client-side SPAs (React + Vite or Svelte) cannot embed direct database drivers or ORMs without a server API.',
            '• Rule 3: Database vs ORM consistency: You cannot select an ORM if the database is set to "none".',
            '• Rule 4: Relational SQL vs NoSQL Document ORMs: Drizzle, SQLAlchemy, and GORM cannot be used with MongoDB. Mongoose cannot be used with SQL databases (PostgreSQL, MySQL, SQLite).',
            '• Rule 5: Language Runtime vs ORM Matrix: SQLAlchemy is exclusive to Python. GORM is exclusive to Go. Drizzle, Prisma, and Mongoose are exclusive to Node.js / TypeScript.',
            '• Rule 6: Package Manager Compatibility: Standalone Go backends require `go_mod`. Standalone Python backends require `pip` or `uv`.',
            '• Rule 7: Auth Provider Compatibility: Better-Auth requires a Node.js/TypeScript runtime. NextAuth.js requires Next.js as the frontend.'
          ]
        },
        {
          anchorId: 'error-example',
          title: 'Example Error Output',
          body: [
            'Running a conflicting command triggers informative diagnostic feedback:'
          ],
          pre: 'koko init my-app -f react -b none --database postgres --orm drizzle\n\n# CLI Output:\n# ✗ Incompatible stack error:\n#   Una aplicación SPA cliente (react) sin backend no puede conectarse directamente a la base de datos \'postgres\'\n#   Suggestion: Agrega un backend (como Express, Hono, FastAPI o Go Chi) o usa un framework fullstack (como Next.js o Nuxt)'
        }
      ]
    },

    // ==========================================
    // CATEGORY: PROJECT STRUCTURE
    // ==========================================
    {
      id: 'project-structure',
      title: 'Project Structure',
      category: 'Project Structure',
      content: [
        {
          anchorId: 'monorepo-layout',
          title: 'Monorepo Architecture (Workspaces + Turborepo)',
          body: [
            'When configuring decoupled frontend and backend services, Koko structures a clean monorepo powered by pnpm workspaces and Turborepo for high-speed parallel builds:'
          ],
          tree: [
            { name: 'my-project/', type: 'folder', depth: 0, description: 'Root monorepo workspace directory' },
            { name: 'apps/', type: 'folder', depth: 1, description: 'Executable applications and services' },
            { name: 'web/', type: 'folder', depth: 2, description: 'Frontend application (Next.js, React, etc.)' },
            { name: 'api/', type: 'folder', depth: 2, description: 'Backend API server (Express, Go Chi, FastAPI, etc.)' },
            { name: 'packages/', type: 'folder', depth: 1, description: 'Shared packages and configurations' },
            { name: 'db/', type: 'folder', depth: 2, description: 'Shared database client and ORM schemas' },
            { name: 'tsconfig/', type: 'folder', depth: 2, description: 'Shared base TypeScript configurations' },
            { name: 'docker-compose.yml', type: 'file', depth: 1, description: 'Local database and container services setup' },
            { name: 'koko.config.json', type: 'file', depth: 1, description: 'Koko workspace configuration manifest' },
            { name: 'package.json', type: 'file', depth: 1, description: 'Root configuration defining workspace packages' },
            { name: 'pnpm-workspace.yaml', type: 'file', depth: 1, description: 'pnpm package definitions' },
            { name: 'turbo.json', type: 'file', depth: 1, description: 'Turborepo build pipeline and cache rules' },
            { name: 'README.md', type: 'file', depth: 1, description: 'Project documentation and quickstart commands' }
          ]
        },
        {
          anchorId: 'saas-starter-layout',
          title: 'Standalone Layout: SaaS Starter (Next.js)',
          body: [
            'For the SaaS Starter recipe (Next.js App Router + Drizzle + Better-Auth), Koko structures a scalable fullstack architecture:'
          ],
          tree: [
            { name: 'my-saas/', type: 'folder', depth: 0, description: 'SaaS project root directory' },
            { name: 'src/', type: 'folder', depth: 1, description: 'Application source code' },
            { name: 'app/', type: 'folder', depth: 2, description: 'Next.js App Router pages and Server Actions' },
            { name: 'api/', type: 'folder', depth: 3, description: 'Auth endpoints and payment webhooks' },
            { name: 'page.tsx', type: 'file', depth: 3, description: 'Main landing page' },
            { name: 'layout.tsx', type: 'file', depth: 3, description: 'Root layout with theme and auth providers' },
            { name: 'components/', type: 'folder', depth: 2, description: 'UI component library (shadcn UI / Tailwind)' },
            { name: 'lib/', type: 'folder', depth: 2, description: 'Utilities, auth client, and database connection' },
            { name: 'db/', type: 'folder', depth: 3, description: 'Drizzle schema definitions and SQL migrations' },
            { name: 'docker-compose.yml', type: 'file', depth: 1, description: 'Local PostgreSQL container' },
            { name: 'koko.config.json', type: 'file', depth: 1, description: 'Koko configuration manifest' },
            { name: 'next.config.mjs', type: 'file', depth: 1, description: 'Next.js compiler configuration' }
          ]
        },
        {
          anchorId: 'go-backend-layout',
          title: 'Backend Layout: Go Chi Router',
          body: [
            'For Go-powered backends, Koko enforces standard Golang project layout conventions:'
          ],
          tree: [
            { name: 'api-go/', type: 'folder', depth: 0, description: 'Go server root folder' },
            { name: 'cmd/', type: 'folder', depth: 1, description: 'Executable build entrypoints' },
            { name: 'api/', type: 'folder', depth: 2 },
            { name: 'main.go', type: 'file', depth: 3, description: 'Chi router bootstrap and server startup' },
            { name: 'pkg/', type: 'folder', depth: 1, description: 'Application modules and business logic' },
            { name: 'handlers/', type: 'folder', depth: 2, description: 'HTTP route handlers' },
            { name: 'db/', type: 'folder', depth: 2, description: 'Database client connection and GORM models' },
            { name: 'go.mod', type: 'file', depth: 1, description: 'Go module dependencies manifest' },
            { name: 'go.sum', type: 'file', depth: 1, description: 'Go module checksums file' }
          ]
        }
      ]
    },
    {
      id: 'koko-config',
      title: 'The koko.config.json Manifest',
      category: 'Project Structure',
      content: [
        {
          anchorId: 'manifest-purpose',
          title: 'The koko.config.json Manifest',
          body: [
            'On project initialization, Koko creates a `koko.config.json` manifest at the root. This file acts as the immutable single source of truth for your architecture, allowing developer tools and future commands to inspect your tech stack without parsing config files manually.'
          ]
        },
        {
          anchorId: 'json-schema',
          title: 'JSON Schema Specification',
          body: [
            'The standardized schema published at `https://koko-cli.dev/schema.json` contains four main sections: `project`, `architecture`, `stack`, and `features`:'
          ],
          pre: '{\n  "$schema": "https://koko-cli.dev/schema.json",\n  "project": {\n    "name": "my-super-app",\n    "cliVersion": "v2.0.0",\n    "createdAt": "2026-09-01T12:00:00Z"\n  },\n  "architecture": {\n    "layout": "monorepo",\n    "packageManager": "pnpm"\n  },\n  "stack": {\n    "frontend": {\n      "framework": "nextjs",\n      "language": "typescript",\n      "styling": "tailwindcss"\n    },\n    "backend": {\n      "framework": "express",\n      "language": "typescript"\n    },\n    "database": {\n      "provider": "postgres",\n      "orm": "drizzle"\n    }\n  },\n  "features": {\n    "auth": {\n      "provider": "better-auth",\n      "status": "installed"\n    },\n    "infrastructure": {\n      "dockerCompose": true,\n      "ciCd": "github_actions"\n    }\n  }\n}'
        }
      ]
    },

    // ==========================================
    // CATEGORY: ADVANCED
    // ==========================================
    {
      id: 'recipes-deep-dive',
      title: 'Production Recipes',
      category: 'Advanced',
      content: [
        {
          anchorId: 'recipes-overview',
          title: 'Official Blueprint Architecture',
          body: [
            'Koko CLI recipes are production-ready templates with pinned dependencies from the Master Catalog, preconfigured linters, unit tests, and Docker container support.'
          ]
        },
        {
          anchorId: 'recipe-saas',
          title: '⚡ SaaS Starter (Fullstack TypeScript)',
          body: [
            '• Stack: Next.js (App Router, React 19) + Drizzle ORM + Better-Auth + Stripe + Docker PostgreSQL.',
            '• Features: Complete authentication flow with secure sessions, PostgreSQL relational schema with Drizzle Kit migrations, accessible UI components with Tailwind CSS and Lucide Icons.',
            '• Quick command: `koko init my-saas -r saas`'
          ]
        },
        {
          anchorId: 'recipe-pern',
          title: '🚀 PERN Stack (PostgreSQL + Express + React + Node)',
          body: [
            '• Stack: React (Vite, TS) + Node.js Express (TS) + PostgreSQL + Prisma ORM + Docker.',
            '• Architecture: Decoupled Turborepo monorepo, shared `packages/db` package for the generated Prisma client, and unified development scripts.',
            '• Quick command: `koko init my-pern -r pern`'
          ]
        },
        {
          anchorId: 'recipe-mern',
          title: '💻 MERN Stack (MongoDB + Express + React + Node)',
          body: [
            '• Stack: React (Vite, TS) + Node.js Express (TS) + MongoDB + Mongoose + Docker.',
            '• Architecture: Monorepo workspace with ready-to-run MongoDB Docker container, typed Mongoose models, and schema validation.',
            '• Quick command: `koko init my-mern -r mern`'
          ]
        },
        {
          anchorId: 'recipe-fastapi',
          title: '🐍 FastAPI + React (Python Async + Vite SPA)',
          body: [
            '• Stack: Python FastAPI + React (Vite) SPA + Pydantic v2 + Uvicorn.',
            '• Features: Asynchronous Python backend with preconfigured CORS for Vite client, interactive Swagger API docs at `/docs`, and dependency management via `requirements.txt`.',
            '• Quick command: `koko init my-python -r fastapi_react`'
          ]
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      category: 'Advanced',
      content: [
        {
          anchorId: 'docker-ports',
          title: 'Docker Port Allocation Conflicts',
          body: [
            'If you encounter `port is already allocated` when running `docker compose up -d` (port 5432 or 27017):',
            '• Cause: You have a local PostgreSQL or MongoDB instance running outside Docker.',
            '• Solution: Stop the local system service or edit `docker-compose.yml` to map host ports to an alternative number (e.g. `"5433:5432"`).'
          ]
        },
        {
          anchorId: 'unix-permissions',
          title: 'Execution Permissions on macOS & Linux',
          body: [
            'If you download native binaries directly from GitHub Releases and receive `permission denied` or Gatekeeper security prompts:',
            '• On Linux/macOS: Grant execution permissions using `chmod +x koko`.',
            '• On macOS (Gatekeeper): If the binary is quarantined, run `xattr -d com.apple.quarantine koko` or allow it via System Settings > Privacy & Security.'
          ]
        },
        {
          anchorId: 'pnpm-workspace-issues',
          title: 'Monorepo Workspace Linking (pnpm)',
          body: [
            'If local package symlinks in `packages/db` fail to resolve:',
            '• Make sure you have `pnpm` (v9 or newer) installed.',
            '• Run `pnpm install` from the project root so workspace symlinks are properly established.'
          ]
        }
      ]
    },
    {
      id: 'contributing',
      title: 'Contributing Guide',
      category: 'Advanced',
      content: [
        {
          anchorId: 'open-source',
          title: 'Open Source Community',
          body: [
            'Koko CLI is 100% open source under the MIT license. We actively welcome contributions including new templates, Go engine performance improvements, bug fixes, and documentation updates.'
          ]
        },
        {
          anchorId: 'local-setup',
          title: 'Local Development Environment Setup',
          body: [
            'Steps to clone, build, and test Koko CLI locally on your machine:'
          ],
          nestedBlocks: [
            {
              anchorId: 'step-clone',
              title: '1. Clone Repository',
              body: ['Clone the official GitHub repository and navigate to the directory:'],
              pre: 'git clone https://github.com/BlasVernazza06/koko-cli.git\ncd koko-cli'
            },
            {
              anchorId: 'step-run-go',
              title: '2. Run and Build in Go',
              body: ['Requires Go 1.21+. You can run the CLI directly from source or compile the binary:'],
              pre: '# Run directly from source\ngo run main.go init\n\n# Compile binary locally\ngo build -o koko main.go'
            },
            {
              anchorId: 'step-tests',
              title: '3. Run Test Suite',
              body: ['Execute the automated unit and compatibility test suite:'],
              pre: 'go test ./... -v'
            }
          ]
        },
        {
          anchorId: 'project-architecture-code',
          title: 'Go Codebase Architecture',
          body: [
            '• `cmd/`: Cobra CLI commands (`init.go`, `version.go`, `root.go`), Bubble Tea TUI state machine (`tui.go`), and Lipgloss views (`cmd/views/`).',
            '• `internal/compatibility/`: Real-time cross-validation engine and logical safety rules.',
            '• `internal/config/`: `koko.config.json` manifest builder and serializer.',
            '• `internal/scaffold/`: Scaffolding engine, template handlers, and Virtual File System (`vfs`).',
            '• `internal/catalog/`: Central master catalog for npm and external library package versions.'
          ]
        }
      ]
    },

    // ==========================================
    // CATEGORY: FAQ
    // ==========================================
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      category: 'FAQ',
      content: [
        {
          anchorId: 'why-go',
          title: 'Why is the Koko CLI written in Go?',
          body: [
            'Go enables us to compile a single, dependency-free binary for the end-user. This guarantees instant execution (sub-millisecond cold start) and removes the need to configure global Node.js setups or manage npm version conflicts just to scaffold a project.'
          ],
          tags: ['go', 'cli', 'performance']
        },
        {
          anchorId: 'offline-mode',
          title: 'Can I run Koko offline without an internet connection?',
          body: [
            'Absolutely! Once you have the Koko binary or package installed, the CLI generates all files, configurations, schemas, and scripts 100% locally on your machine without contacting external servers.'
          ],
          tags: ['offline', 'general', 'infrastructure']
        },
        {
          anchorId: 'monorepo-support',
          title: 'How does Koko handle Monorepo workspaces?',
          body: [
            'When you choose separate frontend and backend frameworks (or select recipes like PERN or MERN), Koko automatically scaffolds a monorepo workspace powered by pnpm workspaces and Turborepo (`turbo.json`). This enables shared database schemas (`packages/db`) and TypeScript configs with zero code duplication.'
          ],
          tags: ['monorepo', 'architecture', 'turborepo']
        },
        {
          anchorId: 'docker-compose-default',
          title: 'Is Docker required to use Koko?',
          body: [
            'No, Docker is completely optional. If you prefer cloud-hosted database providers (such as Supabase, Neon, or MongoDB Atlas), you can set `--docker=false` or deselect Docker Compose during manual configuration.'
          ],
          tags: ['docker', 'databases']
        },
        {
          anchorId: 'is-free',
          title: 'Is Koko open source and free for commercial use?',
          body: [
            'Yes, Koko is 100% open source under the MIT license. You can use it completely free of charge for personal projects, open-source work, and commercial production products.'
          ],
          tags: ['general', 'license', 'commercial']
        },
        {
          anchorId: 'supported-os',
          title: 'What operating systems are supported?',
          body: [
            'Koko is completely cross-platform and thoroughly tested on Windows (PowerShell, CMD, WSL2), macOS (Apple Silicon M1/M2/M3 and Intel x86_64), and all major Linux distributions.'
          ],
          tags: ['general', 'os', 'compatibility']
        }
      ]
    }
  ]
};

