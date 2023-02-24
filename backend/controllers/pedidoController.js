const asyncHandler = require('express-async-handler')

const Pedido=require('../models/pedidoModel.js')

const getPedidos = asyncHandler(async (req, res) => {
    const pedidos = await Pedido.find({id_usuario:req.user.id})
    res.status(200).json(pedidos)
})

const setPedido = asyncHandler(async (req, res) => {
    if (!req.body) {
     
        res.status(400)
        throw new Error('Por favor teclea la informacion del Pedido')
    }
   

    const pedido = await Pedido.create({
    id_usuario:req.user.id,
    fecha:req.body.fecha,
    estaPagado:req.body.estaPagado,
    estaEnviado:req.body.estaEnviado
    
    })

    res.status(201).json(pedido)
})

const updatePedido = asyncHandler(async (req, res) => {

    const pedido = await Pedido.findById(req.params.id)

    if (!pedido) {
        res.status(400)
        throw new Error('Pedido no encontrado')
    }
 
    
    const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedPedido)
})
const deletePedido = asyncHandler(async (req, res) => {

    const pedido = await Pedido.findById(req.params.id)

    if (!pedido) {
        res.status(400)
        throw new Error('Pedido no encontrada')
    }
   

    //const deletedPedido = await Pedido.findByIdAndDelete(req.params.id)
    await pedido.remove()

    res.status(200).json(req.params.id)
})



module.exports = {
setPedido,
getPedidos,
updatePedido,
deletePedido
}