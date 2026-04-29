import db from '../config/db.js';

const obtenerUsuario = async(email) => {
    const [rows] = await db.query(`SELECT * FROM Usuarios
        WHERE email = ?`,[email]);

    return rows[0];

}

const comprobarMailExistente = async(email) => {
    const [rows] = await db.query(`
        SELECT * FROM Usuarios WHERE email = ?
        `, [email]);

    return rows[0];
}

const agregarUsuario = async(nombre,email,pass,rol) => {
    const [rows] = await db.query(`INSERT INTO Usuarios(nombre,email,pass,rol)
        VALUES(?,?,?,?)`,[nombre,email,pass,rol]);

    return rows[0];
}

const obtenerUsuarios = async() => {
    const [resultados] = await db.query(`SELECT * FROM Usuarios`);

    return resultados;
}

const eliminarUsuario = async(id) => {
    const [rows] = await db.query(`DELETE FROM Usuarios WHERE id = ?`,[id]);

    return rows;
}

export {
    obtenerUsuario, 
    obtenerUsuarios,
    comprobarMailExistente,
    agregarUsuario,
    eliminarUsuario
}






