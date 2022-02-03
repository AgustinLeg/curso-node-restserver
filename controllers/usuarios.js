const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const userGet =  async(req = request, res = response ) => {
    const { limit = 5, from = 0} = req.query;
    const query = { status: true }
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    
    res.json({
        total,
        usuarios
    });
}

const userPost = async(req, res = response) => {
    console.log(req.body)
    const { name, email, password, role} = req.body;
    const usuario = new Usuario({name,email,password,role});

    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    
    // Guardar en DB
    await usuario.save();
    
    res.json(req.body);
}

const userPut = async(req, res) => {

    const {id} = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    // validar contra base de datos
    if( password ){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);
    
    res.json(usuario);
}

const userPatch = (req, res) => {
    res.json({
        msg: 'Patch API - controlador',
        id
    });
}

const userDelete = async(req, res) => {
    const { id } = req.params // Viene de la URL EJ= .com/12312312313

    // Borrar Fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { status: false })
    const usuarioAutenticado = req.usuario
    
    res.json({
        usuario,
        usuarioAutenticado
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}