import db from "../config/db.js";

const getRestaurantes = async() => {
    const [rows] = await db.query(`SELECT * FROM Usuarios 
        WHERE rol = ?`,['restaurante']);

    return rows;
}

export {
    getRestaurantes
}