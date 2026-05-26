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

    const [restauranteCapacidad] = await db.query(`SELECT capacidad FROM Restaurantes WHERE id = ?`,[id_restaurante]);
    let [totalReservasSegunRestaurante] = await db.query(`SELECT SUM(cantidad_personas) AS total FROM Reservas WHERE id_Restaurante = ?`,[id_restaurante]);


    if(totalReservasSegunRestaurante[0].total === null){
        totalReservasSegunRestaurante[0].total = 0;
    }
    
    const capacidadDisponible = restauranteCapacidad[0].capacidad - totalReservasSegunRestaurante[0].total;

    if(cantidad_personas > capacidadDisponible){
        throw new Error(`NO HAY LUGARES`)
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
            'pendiente',
            id_cliente, 
            id_restaurante
        ]
    );

    return reservaCreada;
}

const obtenerReservas = async(id_usuario) => {
    const [todasLasReservas] = await db.query(`SELECT * FROM Reservas WHERE id_cliente = ?`,[id_usuario]);  

    if(todasLasReservas.length === 0){
        throw new Error('SIN RESERVAS ASIGNADAS')   
    }

    return todasLasReservas;
}

const obtenerTodasSusReservas = async(id_duenio,id_Restaurante) => {

    let reservasFiltradas;

    if(id_Restaurante === undefined){

        const [todasLasReservasDeUnDeterminadoDuenio] = await db.query(`SELECT * FROM Usuarios JOIN Restaurantes
            ON usuarios.id = Restaurantes.id_usuario JOIN 
            Reservas ON Restaurantes.id = Reservas.id_restaurante  
            WHERE usuarios.id = ?`,
            [id_duenio]);

        if(todasLasReservasDeUnDeterminadoDuenio.length === 0){
            throw new Error('NO HAY RESERVAS');
        }

        reservasFiltradas = todasLasReservasDeUnDeterminadoDuenio;

    } else {
        const [todasLasReservasDeUnDeterminadoDuenioYRestaurante] = await db.query(`SELECT * FROM Usuarios JOIN Restaurantes
            ON usuarios.id = Restaurantes.id_usuario JOIN 
            Reservas ON Restaurantes.id = Reservas.id_restaurante 
             WHERE usuarios.id = ? AND Restaurantes.id = ?`,
             [id_duenio,id_Restaurante]);

        if(todasLasReservasDeUnDeterminadoDuenioYRestaurante.length === 0){
            throw new Error('NO HAY RESERVAS DE ESTE RESTAURANTE EN ESPECIFICO');
        }        
    
        reservasFiltradas = todasLasReservasDeUnDeterminadoDuenioYRestaurante
    
    }

    return reservasFiltradas;    
}

const cancelReserva = async(id_reserva) => {
    const [reservaCancelada] = await db.query(`UPDATE Reservas SET estado = ? WHERE id = ?`,[id_reserva, 'cancelada']);

    if(reservaCancelada.length === 0){
        throw new Error('NO EXISTE ID DE RESERVA');
    }

    return reservaCancelada;
}

const actualizarEstadoReserva = async(id,estado) => {
    const [estadoReservaActualizado] = await db.query(`UPDATE Reservas SET estado = ? WHERE id = ? AND estado = ?`,[estado,id,'pendiente']);

    if(estadoReservaActualizado.affectedRows === 0){
        throw new Error('EL id es incorrecto o el estado ya esta cofirmado o cancelado');
    }

    return estadoReservaActualizado;
}

export {
    createReserva,
    obtenerReservas,
    cancelReserva,
    actualizarEstadoReserva,
    obtenerTodasSusReservas
};