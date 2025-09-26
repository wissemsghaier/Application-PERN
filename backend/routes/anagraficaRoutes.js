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
router.post("/", verifyUser,  createAnagrafica);
router.get("/", verifyUser,  getAnagraficaByOrdine);
router.get("/:id", verifyUser,  getAnagraficaById);
router.put("/:id", verifyUser,  updateAnagrafica);
router.delete("/:id", verifyUser, adminOnly, deleteAnagrafica);
router.get("/:id/view", verifyUser, getAnagraficaWithSubTables);


export default router;
