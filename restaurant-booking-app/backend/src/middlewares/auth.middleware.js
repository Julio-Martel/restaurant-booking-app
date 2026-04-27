import db from '../config/db.js';
import jwt from 'jsonwebtoken';


const authToken = async(req,res,next) => {
    const headerToken = req.headers.autorizathion;

    if(!headerToken){
        return res.status(404).json({
            mensaje: 'No hay token en el header'
        })
    }

    const token = headerToken.split(' ')[1];    

   try{

    const decoded = jwt.verify(token, 'secreto');

    res.status(200).json({
        mensaje: 'Inicio con exito'
    });

    next();

   }catch(error){
       return res.status(403).json({ mensaje: 'Token inválido' });
   }
}

export {authToken}