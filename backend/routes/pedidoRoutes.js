const express = require('express')
const router = express.Router()
const {setPedido,getPedidos,updatePedido,deletePedido } = require('../controllers/pedidoController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect,setPedido).get(protect,getPedidos)
router.route('/:id').put(protect, updatePedido).delete(protect,deletePedido)



module.exports = router