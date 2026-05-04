import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoDuenio } from '../middlewares/permisos.middlewares.js';
import { crearRestaurante } from './dueño.controllers.js';

const duenioRoutes = express.Router();

duenioRoutes.post('/', authToken, permisoDuenio, crearRestaurante);
/*ARREGLAR TEMA DE QUE EL ROL NO COINCIDE POR LO QUE NO PUEDO CREAR UN RESTAURANTE 
HASTA QUE ARREGLE ESO*/


export default duenioRoutes;


