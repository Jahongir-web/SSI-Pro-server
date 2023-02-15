const router = require("express").Router()

const productCtrl = require("../controller/productCtrl")

router.post("/", productCtrl.addCategory)
router.get("/", productCtrl.getProducts)
router.get("/add", productCtrl.addProductPage)
router.delete("/:categoryId", productCtrl.deleteCategory)
router.put("/:categoryId", productCtrl.updateCategory)

module.exports = router