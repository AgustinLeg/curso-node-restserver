const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({ role });
    if( !existeRole ){
        throw new Error(`El role ${role} no esta registrado en la DB`)
    }
}


// Verificiar si el correo existe
const emailExiste = async(email= '') => {
    const existeEmail = await Usuario.findOne({ email });
    if(existeEmail){
        throw new Error(`El correo ${email}, ya esta registrado`)
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario){
        throw new Error(`El ID: ${id}, no existe`)
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}