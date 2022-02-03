
const adminRole = (req, res, next ) => {
    if(!req.usuario){
        return res.status(500).json({message: 'Verificar role sin token'})
    }

    const {role, name} = req.usuario

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({message: `${name} no tiene los permisos necesarios`});
    }

    next();
}

module.exports = {
    adminRole
}