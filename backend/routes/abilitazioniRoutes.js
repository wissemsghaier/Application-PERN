import express from "express";
import {
  createAbilitazione,
  getAbilitazioniByAnagrafica,
  updateAbilitazione,
  deleteAbilitazione
} from "../controllers/abilitazioniController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";


const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId

// ------------------------------
// 🔹 Abilitazioni
// ------------------------------
router.post("/", verifyUser, adminOnly,  createAbilitazione);
router.get("/", verifyUser, adminOnly,  getAbilitazioniByAnagrafica);
router.put("/:id", verifyUser, adminOnly,  updateAbilitazione);
router.delete("/:id", verifyUser, adminOnly,  deleteAbilitazione);



export default router;
