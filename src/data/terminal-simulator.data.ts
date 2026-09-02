import type { SidebarFileItem, TerminalTranslation } from '@/types/terminal-simulator.types';

export const initialSidebarFiles: SidebarFileItem[] = [
  { id: 'apps', name: 'apps', type: 'dir', indent: 1, visible: false, isOpen: false },
  { id: 'apps-web', name: 'web (Next.js)', type: 'dir', indent: 2, visible: false, isOpen: false },
  { id: 'apps-web-src', name: 'src', type: 'dir', indent: 3, visible: false, isOpen: false },
  { id: 'apps-web-app', name: 'app', type: 'dir', indent: 4, visible: false, isOpen: false },
  { id: 'apps-web-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },
  
  { id: 'apps-api', name: 'api (NestJS)', type: 'dir', indent: 2, visible: false, isOpen: false },
  { id: 'apps-api-src', name: 'src', type: 'dir', indent: 3, visible: false, isOpen: false },
  { id: 'apps-api-main', name: 'main.ts', type: 'file', indent: 4, visible: false },
  { id: 'apps-api-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },

  { id: 'pkgs', name: 'packages', type: 'dir', indent: 1, visible: false, isOpen: false },
  { id: 'pkgs-auth', name: 'auth (Better-Auth)', type: 'dir', indent: 2, visible: false, isOpen: false },
  { id: 'pkgs-auth-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },
  { id: 'pkgs-schemas', name: 'schemas (Zod)', type: 'dir', indent: 2, visible: false, isOpen: false },
  { id: 'pkgs-schemas-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },

  { id: 'docker', name: 'docker-compose.yml', type: 'file', indent: 1, visible: false, highlight: true },
  { id: 'turbo', name: 'turbo.json', type: 'file', indent: 1, visible: false, highlight: true },
  { id: 'claw', name: 'claw.config.json', type: 'file', indent: 1, visible: false, highlight: true }
];

export const terminalTranslations: Record<'es' | 'en', TerminalTranslation> = {
  es: {
    welcome: 'Bienvenido a Claw CLI v0.1.0',
    projectNamePrompt: '? Nombre del proyecto: ',
    typeInit: 'Iniciando asistente de configuración interactiva...',
    flowChoice: '¿Cómo deseas inicializar tu proyecto?',
    flowRapido: '🚀 Setup Rápido (Recetas de producción listas para usar)',
    flowManual: '⚙️ Configuración Manual (Elegir stack paso a paso)',
    recipeChoice: 'Selecciona una receta de producción:',
    recipeSaas: '💻 Fullstack SaaS Starter (Next.js + Go Fiber + PostgreSQL)',
    analyzing: '🔧 Analizando dependencias...',
    downloading: '📦 Descargando recetas embebidas de Go...',
    injecting: '🚀 Inyectando plantillas y construyendo estructura...',
    done: '✨ ¡Listo! Proyecto inicializado con éxito en 0.8s.'
  },
  en: {
    welcome: 'Welcome to Claw CLI v0.1.0',
    projectNamePrompt: '? Project name: ',
    typeInit: 'Starting interactive configuration wizard...',
    flowChoice: 'How do you want to initialize your project?',
    flowRapido: '🚀 Rapid Setup (Ready-to-use production recipes)',
    flowManual: '⚙️ Manual Configuration (Choose stack step-by-step)',
    recipeChoice: 'Select a production recipe:',
    recipeSaas: '💻 Fullstack SaaS Starter (Next.js + Go Fiber + PostgreSQL)',
    analyzing: '🔧 Analyzing dependencies...',
    downloading: '📦 Downloading Go-embedded recipes...',
    injecting: '🚀 Injecting templates and building workspace structure...',
    done: '✨ Done! Project bootstrapped successfully in 0.8s.'
  }
};
