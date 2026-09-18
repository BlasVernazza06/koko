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
  
  { id: 'pkgs-db', name: 'db (Drizzle)', type: 'dir', indent: 2, visible: false, isOpen: false },
  { id: 'pkgs-db-schema', name: 'schema.ts', type: 'file', indent: 3, visible: false },
  { id: 'pkgs-db-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },

  { id: 'pkgs-ui', name: 'ui (shadcn)', type: 'dir', indent: 2, visible: false, isOpen: false },
  { id: 'pkgs-ui-pkg', name: 'package.json', type: 'file', indent: 3, visible: false },

  { id: 'docker', name: 'docker-compose.yml', type: 'file', indent: 1, visible: false, highlight: true },
  { id: 'turbo', name: 'turbo.json', type: 'file', indent: 1, visible: false, highlight: true },
  { id: 'koko', name: 'koko.config.json', type: 'file', indent: 1, visible: false, highlight: true }
];

export const terminalTranslations: Record<'es' | 'en', TerminalTranslation> = {
  es: {
    creatingProject: 'Creando un nuevo proyecto Koko',
    projectNameLabel: 'Nombre del proyecto',
    chooseModeLabel: 'Elige el modo de configuración',
    quickModeLabel: 'Quick Setup',
    quickModeHint: 'Recetas de producción listas para usar',
    manualModeLabel: 'Manual Configuration',
    manualModeHint: 'Elegir stack paso a paso (Frontend, Backend, DB, ORM, Auth, etc.)',
    frontendTitle: 'Select Frontend Framework',
    backendTitle: 'Select Backend Framework / Runtime',
    apiTitle: 'Select API Layer',
    pmTitle: 'Select Package Manager',
    dbTitle: 'Select Database',
    ormTitle: 'Select ORM / Query Builder',
    authTitle: 'Select Auth Provider',
    addonsTitle: 'Select Addons / Tooling',
    gitTitle: 'Initialize Git Repository?',
    stepGenMemory: 'Generando plantillas y configuración en memoria...',
    stepWritingDisk: 'Escribiendo archivos de forma segura en disco...',
    stepInitGit: 'Inicializando repositorio Git...',
    stepManifest: 'Creando manifiesto koko.config.json...',
    scaffoldingInProgress: 'Scaffolding en progreso...',
    projectCreatedSuccess: '¡Proyecto creado con éxito en 0.78s!',
    nextSteps: 'Próximos pasos:'
  },
  en: {
    creatingProject: 'Creating a new Koko project',
    projectNameLabel: 'Project name',
    chooseModeLabel: 'Choose setup mode',
    quickModeLabel: 'Quick Setup',
    quickModeHint: 'Production-ready recipes ready to use',
    manualModeLabel: 'Manual Configuration',
    manualModeHint: 'Choose stack step-by-step (Frontend, Backend, DB, ORM, Auth, etc.)',
    frontendTitle: 'Select Frontend Framework',
    backendTitle: 'Select Backend Framework / Runtime',
    apiTitle: 'Select API Layer',
    pmTitle: 'Select Package Manager',
    dbTitle: 'Select Database',
    ormTitle: 'Select ORM / Query Builder',
    authTitle: 'Select Auth Provider',
    addonsTitle: 'Select Addons / Tooling',
    gitTitle: 'Initialize Git Repository?',
    stepGenMemory: 'Generating templates and configuration in memory...',
    stepWritingDisk: 'Writing files safely to disk...',
    stepInitGit: 'Initializing Git repository...',
    stepManifest: 'Creating koko.config.json manifest...',
    scaffoldingInProgress: 'Scaffolding in progress...',
    projectCreatedSuccess: 'Project created successfully in 0.78s!',
    nextSteps: 'Next steps:'
  }
};

