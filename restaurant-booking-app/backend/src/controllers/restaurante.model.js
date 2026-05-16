import db from "../config/db.js";

const getRestaurantes = async(id) => {
    const [rows] = await db.query(`SELECT * FROM Restaurantes where id_usuario = ?`,[id]);

    return rows;
}

const verificarRestaurante = async(id) => {
    const rows = db.query(`SELECT * FROM Usuarios WHERE id = ?`,[id]);

    return rows;
}

const createRestaurante = async(nombre, direccion, capacidad, id_usuario) => {
    const resultado = db.query(`INSERT INTO Restaurantes(nombre,direccion,capacidad,id_usuario)
        VALUES(?,?,?,?)`,[nombre, direccion, capacidad, id_usuario]);

    return resultado;    
}


export {
    getRestaurantes,
    createRestaurante,
    verificarRestaurante
}