const express = require('express');
const { listarUsuarios, actualizarUsuario } = require('../controllers/usuario');
const app = express();

const { validarCampos } = require("../middlewares/validar-campos");

const fileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

app.use(fileUpload());

//Listar los usuarios
app.get('/usuario', validarJWT , listarUsuarios);

//Actualizar Usuario
app.put('/usuario/:id',[
    check('nombre', 'El nombre es obligatorio').isLength({ min:1 }),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
] , validarJWT ,actualizarUsuario);

module.exports = app;