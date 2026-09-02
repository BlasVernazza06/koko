import type { DocItem } from '@/types/docs-section.types';

export const docsEs: DocItem[] = [
  {
    id: "scaffolding",
    title: "Estructuración Interactiva",
    desc: "Crea repositorios limpios y estandarizados dinámicamente con nuestro asistente interactivo CLI de un solo comando.",
    path: "/docs/cli-commands#commands"
  },
  {
    id: "presets",
    title: "Recetas y Presets Activos",
    desc: "Despliega arquitecturas probadas en producción usando plantillas personalizadas para SaaS, apps móviles y frameworks fullstack.",
    path: "/docs/quick-start#overview"
  },
  {
    id: "drift",
    title: "Control de Desviación (Drift)",
    desc: "Mantén sincronizados los parámetros, reglas del linter y dependencias de tu proyecto detectando cualquier desvío desde el inicio.",
    path: "/docs/contributing#overview"
  },
  {
    id: "offline",
    title: "Motor sin Dependencias",
    desc: "Un binario rápido compilado en Go que se ejecuta completamente offline sin permanencia de configuración ni sobrecarga de npm.",
    path: "/docs/quick-start#prerequisites"
  }
];

export const docsEn: DocItem[] = [
  {
    id: "scaffolding",
    title: "Interactive Scaffolding",
    desc: "Scaffold clean, standardized repositories dynamically with our single-command interactive CLI helper.",
    path: "/docs/cli-commands#commands"
  },
  {
    id: "presets",
    title: "Active Presets & Blueprints",
    desc: "Deploy production-proven architectures instantly using blueprints customized for SaaS, mobile apps, and fullstack frameworks.",
    path: "/docs/quick-start#overview"
  },
  {
    id: "drift",
    title: "Drift Prevention",
    desc: "Keep your workspace parameters, linter configs, and dependencies synchronized and detect deviations from Day 1 to Day 2.",
    path: "/docs/contributing#overview"
  },
  {
    id: "offline",
    title: "Zero-dependency Engine",
    desc: "A fast, compiled Go binary that runs completely offline with zero configuration lock-in or extra npm bloat.",
    path: "/docs/quick-start#prerequisites"
  }
];

export function getDocsForLang(lang: string = 'es'): DocItem[] {
  return lang === 'es' ? docsEs : docsEn;
}
