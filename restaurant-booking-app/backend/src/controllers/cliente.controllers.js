import { getRestaurantes } from "./restaurante.model.js";
import { createReserva, obtenerReservas} from "../models/reservas.model.js";

const verRestaurantes = async(req,res) => {
    
    try {
        const rows = await getRestaurantes();
    
        if(rows.length === 0){
            return res.status(404).json({
                mensaje: 'No hay restaurantes en la base de datos por el momento'
            })
        }

        res.status(200).json({
            mensaje:'Todos los restaurantes',
            restaurantes: rows
        })

    } catch(error){
        return res.status(500).json({
            mensja: 'Error del servidor'
        })
    }
}

const crearReserva = async(req,res) => {

    try {

        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({
                mensaje: 'Debe enviar datos'
            });
        }

        const reservaCreada = await createReserva(req.body);

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

export {
    verRestaurantes,
    crearReserva,
    verTodasTusReservas
}