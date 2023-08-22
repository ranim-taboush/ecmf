const Category = require('./../models/categoryModel')

const createCategory = async (req, res) =>{
    let category = new Category({ ...req.body })
    await category.save()
    .then(newCategory=> {
        return res.status(200).json(newCategory)
    })
    .catch(e=> {
        return res.status(500).send(e.message)
    })
}

const getCategories = async(req, res) => {
    Category.find({}).populate({ path: "products" })
    .then((categories)=>res.status(200).json(categories))
    .catch(e=>res.status(500).send(e.message))
}

const getCategory = async(req, res) => {
    const _id = req.params.id;
    if(!_id) { res.status(400).send("id is required"); return; }
    await Category.findById( _id ).populate({ path: "products" })
    .then(cat => res.status(200).json(cat))
    .catch(e=>res.status(500).send(e.message))
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
}