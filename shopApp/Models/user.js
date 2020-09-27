const path = require("path");
const fs = require("fs");

const rootDirName = require("../utils/path");

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async save() {
    return new Promise(async (resolve, rejects) => {
      let existingUsers = await getAllUsersFromFile();
      existingUsers.push(this);
      resolve(existingUsers);
    }).then(async (updatedUserList) => {
      await writeAllUsersToFile(updatedUserList);
    });
  }

  static async authenticate(email, password) {
    let isFound = false;
    const userList = await getAllUsersFromFile();
    for (let user of userList) {
      if (user.email === email && user.password === password) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }

  static async getAllUsers() {
    return await getAllUsersFromFile();
  }
}

const getAllUsersFromFile = () => {
  return new Promise((resolve, rejects) => {
    fs.readFile(path.join(rootDirName, "data", "users.json"), (err, data) => {
      let users = [];
      if (!err) {
        users = JSON.parse(data);
      }
      resolve(users);
    });
  });
};

const writeAllUsersToFile = (users) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(
      path.join(rootDirName, "data", "users.json"),
      JSON.stringify(users),
      (err) => {
        resolve();
      }
    );
  });
};

module.exports = User;
