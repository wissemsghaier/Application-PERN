import express from "express";
import {
  createStudioAssociato,
  getStudiByAnagrafica,
  updateStudio,
  deleteStudio
} from "../controllers/studiAssociatiController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId





router.post("/", verifyUser, adminOnly,  createStudioAssociato);
router.get("/", verifyUser, adminOnly,  getStudiByAnagrafica);
router.put("/:id", verifyUser, adminOnly,  updateStudio);
router.delete("/:id", verifyUser, adminOnly,  deleteStudio);

export default router;
