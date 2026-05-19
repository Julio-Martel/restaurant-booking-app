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

    /*
    
        cantidad_total = 50;
        
        yo_reservo = 40;

        si libres = cantidad_total - total_en_la_bd;

        si yo reservo > libres entonces corto la funcion,
        pero ahora digamos,
        si ya hay reservas por ejemplo, asignamos los 40


        >>>> libres = cantidad_total - total_en_la_bd,
                = 50 - 40
        entonces 
        libres = 10(nueva cantidad al hjacer otra reserva)

        yo_reservo = 20

        si yo_reservo > libres entonces no hay lugares
        como 20 > 10 entonces se termina,

        pero si ingreso 5 por ej

        entonces ahi lo guardo

        tota en la bd seria de 45

    
    */




    const [reservaCreada] = await db.query(
        `INSERT INTO Reservas(
            fecha_hora,
            cantidad_personas,
            id_cliente,
            id_restaurante
        )
        VALUES(?,?,?,?,?)`,
        [
            fecha_hora,
            cantidad_personas,
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

const deleteReserva = async(id_reserva) => {
     const [reservaEliminada] = await db.query(`DELETE FROM Reservas 
        WHERE id = ?`,
        [id_reserva]);

    if(reservaEliminada.length === 0){
        throw new Error(`RESERVA NO ENCONTRADA`);
    }

    if(reservaEliminada.affectedRows === 0){
        throw new Error(`RESERVA ELIMINADA O INEXISTENTE`);
    }

    return reservaEliminada;
}

const cancelReserva = async(id_reserva) => {
    const [reservaCancelada] = await db.query(`UPDATE Reservas SET estado = ? WHERE id = ?`,[id_reserva, 'cancelada']);

    if(reservaCancelada.length === 0){
        throw new Error('NO EXISTE ID DE RESERVA');
    }

    return reservaCancelada;

}

export {
    createReserva,
    obtenerReservas,
    cancelReserva
};