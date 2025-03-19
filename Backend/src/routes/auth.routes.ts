import { Router } from 'express';
import {login, signup, verifyEmail, resendVerificationEmail, logout} from '../controllers/auth.controller';
import {authenticateJWT} from "../middlewares/auth.middleware";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authenticateJWT, logout);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);

export default router;
