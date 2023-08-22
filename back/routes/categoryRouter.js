const express = require('express')
const router = express.Router()
const categoryController = require('./../controllers/categoryController')
const auth = require('../middleware/auth')

router.post('/category', auth, categoryController.createCategory)
router.get('/category', categoryController.getCategories)
router.get('/category/:id', categoryController.getCategory)

module.exports = router