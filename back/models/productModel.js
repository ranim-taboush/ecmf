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
    length: { type: "String", trim: true, default: "20" },
    thicknessList: { type: [Number], default: [6, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]},
    lengthList: { type: [Number], default: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]},
    srcImg: { type: String }

}) 

productSchema.index({enName: 1}, {collation: { locale: 'en', strength: 2}});
productSchema.index({arName: 1}, {collation: { locale: 'ar', strength: 2}});

const Product = mongoose.model("Product", productSchema)
module.exports = Product;