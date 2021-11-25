const mongoose = require('mongoose')
const { Schema } = mongoose

const UsuarioSchema = new Schema({
    nombres: String,
    apellidos: String,
    cedula: String,
    puesto: String,
    tcontrato: String,
    jefe: String,

})

module.exports = mongoose.model('usuario', UsuarioSchema)