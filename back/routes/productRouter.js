const express = require('express')
const router = express.Router()
const productController = require('./../controllers/productController')
const auth = require('./../middleware/auth')

router.post('/product', auth, productController.createProduct)
router.get('/product/:id', productController.getProduct)
router.delete('/product/:id', productController.deleteProduct)
router.get('/products/en', productController.getEnProducts)
router.get('/products/ar', productController.getArProducts)

module.exports = router