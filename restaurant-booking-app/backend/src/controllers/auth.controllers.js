import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import brcrypt from 'brcypt';
import { obtenerUsuario } from '../models/usuario.model.js';
import { use } from 'react';


const login = async(req,res,next) => {
    if(!req.body || Object.keys.length === 0){
        return res.send('Debe enviar datos en el body');
    }

    const {email,pass} = req.body;

    if(!email || !pass){
        return res.send('Deben mandar el email y el pass');
    }

    try{

       const [usuarioLogeado] = obtenerUsuario(email,pass);
    
       if(usuarioLogeado.length === 0){
        return res.status(404).json({
            mensaje: 'No existe ese usuario'
        })
       }

       const user = usuarioLogeado[0];

       const token = await jwt.sign({
            id: user.id,
            email: user.email,
            rol: user.rol
       });

       /*
       
       TERMINAR DE COMPLETAR
       
       
       */ 






        next();

    } catch(error){

    }

}


const register = async() => {

}


export {login, register};