import db from '../config/db.js';

const obtenerUsuario = async(email,pass) => {
    const [rows] = await db.query(`SELECT * FROM Usuarios
        WHERE email = ? AND pass = ?`,[email,pass]);

    return rows[0];

}

export {obtenerUsuario}






