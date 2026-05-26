import db from "../config/db.js";

const verRestaurantes = async() => {
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

    const [restauranteExistenteMedianteNombre] = await db.query(`SELECT * FROM Restaurantes WHERE nombre = ?`,[nombre]);

    if(restauranteExistenteMedianteNombre.length !== 0){
        throw new Error('YA EXISTE UN RESTAURANTE CON ESE NOMBRE');
    }  

    const resultado = db.query(`INSERT INTO Restaurantes(nombre,direccion,capacidad,id_usuario)
        VALUES(?,?,?,?)`,[nombre, direccion, capacidad, id_usuario]);

    return resultado;    
}

const updateRestaurante = async(id,data) => {

    const datosParaActualizar = [];
    const valores = [];

    const [restauranteEncontrado] = await db.query(`SELECT id FROM Restaurantes WHERE id = ?`,[id]);
    
    console.log(data.nombre,data.direccion,data.id_usuario);

    if(restauranteEncontrado.length === 0){
        throw new Error('RESTAURANTE NO ENCONTRADO')
    }

    if(data.nombre !== undefined){
        valores.push(data.nombre);
        data.nombre = `nombre = ?`;
        datosParaActualizar.push(data.nombre);
    }

    if(data.direccion !== undefined){
        valores.push(data.direccion);
        data.direccion = `direccion = ?`;
        datosParaActualizar.push(data.direccion);
    }

    if(data.id_usuario !== undefined){
        valores.push(data.id_usuario);
        data.id_usuario = `id_usuario = ?`;
        datosParaActualizar.push(data.id_usuario);
    }


    const [usuarioExistente] = await db.query(`SELECT id FROM Usuarios WHERE id = ?`,
        [data.id_usuario]);

    
    if(usuarioExistente.length === 0){
        throw new Error('USUARIO INEXISTENTE');        
    }

   const datosParaActualizarFormatoTexto = datosParaActualizar.join(" , ") 

    if(datosParaActualizarFormatoTexto !== undefined){
        const [resultado] = await db.query(`UPDATE Restaurantes SET f${datosParaActualizarFormatoTexto} WHERE id = ?`,
            [...valores, id])
    
        return resultado;      
    }
}

export {
    verRestaurantes,
    verRestaurantesPorId,
    createRestaurante,
    verificarRestaurante,
    updateRestaurante
}