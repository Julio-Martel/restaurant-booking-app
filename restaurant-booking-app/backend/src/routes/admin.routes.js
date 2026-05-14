import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoAdmin } from '../middlewares/permisos.middlewares.js';
import { obtenerUsuarios, eliminarUsuario} from '../models/usuario.model.js';
import { getUsuarios, deleteUsuarios} from '../controllers/admin.controllers.js';

const adminRoutes = express.Router();

adminRoutes.get('/search', authToken, permisoAdmin, getUsuarios);
adminRoutes.delete('/usuarios/:id', authToken, permisoAdmin, deleteUsuarios);

export default adminRoutes;