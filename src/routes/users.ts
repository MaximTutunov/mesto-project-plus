import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser
} from '../controllers/users';
import {
  validateUserIdParam,
  validateUpdateProfileRequest,
  validateUpdateAvatarRequest,
} from '../middlewares/validation';

const router = Router();
router.get('/', getUsers);

router.get('/:userId', validateUserIdParam, getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateProfileRequest, updateProfile);
router.patch('/me/avatar', validateUpdateAvatarRequest, updateAvatar);

export default router;
