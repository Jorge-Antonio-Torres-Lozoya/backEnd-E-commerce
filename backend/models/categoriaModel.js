const mongoose = require('mongoose')

const categoriaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:[true, 'Por favor teclea un valor']
       
    }
   
}, {
    timestamps: true
})

module.exports = mongoose.model('Categoria', categoriaSchema)