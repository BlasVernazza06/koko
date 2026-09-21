import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN || 'https://b0d14f766b77cf8a0bee616597d61839@o4510363402567680.ingest.us.sentry.io/4512124743385088',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: true,
    }),
  ],
  // Tasa de muestreo de trazas de rendimiento
  tracesSampleRate: 1.0,
  // Tasa de muestreo para grabaciones de sesión normales
  replaysSessionSampleRate: 0.1,
  // Graba el 100% de las sesiones donde ocurra un error
  replaysOnErrorSampleRate: 1.0,
});
