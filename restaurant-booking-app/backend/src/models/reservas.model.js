import db from '../config/db.js';

const createReserva = async(data) => {

    const {
        fecha_hora,
        cantidad_personas,
        estado,
        id_cliente,
        id_restaurante           
    } = data;

    const [clienteExiste] = await db.query(
        `SELECT * FROM Usuarios WHERE id = ?`,
        [id_cliente]
    );

    if(clienteExiste.length === 0){
        throw new Error('CLIENTE_NO_EXISTE');
    }

    const [resultadosRestaurantes] = await db.query(
        `SELECT * FROM Restaurantes WHERE id = ?`,
        [id_restaurante]
    );

    if(resultadosRestaurantes.length === 0){
        throw new Error('RESTAURANTE_NO_EXISTE');
    }

    const [reservaExistente] = await db.query(
        `SELECT * FROM Reservas 
         WHERE id_restaurante = ? 
         AND fecha_hora = ?`,
        [id_restaurante, fecha_hora]
    );

    if(reservaExistente.length !== 0){
        throw new Error('HORARIO_OCUPADO');
    }

    const [reservaCreada] = await db.query(
        `INSERT INTO Reservas(
            fecha_hora,
            cantidad_personas,
            estado,
            id_cliente,
            id_restaurante
        )
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