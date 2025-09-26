
import express from "express";
import {
  createOrdine,
  getAllOrdini,
  getOrdineById,
  updateOrdine,
  deleteOrdine,
  getOrdineAnagrafica,
  getOrdiniByUser,
  stampaOrdine   // ✅ import   // ✅ import
} from "../controllers/ordineController.js";



// Sous-tables
import anagraficaRoutes from "./anagraficaRoutes.js";
import abilitazioniRoutes from "./abilitazioniRoutes.js";
import alboRoutes from "./alboRoutes.js";
import recapitiRoutes from "./recapitiRoutes.js";
import contattiRoutes from "./contattiRoutes.js";
import studiAssociatiRoutes from "./studiAssociatiRoutes.js";
import attivitaProfessionaleRoutes from "./attivitaProfessionaleRoutes.js";
import titoliRoutes from "./titoliRoutes.js";
// import auditRoutes from "./auditRoutes.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router();

// Ordine CRUD
router.post("/", verifyUser, adminOnly, createOrdine);
router.get("/", verifyUser, adminOnly, getAllOrdini);
router.get("/:id", verifyUser, adminOnly, getOrdineById);
router.put("/:id", verifyUser, adminOnly, updateOrdine);
router.delete("/:id", verifyUser, adminOnly, deleteOrdine);
// GET /api/ordini/user/:userId
router.get("/user/:userId",verifyUser, getOrdiniByUser);




router.get("/:id/anagrafica/list", verifyUser,  getOrdineAnagrafica);
router.get("/:id/stampa", verifyUser, adminOnly, stampaOrdine);







// ------------------------------
// 🔹 Sous-tables imbriquées
// ------------------------------
// Exemple : /api/ordini/:ordineId/anagrafica
router.use("/:ordineId/anagrafica", anagraficaRoutes);
router.use("/:ordineId/anagrafica/:anagraficaId/abilitazioni", abilitazioniRoutes);
router.use("/:ordineId/anagrafica/:anagraficaId/albo", alboRoutes);
router.use("/:ordineId/anagrafica/:anagraficaId/recapiti", recapitiRoutes);
router.use("/:ordineId/anagrafica/:anagraficaId/contatti", contattiRoutes);
router.use("/:ordineId/anagrafica/:anagraficaId/studi-associati", studiAssociatiRoutes);
router.use("/:ordineId/anagrafica/:anagraficaId/attivita-professionale", attivitaProfessionaleRoutes);
router.use("/:ordineId/anagrafica/:anagraficaId/titoli", titoliRoutes);
// router.use("/:ordineId/anagrafica/:anagraficaId/logs", auditRoutes);






export default router;

