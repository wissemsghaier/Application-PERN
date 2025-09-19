import express from "express";
import {
  createAttivita,
  getAttivitaByAnagrafica,
  updateAttivita,
  deleteAttivita
} from "../controllers/attivitaProfessionaleController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId




// ------------------------------
// 🔹 AttivitaProfessionale
// ------------------------------
router.post("/", verifyUser, adminOnly, createAttivita);
router.get("/", verifyUser, adminOnly, getAttivitaByAnagrafica);
router.put("/:id", verifyUser, adminOnly, updateAttivita);
router.delete("/:id", verifyUser, adminOnly, deleteAttivita);


export default router;
