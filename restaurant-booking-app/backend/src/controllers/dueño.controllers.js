import { createRestaurante, verificarRestaurante } from "./restaurante.model.js";

const crearRestaurante = async(req,res) => {
    if(!req.body || Object.keys(req.body).length === 0){
        return res.send('El body esta vacio');
    }

    const {nombre, direccion, capacidad, id_usuario} = req.body;

    if(!nombre || !direccion || !capacidad || !id_usuario){
        return res.send('Debe enviar todos los datos');
    }    

    try {

        const rows = await verificarRestaurante(id_usuario);
        
        if(rows === undefined){
            return res.status(404).json({
                mensaje: 'No existe ese id'
            })
        }

        const resultado = await createRestaurante(nombre, direccion, capacidad, id_usuario);
    
        res.status(200).json({
            mensaje: 'Restaurante creado',
            restaurante: rows
        });
    
    
    } catch(error){
        return res.send('Error del servidor.')
    }
}

export {crearRestaurante};
