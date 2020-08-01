import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import users from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', users);

export default routes;
