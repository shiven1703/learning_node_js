const express = require("express");

const router = express.Router();

const userController = require("./../controllers/user");

router.get("/login", userController.getLoginPage);

router.get("/register", userController.getRegisterPage);

router.post("/auth", userController.auth);

router.post("/registerNewUser", userController.registerNewUser);

router.get("/error", userController.getErrorPage);

router.get("/account", userController.getAddProductPage);

module.exports = router;
