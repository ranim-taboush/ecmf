const Category = require('./../models/categoryModel')
const Product = require('./../models/productModel')
const fs = require('fs')

const uploadCatImg = async (req, res) =>{
    const id = req.params.id
    if (!req.file) { res.status(400).send("No file uploaded"); return; }
    const imgPath = req.file.path

    try {
      const category = await Category.findById(id);
      if (!category) { res.status(404).send(imgName.split("img")[0] + " not found"); return; }
      if(category.categoryImg || category.categoryImg !== '') deleteUploadedAvatar(category.categoryImg)

      category.categoryImg = imgPath;
      await category.save(); // Save the updated profile with the avatar URL
      res.send({ imgPath });
      
    } catch (error) {
      console.log("Error uploading avatar:", error);
      deleteUploadedAvatar(imgPath)
      res.status(500).send("Internal Server Error");
    }
}

const uploadProImg = async (req, res) =>{
    const id = req.params.id
    if (!req.file) { res.status(400).send("No file uploaded"); return; }
    const imgPath = req.file.path

    try {
      const product = await Product.findById(id);
      if (!product) { res.status(404).send(imgName.split("img")[0] + " not found"); return; }
      if(product.productImg || product.productImg !== '') deleteUploadedAvatar(product.productImg)

      product.productImg = imgPath;
      await product.save(); // Save the updated profile with the avatar URL
      res.send({ imgPath });
      
    } catch (error) {
      console.log("Error uploading avatar:", error);
      deleteUploadedAvatar(imgPath)
      res.status(500).send("Internal Server Error");
    }
}

function deleteUploadedAvatar(filePath) {
    console.log('deleting uploaded image...', filePath)
    if (!fs.existsSync(filePath)) {
      console.error('Avatar file does not exist');
      return;
    }
  
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting avatar: ${err}`);
      } else {
        console.log('Avatar deleted successfully');
      }
    });
}

module.exports = {uploadCatImg, uploadProImg}