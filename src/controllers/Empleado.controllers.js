const EmpleadoCtrl = {}
const Empleado = require('../models/Usuario.models')

EmpleadoCtrl.crear = async(req, res) => {

    const { nombres, apellidos, cedula, puesto, tcontrato, jefe } = req.body
    const NuevoEmpleado = new Empleado({
        nombres,
        apellidos,
        cedula,
        puesto,
        tcontrato,
        jefe
    })

    const respuesta = await NuevoEmpleado.save()
    res.json({
        mensaje: 'Empleado creado',
        respuesta
    })

}

EmpleadoCtrl.listar = async(req, res) => {
    const respuesta = await Empleado.find()
    res.json(respuesta)

}

EmpleadoCtrl.listarId = async(req, res) => {
    const id = req.params.id
    const respuesta = await Empleado.findById({ _id: id })
    res.json(respuesta)

}

EmpleadoCtrl.empleadosDeunJefe = async(req, res) => {
    const id = req.params.id
    const respuesta = await Empleado.find({ jefe: id })
    res.json(respuesta)

}

EmpleadoCtrl.eliminar = async(req, res) => {
    const id = req.params.id
    await Empleado.findByIdAndRemove({ _id: id })
    res.json({
        mensaje: 'Empleado eliminado'
    })

}


EmpleadoCtrl.actualizar = async(req, res) => {
    const id = req.params.id
    await Empleado.findByIdAndUpdate({ _id: id }, req.body)
    res.json({
        mensaje: 'Empleado actualizado'
    })

}

EmpleadoCtrl.buscarEmpleado = async(req, res) => {
    const {nombres,id} = req.params;
    
    const respuesta = await Empleado.find({ nombres: { $regex: ".*" + nombres + ".*" },jefe:id })
    res.json(respuesta)

}

module.exports = EmpleadoCtrl