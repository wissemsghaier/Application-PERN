import express from "express";
import {
  createAlbo,
  getAlboByAnagrafica,
  updateAlbo,
  deleteAlbo
} from "../controllers/alboController.js";
import settoriRoutes from "./settoriRoutes.js"; // ✅ imbriqué ici

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId



// ------------------------------
// 🔹 Albo
// ------------------------------
router.post("/", verifyUser, adminOnly, createAlbo);
router.get("/", verifyUser, adminOnly, getAlboByAnagrafica);
router.put("/:id", verifyUser, adminOnly, updateAlbo);
router.delete("/:id", verifyUser, adminOnly, deleteAlbo);

// 🔹 Settori imbriqués sous chaque Albo
router.use("/:alboId/settori", settoriRoutes);

export default router;