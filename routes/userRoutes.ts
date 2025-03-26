import { Router } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';
import { UserController } from '../controllers/userController';
import { passwordHashMiddleware } from '../middlewares/passwordHash';
import { passwordValidationMiddleware } from '../middlewares/passwordValidation';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/register', passwordValidationMiddleware, passwordHashMiddleware, userController.register.bind(userController));
router.post('/login', passwordValidationMiddleware, userController.login.bind(userController));
router.post('/refresh-access-token', userController.refreshToken.bind(userController));
router.get('/:userId', authMiddleware, userController.getUserProfile.bind(userController));
router.get('/:userId/avatar', authMiddleware, userController.getUserAvatar.bind(userController));

export default router;