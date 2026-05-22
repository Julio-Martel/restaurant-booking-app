import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoCliente } from '../middlewares/permisos.middlewares.js';
import { verRestaurantes, crearReserva, verTodasTusReservas, cancelarReserva} from '../controllers/cliente.controllers.js';

const clienteRoutes = express.Router();

//PARA VER TODOS LOS RESTAURANTES
clienteRoutes.get('/search', authToken, permisoCliente, verRestaurantes);

//PARA CREAR UNA RESERVA
clienteRoutes.post('/', authToken, permisoCliente, crearReserva);

//PARA VER TODAS LAS RESERVAS HECHAS POR EL CLIENTE
clienteRoutes.get('/reservas', authToken, permisoCliente, verTodasTusReservas);

//CANCELAR UNA RESERVA
clienteRoutes.patch('/:id', authToken, permisoCliente, cancelarReserva);

export default clienteRoutes;