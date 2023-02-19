const router = require("express").Router()

const productCtrl = require("../controller/productCtrl")

router.get("/", productCtrl.getProducts)
router.get("/api", productCtrl.getForClientProducts)
router.post("/add", productCtrl.addProduct)
router.get("/add", productCtrl.addProductPage)
router.delete("/:productId", productCtrl.deleteProduct)
router.put("/promation/:productId", productCtrl.updateProductPromotion)
router.put("/pubished/:productId", productCtrl.updateProductPublished)

module.exports = router