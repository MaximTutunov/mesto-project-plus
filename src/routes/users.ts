import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} from "../controllers/users";

const router = Router();
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:userId", getUserById);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

export default router;
