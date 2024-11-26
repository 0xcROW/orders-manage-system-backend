import clientRoutes from './client.routes.js';
import userRoutes from './user.routes.js';
import { Router } from 'express';

const router = Router();
router.use('/api/clients', clientRoutes);
router.use('/api/users', userRoutes);

export { router };