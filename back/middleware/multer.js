const multer = require('multer')
const path = require("path");
const Category = require('./../models/categoryModel')
const Product = require('./../models/productModel')

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}--${file.originalname}`);
    }
})
var upload = multer({
    storage: storage,
    limits: { fileSize: 1500000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
})

module.exports = upload