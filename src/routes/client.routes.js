import { Router } from 'express';
import clientController from '../controllers/client.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Apply authentication middleware globally
router.use(authenticate);

// Routes for CRUD operations
router.post('/', clientController.createClient);        // Create client
router.get('/', clientController.getAllClients);       // Get all clients
router.get('/:id', clientController.getClientById);    // Get client by ID
router.get('/email/:email', clientController.getClientByEmail); // Get client by Email
router.get('/document/:document', clientController.getClientByDocument); // Get client by Document

// Search clients based on query parameters (e.g., name, document, email)
router.get('/search', clientController.searchClients); // Search for clients based on parameters

router.patch('/:id', clientController.updateClient);   // Update client partially
router.delete('/:id', clientController.deleteClient); // Delete client

export default router;
