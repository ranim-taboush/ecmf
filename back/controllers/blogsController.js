const Blogs = require('./../models/blogsModel')

const createBlog = async (req, res) =>{
    let blogs = new Blogs({ ...req.body })
    await blogs.save()
    .then(newBlog=> {
        return res.status(200).json(newBlog)
    })
    .catch(e=> {
        return res.status(500).send(e.message)
    })
}

const getBlogs = async(req, res) => {
    Blogs.find({})
    .then((blogs)=>res.status(200).json(blogs))
    .catch(e=>res.status(500).send(e.message))
}

const getBlog = async(req, res) => {
    const _id = req.params.id;
    if(!_id) { res.status(400).send("id is required"); return; }
    await Blogs.findById( _id )
    .then(blog => res.status(200).json(blog))
    .catch(e=>res.status(500).send(e.message))
}

const updateBlog = async(req, res) => {
    const _id = req.params.id;
    if(!_id) { res.status(400).send("id is required"); return; }
    await Blogs.findByIdAndUpdate( _id, { ...req.body } )
    .then(blog => res.status(200).json(blog))
    .catch(e=>res.status(500).send(e.message))
}

const deleteBlog = async(req, res) => {
    const _id = req.params.id;
    if(!_id) { res.status(400).send("id is required"); return; }
    await Blogs.findByIdAndDelete( _id )
    .then(blog => res.status(200).json(blog))
    .catch(e=>res.status(500).send(e.message))
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
}