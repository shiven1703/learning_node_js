const path = require("path");
// third party imports
const express = require("express");
const bodyParser = require("body-parser");
// custom imports
const user = require("./routes/user");
const admin = require("./routes/admin");
const shop = require("./routes/shop");

const rootDirName = require("./utils/path");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
// setting up public folder as a static
app.use(express.static(path.join(rootDirName, "public")));
// setting up body parser (extended: to choose between querystring lib or qs lib to parse the data)
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", user.routes);
app.use("/admin", admin.routes);
app.use(shop.routes);

app.listen(5000, () => {
  console.log("Server Started...");
});
