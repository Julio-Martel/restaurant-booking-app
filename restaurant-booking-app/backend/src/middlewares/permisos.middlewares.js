const permisoAdmin = (req,res,next) => {
    
    if(req.user.rol !== 'admin'){
        return res.send('Solo el administrador puede ver todos los usuarios.');
    }

    next();
}

const permisoCliente = (req,res,next) => {
    if(req.user.rol !== 'cliente'){
        return res.send('Solo el cliente puede hacer reservas.')
    }

    next();
}

const permisoDuenio = (req,res, next) => {
    if(req.user.rol !== 'restaurant'){
        return res.send('Solo el dueño puede crear su restaurante.')
    }

    next();
}


export {
    permisoAdmin,
    permisoCliente,
    permisoDuenio
};