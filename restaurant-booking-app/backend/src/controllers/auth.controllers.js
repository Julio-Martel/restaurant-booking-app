import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import brcrypt from 'brcypt';
import { obtenerUsuario, comprobarMailExistente, agregarUsuario } from '../models/usuario.model.js';
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
       },'secreto',{expiresIn :' 1hs'});

       res.status.json({
        mensaje: 'Logeado correctamente.'
       })

       next();

    } catch(error){
        res.status(500).json({
            mensaje: 'Error del servidor'
        })
    }

}

const register = async(req,res) => {
    if(!req.body || Object.keys.length === 0){
        return res.send('Debe enviar datos en el body');
    }

    const {nombre,email,pass,rol} = req.body; 

    if(!nombre || !email || !pass || !rol){
        return res.send('Debe completar todo el body');   
    }

    try{

        const [rows] = comprobarMailExistente(email);

        if(rows.length !== 0){
            return res.send('Mail ya en uso')
        }

        const hashedPass = await brcrypt.hash(pass,10);

        const [rows] = agregarUsuario(nombre,email,hashedPass,rol);






    } catch(error){
        res.status(500).json({
            mensaje: 'Error del servidor'
        })
    }




     /*
        AGREGAR VERIFICACION DE EMAIL
     */




    const hashedPass =  await brcrypt.hash(pass,10)

   




}


export {login, register};