import { Router } from 'express';
import clientController from '../controllers/client.controller.js';

const router = Router();

router.post('/', clientController.createClient);

router.get('/', clientController.getAllClients);
router.get('/document/:document', clientController.getClientByDocument);
router.patch('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
router.get('/:id', clientController.getClientById);
router.get('/email/:email', clientController.getClientByEmail);

export default router;