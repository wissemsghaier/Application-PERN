// import express from "express";
// import { getAllUsers, assignOrdine } from "../controllers/userController.js";
// import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

// const router = express.Router();

// // Lister tous les users (admin uniquement)
// router.get("/", verifyUser, adminOnly, getAllUsers);

// // Assigner des ordini à un user (admin uniquement)
// router.put("/:id/assign", verifyUser, adminOnly, assignOrdine);

// export default router;






import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  assignOrdine,
  removeOrdiniFromUser
} from "../controllers/userController.js";
import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router();

// CRUD utilisateur
router.get("/", verifyUser, adminOnly, getAllUsers);
router.put("/:id", verifyUser, adminOnly, updateUser);
router.delete("/:id", verifyUser, adminOnly, deleteUser);

// Assigner / retirer ordini
router.put("/:id/assign", verifyUser, adminOnly, assignOrdine);
router.put("/:id/removeOrdini", verifyUser, adminOnly, removeOrdiniFromUser);

export default router;
