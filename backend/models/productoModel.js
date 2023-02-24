const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:[true, 'Por favor teclea un nombre']
       
    },
   descripcion: {
        type: String,
        required: [true, 'Por favor teclea una descripcion']
    },
    precio: {
        type: Number,
        required: [true, 'Por favor teclea un precio']
    },
    marca: {
        type: String,
        required: [true, 'Por favor teclea una marca']
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Por favor teclea una categoria'],
        ref:'Categoria'
    }
    
}, {
    timestamps: true
})
module.exports = mongoose.model('Producto', productoSchema)