const path = require("path");
// third party imports
const express = require("express");
const mogoose = require("mongoose");
const bodyParser = require("body-parser");
// custom imports
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const rootDirName = require("./utils/path");

const app = express();

// template engin config
app.set("view engine", "ejs");
app.set("views", "views");

// public folder and bodyParser config
app.use(express.static(path.join(rootDirName, "public")));
app.use(bodyParser.urlencoded({ extended: false })); // setting up body parser (extended: true || false || - to choose between 'querystring' lib or 'qs' lib to parse the data)

// dummy user
app.use(async (req, res, next) => {
  try {
    req.user = await mogoose.model("User").findById("5fc2507104c0e5309cf31359");
    next();
  } catch (error) {
    console.log(error);
  }
});

// routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// executes for 404 error
app.use(errorController.get404Page);

// server
mogoose
  .connect("mongodb://localhost:27017/shop", { useNewUrlParser: true })
  .then((result) => {
    app.listen(5000, () => {
      console.log("Server started...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
