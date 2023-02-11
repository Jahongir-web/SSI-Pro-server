const router = require("express").Router()

const authCtrl = require("../controller/authCtrl")

router.post("/register", authCtrl.registerUser)
router.post("/login", authCtrl.loginUser)
router.get("/logout", authCtrl.logOut)

module.exports = router