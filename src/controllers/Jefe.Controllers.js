const JefeCtrl = {}
const Jefe = require('../models/Jefe.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

JefeCtrl.crearJefe = async(req, res) => {
    const { nombre, correo, contrasena } = req.body
    const NuevoJefe = new Jefe({
        nombre,
        correo,
        contrasena
    })
    const correojefe = await Jefe.findOne({ correo: correo })
    if (correojefe) {
        res.json({
            mensaje: 'El correo ya existe'
        })

    } else {
        NuevoJefe.contrasena = await bcrypt.hash(contrasena, 10)
        const token = jwt.sign({ _id: NuevoJefe._id }, 'Secreta')
        await NuevoJefe.save()
        res.json({
            mensaje: 'Bienvenido',
            id: NuevoJefe._id,
            nombre: NuevoJefe.nombre,
            token
        })


    }
}

JefeCtrl.login = async(req, res) => {
    const { correo, contrasena } = req.body
    const jefe = await Jefe.findOne({ correo: correo })
    if (!jefe) {
        return res.json({
            mensaje: 'Correo incorrecto'
        })

    }

    const match = await bcrypt.compare(contrasena, jefe.contrasena)
    if (match) {

        const token = jwt.sign({ _id: jefe._id }, 'Secreta')
        res.json({
            mensaje: 'Bienvenido',
            id: jefe.id,
            nombre: jefe.nombre,
            token
        })

    }

    /* if (!jefe && !match) {

         res.json({
             mensaje: 'ambos incorrectos'
         })

     } */
    else {
        res.json({
            mensaje: 'Contraseña incorrecta'
        })
    }
}

module.exports = JefeCtrl