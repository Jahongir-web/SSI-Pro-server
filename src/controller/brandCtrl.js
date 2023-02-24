const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const fs = require('fs');

const Brand = require("../model/brandModel");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})


const brandCtrl = {

  brandPage: async (req, res) => {
    if(req.session.user_role === "001") {
      res.render("brand.html")  
    } else {
      return res.redirect("/login")
    }
  },  

  getBrands: async (req, res) => {
    try {
      const brands = await Brand.find()

      res.status(200).send(brands)
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },


  // add Brand
  addBrand: async (req, res) => {
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

        const newBrand = new Brand(req.body)
        await newBrand.save()  
        return res.status(201).send({message: "Brand added successfully"})
      } else {
        res.status(401).send({message: "Not Allowed!"})
      }
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },

  // Delete Brand

  deleteBrand: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {brandId} = req.params
        const brand = await Brand.findByIdAndDelete(brandId)

        if(brand.image.public_id) {
          await cloudinary.v2.uploader.destroy(brand.image.public_id, (err, result) => {
            if(err) {
              console.log(err);
            }
          })
        }
        
        if(brand) {
          return res.status(200).send({message: "Brand deleted successfully"})
        } else {
          return res.status(404).send({message: "Brand not found!"})
        }
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      res.status(401).send({message: "Not Allowed!"})
    }
  },

}


function removeTemp(path) {
  fs.unlink(path, (err)=>{
    if(err) throw err;
  })
}


module.exports = brandCtrl