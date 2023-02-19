const router = require("express").Router()

const productCtrl = require("../controller/productCtrl")

router.get("/", productCtrl.getProducts)
router.post("/add", productCtrl.addProduct)
router.get("/add", productCtrl.addProductPage)
router.delete("/:categoryId", productCtrl.deleteCategory)
router.put("/:categoryId", productCtrl.updateCategory)

module.exports = router