const router = require("express").Router()

const brandCtrl = require("../controller/brandCtrl")

router.get("/", brandCtrl.brandPage)
router.get("/api", brandCtrl.getBrands)
router.post("/", brandCtrl.addBrand)
router.delete("/:brandId", brandCtrl.deleteBrand)


module.exports = router