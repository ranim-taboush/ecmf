const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        ar: { type: String, required: [true, "arabic name is required"], trim: true },
        en: { type: String, required: [true, "english name is required"], trim: true }
    },
    machine: {
        ar: { type: String, required: [true, "arabic machine is required"], trim: true },
        en: { type: String, required: [true, "english machine is required"], trim: true }
    },
    description: {
        ar: { type: String, required: [true, "arabic description is required"], trim: true },
        en: { type: String, required: [true, "english description is required"], trim: true }
    },
    subtitle: {
        ar: { type: String, required: [true, "arabic subtitle is required"], trim: true },
        en: { type: String, required: [true, "english subtitle is required"], trim: true }
    },
    subDescription: {
        ar: { type: String, required: [true, "arabic subDescription is required"], trim: true },
        en: { type: String, required: [true, "english subDescription is required"], trim: true }
    },
    productsTitle: {
        ar: { type: [String], required: [true, "arabic products title is required"], trim: true },
        en: { type: [String], required: [true, "english products title is required"], trim: true }
    },
    usedInTitle: {
        en: { type: String, default: "Used in:", trim: true },
        ar: { type: String, default: 'يستخدم في:', trim: true }
    },
    usedIn: {
        ar: { type: [String], trim: true  },
        en: { type: [String], trim: true  }
    },
    categoryImg: { type: String },
    products: [{
        type: mongoose.Types.ObjectId, 
        ref: "Product"
    }]
})
 
const Category = mongoose.model("Category", categorySchema)
module.exports = Category;