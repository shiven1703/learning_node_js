const path = require("path");
const fs = require("fs").promises;

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

const getAllUsersFromFile = async () => {
  let users = [];
  let fileName = getFileName();
  try {
    let data = await fs.readFile(fileName);
    users = JSON.parse(data);
  } catch (error) {}

  return users;
};

const writeAllUsersToFile = async (users) => {
  let fileName = getFileName();
  try {
    await fs.writeFile(fileName, JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

const getFileName = () => {
  return path.join(rootDirName, "data", "users.json");
};

module.exports = User;
