import db from '../config/db.js';

const createReserva = async(fecha_hora,cantidad_personas,estado,id_cliente,id_restaurante) => {
    
    const [clienteExiste] = await db.query(`SELECT * FROM Usuarios WHERE id = ?`,[id_cliente]);

    const [resultadosRestaurantes] = await db.query(`SELECT * FROM Restaurantes WHERE id = ?`, [id_restaurante]);

    if(!clienteExiste || !resultadosRestaurantes){
        return res.status(404).json({
            mensaje: "Cliente o restaurante inexistente"
        });
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