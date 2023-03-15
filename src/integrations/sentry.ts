import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { Application } from 'express';
import env from '../configs';

const sentryConfig = (app: Application): Sentry.NodeOptions => ({
  dsn: env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  environment: env.ENVIRONMENT,
  attachStacktrace: true,
  tracesSampleRate: 1.0,
});

export default sentryConfig;
