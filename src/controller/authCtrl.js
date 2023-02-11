const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const authCtrl = {
  // Login User
  loginUser: async (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
      return res.render("login.html", {message: "please fill all fields"})
    }
    try {
      const user = await User.findOne({username})
      if(user) {
        const validaty = await bcrypt.compare(password, user.password)

        if(validaty) {
          req.session.user_role = user.role
          return res.redirect("/")
        } 
        return res.render("login.html", {message: "wrong username or password"})
      }
      return res.render("login.html", {message: "wrong username or password"})
    } catch (error) {
      res.render("login.html", {message: error.message})
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

  logOut: async (req, res) => {
    req.session.user_role = null;
    return res.redirect("/login")
  },

}

module.exports = authCtrl