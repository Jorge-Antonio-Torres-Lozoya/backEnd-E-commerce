const asyncHandler = require('express-async-handler')

const Categoria=require('../models/categoriaModel.js')

const getCategorias = asyncHandler(async (req, res) => {
    const categorias = await Categoria.find()
    res.status(200).json(categorias)
})

const setCategoria = asyncHandler(async (req, res) => {
    const { nombre} = req.body
    if (!req.body) {
        //res.status(400).json({ message: 'Por favor teclea una descripción de la categoria' })
        res.status(400)
        throw new Error('Por favor teclea la informacion del categoria')
    }
    const categoriaExiste = await Categoria.findOne({nombre})
    if (categoriaExiste) {
        res.status(400)
        throw new Error('Esa categoria ya existe')
    }
    if (req.user.role.toLowerCase() !=="admin" ) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }
    const categoria = await Categoria.create({
    nombre:req.body.nombre
    })

    res.status(201).json(categoria)
})
const updateCategoria = asyncHandler(async (req, res) => {

    const categoria = await Categoria.findById(req.params.id)

    if (!categoria) {
        res.status(400)
        throw new Error('Categoria no encontrado')
    }
    if (req.user.role.toLowerCase() !=="admin" ) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }
    
    const updatedCategoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedCategoria)
})




const deleteCategoria = asyncHandler(async (req, res) => {

    const categoria = await Categoria.findById(req.params.id)
    if (req.user.role.toLowerCase() !=="admin" ) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }
    if (!categoria) {
        res.status(400)
        throw new Error('Categoria no encontrada')
    }
   
    await categoria.remove()

    res.status(200).json(req.params.id)
})



module.exports = {
setCategoria,
getCategorias,
deleteCategoria,
updateCategoria
}