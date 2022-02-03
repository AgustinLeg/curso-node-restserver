const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {

    const token = req.header('Authorization');

    console.log(token)

    if( !token ){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid)

        // verificar si el usuario existe
        if( !usuario) {
            return res.status(401).json({
                msg: "Token no valido"
            })
        }

        // verificar si el uid status esta en true
        if( !usuario.status) {
            return res.status(401).json({
                msg: "Token no valido"
            })
        }
        
        req.usuario = usuario
        
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:"Token no válido"
        })
    }
    
    
    
}

module.exports = {
    validarJWT
}