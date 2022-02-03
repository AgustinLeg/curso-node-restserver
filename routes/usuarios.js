const { Router } = require("express");
const { check } = require("express-validator");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const { validarCampos, validarJWT, adminRole } = require("../middlewares");

const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", userGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  userPut
);

router.patch("/", userPatch);

router.delete(
  "/:id",
  [
    validarJWT,
    adminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  userDelete
);

module.exports = router;
