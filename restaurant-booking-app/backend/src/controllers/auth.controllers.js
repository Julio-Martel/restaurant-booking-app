import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { obtenerUsuario, comprobarMailExistente, agregarUsuario } from '../models/usuario.model.js';

const login = async(req,res,next) => {
    if(!req.body || Object.keys.length === 0){
        return res.send('Debe enviar datos en el body');
    }

    const {email,pass} = req.body;

    if(!email || !pass){
        return res.send('Deben mandar el email y el pass');
    }

    try{

       const usuarioLogeado = await obtenerUsuario(email);
    
       if(usuarioLogeado === undefined){
        return res.status(404).json({
            mensaje: 'No existe ese usuario'
        })
       }

       const compararHash = await bcrypt.compare(pass, usuarioLogeado.pass);

       const user = usuarioLogeado;

       const token = jwt.sign({
            id: user.id,
            email: user.email,
            rol: user.rol
       },'secreto',{expiresIn :'1h'});

       res.status(200).json({
        mensaje: 'Logeado correctamente.',
        token: token
       })




       next();

    } catch(error){
        return res.status(500).json({
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
        const rows = await comprobarMailExistente(email);

        if(rows !== undefined){
            return res.send('Mail ya en uso')
        }

        const hashedPass = await bcrypt.hash(pass,10);

        const resultado = await agregarUsuario(nombre,email,hashedPass,rol);

        res.status(200).json({
            mensaje: 'Usuario logeado',
            usuario: resultado
        })

    } catch(error){
       return  res.status(500).json({
            mensaje: 'Error del servidor'
        })
    }
}

export {login, register};