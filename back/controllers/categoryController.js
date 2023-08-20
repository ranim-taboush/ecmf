const Category = require('./../models/categoryModel')

const createCategory = async (req, res) =>{
    const arName = req.body?.title?.ar;
    const enName = req.body?.title?.en;
    if(!arName || !enName) { res.status(400).send('category name is required'); console.log(arName, enName); return; }
    else {
        let category = new Category({ ...req.body })
        await category.save()
        .then(newCategory=> res.status(200).send("new category is added" + newCategory))
        .catch(e=> console.log(e))
    }
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
    getCategory
}