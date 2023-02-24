const express = require('express')
const router = express.Router()
const {setCategoria,getCategorias,deleteCategoria,updateCategoria } = require('../controllers/categoriaController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect,setCategoria).get(protect,getCategorias)
router.route('/:id').delete(protect,deleteCategoria).put(protect, updateCategoria)

module.exports = router