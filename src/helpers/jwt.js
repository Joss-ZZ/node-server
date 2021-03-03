
const jwt = require('jsonwebtoken');

const generarJWT = (uid, nombre)=> {

    const payload = { uid, nombre};
    
    return new Promise((resolve, reject)=> {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (error, token)=> {
            if(error){
                reject(error);
            }else{
                resolve(token);
            }
        });
    });

}

module.exports = {
    generarJWT
};