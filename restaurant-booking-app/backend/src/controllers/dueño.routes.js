import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoDuenio } from '../middlewares/permisos.middlewares.js';
import { crearRestaurante, obtenerRestaurantes} from './dueño.controllers.js';

const duenioRoutes = express.Router();

duenioRoutes.post('/', authToken, permisoDuenio, crearRestaurante);
duenioRoutes.get('/restaurantes', authToken, permisoDuenio, obtenerRestaurantes);



export default duenioRoutes;


