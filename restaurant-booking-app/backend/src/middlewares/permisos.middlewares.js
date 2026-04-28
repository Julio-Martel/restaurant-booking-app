const permisoAdmin = (req,res,next) => {
    
    if(req.user.rol !== 'admin'){
        return res.send('Solo el administrador puede ver todos los usuarios.');
    }

    next();

}

export {permisoAdmin};