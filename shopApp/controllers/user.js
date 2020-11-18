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
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const user = await User.authenticate(userEmail, userPassword);
    console.log(user);
    if (user !== null) {
      res.status(301).redirect("/");
    } else {
      res.status(301).redirect("/user/error");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.registerNewUser = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    const newUser = new User(name, password, email);
    await newUser.save();

  } catch (error) {
    console.log(error);
  }
  res.status(301).redirect("/");
};
