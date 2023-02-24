const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'Por favor teclea el nombre de usuario']
    },
    email: {
        type: 'string',
        required: [true, 'Por favor teclea el email de usuario'],
        unique: true
    },
    password: {
        type: 'string',
        required: [true, 'Por favor teclea un password'],

    },
    role:{
        type: 'string',
        required: [true, 'Por favor teclea un role'],
    }

},
    {
        timestamps: true
    }
)
module.exports=mongoose.model('User',userSchema)
