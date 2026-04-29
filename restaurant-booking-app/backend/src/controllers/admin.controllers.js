import db from '../config/db.js';
import { obtenerUsuarios, eliminarUsuario } from '../models/usuario.model.js';

const getUsuarios = async (req,res) => {
 try {

   const usuarios = await obtenerUsuarios();

   if (usuarios === undefined) {
      return res.status(404).json({
         mensaje: 'No hay usuarios'
      });
   }

    res.status(200).json({
      mensaje: 'Todos los usuarios',
      usuarios
   });

 } catch(error) {

   return res.status(500).json({
      mensaje: 'Error del servidor'
   });

 }
}

const deleteUsuarios = async(req,res) => {
   const {id} = req.params;

   try {
      const  rows = await eliminarUsuario(id);

      if(rows.affectedRows === 0){
         return res.status(404).json({
            mensaje: 'Usuario no encontrado'
         })
      }

      res.status(200).json({
         mensaje: 'Usuario eliminado'
      })

   } catch(error){
      return res.status(404).json({
         mensaje: 'Usuario no encontrado'
      })
   }
}

export {
   getUsuarios,
   deleteUsuarios
}