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
router.post("/", verifyUser,  createAbilitazione);
router.get("/", verifyUser,  getAbilitazioniByAnagrafica);
router.put("/:id", verifyUser,  updateAbilitazione);
router.delete("/:id", verifyUser, adminOnly,  deleteAbilitazione);



export default router;
