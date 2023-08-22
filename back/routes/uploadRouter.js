const express = require('express')
const router = express.Router()
const uploadController = require('./../controllers/uploadController')
const auth = require('./../middleware/auth')
const upload = require('./../middleware/multer')

router.patch('/upload/category/:id', auth, upload.single("image"), uploadController.uploadCatImg)
router.patch('/upload/product/:id', auth, upload.single("image"), uploadController.uploadProImg)


module.exports = router