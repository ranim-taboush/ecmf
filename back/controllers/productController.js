const fs = require("fs");
const path = require('path')
const Category = require('./../models/categoryModel')
const Product = require('./../models/productModel')

const createProduct = async (req, res) => {
    const category = req.body.category;
    if(!category) { res.status(400).send("category name is required"); return;}
    let proCat = await Category.findOne({ 'title.ar': category.trim() })
    if (!proCat) proCat = await Category.findOne({ 'title.en': category.trim() })
    if (!proCat) { res.status(400).send("please enter a valid category"); return; }
    let product = new Product({
        ...req.body,
        category: proCat._id,
    })
    await product.save().then(
        pro => {
            proCat.products = proCat.products.concat(pro._id)
            proCat.save()
            .then(()=>{ res.status(200).json(pro); return;})
            .catch(e=>{res.status(500).send(e.message); return;})
        }
    ).catch(e=> {
        res.status(500).send("error while saving data" + e.message); return;
    })

}

const getArProducts = async (req, res) => {
    await Product.find({}).populate({ path: "category" }).collation({locale:'ar',strength: 2}).sort({arName:1})
    .then(products=>res.status(200).json(products))
    .catch(e=>res.status(500).send(e.message))
}

const getEnProducts = async (req, res) => {
    await Product.find({}).populate({ path: "category" }).collation({locale:'en',strength: 2}).sort({enName:1})
    .then(products=>res.status(200).json(products))
    .catch(e=>res.status(500).send(e.message))
}

const getProduct = async (req, res) => {
    const _id = req.params.id;
    await Product.findById(_id).populate({ path: "category" })
    .then(product=> {
        if(!product) return res.status(400).send("product not found")
        return res.status(200).json(product);})
    .catch(e=>res.status(500).send(e.message))
}

module.exports = {
    createProduct, getArProducts, getEnProducts, getProduct
}