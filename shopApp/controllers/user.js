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

    const isRegisterdUser = await User.authenticate(userEmail, userPassword);
    if (isRegisterdUser === true) {
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
    const newuserName = req.body.name;
    const newuserpassword = req.body.password;
    const newuseremail = req.body.email;

    const newUser = new User({ name: newuserName, password: newuserpassword, email: newuseremail });
    await newUser.save();

  } catch (error) {
    console.log(error);
  }
  res.status(301).redirect("/");
};
