const Category = require("../model/categoryModel");
const Product = require("../model/productModel");
const Video = require("../model/videoModel");

const homeCtrl = {
  
  homePage: async (req, res) => {
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

        const products = await Product.find()
        const videos = await Video.find()

        let productsCount = products.length
        let videosCount = videos.length

        let categoryCount = categories.length
        let subcategoryCount = 0;
        categories.forEach(cat=> {
          subcategoryCount = subcategoryCount + cat.subCategories.length
        })

        return res.render("index.html", {categoryCount, subcategoryCount, productsCount, videosCount})
      } catch (error) {
        console.log(error);
      }
    } else {      
      res.redirect("/login")
    }
  },
}

module.exports = homeCtrl