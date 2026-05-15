import db from '../config/db.js';

const createReserva = async(fecha_hora,cantidad_personas,estado,id_cliente,id_restaurante) => {
    
    const [clienteExiste] = await db.query(`SELECT * FROM Usuarios WHERE id = ?`,[id_cliente]);

    const [resultadosRestaurantes] = await db.query(`SELECT * FROM Restaurantes WHERE id = ?`, [id_restaurante]);

    const [fechaOcupadaEstado] = await db.query(`SELECT * FROM Reservas WHERE fecha_hora = ? OR fecha_hora > ?`, [fecha_hora]);

    if(!clienteExiste || !resultadosRestaurantes){
        return res.status(404).json({
            mensaje: "Cliente o restaurante inexistente"
        });
    }

    if(fechaOcupadaEstado.length !== 0){
        return res.status(400).json({
            mensaje:'No puede utilizar fechas pasadas o la actual'
        })
    }

    const [reservaCreada] = await db.query(`INSERT INTO Reservas(fecha_hora,cantidad_personas,estado,id_cliente,id_restaurante)
        VALUES(?,?,?,?,?)`,
        [
            fecha_hora,
            cantidad_personas,
            estado, 
            id_cliente, 
            id_restaurante
        ]
    );

    return reservaCreada;

}

export {createReserva};