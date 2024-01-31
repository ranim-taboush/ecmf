const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Types.ObjectId, 
        ref: "Category",
        required: true
    },
    arName: { type: String, required: true, trim: true },
    enName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    thickness: {
        from: { type: String, trim: true, default: "0.3" }, to: { type: String, trim: true, default: "1.2" },
        arUnit: { type: String, trim: true, default: "مم"}, enUnit: { type: String, trim: true, default: "mm"}
    },
    length: { type: String, trim: true, default: "20" },
    thicknessList: { type: [String], default: [""]},
    lengthList: { type: [String], default: [""]},
    srcImg: { type: String },
    productImg: { type: String }

}) 

productSchema.index({enName: 1}, {collation: { locale: 'en', strength: 2}});
productSchema.index({arName: 1}, {collation: { locale: 'ar', strength: 2}});

const Product = mongoose.model("Product", productSchema)
module.exports = Product;