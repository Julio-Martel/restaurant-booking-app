import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoDuenio } from '../middlewares/permisos.middlewares.js';
import { crearRestaurante, verSusRestaurantes} from './dueño.controllers.js';

const duenioRoutes = express.Router();

//REGISTRAR RESTAURANTE
duenioRoutes.post('/', authToken, permisoDuenio, crearRestaurante);

// VER SUS PROPIOS RESTAURANTES MEDIANTE EL ID 
duenioRoutes.get('/restaurantes', authToken, permisoDuenio, verSusRestaurantes);



export default duenioRoutes;


