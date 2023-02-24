const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    id_usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Por favor teclea un Id del usuario'],
        ref:'User'
    },
    fecha:{
        type: String,
        required:[true, 'Por favor teclea una fecha']
    },
    estaPagado:{
        type: Boolean,
        required:[true, 'Por favor teclea true o false si esta pagado o no']
    },
    estaEnviado:{
        type: Boolean,
        required:[true, 'Por favor teclea true o false si esta enviado o no']
    }
   
}, {
    timestamps: true
})

module.exports = mongoose.model('Pedido', pedidoSchema)