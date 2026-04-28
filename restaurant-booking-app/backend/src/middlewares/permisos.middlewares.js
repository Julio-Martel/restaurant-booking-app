const permisoAdmin = (req,res,next) => {
    
    if(req.user.rol !== 'admin'){
        return res.send('Debe ser admin para poder ingresar');
    }

    next();

}

export {permisoAdmin};