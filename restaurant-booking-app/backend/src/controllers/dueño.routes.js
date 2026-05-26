import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoDuenio } from '../middlewares/permisos.middlewares.js';
import { crearRestaurante, verSusRestaurantes, actualizarRestaurante} from './dueño.controllers.js';
import { confirmarReservas,verSusReservasDeTodosSusRestaurantes } from './dueño.controllers.js';

const duenioRoutes = express.Router();

//REGISTRAR RESTAURANTE
duenioRoutes.post('/', authToken, permisoDuenio, crearRestaurante);

// VER SUS PROPIOS RESTAURANTES MEDIANTE EL ID 
duenioRoutes.get('/restaurantes', authToken, permisoDuenio, verSusRestaurantes);

//ACTUALIZAR UN RESTAURANTE
duenioRoutes.patch('/:id', authToken, permisoDuenio, actualizarRestaurante)

//VER RESERVAS DE SUs RESTAURANTEs
duenioRoutes.get('/reservas', authToken, permisoDuenio, verSusReservasDeTodosSusRestaurantes)

//CONFIRMAR RESERVAS
duenioRoutes.patch('/confirmar/:id',authToken, permisoDuenio, confirmarReservas);



export default duenioRoutes;


