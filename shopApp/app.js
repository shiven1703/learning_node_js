const path = require("path");
// third party imports
const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
// custom imports
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");


const rootDirName = require("./utils/path");
const { mongoConnect, getDb } = require("./utils/database");
const { nextTick } = require("process");


const app = express();

// template engin config
app.set("view engine", "ejs");
app.set("views", "views");

// public folder and bodyParser config
app.use(express.static(path.join(rootDirName, "public")));
app.use(bodyParser.urlencoded({ extended: false })); // setting up body parser (extended: true || false || - to choose between 'querystring' lib or 'qs' lib to parse the data)

// routes
app.use(async (req, res, next) => {
  try {
    req.user = await getDb().collection("users").findOne({ _id: mongodb.ObjectId("5fb4d3e024022020d0986ac1") });
    next();
  } catch (error) {
    console.log(error);
  }
});
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// executes for 404 error
app.use(errorController.get404Page);

mongoConnect().then((result) => {
  app.listen(5000, () => {
    console.log("Server started...");
  });
}).catch((error) => {
  console.log(error);
});
