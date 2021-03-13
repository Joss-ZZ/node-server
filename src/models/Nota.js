const { Schema, model } = require('mongoose');

const NotaSchema = Schema({
    descripcion: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Nota', NotaSchema);