const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require("cors");

// Routes
const authRoute = require("./src/routes/authRoute");
const homeRoute = require("./src/routes/homeRoute");
const categoryRoute = require("./src/routes/categoryRoute");
const subCategoryRoute = require("./src/routes/subCategoryRoute");
const productRoute = require("./src/routes/productRoute");
const videoRoute = require("./src/routes/videoRoute");
const brandRoute = require("./src/routes/brandRoute");

const app = express();

// settings
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

dotenv.config();

const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles: true}))
app.use(session({secret: process.env.MY_SESSION_KEY}))
app.use(express.static("static"))
app.use(cors())

// usage of routes
app.use("/", authRoute)
app.use("/", homeRoute)
app.use("/category", categoryRoute)
app.use("/subcategory", subCategoryRoute)
app.use("/product", productRoute)
app.use("/videos", videoRoute)
app.use("/brand", brandRoute)


app.get("/login", (req, res) => {
  res.render("login.html", {message: ""})
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  app.listen(PORT, ()=> console.log(`Server started on port: ${PORT}`))
}).catch((error) => console.log(error))
