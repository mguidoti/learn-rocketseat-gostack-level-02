// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// The .use() works for any HTTP method
routes.use('/appointments', appointmentsRouter);

export default routes;
