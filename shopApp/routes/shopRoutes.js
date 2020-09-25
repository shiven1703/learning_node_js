const path = require("path");

const express = require("express");

const router = express.Router();
const rootDirName = require("../utils/path");

router.get("/", (req, res) => {
  res.sendFile(path.join(rootDirName, "views", "shop.html"));
});

module.exports = router;
