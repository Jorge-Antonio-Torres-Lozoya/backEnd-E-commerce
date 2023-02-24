const express = require('express')
const router = express.Router()
const {setProducto,getProductos,updateProducto,deleteProducto } = require('../controllers/productoController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect,setProducto).get(protect,getProductos)
router.route('/:id').put(protect, updateProducto).delete(protect,deleteProducto)



module.exports = router