import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCards,
  addLikeToCard,
  deleteLikeFromCard,
} from "../controllers/cards";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", addLikeToCard);
router.delete("/:cardId/likes", deleteLikeFromCard);

export default router;
