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

    const user = await User.findOne({
      where: {
        email: userEmail,
        password: userPassword,
      },
    });

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
    const newUserName = req.body.name;
    const newUserEmail = req.body.email;
    const newUserPassword = req.body.password;
    await User.create({
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(301).redirect("/");
};
