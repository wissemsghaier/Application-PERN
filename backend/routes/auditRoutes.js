import express from "express";
import { verifyUser } from "../middleware/authMiddlware.js";
import { getAuditLogs, getLogsByAnagraficaId } from "../controllers/auditController.js";


const router = express.Router();

// GET /api/audit => récupère les derniers logs des tables liées à anagrafica
router.get("/", verifyUser, getAuditLogs);
router.get("/anagrafica/:anagraficaId", verifyUser, getLogsByAnagraficaId);

export default router;
