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

    const [restauranteExistenteMedianteNombre] = await db.query(`SELECT * FROM Restaurante WHERE nombre = ?`,[nombre]);

    if(restauranteExistenteMedianteNombre.length !== 0){
        throw new Error('YA EXISTE UN RESTAURANTE CON ESE NOMBRE');
    }  

    const resultado = db.query(`INSERT INTO Restaurantes(nombre,direccion,capacidad,id_usuario)
        VALUES(?,?,?,?)`,[nombre, direccion, capacidad, id_usuario]);

    return resultado;    
}

const updateRestaurante = async(id,data) => {

    const datosParaActualizar = [];
    const datosParaActualizarFormatoTexto = datosParaActualizar.join(", ") // ESTO CONVIERTE UN ARREGLO A FORMATO TEXTO
    const [restauranteEncontrado] = await db.query(`SELECT id FROM Restaurantes WHERE id = ?`,[id]);
    

    if(restauranteEncontrado.length === 0){
        throw new Error('RESTAURANTE NO ENCONTRADO')
    }

    if(data.nombre !== null){
        data.nombre = 'nombre = ?';
        datosParaActualizar.push(data.nombre);
    }

    if(data.direccion !== null){
        data.direccion = 'direccion = ?'
        datosParaActualizar.push(data.direccion);
    }

    if(data.id_usuario !== null){
        data.direccion = 'id_usuario = ?';
        datosParaActualizar.push(data.id_usuario);
    }

    if(!data.nombre || !data.direccion || !data.id_usuario){
        throw new Error('DEBE RELLENAR TODOS LOS CAMPOS');
    }

    if(datosParaActualizarFormatoTexto !== null){
        const [resultado] = await db.query(`UPDATE Restaurante SET ${datosParaActualizarFormatoTexto} WHERE id = ?`,
            [datosParaActualizarFormatoTexto, id])
    
        return resultado;      
    }
}

export {
    verRestaurantesPorId,
    createRestaurante,
    verificarRestaurante,
    updateRestaurante
}