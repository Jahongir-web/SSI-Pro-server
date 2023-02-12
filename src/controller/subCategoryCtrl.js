const Category = require("../model/categoryModel");
const SubCategory = require("../model/subCategoryModel");

const subCategoryCtrl = {
  // Delete Category

  deleteSubCategory: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {categoryId} = req.params
        const category = await SubCategory.findByIdAndDelete(categoryId)
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

  updateSubCategory: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {categoryId} = req.params
        const {title} = req.body
        const category = await SubCategory.findByIdAndUpdate(categoryId, {title})
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

  
  // add SubCategory
  addSubCategory: async (req, res) => {
    const {categoryId, title} = req.body
    try {
      if(req.session.user_role === "001") {
        const mainCategory = await Category.findById(categoryId)

        if(!mainCategory) {
          return res.status(404).send({message: "Main category not found!"})
        }
        const category = await SubCategory.findOne({title})
        if(category) {        
          return res.status(400).send({message: `${title} category already exists!`})
        }
        const newCategory = new SubCategory(req.body)
        await newCategory.save()  
        return res.status(201).send({message: "Category added successfully"})
      } else {
        res.status(401).send({message: "Not Allowed!"})
      }
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },

}

module.exports = subCategoryCtrl