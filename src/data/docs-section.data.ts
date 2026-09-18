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
    title: "Diagnóstico con koko doctor",
    desc: "Audita la integridad de tu proyecto, detecta desviaciones (drift) respecto al manifiesto koko.config.json y repara inconsistencias automáticamente con un solo comando.",
    path: "/docs/doctor"
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
    title: "Diagnostics with koko doctor",
    desc: "Audit workspace integrity, detect architecture drift against koko.config.json, and auto-repair inconsistencies instantly with a single command.",
    path: "/en/docs/doctor"
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
