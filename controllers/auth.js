const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express/lib/response");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "usuario / password no son correctos - correo",
      });
    }

    // SI el usuario esta activo
    if (!usuario.status) {
      return res.status(400).json({
        msg: "usuario / password no son correctos - estado:false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "usuario / password no son correctos - password",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, img, email } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      const data = {
        name,
        email,
        password: ":)",
        img,
        google: true
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.status) {
      return res.status(401).json({ msg: "error validation" });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
      console.error(error)
    res.status(400).json({
      msg: "Token unverified",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
