import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoCliente } from '../middlewares/permisos.middlewares.js';
import { getRestaurantes } from '../controllers/restaurante.model.js';
import { verRestaurantes, crearReserva, verTodasTusReservas, borrarReserva} from '../controllers/cliente.controllers.js';

const clienteRoutes = express.Router();

//EL CLIENTE PODRA VER TODOS LOS RESTAURANTES
clienteRoutes.get('/search', authToken, permisoCliente, verRestaurantes);

//EL CLIENTE PODRA VER TODAS SUS RESERVAS
clienteRoutes.post('/', authToken, permisoCliente, crearReserva);

//EL CLIENTE PODRA VER TODAS SUS RESERVAS
clienteRoutes.get('/reservas', authToken, permisoCliente, verTodasTusReservas);



//clienteRoutes.delete('/:id', authToken, permisoCliente,borrarReserva)

export default clienteRoutes;