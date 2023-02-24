const asyncHandler = require('express-async-handler')

const Pedido_Producto = require('../models/pedido_productoModel.js')

const getPedidos_productos = asyncHandler(async (req, res) => {
    const pedidos_productos = await Pedido_Producto.find()
    res.status(200).json(pedidos_productos)
})

const setPedido_producto = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Por favor teclea la informacion del pedido_producto')
    }

    const pedido_producto = await Pedido_Producto.create({
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        importe: req.body.importe
    })
    res.status(201).json(pedido_producto)

})

const updatePedido_producto = asyncHandler(async (req, res) => {

    const pedido_producto = await Pedido_Producto.findById(req.params.id)
    if (!pedido_producto) {
        res.status(400)
        throw new Error('Pedido_producto no encontrado')
    }
    const updatedPedido_producto = await Pedido_Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedPedido_producto)
})



const deletePedido_producto = asyncHandler(async (req, res) => {
    const pedido_producto = await Pedido_Producto.findById(req.params.id)
   console.log(Pedido_Producto);
    if (!pedido_producto) {
        res.status(400)
        throw new Error('pedido_producto no encontrado')
    }
    await pedido_producto.remove()
    res.status(200).json(req.params.id)
})



module.exports = {
    setPedido_producto,
    getPedidos_productos,
    updatePedido_producto,
    deletePedido_producto
}