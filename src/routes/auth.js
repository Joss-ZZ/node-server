const { Router } = require("express");
const { check } = require('express-validator');
const { loginUsuario, registroUsuario, revalidarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post('/auth/registro',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
] , registroUsuario);

router.post('/auth/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

router.get('/auth/renew', validarJWT ,revalidarToken);


module.exports = router;