import db from "../config/db.js";

const getRestaurantes = async() => {
    const [rows] = await db.query(`SELECT * FROM Restaurantes`);

    return rows;
}

const verRestaurantesPorId = async(id) => {
    const [rows] = await db.query(`SELECT *FROM Restaurantes WHERE id_usuario = ?`,[id]);

    if(rows.length === 0){
        throw new Error(`NO TIENE RESTAURANTES CON SU ID`);
    }

    return rows;
}


const verificarRestaurante = async(id) => {
    const rows = db.query(`SELECT * FROM Usuarios WHERE id = ?`,[id]);

    return rows;
}

const createRestaurante = async(nombre, direccion, capacidad, id_usuario) => {
    const resultado = db.query(`INSERT INTO Restaurantes(nombre,direccion,capacidad,id_usuario)
        VALUES(?,?,?,?)`,[nombre, direccion, capacidad, id_usuario]);

        /*FALTAN AGREGAR VALIDACIONES COMO EVITAR LA DUPLICACION DEL
        RESTAURANTE*/



    return resultado;    
}


export {
    verRestaurantesPorId,
    createRestaurante,
    verificarRestaurante
}