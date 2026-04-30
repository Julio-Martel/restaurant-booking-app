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

export {
    permisoAdmin,
    permisoCliente
};