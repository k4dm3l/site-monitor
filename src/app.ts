import express, { Application, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import Cors from './configs/cors';
import rateLimiter from './middlewares/rateLimiterHandler';

const app: Application = express();

/** General Middlewares */
app.use(cors(Cors.setCorsConfiguration()));
app.use(compression());
app.use(helmet());
app.use(express.json({ limit: '50 mb' }));
app.use(express.urlencoded({ extended: true, limit: '50 mb', parameterLimit: 50000 }));
app.use(rateLimiter);

/** Root endpoint and Health Check endpoint  */
app.get('/', (request: Request, response: Response) => response.status(200).send('Site-Monitor API'));
app.get('/health-check', (request: Request, response: Response) => {
  response.status(200).json({ status: 200, message: 'Health Check', data: {} });
});

export default app;
