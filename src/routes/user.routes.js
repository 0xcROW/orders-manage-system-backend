import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

router.use(authenticate);

router.get('/', userController.getAllUsers);
router.get('/search', userController.getUserBySearch);
router.get('/email/:email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;