// import express from "express";
// import {
//   createOrdine,
//   getAllOrdini,
//   getOrdineById,
//   updateOrdine,
//   deleteOrdine,
//   addDataSetToOrdine,
// } from "../controllers/ordineController.js";

// import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

// const router = express.Router();

// // 🔹 CRUD Ordine
// router.post("/", verifyUser, adminOnly, createOrdine);       // Créer un Ordine
// router.get("/", verifyUser, adminOnly, getAllOrdini);       // Lister tous les Ordini
// router.post("/addDataSet", verifyUser, adminOnly, addDataSetToOrdine);
// router.get("/:id", verifyUser, adminOnly, getOrdineById);   // Récupérer un Ordine par ID
// router.put("/:id", verifyUser, adminOnly, updateOrdine);    // Mettre à jour
// router.delete("/:id", verifyUser, adminOnly, deleteOrdine); // Supprimer

// export default router;





import express from "express";
import {
  createOrdine,
  getAllOrdini,
  getOrdineById,
  updateOrdine,
  deleteOrdine,
  addDataSetToOrdine,
  updateDataSet,
  deleteDataSet,
  stampaOrdine   // ✅ import   // ✅ import
} from "../controllers/ordineController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router();

// Ordine CRUD
router.post("/", verifyUser, adminOnly, createOrdine);
router.get("/", verifyUser, adminOnly, getAllOrdini);
router.get("/:id", verifyUser, adminOnly, getOrdineById);
router.put("/:id", verifyUser, adminOnly, updateOrdine);
router.delete("/:id", verifyUser, adminOnly, deleteOrdine);

// DataSet CRUD pour un Ordine spécifique
router.post("/:id/addDataSet", verifyUser, adminOnly, addDataSetToOrdine);
router.put("/:ordineId/updateDataSet/:datasetIndex", verifyUser, adminOnly, updateDataSet);
router.delete("/:ordineId/deleteDataSet/:datasetIndex", verifyUser, adminOnly, deleteDataSet);
router.get("/:id/stampa", verifyUser, adminOnly, stampaOrdine);

export default router;






















