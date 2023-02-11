const router = require("express").Router()

const homeCtrl = require("../controller/homeCtrl")

router.get("/", homeCtrl.homePage)

module.exports = router