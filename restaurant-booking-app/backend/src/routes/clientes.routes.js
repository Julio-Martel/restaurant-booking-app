import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoCliente } from '../middlewares/permisos.middlewares.js';
import { getRestaurantes } from '../controllers/restaurante.model.js';
import { verRestaurantes, crearReserva, verTodasTusReservas} from '../controllers/cliente.controllers.js';


const clienteRoutes = express.Router();

clienteRoutes.get('/search', authToken, permisoCliente, verRestaurantes);
clienteRoutes.post('/', authToken, permisoCliente, crearReserva);
clienteRoutes.get('/reservas', authToken, permisoCliente, verTodasTusReservas);

export default clienteRoutes;