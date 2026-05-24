import { createRestaurante, verificarRestaurante, verRestaurantesPorId, updateRestaurante } from "./restaurante.model.js";
import { actualizarEstadoReserva, obtenerReservas, obtenerReservasSegunElRestaurante } from "../models/reservas.model.js";

const crearRestaurante = async(req,res) => {
    if(!req.body || Object.keys(req.body).length === 0){
        return res.send('El body esta vacio');
    }

    const {nombre, direccion, capacidad, id_usuario} = req.body;

    if(!nombre || !direccion || !capacidad || !id_usuario){
        return res.send('Debe enviar todos los datos');
    }    

    try {

        const rows = await verRestaurantesPorId(id_usuario);
        
        if(rows === undefined){
            return res.status(404).json({
                mensaje: 'No existe ese id'
            })
        }

        const resultado = await createRestaurante(nombre, direccion, capacidad, id_usuario);
    
        res.status(200).json({
            mensaje: 'Restaurante creado'
        });
    
    
    } catch(error){
        console.log(error);
        return res.send('Error del servidor.')
    }
}

const verSusRestaurantes = async(req,res) => {
    try {

        const restaurantes = await verRestaurantesPorId(req.usuario.id);

        return res.status(202).json({
            mensaje: 'Todos sus restaurantes',
            restaurantes: restaurantes
        })

    } catch(error){
        if(error.message === 'NO TIENE RESTAURANTES CON SU ID'){
            return res.status(404).json({
                mensaje: 'No hay restaurantes mediante ese ID'
            })
        }
    
        res.status(500).json({
            mensaje: 'ERROR DEL SERVIDOR'
        })
    
    }   
}

const actualizarRestaurante = async(req,res) => {
    const {id} = req.params;
    const datosAActualizar = req.body;
    
    try {
        const restauranteActualizado = await updateRestaurante(id,datosAActualizar);

        return res.status(200).json({
            mensaje: 'Restaurante actualizado',
            restaurante: restauranteActualizado
        })

    } catch(error){
    
        if(error.message === 'RESTAURANTE NO ENCONTRADO'){
            return res.status(404).json({
                mensaje: 'Restaurante no encontrado'
            })
        }

        if(error.message === 'USUARIO INEXISTENTE'){
            return res.status(404).json({
                mensaje: 'No existe id de usuario. No puede completar la modificacion'
            })
        }


        return res.status(500).json({
            mensaje: 'ERROR DEL SERVIDOR',
            errorEnSi: error
        })
    
    }
}

const confirmarReservas = async(req,res) => {
    if(!req.body || Object.keys(req.body).length === 0){
        return res.send('DEBE CONFIRMAR|RECHAZAR|CANCELAR LA RESERVA');
    }

    const estado = req.body.estado;
    const id = req.params.id;

console.log(id);
console.log(typeof id);

console.log(estado);
console.log(typeof estado);

    if(estado !== 'confirmado' && estado !== 'rechazado' && estado !== 'cancelado'){
        return res.send('Ingrese confirmad, rechazado o cancelado');
    }

    try{
        const estadoActualizado = await actualizarEstadoReserva(id,estado);

        res.status(200).json({
            mensaje: 'Reserva actualizada'
        })

    } catch(error){
        if(error.message === 'EL id es incorrecto o el estado ya esta cofirmado o cancelado'){
            return res.status(404).json({
                mensaje: 'no se pudo completar la actualizacion del estado de la reserva'
            })
        }
        
        return res.status(500).json({
            mensaje: 'ERROR DEL SERVIDOR'
        })
    
    }
}

const verSusReservas = async(req,res) => {
    try{
        const tusRestaurantes = await obtenerReservasSegunElRestaurante(req.usuario.id);

        /*PENSAR QUE SI SOY DUEÑO QUIERO VER LAS RESERVAS DE
        TODOS MIS RESTAURANTES O BIEN, FILTRAR EL RESTAURANTE ASIGNADO
        A DICHA RESERVA*/

    } catch(error){

    }
}

export {
    crearRestaurante,
    verSusRestaurantes,
    actualizarRestaurante,
    confirmarReservas
};
