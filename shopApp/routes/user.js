const express = require("express");

const router = express.Router();

const userController = require("./../controllers/user");

router.get("/login", userController.getLoginPage);

router.get("/register", userController.getRegisterPage);

router.get("/error", userController.getErrorPage);

router.post("/auth", userController.auth);

router.post("/registerNewUser", userController.registerNewUser);

module.exports = router;
