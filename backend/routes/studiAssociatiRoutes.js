import express from "express";
import {
  createStudioAssociato,
  getStudiByAnagrafica,
  updateStudio,
  deleteStudio
} from "../controllers/studiAssociatiController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId





router.post("/", verifyUser,   createStudioAssociato);
router.get("/", verifyUser,   getStudiByAnagrafica);
router.put("/:id", verifyUser,   updateStudio);
router.delete("/:id", verifyUser, adminOnly,  deleteStudio);

export default router;
