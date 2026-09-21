import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || 'https://b0d14f766b77cf8a0bee616597d61839@o4510363402567680.ingest.us.sentry.io/4512124743385088',
  tracesSampleRate: 1.0,
});
