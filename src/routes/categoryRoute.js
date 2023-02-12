const router = require("express").Router()

const categoryCtrl = require("../controller/categoryCtrl")

router.post("/", categoryCtrl.addCategory)
router.get("/", categoryCtrl.getCategories)
router.delete("/:categoryId", categoryCtrl.deleteCategory)
router.put("/:categoryId", categoryCtrl.updateCategory)

module.exports = router