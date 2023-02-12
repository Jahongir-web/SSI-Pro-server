const router = require("express").Router()

const subCategoryCtrl = require("../controller/subCategoryCtrl")

// router.post("/", categoryCtrl.addCategory)
// router.get("/", categoryCtrl.getCategories)
router.delete("/:categoryId", subCategoryCtrl.deleteSubCategory)
router.put("/:categoryId", subCategoryCtrl.updateSubCategory)
router.post("/", subCategoryCtrl.addSubCategory)

module.exports = router