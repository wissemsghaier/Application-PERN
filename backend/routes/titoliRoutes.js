import express from "express";
import {
  createTitolo,
  getTitoliByAnagrafica,
  updateTitolo,
  deleteTitolo
} from "../controllers/titoliController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId





// ------------------------------
// 🔹 Titoli
// ------------------------------
router.post("/", verifyUser, adminOnly,  createTitolo);
router.get("/", verifyUser, adminOnly,  getTitoliByAnagrafica);
router.put("/:id", verifyUser, adminOnly,  updateTitolo);
router.delete("/:id", verifyUser, adminOnly,  deleteTitolo);


export default router;
