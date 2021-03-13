const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next)=> {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token no enviado'
        });
    }

    try{

        const {uid, nombre} = jwt.verify(token, process.env.SECRET_JWT_SEED)
    
        req.uid = uid;
        req.nombre = nombre;

    }catch(error){
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }


    next();
}

module.exports = {
    validarJWT
}