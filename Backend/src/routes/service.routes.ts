import {RequestHandler, Router} from 'express';
import {createService, getAllServices, getServiceById, getServicesByCaregiver} from '../controllers/service.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';  // Import du middleware JWT

const router = Router();

// Route protégée pour créer un service
router.post('/create', authenticateJWT, createService);

router.get('/all', authenticateJWT, getAllServices); // Tous les services
router.get('/my-services', authenticateJWT, getServicesByCaregiver); // Services aidant
router.get('/:id', authenticateJWT, getServiceById);

export default router;
