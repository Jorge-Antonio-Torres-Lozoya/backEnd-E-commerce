const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db.js')
const port = process.env.PORT 

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/productos', require('./routes/productoRoutes'))
app.use('/api/categorias', require('./routes/categoriaRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/pedidos', require('./routes/pedidoRoutes'))
app.use('/api/pedidos_productos', require('./routes/pedidos_productosRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))