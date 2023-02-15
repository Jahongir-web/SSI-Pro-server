const Category = require("../model/categoryModel");
const SubCategory = require("../model/subCategoryModel");

const productCtrl = {

  getCategories: async (req, res) => {
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

  // add Category
  addCategory: async (req, res) => {
    const {title} = req.body
    try {
      if(req.session.user_role === "001") {
        const category = await Category.findOne({title})
        if(category) {        
          return res.status(400).send({message: `${title} category already exists!`})
        }
        const newCategory = new Category(req.body)
        await newCategory.save()  
        return res.status(201).send({message: "Category added successfully"})
      } else {
        res.status(401).send({message: "Not Allowed!"})
      }
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },

  // Delete Category

  deleteCategory: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {categoryId} = req.params
        const category = await Category.findByIdAndDelete(categoryId)
        await SubCategory.deleteMany({categoryId})
        if(category) {
          return res.status(200).send({message: "Category deleted successfully"})
        } else {
          return res.status(404).send({message: "Category not found!"})
        }
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      res.status(401).send({message: "Not Allowed!"})
    }
  },

  // Update Category

  updateCategory: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {categoryId} = req.params
        const {title} = req.body
        const category = await Category.findByIdAndUpdate(categoryId, {title})
        if(category) {
          return res.status(200).send({message: "Category updated successfully"})
        } else {
          return res.status(404).send({message: "Category not found!"})
        }
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      res.status(401).send({message: "Not Allowed!"})
    }
  },

}

module.exports = productCtrl