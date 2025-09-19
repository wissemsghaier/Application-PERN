


import express from "express";
import {
  createRecapito,
  getRecapitiByAnagrafica,
  updateRecapito,
  deleteRecapito
} from "../controllers/recapitiController.js";


import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId

// CRUD lié à une anagrafica
router.post("/", verifyUser, adminOnly, createRecapito);
router.get("/", verifyUser, adminOnly, getRecapitiByAnagrafica);
router.put("/:id", verifyUser, adminOnly, updateRecapito);
router.delete("/:id", verifyUser, adminOnly, deleteRecapito);

export default router;
