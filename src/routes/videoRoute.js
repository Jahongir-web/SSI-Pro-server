const router = require("express").Router()

const videoCtrl = require("../controller/videoCtrl")

router.get("/api", videoCtrl.getVideos)
router.get("/", videoCtrl.getVideosPage)
router.post("/", videoCtrl.addVideo)
router.delete("/:videoId", videoCtrl.deleteVideo)

module.exports = router