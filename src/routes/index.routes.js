import clientRoutes from './client.routes.js';
import { Router } from 'express';

const router = Router();
router.use('/api/clients', clientRoutes);

export { router };