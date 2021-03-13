const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { listarNotas, registrarNota, actualizarNota, eliminarNota } = require('../controllers/nota');

const router = Router();

//Listar todas las notas
router.get('/nota', validarJWT, listarNotas);

//Crear nota.
router.post('/nota', validarJWT, registrarNota);

//Editar nota.
router.put('/nota/:id', validarJWT, actualizarNota);

//Eliminar nota.
router.delete('/nota/:id', validarJWT, eliminarNota);


module.exports = router;