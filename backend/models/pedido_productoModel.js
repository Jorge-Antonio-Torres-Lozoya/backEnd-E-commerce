const mongoose = require('mongoose')

const pedidoProductoSchema = mongoose.Schema({
    id_pedido:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Por favor teclea un Id del pedido'],
        ref:'Pedido'
    },
   id_producto:{
    type: mongoose.Schema.Types.ObjectId,
        required:[true, 'Por favor teclea el id del producto'],
        ref:'Producto'
    },
   cantidad:{
        type: Number,
        required:[true, 'Por favor teclea la cantidad']
    },
    precio:{
        type: Number,
        required:[true, 'Por favor teclea el precio']
    },
    importe:{
        type: Number,
        required:[true, 'Por favor teclea el importe']
    }
   
}, {
    timestamps: true
})

module.exports = mongoose.model('Pedido_Producto', pedidoProductoSchema)