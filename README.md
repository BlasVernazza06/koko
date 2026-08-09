# 🚀 Claw / Koko — Go-Native Project Scaffolding Engine & Web Suite

Este repositorio contiene el código de la plataforma web e interfaz interactiva para **Claw / Koko**, un potente motor de inicialización y control de arquitectura diseñado para desarrolladores exigentes.

El motor de **Claw / Koko** te permite desplegar entornos listos para producción en segundos, inyectando dependencias (Docker, ORMs, linters) de manera modular y protegiendo el código contra la desviación de estándares (drift prevention).

---

## 🌟 Características Clave

- **Inicialización Interactiva Ultrarrápida:** Levanta proyectos estructurados en menos de 5 segundos con asistentes interactivos (`claw init` / `npm create koko-app`).
- **Motor sin Dependencias:** Escrito en Go nativo, lo que garantiza velocidad, portabilidad y ejecutable binario único sin configuraciones previas complejas.
- **Control de Desviación (Drift Prevention):** Garantiza que nadie rompa silenciosamente la arquitectura o configuración de linters y librerías clave acordadas en el manifiesto `koko.json` o `claw.config.json`.
- **Integraciones Modulares y Blueprints:** Inyecta componentes a demanda como base de datos (`claw add database`), autenticación (`claw add auth`), configuración de contenedores Docker y recetas pre-optimizadas para React, Next.js, FastAPI o monorepos.

---

## 🖥️ Sobre este Repositorio (Plataforma Web)

Este proyecto es el sitio web oficial y entorno visual interactivo de Claw / Koko. Incluye:
1. **Simulador interactivo de terminal:** Para probar la experiencia del CLI desde el navegador.
2. **Interactive Builder:** Una suite de selección visual para pre-visualizar el árbol de directorios que generará tu stack ideal.
3. **Documentación interactiva:** Guías detalladas sobre la arquitectura y la especificación del CLI.

### Stack Tecnológico
- [Astro](https://astro.build/) — Framework web moderno para alto rendimiento y SSG/SSR.
- [Svelte 5](https://svelte.dev/) — Para la lógica reactiva del simulador de terminal y el configurador interactivo.
- [Tailwind CSS v4](https://tailwindcss.com/) — Para estilos optimizados y modernos.
- [TypeScript](https://www.typescriptlang.org/) — Tipado estricto y seguro.

---

## 🚀 Guía de Inicio Rápido (Desarrollo Local del Sitio Web)

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 22.12.0 o superior recomendada).

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

## 🛠️ Comandos del CLI (Claw / Koko)

El CLI ofrece una interfaz limpia para interactuar con tus proyectos:

| Comando | Acción |
| :--- | :--- |
| `claw init` / `npm create koko-app@latest` | Inicia el asistente interactivo para estructurar un nuevo proyecto. |
| `claw add auth` | Inyecta de forma automática módulos de autenticación listos para usar. |
| `claw add database` | Configura e inyecta la capa de datos y ORM seleccionados en el workspace. |
| `claw g component [Name]` | Genera un componente reutilizable siguiendo las guías de estilo del proyecto. |

---

## 📄 Licencia

Este proyecto está bajo el control del autor. Consulta más detalles en los repositorios oficiales de [Claw CLI](https://github.com/BlasVernazza06/claw-cli).

---

*Última actualización de documentación: Agosto de 2026.*
