const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const userGet =  async(req = request, res = response ) => {
    // const {q, apikey, nombre = 'No name'} = req.query; //obtener desde la URL EJ= ?limite=5&desde=5

    const { limite = 5, desde = 0} = req.query;
    const query = { state: true }
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    
    res.json({
        total,
        usuarios
    });
}

const userPost = async(req, res = response) => {
 
    const { name, email, password, role} = req.body;
    const usuario = new Usuario({name,email,password,role});

    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    
    // Guardar en DB
    await usuario.save();
    
    res.json(usuario);
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

    const usuario = await Usuario.findByIdAndUpdate( id, { state: false })
    
    res.json({
        usuario
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}