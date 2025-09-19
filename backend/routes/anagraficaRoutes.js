// routes/anagraficaRoutes.js
import express from "express";
import {
  createAnagrafica,
  getAnagraficaByOrdine,
  getAnagraficaById,
  updateAnagrafica,
  deleteAnagrafica,
  getAnagraficaWithSubTables,
} from "../controllers/anagraficaController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId

// CRUD
router.post("/", verifyUser, adminOnly, createAnagrafica);
router.get("/", verifyUser, adminOnly, getAnagraficaByOrdine);
router.get("/:id", verifyUser, adminOnly, getAnagraficaById);
router.put("/:id", verifyUser, adminOnly, updateAnagrafica);
router.delete("/:id", verifyUser, adminOnly, deleteAnagrafica);
router.get("/:id/view", verifyUser, adminOnly, getAnagraficaWithSubTables);


export default router;
