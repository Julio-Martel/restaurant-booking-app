import { createRestaurante, verificarRestaurante, verRestaurantesPorId, updateRestaurante } from "./restaurante.model.js";

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

        return restauranteActualizado;

    } catch(error){
        if(error.message === 'DEBE RELLENAR TODOS LOS CAMPOS'){
            return res.status(409).json({
                mensaje: 'Se deben rellenar todos los campos'
            })
        }
        
        if(error.message === 'RESTAURANTE NO ENCONTRADO'){
            return res.status(404).json({
                mensaje: 'Restaurante no encontrado'
            })
        }

        return res.status(500).json({
            mensaje: 'ERROR DEL SERVIDOR'
        })

    }
}

export {
    crearRestaurante,
    verSusRestaurantes,
    actualizarRestaurante
};
