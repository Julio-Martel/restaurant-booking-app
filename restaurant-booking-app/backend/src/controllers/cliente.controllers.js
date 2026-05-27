import { createReserva, obtenerReservas, cancelReserva} from "../models/reservas.model.js";
import { verRestaurantes } from "./restaurante.model.js";

const crearReserva = async(req,res) => {

    try {

        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({
                mensaje: 'Debe enviar datos'
            });
        }

        const reservaCreada = await createReserva(req.body,req.user.id);

        return res.status(201).json({
            mensaje: 'Reserva creada',
            reserva: reservaCreada
        });

    } catch(error){

        if(error.message === 'CLIENTE_NO_EXISTE'){
            return res.status(404).json({
                mensaje: 'Cliente inexistente'
            });
        }

        if(error.message === 'RESTAURANTE_NO_EXISTE'){
            return res.status(404).json({
                mensaje: 'Restaurante inexistente'
            });
        }

        if(error.message === 'HORARIO_OCUPADO'){
            return res.status(409).json({
                mensaje: 'Horario ocupado'
            });
        }

        console.log(error);

        return res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

}

const verTodasTusReservas = async(req,res) => {
    try{
        const reservas = await obtenerReservas(req.user.id);
    
        return res.status(200).json({
            mensaje: 'Tus reservas',
            reservasTodas: reservas
        })
    
    
    } catch(error){
       
        if(error.message === 'SIN RESERVAS ASIGNADAS'){
            return res.status(404).json({
               mensaje: 'No tiene reservas asignadas' 
            })
        }
        
        return res.status(500).json({
            mensaje: 'Error del servidor',
            error: error
        })

    }
}

const cancelarReserva = async(req,res) => {
    const {id} = req.params;

    try {
        const reservaCancelada = await cancelReserva(id);

        return res.status(202).json({
            mensaje: 'Reserva cancelada con exito.'
        })

    } catch(error){
        if(error.message === 'NO EXISTE ID DE RESERVA'){
           return res.status(404).json({
             mensaje: 'ID inexistente'
           }) 
        }
    
        return res.status(500).json({
            mensaje: 'Error del servidor'
        })
    }
}

const verTodosLosRestaurantes = async(req,res) => {
    try{
        const todosLosRestaurantes = await verRestaurantes();

        return res.status(200).json({
            mensaje: 'Todos los restaurantes',
            restaurantes: todosLosRestaurantes
        });

    } catch(error){
        return res.status(500).json({
            mensaje: 'ERROR DEL SERVIDOR'
        })
    }
}

export {
    verTodosLosRestaurantes,
    crearReserva,
    verTodasTusReservas,
    cancelarReserva
}