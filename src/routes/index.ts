// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

// The .use() works for any HTTP method
routes.use('/appointments', appointmentsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

export default routes;
