

import express from "express";
import {
  createContatto,
  getContattiByAnagrafica,
  updateContatto,
  deleteContatto
} from "../controllers/contattiController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId




// ------------------------------
// 🔹 Contatti
// ------------------------------
router.post("/", verifyUser,  createContatto);
router.get("/", verifyUser,  getContattiByAnagrafica);
router.put("/:id", verifyUser,  updateContatto);
router.delete("/:id", verifyUser, adminOnly, deleteContatto);


export default router;
