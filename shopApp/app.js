const path = require("path");
// third party imports
const express = require("express");
const bodyParser = require("body-parser");
// custom imports
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const rootDirName = require("./utils/path");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
// setting up public folder as a static
app.use(express.static(path.join(rootDirName, "public")));
// setting up body parser (extended: to choose between querystring lib or qs lib to parse the data)
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.listen(5000, () => {
  console.log("Server Started...");
});
