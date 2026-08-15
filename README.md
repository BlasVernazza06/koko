# 🚀 Koko — Go-Native Project Scaffolding Engine & Web Suite

[![Astro](https://img.shields.io/badge/Astro-v6-orange?style=flat-square&logo=astro)](https://astro.build/)
[![Svelte 5](https://img.shields.io/badge/Svelte-v5-ff3e00?style=flat-square&logo=svelte)](https://svelte.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

Este repositorio contiene el código de la plataforma web e interfaz interactiva para **Koko**, un potente motor de inicialización y control de arquitectura diseñado para desarrolladores exigentes.

El motor de **Koko** te permite desplegar entornos listos para producción en segundos, inyectando dependencias (Docker, ORMs, linters) de manera modular y protegiendo el código contra la desviación de estándares (drift prevention).

---

## 🌟 Características Clave

- **⚡ Inicialización Ultrarrápida:** Levanta proyectos estructurados en menos de 5 segundos con asistentes interactivos (`koko init` / `npm create koko-app`).
- **🛡️ Motor sin Dependencias:** Escrito en Go nativo, lo que garantiza velocidad, portabilidad y ejecutable binario único sin configuraciones previas complejas.
- **🔒 Control de Desviación (Drift Prevention):** Garantiza que nadie rompa silenciosamente la arquitectura o configuración de linters y librerías clave acordadas en el manifiesto `koko.config.json`.
- **🧩 Integraciones Modulares y Blueprints:** Inyecta componentes a demanda como base de datos (`koko add database`), autenticación (`koko add auth`), configuración de contenedores Docker y recetas pre-optimizadas para React, Next.js, FastAPI o monorepos.

---

## 🖥️ Sobre este Repositorio (Plataforma Web)

Este proyecto es el sitio web oficial y entorno visual interactivo de Koko. Incluye:
1. **Simulador interactivo de terminal:** Para probar la experiencia del CLI desde el navegador.
2. **Interactive Builder:** Una suite de selección visual para pre-visualizar el árbol de directorios que generará tu stack ideal.
3. **Documentación interactiva:** Guías detalladas sobre la arquitectura y la especificación del CLI.

### 🛠️ Stack Tecnológico
- [Astro](https://astro.build/) — Framework web moderno para alto rendimiento y SSG/SSR.
- [Svelte 5](https://svelte.dev/) — Para la reactividad del simulador de terminal y el configurador interactivo con Runes (`$state`, `$derived`).
- [Tailwind CSS v4](https://tailwindcss.com/) — Sistema de estilos moderno y optimizado.
- [TypeScript](https://www.typescriptlang.org/) — Tipado estricto y seguro.
- [Lucide Icons](https://lucide.dev/) — Iconografía minimalista y consistente.

---

## 📂 Estructura del Proyecto

```text
koko-web/
├── public/                 # Archivos y recursos estáticos
├── src/
│   ├── assets/             # Imágenes y vectores optimizados
│   ├── components/         # Componentes Astro y Svelte (Builder, Terminal, UI)
│   │   ├── builder/        # Módulos del generador interactivo
│   │   ├── terminal/       # Simulador interactivo de línea de comandos
│   │   └── ui/             # Componentes de diseño base
│   ├── layouts/            # Plantillas maestras de página
│   ├── lib/                # Utilidades, configuración y tipos TS
│   ├── pages/              # Rutas y páginas de Astro
│   └── styles/             # Configuración y capas de Tailwind CSS v4
├── astro.config.mjs        # Configuración principal de Astro
├── components.json         # Configuración del sistema de componentes
└── package.json            # Dependencias y scripts de desarrollo
```

---

## 🚀 Guía de Inicio Rápido (Desarrollo Local)

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión `>=22.12.0` recomendada).

### 1. Clonar el repositorio e instalar dependencias
```sh
npm install
```

### 2. Levantar el servidor de desarrollo
```sh
npm run dev
```
El servidor web local se iniciará en `http://localhost:4321`.

### 3. Construir la aplicación para producción
```sh
npm run build
```

### 4. Previsualizar la compilación de producción
```sh
npm run preview
```

---

## 🛠️ Comandos del CLI (Koko)

El CLI ofrece una interfaz limpia y potente para interactuar con tus proyectos:

| Comando | Acción |
| :--- | :--- |
| `koko init` / `npm create koko-app@latest` | Inicia el asistente interactivo para estructurar un nuevo proyecto. |
| `koko add auth` | Inyecta de forma automática módulos de autenticación listos para usar. |
| `koko add database` | Configura e inyecta la capa de datos y ORM seleccionados en el workspace. |
| `koko g component [Name]` | Genera un componente reutilizable siguiendo las guías de estilo del proyecto. |
| `koko check` | Valida que la estructura del proyecto cumpla con las reglas del manifiesto. |

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar:
1. Haz un fork del repositorio.
2. Crea una rama para tu feature o fix (`git checkout -b feature/nueva-funcionalidad`).
3. Confirma tus cambios (`git commit -m 'feat: agrega nueva funcionalidad'`).
4. Sube tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo el control del autor. Consulta más detalles en los repositorios oficiales de [Koko CLI](https://github.com/BlasVernazza06/koko-cli).

---

*Última actualización: Agosto de 2026.*
