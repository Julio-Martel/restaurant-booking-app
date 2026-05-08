import { getRestaurantes } from "./restaurante.model.js";

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
    
}

export {
    verRestaurantes
}