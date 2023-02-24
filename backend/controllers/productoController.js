const asyncHandler = require('express-async-handler')

const Producto=require('../models/productoModel.js')

const getProductos = asyncHandler(async (req, res) => {
    const productos = await Producto.find()
    res.status(200).json(productos)
})

const setProducto = asyncHandler(async (req, res) => {
    if (!req.body) {
        //res.status(400).json({ message: 'Por favor teclea una descripción de la producto' })
        res.status(400)
        throw new Error('Por favor teclea la informacion del producto')
    }
      if (req.user.role.toLowerCase() !=="admin" ) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    const producto = await Producto.create({
    nombre:req.body.nombre,
    descripcion:req.body.descripcion,
    marca:req.body.marca,
    precio:req.body.precio,
    categoria:req.body.categoria
    })

    res.status(201).json(producto)
})

const updateProducto = asyncHandler(async (req, res) => {

    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }
    if (req.user.role.toLowerCase() !=="admin" ) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }
    
    const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedProducto)
})
const deleteProducto = asyncHandler(async (req, res) => {

    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(400)
        throw new Error('Producto no encontrada')
    }
    if (req.user.role.toLowerCase() !=="admin" ) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    //const deletedProducto = await Producto.findByIdAndDelete(req.params.id)
    await producto.remove()

    res.status(200).json(req.params.id)
})



module.exports = {
setProducto,
getProductos,
updateProducto,
deleteProducto
}