// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

// The .use() works for any HTTP method
routes.use('/appointments', appointmentsRouter);

routes.use('/users', usersRouter);

export default routes;
