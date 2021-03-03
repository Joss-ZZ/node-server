const { validationResult } = require("express-validator");
const { response } = require("../routes");


const validarCampos = (req, res = response, next) => {

    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();

}

module.exports = {
    validarCampos
};