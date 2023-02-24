const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const registrarUser = asyncHandler(async (req, res) => {

    const { name, email, password,role } = req.body

    if (!name || !email || !password || !role) {
        res.status(400)
        throw new Error('Faltan datos, favor de verificar')
    }

    const userExiste = await User.findOne({ email })
    if (userExiste) {
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role:user.role
        })
    } else {
        res.status(400)
        throw new Error('No se pudo agregar el usuario')
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role:user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const dataUser = asyncHandler(async (req, res) => {
    const { _id, name, email,role } = req.user

    res.status(200).json({
        id: _id,
        name,
        email,
        role
    })

})

module.exports = {
    registrarUser,
    loginUser,
    dataUser
}