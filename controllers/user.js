const { response, request } = require('express');

const userGet =  (req = request, res = response ) => {

    const {q, apikey, nombre = 'No name'} = req.query;
    
    res.send({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const userPost = (req, res) => {

    const {nombre, edad} = req.body;

    
    res.status(201).send({
        ok: true,
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const userPut = (req, res) => {

    const id = req.params.id;
    
    res.send({
        ok: true,
        msg: 'put API - controlador',
        id
    });
}

const userPatch = (req, res) => {
    res.send({
        ok: true,
        msg: 'Patch API - controlador',
        id
    });
}

const userDelete = (req, res) => {
    res.send({
        ok: true,
        msg: 'delete API - controlador'
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}