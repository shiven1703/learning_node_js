const User = require("../Models/user");

exports.getLoginPage = (req, res) => {
  res.render("user/login", { pageTitle: "Login" });
};

exports.getRegisterPage = (req, res) => {
  res.render("user/register", { pageTitle: "Register" });
};

exports.getErrorPage = (req, res) => {
  res.render("error", { pageTitle: "Error" });
};

exports.auth = async (req, res) => {
  let isRegistered = await User.authenticate(req.body.email, req.body.password);
  if (isRegistered === true) {
    res.status(301).redirect("/");
  } else {
    res.status(301).redirect("/user/error");
  }
};

exports.registerNewUser = async (req, res) => {
  const newUser = new User(req.body.name, req.body.email, req.body.password);
  await newUser.save();
  res.status(301).redirect("/");
};
