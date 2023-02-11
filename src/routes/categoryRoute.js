const router = require("express").Router()

const categoryCtrl = require("../controller/categoryCtrl")

router.post("/", categoryCtrl.addCategory)
router.get("/", categoryCtrl.getCategories)

module.exports = router