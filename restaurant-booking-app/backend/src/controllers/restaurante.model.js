import db from "../config/db.js";

const getRestaurantes = async() => {
    const [rows] = await db.query(`SELECT * FROM Usuarios 
        WHERE rol = ?`,['restaurant']);

    return rows;
}

const verificarRestaurante = async(id) => {
    const [rows] = db.query(`SELECT * FROM FROM Usuarios WHERE id = ?`,[id]);

    return rows[0];
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