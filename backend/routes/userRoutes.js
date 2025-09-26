
import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  assignOrdine,
  removeOrdiniFromUser
} from "../controllers/userController.js";
import { verifyUser, adminOnly, } from "../middleware/authMiddlware.js";


const router = express.Router();

// CRUD utilisateur
router.get("/", verifyUser, adminOnly, getAllUsers);
router.put("/:id", verifyUser, adminOnly,  updateUser);
router.delete("/:id", verifyUser, adminOnly, deleteUser);

// Assigner / retirer ordini
router.put("/:id/assign", verifyUser, adminOnly, assignOrdine);
router.put("/:id/removeOrdini", verifyUser, adminOnly, removeOrdiniFromUser);

export default router;
