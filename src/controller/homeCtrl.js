const bcrypt = require("bcrypt");

const homeCtrl = {
  
  homePage: async (req, res) => {
    if(req.session.user_role === "001") {
      return res.render("index.html", {message: "ok!"})
    }
    try {
      return res.redirect("/login")
    } catch (error) {
      res.render("index.html", {message: error.message})
    }
  },
}

module.exports = homeCtrl