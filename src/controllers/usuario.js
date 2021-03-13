const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');

const fs = require('fs');
const path = require('path');

const listarUsuarios = async(req, res = response)=> {

    try{

        const usuariosDB = await Usuario.find();

        res.json({
            ok: true,
            usuariosDB
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }

}

const actualizarUsuario = async(req, res = response)=> {

    const id = req.params.id;
    const body = req.body;
  
    if (!req.files) {
        
        try{
            
            const userBD = await Usuario.findById(id);
            if(!userBD) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario no existe'
                })
            }

            userBD.nombre = body.nombre;
            userBD.email = body.email;

            userBD.save();

            res.json({
                ok: true,
                uid: userDB.id,
                nombre: userDB.nombre,
                email: userDB.email,
                img: userDB.img
            });

        }catch(error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Póngase en contacto con el administrador'
            });
        }

    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo;

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length-1]; 

    if(extensionesValidas.indexOf(extension)<0){
        return res.status(400).json({
            ok: false,
            msg: `Solo están pemitidas las siguientes extensiones: ${extensionesValidas.join(', ')}`,
            ext: extension
        });
    }

    let pathImagen = `${id}-${ new Date().getMilliseconds() }.${extension}`; 
  
    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`public/imagenes/usuarios/${pathImagen}`, (err) => {
      if (err)
        return res.status(500).json({
            ok: false,
            err
        });
  
        imagenUsuario(id, body, pathImagen, res);

    });


}

async function imagenUsuario(id, body, nombreImagen, res = response) {

    try{

        const userDB = await Usuario.findById(id);
        
        if(!userDB){
            eliminarImagen(nombreImagen);
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }


        eliminarImagen(userDB.img);


        userDB.nombre = body.nombre;
        userDB.email = body.email;
        userDB.img = nombreImagen;

        userDB.save();

        return res.json({
            ok: true,
            uid: userDB.id,
            nombre: userDB.nombre,
            email: userDB.email,
            img: userDB.img
        })

    }catch(error){
        eliminarImagen(nombreImagen);
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        });
    }
    
}

function eliminarImagen(nombreImagen) {

    const pathImagenDB = path.resolve(__dirname, `../../public/imagenes/usuarios/${nombreImagen}`);

    if(fs.existsSync(pathImagenDB)){
        fs.unlinkSync(pathImagenDB);
    }

}


module.exports = {
    listarUsuarios,
    actualizarUsuario
}