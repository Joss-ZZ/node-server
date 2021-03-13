const { response } = require("express");
const Nota = require('../models/Nota');
const Usuario = require('../models/Usuario');

const listarNotas = async(req, res = response)=> {

    try{

        const notasDB = await Nota.find().populate('usuario', 'nombre img');

        return res.status(200).json({
            ok: true,
            notasDB
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }

}

const registrarNota = async(req, res = response)=> {

    const { descripcion } = req.body;
    
    try{

        const userDB = Usuario.findById(req.uid);

        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'EL usuario no existe'
            })
        }

        const nota = new Nota({ descripcion, usuario: req.uid})
        await nota.save();

        const notaDB = await Nota.findById(nota._id).populate('usuario', 'nombre img');

        return res.status(200).json({
            ok: true,
            notaDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })        
    }

}

const actualizarNota = async(req, res = response)=> {

    const id = req.params.id;
    const { descripcion } = req.body;

    try{

        const notaDB = await Nota.findById(id);
        if(!notaDB){
            return res.status(400).json({
                ok: false,
                msg: 'El ID de la nota no existe'
            });
        }

        notaDB.descripcion = descripcion;
        notaDB.save();

        return res.status(200).json({
            ok: true,
            notaDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })          
    }

}

const eliminarNota = async(req, res = response)=> {

    const id = req.params.id;

    try{

        const notaDB = await Nota.findByIdAndDelete(id);
        if(!notaDB) {
            return res.status(400).json({
                ok: true,
                msg: 'El ID de la nota no existe'
            })
        }

        return res.status(200).json({
            ok: true,
            notaDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })          
    }

}

module.exports = {
    listarNotas,
    registrarNota,
    actualizarNota,
    eliminarNota
}