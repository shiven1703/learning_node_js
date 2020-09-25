const express = require("express");

const router = express.Router();

router.get("/login", (request, response) => {
  response.send("This is Login page");
});

router.get("/", (request, response) => {
  response.send("This is Home");
});

module.exports = router;
