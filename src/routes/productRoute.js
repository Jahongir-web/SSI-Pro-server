const router = require("express").Router()

const productCtrl = require("../controller/productCtrl")

router.get("/api", productCtrl.getForClientProducts)
router.get("/api/:productId", productCtrl.getProduct)

router.get("/", productCtrl.getProducts)
router.post("/add", productCtrl.addProduct)
router.get("/add/:productId", productCtrl.addProductPage)
router.delete("/:productId", productCtrl.deleteProduct)
router.put("/:productId", productCtrl.updateProduct)
router.put("/promation/:productId", productCtrl.updateProductPromotion)
router.put("/pubished/:productId", productCtrl.updateProductPublished)

module.exports = router