import db from '../config/db.js';
import jwt from 'jsonwebtoken';


const authToken = async(req,res,next) => {
    const headerToken = req.headers.autorizathion;

    if(!hashedPass){
        return res.status(404).json({
            mensaje: 'No hay hash en el header'
        })
    }

    const token = headerToken.split(' ')[1];    

   try{

    /*
    
    terminar
    
    
    */


   }catch(error){



   }
}


export {authToken}