import express from 'express';
import { getUsers, removeUser, changeUserRole, getAllAdminServices } from '../controllers/admin.controller';

const router = express.Router();

router.get('/users', getUsers);
router.delete('/user/:id', removeUser);
router.put('/user/role', changeUserRole);
router.get('/services', getAllAdminServices);

export default router;
