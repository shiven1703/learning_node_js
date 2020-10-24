const path = require("path");
// third party imports
const express = require("express");
const bodyParser = require("body-parser");
// custom imports
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const rootDirName = require("./utils/path");
const db = require("./utils/database");

const app = express();

// template engin config
app.set("view engine", "ejs");
app.set("views", "views");

// public folder and bodyParser config
app.use(express.static(path.join(rootDirName, "public")));
app.use(bodyParser.urlencoded({ extended: false })); // setting up body parser (extended: true || false || - to choose between 'querystring' lib or 'qs' lib to parse the data)

// routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// perform database sync and start the server
db.sync()
  .then((result) => {
    app.listen(5000, () => {
      console.log("Server Started...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
