const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const fs = require('fs');

const Category = require("../model/categoryModel");
const SubCategory = require("../model/subCategoryModel");
const Product = require("../model/productModel");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})


const productCtrl = {

  getProducts: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const categories = await Category.aggregate([
          { $lookup:
            {
              from: "subcategories",
              localField: "_id",
              foreignField: "categoryId",
              as: "subCategories"
            }
          }
        ])

        let categoryLength = categories.length
        let subcategoryLength = 0;
        categories.forEach(cat=> {
          subcategoryLength = subcategoryLength + cat.subCategories.length
        })

        res.render("product.html", {categories, categoryLength, subcategoryLength})
  
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      return res.redirect("/login")
    }
  },

  getForClientProducts: async (req, res) => {
    try {
      const products = await Product.find()

      res.status(200).send(products)
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },

  addProductPage: async (req, res) => {
    if(req.session.user_role === "001") {
      res.render("addproduct.html")  
    } else {
      return res.redirect("/login")
    }
  },

  // add Product
  addProduct: async (req, res) => {
    try {
      if(req.session.user_role === "001") {
        const file = req.files.image

        if(file.size > 20 * 1024 * 1024) {
          return res.status(401).json({message: "image's size large 20mb"})
        }

        if(file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
          return res.status(401).json({message: "image format wrong!"})
        }
        
        await cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "SSI Pro"}, async(err, result)=>{
          if(err){
            console.log(err);
          }
          removeTemp(file.tempFilePath)
          req.body.image = {public_id: result.public_id, url: result.secure_url}
        })

        const newProduct = new Product(req.body)
        await newProduct.save()  
        return res.status(201).send({message: "Product added successfully"})
      } else {
        res.status(401).send({message: "Not Allowed!"})
      }
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },

  // Delete Product

  deleteProduct: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {productId} = req.params
        const product = await Product.findByIdAndDelete(productId)

        if(product.image.public_id) {
          await cloudinary.v2.uploader.destroy(product.image.public_id, (err, result) => {
            if(err) {
              console.log(err);
            }
          })
        }
        
        if(product) {
          return res.status(200).send({message: "Product deleted successfully"})
        } else {
          return res.status(404).send({message: "Product not found!"})
        }
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      res.status(401).send({message: "Not Allowed!"})
    }
  },

  // Update Product promotion

  updateProductPromotion: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {productId} = req.params
        const {status} = req.body

        const product = await Product.findByIdAndUpdate(productId, {isPromotion: status})
        if(product) {
          return res.status(200).send({message: "Product updated successfully"})
        } else {
          return res.status(404).send({message: "Product not found!"})
        }
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      res.status(401).send({message: "Not Allowed!"})
    }
  },

  // Update Product published

  updateProductPublished: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {productId} = req.params
        const {status} = req.body
        const product = await Product.findByIdAndUpdate(productId, {isPublished: status})
        if(product) {
          return res.status(200).send({message: "Product updated successfully"})
        } else {
          return res.status(404).send({message: "Product not found!"})
        }
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      res.status(401).send({message: "Not Allowed!"})
    }
  },

  // Update Product

  updateProduct: async (req, res) => {
    
    if(req.session.user_role === "001") {
      try {
        const {productId} = req.params
        const newDesc = req.body.desc.reverse()[0];
        req.body.desc = newDesc
        const img = req.files
        if(img !== null){
          const file = req.files.image

          if(file.size > 20 * 1024 * 1024) {
            return res.status(401).json({message: "image's size large 20mb"})
          }
  
          if(file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
            return res.status(401).json({message: "image format wrong!"})
          }
          
          await cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "SSI Pro"}, async(err, result)=>{
            if(err){
              console.log(err);
            }
            removeTemp(file.tempFilePath)
            req.body.image = {public_id: result.public_id, url: result.secure_url}
          })
        }
        const product = await Product.findByIdAndUpdate(productId, req.body)
        if(product) {
          return res.status(200).send({message: "Product updated successfully"})
        } else {
          return res.status(404).send({message: "Product not found!"})
        }
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      res.status(401).send({message: "Not Allowed!"})
    }
  },

  // Get product by Id
  getProduct: async (req, res) => {
    let {productId} = req.params

    try {
      const product = await Product.findById(productId)

      res.status(200).send(product)
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },
}


function removeTemp(path) {
  fs.unlink(path, (err)=>{
    if(err) throw err;
  })
}


module.exports = productCtrl