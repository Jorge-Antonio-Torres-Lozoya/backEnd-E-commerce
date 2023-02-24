const express = require('express')
const router = express.Router()
const {setPedido_producto,getPedidos_productos,updatePedido_producto,deletePedido_producto } = require('../controllers/pedido_productoController')
const { protect } = require('../middleware/authMiddleware')



router.route('/').post(protect,setPedido_producto).get(protect,getPedidos_productos)
router.route('/:id').put(protect, updatePedido_producto).delete(protect,deletePedido_producto)

module.exports = router