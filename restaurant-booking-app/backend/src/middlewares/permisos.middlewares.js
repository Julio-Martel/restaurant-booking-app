const permisoAdmin = (req,res,next) => {
    const usuario = req.user;

    if(usuario.rol === 'admin'){
        return res.send('Debe ser admin para poder ingresar');
    }

    next();

}

export {permisoAdmin};