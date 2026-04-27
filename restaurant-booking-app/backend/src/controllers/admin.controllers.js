import db from '../config/db.js';
import { obtenerUsuarios } from '../models/usuario.model.js';

const getUsuarios = async (req,res) => {
 try {

   const usuarios = await obtenerUsuarios();

   if (!usuarios.length) {
      return res.status(404).json({
         mensaje: 'No hay usuarios'
      });
   }

    res.status(200).json({
      mensaje: 'Todos los usuarios',
      usuarios
   });

   /*ERROR ARREGLAR*/

 } catch(error) {

   return res.status(500).json({
      mensaje: 'Error del servidor'
   });

 }
}
export {getUsuarios}