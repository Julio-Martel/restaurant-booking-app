import express from 'express';
import { authToken } from '../middlewares/auth.middleware.js';
import { permisoCliente } from '../middlewares/permisos.middlewares.js';
import { getRestaurantes } from '../controllers/restaurante.model.js';
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

/*

    PARA CREAR LA RESERVA SE DEBE AGREGAR LAS VALIDACIONES DE
    LA CANTIDAD PERMITIDA POR EL RESTAURANTE.

    Y ACTUALIZAR EL ESTADO DE LA RESERVA

    SE DEBERAN RESTARLE LUGARES AL RESTAURANTE UNA VEZ CONFIRMADA LA RESERVA


*/


export default clienteRoutes;