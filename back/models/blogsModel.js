const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    title: {
        ar: { type: String, required: [true, "arabic title is required"], trim: true },
        en: { type: String, required: [true, "english title is required"], trim: true }
    },
    topic: {
        ar: { type: String, required: [true, "arabic topic is required"], trim: true },
        en: { type: String, required: [true, "english topic is required"], trim: true }
    },
    paragraph: {
        ar: { type: String, required: [true, "arabic paragraph is required"], trim: true },
        en: { type: String, required: [true, "english paragraph is required"], trim: true }
    },
    tags: {
        type: [String], required: [true, "At least one tag required"], trim: true
    },
    coverImgAlt: { type: String },
    slug: { type: String, unique: [true, "slug must be unique"], required: [true, "slug is required"], index: true },
    coverImg: { type: String, required: [true, "coverImg is required"] }
}, {
    timestamps: true
})
 
const Blogs = mongoose.model("Blogs", blogsSchema)
module.exports = Blogs;