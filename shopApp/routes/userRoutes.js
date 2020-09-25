const path = require("path");
const fs = require("fs");

const express = require("express");
const User = require("../Models/user");

const router = express.Router();
const rootDirName = require("../utils/path");

router.get("/login", (req, res) => {
  res.sendFile(path.join(rootDirName, "views", "login.html"));
});

router.post("/auth", async (req, res) => {
  let isRegistered = await authenticateUser(req.body.email, req.body.password);
  if (isRegistered === true) {
    res.status(301).redirect("/");
  } else {
    res.status(301).redirect("/user/error");
  }
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(rootDirName, "views", "register.html"));
});

router.post("/registerNewUser", async (req, res) => {
  const newUser = new User(req.body.name, req.body.email, req.body.password);
  await addNewUser(newUser);
  res.status(301).redirect("/");
});

router.get("/error", (req, res) => {
  res.sendFile(path.join(rootDirName, "views", "error.html"));
});

router.get("/account", (req, res) => {
  res.sendFile(path.join(rootDirName, "views", "addProduct.html"));
});
// custom functions
function addNewUser(newUser) {
  return new Promise(async (resolve, rejects) => {
    let existingUsers = [];
    existingUsers = await getAllUsers();
    existingUsers.push(newUser);
    resolve(existingUsers);
  }).then((updatedUserList) => {
    return new Promise((resolve, rejects) => {
      fs.writeFile(
        path.join(rootDirName, "data", "users.txt"),
        JSON.stringify(updatedUserList),
        (err) => {
          resolve();
        }
      );
    });
  });
}
function getAllUsers() {
  return new Promise((resolve, rejects) => {
    fs.readFile(path.join(rootDirName, "data", "users.txt"), (err, data) => {
      const Users = JSON.parse(data);
      resolve(Users);
    });
  });
}
async function authenticateUser(email, password) {
  let isFound = false;
  const userList = await getAllUsers();
  for (user of userList) {
    if (user.email === email && user.password === password) {
      isFound = true;
      break;
    }
  }
  return isFound;
}

module.exports = router;
