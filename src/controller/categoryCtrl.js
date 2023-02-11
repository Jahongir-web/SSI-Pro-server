const bcrypt = require("bcrypt");
const Category = require("../model/categoryModel");

const categoryCtrl = {

  getCategories: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const categories = await Category.find()
        res.render("category.html", {categories})

      } catch (error) {
        
      }
    } else {
      return res.redirect("/login")
    }
  },

  // add Category
  addCategory: async (req, res) => {
    const {title} = req.body
    if(req.session.user_role === "001") {
      try {
        const category = await Category.findOne({title})
        if(category) {        
          return res.status(400).send({message: `${title} category already exists!`})
        }
        const newCategory = new Category(req.body)
        await newCategory.save()  
        return res.status(201).send({message: "Category added successfully"})
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      return res.redirect("/login")
    }
  },

  // Register new User
  registerUser: async (req, res) => {
    const {username, password, role} = req.body
    if(!username || !password || !role) {
      return res.status(400).json({message: "please fill all fields"})
    }
    try {
      const oldUser = await User.findOne({username})
      if(oldUser) {
        return res.status(400).json({message: "User already exists!"})
      }
      const heshPassword = await bcrypt.hash(password, 10)
      req.body.password = heshPassword

      const newUser = new User(req.body)
      await newUser.save()      
      
      res.status(201).json({message: "signup successfully"})
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },

}

module.exports = categoryCtrl