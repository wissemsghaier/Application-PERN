import express from 'express'
import { login,register, verify } from '../controllers/authController.js'
// import authMiddleware from '../middleware/authMiddlware.js'
import { verifyUser } from "../middleware/authMiddlware.js";
//import { verify } from 'jsonwebtoken'
const router = express.Router()

router.post('/login', login)
router.post('/register', register);
router.get('/verify', verifyUser, verify)

export default router;