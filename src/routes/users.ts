import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} from '../controllers/users';

import {
  validateUserIdParam,
  validateUpdateProfileRequest,
  validateUpdateAvatarRequest,
} from '../middlewares/validation';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserIdParam, getUserById);
router.patch('/me', validateUpdateProfileRequest, updateProfile);
router.patch('/me/avatar', validateUpdateAvatarRequest, updateAvatar);

export default router;
