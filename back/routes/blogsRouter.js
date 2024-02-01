const express = require('express')
const router = express.Router()
const blogsController = require('./../controllers/blogsController')
const auth = require('../middleware/seoAuth')

router.post('/blog', auth, blogsController.createBlog)
router.get('/blogs', blogsController.getBlogs)
router.get('/blog/:id', blogsController.getBlog)
router.patch('/blog/:id', blogsController.updateBlog)
router.delete('/blog/:id', blogsController.deleteBlog)

module.exports = router