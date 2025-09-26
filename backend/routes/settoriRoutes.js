import express from "express";
import {
  createSettore,
  getSettoriByAlbo,
  updateSettore,
  deleteSettore,
} from "../controllers/settoriController.js";

import { verifyUser, adminOnly } from "../middleware/authMiddlware.js";

const router = express.Router({ mergeParams: true }); // 🔹 important pour récupérer ordreId et anagraficaId

// ------------------------------
// 🔹 Settori
// ------------------------------


// Settori liés à un Albo
router.post("/", verifyUser,  createSettore);
router.get("/", verifyUser,  getSettoriByAlbo);

// CRUD direct sur Settore
router.put("/:id", verifyUser,  updateSettore);
router.delete("/:id", verifyUser, adminOnly, deleteSettore);



export default router;
