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
  category: 'Introducción' | 'CLI' | 'Características' | 'Avanzado' | 'Estructura de Proyecto' | 'Preguntas Frecuentes' | 'Guides' | 'Introduction' | 'Features' | 'Project Structure' | 'FAQ';
  isHighlighted?: boolean;
  subItems?: { id: string; title: string }[];
  content: Block[];
}

export const docsData: Record<'es' | 'en', DocSection[]> = {
  es: [
    {
      id: 'quick-start',
      title: 'Inicio Rápido',
      category: 'Introducción',
      isHighlighted: true,
      content: [
        {
          anchorId: 'philosophy',
          title: 'Filosofía de Claw',
          body: [
            '• Inicialización Rápida y Limpia: Diseña tu stack inicial y genera la estructura básica sin código basura innecesario.',
            '• Motor CLI en Go: El binario de Claw es ligero, de arranque instantáneo y no requiere que tengas NodeJS configurado globalmente para inicializar tus repositorios.',
            '• Docker Compose por Defecto: Si configuras una base de datos local, Claw genera el archivo docker-compose listo para levantar el contenedor y su panel administrativo en un clic.',
            '• Enfoque de Consistencia Técnica: Mantenemos la coherencia de TypeScript o Go compartiendo las mejores configuraciones base de linters y herramientas de tipado.'
          ]
        },
        {
          anchorId: 'getting-started',
          title: 'Prerrequisitos e Instalación',
          body: [
            'Para utilizar Claw-CLI en su versión actual (v0.1.0), asegúrate de cumplir con los siguientes prerrequisitos mínimos en tu máquina de desarrollo:'
          ],
          bullets: [
            'Node.js LTS instalado (requerido para ejecutar los proyectos JS/TS generados).',
            'Docker y Docker Compose (opcional, si deseas levantar bases de datos locales levantadas por el CLI).',
            'Instalación del CLI: npm i -g claw-cli (o ejecutándolo directamente con npx claw-cli init).'
          ]
        },
        {
          anchorId: 'cli',
          title: 'Uso del CLI (Terminal)',
          body: [
            'Ejecuta el creador interactivo en tu terminal para seleccionar paso a paso la estructura de tu proyecto:',
            'Si deseas omitir las preguntas interactivas y usar las opciones de plantilla predeterminadas, puedes añadir el flag --yes:'
          ],
          pre: 'npx claw-cli init mi-proyecto\n\nnpx claw-cli init mi-proyecto --yes'
        },
        {
          anchorId: 'builder',
          title: 'Stack Builder (Constructor Web)',
          body: [
            '• Visita la sección /builder en nuestro sitio web para arrastrar y configurar tu stack preferido de manera visual.',
            '• Una vez seleccionado el stack, el constructor te entregará el comando exacto con los flags correspondientes para que lo pegues y ejecutes en tu consola local.'
          ]
        },
        {
          anchorId: 'setups',
          title: 'Recetas Disponibles (v0.1.0)',
          body: [
            'El MVP de Claw te permite crear proyectos combinando las siguientes recetas estables y listas para codificar:'
          ],
          nestedBlocks: [
            {
              anchorId: 'setup-saas',
              title: 'Fullstack Next.js + Go Fiber',
              body: ['Inicializa un frontend en Next.js (App Router, TS), un servidor backend de alta velocidad en Go Fiber y base de datos PostgreSQL local en Docker:'],
              pre: 'npx claw-cli init my-app --frontend nextjs --backend go --db postgres --orm prisma --docker'
            },
            {
              anchorId: 'setup-node',
              title: 'API REST clásica en Node.js',
              body: ['Inicializa una API limpia usando Node Express con TypeScript, Drizzle ORM y validación de esquemas vía Zod:'],
              pre: 'npx claw-cli init my-api --frontend none --backend node --db postgres --orm drizzle --validator zod'
            },
            {
              anchorId: 'setup-spa',
              title: 'Frontend Single Page Application',
              body: ['Genera una interfaz limpia con React, Vite y Tailwind CSS, sin infraestructura de servidor ni bases de datos asociadas:'],
              pre: 'npx claw-cli init my-spa --frontend react --backend none --docker=false'
            }
          ]
        },
        {
          anchorId: 'flags-cheat',
          title: 'Resumen de Parámetros (Flags)',
          body: [
            'Configura el inicializador pasando los argumentos directamente en tu terminal:',
            '• --frontend: nextjs, react, none ( frameworks de cliente soportados en v0.1.0)',
            '• --backend: go, node, none ( motores de servidor soportados en v0.1.0)',
            '• --db: postgres, none ( bases de datos integradas )',
            '• --orm: prisma, sqlx, drizzle, none ( mapeadores relacionales soportados )',
            '• --validator: zod, valibot, none',
            '• --auth: better-auth, nextauth, supabase, none',
            '• --payment: stripe, lemon, mercadopago, none',
            '• --email: resend, nodemailer, none',
            '• --docker: genera el docker-compose.yml local de Postgres (true/false)'
          ]
        }
      ]
    },
    {
      id: 'cli-commands',
      title: 'Comandos Soportados',
      category: 'CLI',
      content: [
        {
          anchorId: 'commands',
          title: 'Comandos de la Versión 0.1.0',
          body: [
            'Actualmente, el CLI expone los comandos esenciales de inicialización del proyecto:',
            '• claw init [name]: Ejecuta el asistente interactivo para crear tu estructura en el disco local.',
            '• claw version: Imprime los detalles de la compilación y la versión actual del ejecutable.'
          ],
          pre: 'claw init mi-aplicacion\nclaw version'
        }
      ]
    },
    {
      id: 'cli-limitations',
      title: 'Limitaciones del MVP',
      category: 'CLI',
      content: [
        {
          anchorId: 'limitations',
          title: 'Limitaciones del MVP',
          body: [
            'Al ser una versión inicial (v0.1.0), el desarrollo cuenta con las siguientes restricciones técnicas:',
            '• No inyección de código dinámico: Si decides no añadir base de datos o auth al inicio, tendrás que configurar estas dependencias manualmente más adelante si el proyecto ya fue creado.',
            '• Ecosistemas acotados: Las combinaciones se limitan a los frameworks principales (Next.js, React, Go Fiber y Node Express). No se soporta Python ni Rust en esta primera instancia.'
          ]
        }
      ]
    },
    {
      id: 'cli-roadmap',
      title: 'Planificación Futura',
      category: 'CLI',
      content: [
        {
          anchorId: 'roadmap',
          title: 'Siguientes Pasos (Roadmap)',
          body: [
            'Estamos planificando las próximas características para las versiones de Claw:',
            '• Comando claw add (v0.2.0): Permitirá inyectar dependencias y código de configuración (como auth o pasarelas de pago) sobre repositorios que ya están a mitad de su desarrollo.',
            '• Comando claw generate (v0.2.0): Generación de componentes de React/Svelte y controladores de servidor desde la consola basándose en tu config.',
            '• Soporte para Monorrepos: Inicialización de proyectos complejos compartiendo tipos vía Turborepo.'
          ]
        }
      ]
    },
    {
      id: 'project-structure',
      title: 'Estructura Generada',
      category: 'Estructura de Proyecto',
      content: [
        {
          anchorId: 'structure-overview',
          title: 'Diseño de Carpetas General',
          body: [
            'Al inicializar un stack con frontend y backend independientes, Claw crea una arquitectura desacoplada para evitar problemas de dependencias compartidas y facilitar el despliegue individual de servicios:'
          ],
          tree: [
            { name: 'mi-proyecto/', type: 'folder', depth: 0, description: 'Directorio raíz del proyecto scaffolded' },
            { name: 'frontend-[name]/', type: 'folder', depth: 1, description: 'Aplicación cliente (Next.js o React SPA)' },
            { name: 'backend-[name]/', type: 'folder', depth: 1, description: 'Servidor API (Go Fiber o Node.js Express)' },
            { name: 'docker-compose.yml', type: 'file', depth: 1, description: 'Orquestación de servicios locales (Postgres + pgAdmin)' },
            { name: 'claw.config.json', type: 'file', depth: 1, description: 'Manifiesto descriptivo del stack seleccionado' }
          ]
        },
        {
          anchorId: 'frontend-react-layout',
          title: 'Estructura Frontend SPA (React + Vite)',
          body: [
            'Si seleccionas una receta de Single Page Application, Claw genera una estructura ligera y moderna optimizada para Vite:'
          ],
          tree: [
            { name: 'frontend-app/', type: 'folder', depth: 0, description: 'Directorio raíz del cliente' },
            { name: 'public/', type: 'folder', depth: 1, description: 'Recursos estáticos expuestos sin procesar' },
            { name: 'src/', type: 'folder', depth: 1, description: 'Código de aplicación React' },
            { name: 'components/', type: 'folder', depth: 2, description: 'Componentes e interfaces reutilizables' },
            { name: 'App.tsx', type: 'file', depth: 2, description: 'Componente raíz' },
            { name: 'main.tsx', type: 'file', depth: 2, description: 'Punto de entrada del bundle' },
            { name: 'index.html', type: 'file', depth: 1, description: 'Plantilla base HTML5' },
            { name: 'vite.config.ts', type: 'file', depth: 1, description: 'Configuración del compilador Vite' },
            { name: 'package.json', type: 'file', depth: 1, description: 'Manifesto de dependencias NPM' }
          ]
        },
        {
          anchorId: 'backend-go-layout',
          title: 'Estructura Backend (Go Fiber)',
          body: [
            'Para proyectos con backend en Go, Claw implementa la estructura recomendada por los estándares de la comunidad de Golang, garantizando modularidad y velocidad:'
          ],
          tree: [
            { name: 'backend-api/', type: 'folder', depth: 0, description: 'Raíz del servidor Go' },
            { name: 'cmd/', type: 'folder', depth: 1, description: 'Puntos de entrada de compilación' },
            { name: 'api/', type: 'folder', depth: 2 },
            { name: 'main.go', type: 'file', depth: 3, description: 'Punto de inicio e instanciación de Fiber' },
            { name: 'pkg/', type: 'folder', depth: 1, description: 'Módulos y lógica compartida' },
            { name: 'handlers/', type: 'folder', depth: 2, description: 'Controladores de rutas HTTP' },
            { name: 'db/', type: 'folder', depth: 2, description: 'Conexión y cliente de base de datos' },
            { name: 'go.mod', type: 'file', depth: 1, description: 'Manifesto de dependencias del módulo Go' }
          ]
        }
      ]
    },
    {
      id: 'claw-config',
      title: 'Manifesto Config',
      category: 'Avanzado',
      content: [
        {
          anchorId: 'config-spec',
          title: 'El Archivo claw.config.json',
          body: [
            'Este archivo es generado en la raíz de tu proyecto para mantener el registro de las tecnologías seleccionadas. Será la pieza clave en el futuro para que los comandos de adición ("add") puedan inyectar dependencias compatibles:'
          ],
          pre: '{\n  "name": "mi-proyecto",\n  "frontend": "nextjs",\n  "backend": "go",\n  "database": {\n    "engine": "postgres",\n    "orm": "prisma"\n  }\n}'
        }
      ]
    },
    {
      id: 'contributing',
      title: 'Colaborar',
      category: 'Avanzado',
      content: [
        {
          anchorId: 'overview',
          title: 'Código Abierto',
          body: [
            'Claw es un proyecto colaborativo. En esta etapa inicial, valoramos el reporte de errores de inicialización, la optimización de los scripts en Go y la mejora de los estilos de la web UI.'
          ]
        },
        {
          anchorId: 'setup',
          title: 'Configuración de Desarrollo Local',
          body: [
            'Sigue estos pasos si deseas levantar la web en tu máquina o contribuir al código base del generador:'
          ],
          nestedBlocks: [
            {
              anchorId: 'setup-prerequisites',
              title: 'Requisitos',
              body: ['Es necesario contar con Go v1.21+ (para el motor CLI) y Node.js v22+ (para el builder interactivo en Astro y Svelte).']
            },
            {
              anchorId: 'setup-install',
              title: 'Instalación de la Web UI',
              body: [
                'Clona el repositorio e inicia el servidor de desarrollo de la landing page:',
                'git clone https://github.com/clawproject/claw.git\ncd claw\nnpm install\nnpm run dev'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'faq',
      title: 'Preguntas Frecuentes',
      category: 'Preguntas Frecuentes',
      content: [
        {
          anchorId: 'why-go',
          title: '¿Por qué el CLI de Claw está escrito en Go?',
          body: [
            'Go nos permite compilar un único archivo binario sin dependencias locales para el usuario final. Esto asegura un inicio instantáneo (cold start de milisegundos) y que no requieras configurar Node.js globalmente o lidiar con versiones conflictivas de npm solo para crear tu scaffolding.'
          ]
        },
        {
          anchorId: 'customize-templates',
          title: '¿Puedo personalizar las plantillas por defecto?',
          body: [
            'En el MVP (v0.1.0) las recetas están predefinidas con las mejores prácticas de la industria. Sin embargo, en el roadmap de la v0.2.0 incluiremos soporte para que cargues tus propias plantillas personalizadas desde repositorios Git remotos o rutas locales.'
          ]
        },
        {
          anchorId: 'modify-later',
          title: '¿Cómo añado módulos (como Auth o Base de Datos) después de la inicialización?',
          body: [
            'Para proyectos creados con el MVP, la adición posterior debe hacerse de forma manual. Estamos trabajando arduamente en el subcomando `claw add` para que detecte automáticamente tu archivo `claw.config.json` e inyecte estos servicios sin romper tu código existente en la v0.2.0.'
          ]
        }
      ]
    }
  ],
  en: [
    {
      id: 'quick-start',
      title: 'Quick Start',
      category: 'Introduction',
      isHighlighted: true,
      content: [
        {
          anchorId: 'philosophy',
          title: 'Claw Philosophy',
          body: [
            '• Clean & Fast Bootstrapping: Design your initial stack and generate the base layout without any unnecessary boilerplate code.',
            '• Go CLI Engine: The Claw binary is lightweight, fires up instantly, and does not require Node JS configured globally to initialize your repositories.',
            '• Docker Compose by Default: If a local database is chosen, Claw builds a docker-compose file ready to spin up the container and DB dashboard in a single click.',
            '• Tech Consistency Focus: We maintain config cohesion for TypeScript or Go by sharing optimal linter rules and typing tools.'
          ]
        },
        {
          anchorId: 'getting-started',
          title: 'Prerequisites & Installation',
          body: [
            'To run Claw-CLI in its current MVP version (v0.1.0), make sure your machine meets these basic requirements:'
          ],
          bullets: [
            'Node.js LTS configured (required to run the generated JS/TS codebases).',
            'Docker & Docker Compose (optional, for local relational databases spun up by the CLI).',
            'CLI Installation: npm i -g claw-cli (or direct execution via npx claw-cli init).'
          ]
        },
        {
          anchorId: 'cli',
          title: 'CLI Usage (Terminal)',
          body: [
            'Run the interactive creator inside your terminal to answer stack config questions step-by-step:',
            'To skip prompts and create the repository using our standard recipe template defaults, append the --yes flag:'
          ],
          pre: 'npx claw-cli init my-project\n\nnpx claw-cli init my-project --yes'
        },
        {
          anchorId: 'builder',
          title: 'Stack Builder (Web UI)',
          body: [
            '• Head over to the /en/builder section on our website to visually configure and mix your preferred stack options.',
            '• Once selected, the builder will output the exact command with the corresponding flags to copy and run in your terminal.'
          ]
        },
        {
          anchorId: 'setups',
          title: 'Available Blueprints (v0.1.0)',
          body: [
            'Claw MVP allows you to generate projects by combining the following stable blueprints:'
          ],
          nestedBlocks: [
            {
              anchorId: 'setup-saas',
              title: 'Fullstack Next.js + Go Fiber',
              body: ['Initialize a Next.js (App Router, TS) client app, a high-performance Go Fiber backend API, and a local PostgreSQL DB in Docker:'],
              pre: 'npx claw-cli init my-app --frontend nextjs --backend go --db postgres --orm prisma --docker'
            },
            {
              anchorId: 'setup-node',
              title: 'Classic Node.js REST API',
              body: ['Scaffold a clean API using Node Express with TypeScript, Drizzle ORM, and schema validation via Zod:'],
              pre: 'npx claw-cli init my-api --frontend none --backend node --db postgres --orm drizzle --validator zod'
            },
            {
              anchorId: 'setup-spa',
              title: 'Frontend Single Page Application',
              body: ['Generate a clean client template using React, Vite, and Tailwind CSS, without server infrastructure or database configurations:'],
              pre: 'npx claw-cli init my-spa --frontend react --backend none --docker=false'
            }
          ]
        },
        {
          anchorId: 'flags-cheat',
          title: 'Command Parameters (Flags)',
          body: [
            'Configure your template directly by passing arguments to the command:',
            '• --frontend: nextjs, react, none ( client frameworks supported in v0.1.0 )',
            '• --backend: go, node, none ( server engines supported in v0.1.0 )',
            '• --db: postgres, none ( relational databases supported )',
            '• --orm: prisma, sqlx, drizzle, none ( relational mapping tools )',
            '• --validator: zod, valibot, none',
            '• --auth: better-auth, nextauth, supabase, none',
            '• --payment: stripe, lemon, mercadopago, none',
            '• --email: resend, nodemailer, none',
            '• --docker: builds the local Postgres docker-compose.yml file (true/false)'
          ]
        }
      ]
    },
    {
      id: 'cli-commands',
      title: 'Supported Commands',
      category: 'CLI',
      content: [
        {
          anchorId: 'commands',
          title: 'Commands Supported in v0.1.0',
          body: [
            'Currently, the CLI exposes the baseline commands required to spin up templates:',
            '• claw init [name]: Runs the interactive terminal wizard to build your project structure.',
            '• claw version: Prints build details and the executable semantic version.'
          ],
          pre: 'claw init my-app\nclaw version'
        }
      ]
    },
    {
      id: 'cli-limitations',
      title: 'MVP Limitations',
      category: 'CLI',
      content: [
        {
          anchorId: 'limitations',
          title: 'MVP Limitations',
          body: [
            'Being in its initial MVP phase (v0.1.0), the application has the following boundaries:',
            '• No post-creation code injection: If you skip selecting databases or auth at launch, you will have to manually configure those dependencies in the code later.',
            '• Restricted ecosystems: Tech stacks are limited to core platforms (Next.js, React, Go Fiber, Node Express). Python and Rust are not yet supported.'
          ]
        }
      ]
    },
    {
      id: 'cli-roadmap',
      title: 'Future Roadmap',
      category: 'CLI',
      content: [
        {
          anchorId: 'roadmap',
          title: 'Upcoming Features (Roadmap)',
          body: [
            'We are planning the following milestones for future releases of Claw:',
            '• claw add command (v0.2.0): Will let you inject configuration code and files (like auth or payment clients) into active projects mid-development.',
            '• claw generate command (v0.2.0): CLI generation of React/Svelte components and backend endpoints based on active configurations.',
            '• Monorepos support: Scaffolding complex monorepos using Turborepo workspaces.'
          ]
        }
      ]
    },
    {
      id: 'project-structure',
      title: 'Project Structure',
      category: 'Project Structure',
      content: [
        {
          anchorId: 'structure-overview',
          title: 'General Folder Layout',
          body: [
            'When initializing a stack with decoupled frontend and backend services, Claw establishes a clear boundary to avoid shared dependency hell and enable independent deployments:'
          ],
          tree: [
            { name: 'my-project/', type: 'folder', depth: 0, description: 'Root directory of the scaffolded repository' },
            { name: 'frontend-[name]/', type: 'folder', depth: 1, description: 'Client application (Next.js or React SPA)' },
            { name: 'backend-[name]/', type: 'folder', depth: 1, description: 'Backend API server (Go Fiber or Node.js Express)' },
            { name: 'docker-compose.yml', type: 'file', depth: 1, description: 'Orchestrates local services (Postgres + pgAdmin)' },
            { name: 'claw.config.json', type: 'file', depth: 1, description: 'Manifest outlining your active tech stack configurations' }
          ]
        },
        {
          anchorId: 'frontend-react-layout',
          title: 'Frontend SPA Structure (React + Vite)',
          body: [
            'If you select a Single Page Application configuration, Claw spins up a lightweight, high-performance workspace optimized for Vite:'
          ],
          tree: [
            { name: 'frontend-app/', type: 'folder', depth: 0, description: 'Client-side root folder' },
            { name: 'public/', type: 'folder', depth: 1, description: 'Static raw assets served as-is' },
            { name: 'src/', type: 'folder', depth: 1, description: 'React application source code' },
            { name: 'components/', type: 'folder', depth: 2, description: 'Reusable UI components' },
            { name: 'App.tsx', type: 'file', depth: 2, description: 'Root application component' },
            { name: 'main.tsx', type: 'file', depth: 2, description: 'Bundle compiler entry point' },
            { name: 'index.html', type: 'file', depth: 1, description: 'HTML5 base template' },
            { name: 'vite.config.ts', type: 'file', depth: 1, description: 'Vite build configurations' },
            { name: 'package.json', type: 'file', depth: 1, description: 'NPM package manifest' }
          ]
        },
        {
          anchorId: 'backend-go-layout',
          title: 'Backend Structure (Go Fiber)',
          body: [
            'For Go-powered backends, Claw enforces the standard directory hierarchy recommended by the Go community, ensuring clean modular boundaries:'
          ],
          tree: [
            { name: 'backend-api/', type: 'folder', depth: 0, description: 'Go server root folder' },
            { name: 'cmd/', type: 'folder', depth: 1, description: 'Executable entry directories' },
            { name: 'api/', type: 'folder', depth: 2 },
            { name: 'main.go', type: 'file', depth: 3, description: 'Initializes and boots the Fiber routing engine' },
            { name: 'pkg/', type: 'folder', depth: 1, description: 'Internal modules and shared library logic' },
            { name: 'handlers/', type: 'folder', depth: 2, description: 'HTTP route handlers' },
            { name: 'db/', type: 'folder', depth: 2, description: 'Database connection and query definitions' },
            { name: 'go.mod', type: 'file', depth: 1, description: 'Go module dependencies manifest' }
          ]
        }
      ]
    },
    {
      id: 'claw-config',
      title: 'Manifesto Config',
      category: 'Advanced',
      content: [
        {
          anchorId: 'config-spec',
          title: 'The claw.config.json Manifest',
          body: [
            'This manifest file is generated at the root of your project to keep a record of the choices made. It will be the core registry checked by future "add" commands to safely append modules:'
          ],
          pre: '{\n  "name": "my-project",\n  "frontend": "nextjs",\n  "backend": "go",\n  "database": {\n    "engine": "postgres",\n    "orm": "prisma"\n  }\n}'
        }
      ]
    },
    {
      id: 'contributing',
      title: 'Contributing',
      category: 'Advanced',
      content: [
        {
          anchorId: 'overview',
          title: 'Open Source',
          body: [
            'Claw is a community project. At this early stage, we welcome reports on generator bugs, CLI compiler optimizations in Go, and Web UI style enhancements.'
          ]
        },
        {
          anchorId: 'setup',
          title: 'Development Environment Setup',
          body: [
            'Follow these quick instructions to compile Claw-CLI locally and host the Stack Builder on your machine:'
          ],
          nestedBlocks: [
            {
              anchorId: 'setup-prerequisites',
              title: 'Prerequisites',
              body: ['Ensure Go v1.21+ (to compile CLI) and Node.js v22+ (to run Astro/Svelte Web UI) are set up.']
            },
            {
              anchorId: 'setup-install',
              title: 'Installation',
              body: [
                'Clone repository and launch the local Astro dev server:',
                'git clone https://github.com/clawproject/claw.git\ncd claw\nnpm install\nnpm run dev'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      category: 'FAQ',
      content: [
        {
          anchorId: 'why-go',
          title: 'Why is the Claw CLI written in Go?',
          body: [
            'Go enables us to compile a single, dependency-free binary for the end-user. This guarantees instant execution (sub-millisecond cold start) and removes the need to configure global Node.js setups or manage npm version conflicts just to scaffold a project.'
          ]
        },
        {
          anchorId: 'customize-templates',
          title: 'Can I customize the default templates?',
          body: [
            'In the MVP release (v0.1.0), recipes are preconfigured based on industry best practices. However, the v0.2.0 roadmap includes functionality to let you load custom templates directly from remote Git repositories or local folders.'
          ]
        },
        {
          anchorId: 'modify-later',
          title: 'How do I add modules (like Auth or DB) after initialization?',
          body: [
            'For projects generated using the MVP, post-setup features must be configured manually. We are actively developing the `claw add` sub-command to automatically read your `claw.config.json` manifest and securely inject these modules in v0.2.0.'
          ]
        }
      ]
    }
  ]
};

