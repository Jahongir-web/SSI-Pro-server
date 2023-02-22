const Video = require("../model/videoModel");


const videoCtrl = {

  getVideosPage: async (req, res) => {
    if(req.session.user_role === "001") {
      res.render("videos.html")  
    } else {
      return res.redirect("/login")
    }
  },

  // add Video
  addVideo: async (req, res) => {
    try {
      if(req.session.user_role === "001") {
        const video = new Video(req.body)
        await video.save()  
        return res.status(201).send({message: "Video added successfully"})
      } else {
        res.status(401).send({message: "Not Allowed!"})
      }
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },

  // Delete Product

  deleteVideo: async (req, res) => {
    if(req.session.user_role === "001") {
      try {
        const {videoId} = req.params
        const video = await Video.findByIdAndDelete(videoId)
        
        if(video) {
          return res.status(200).send({message: "Video deleted successfully"})
        } else {
          return res.status(404).send({message: "Video not found!"})
        }
      } catch (error) {
        res.status(500).send({message: error.message})
      }
    } else {
      res.status(401).send({message: "Not Allowed!"})
    }
  },

  getVideos: async (req, res) => {
    try {
      const videos = await Video.find()
      res.status(200).send(videos)
    } catch (error) {
      res.status(500).send({message: error.message})      
    }
  } 

}


module.exports = videoCtrl