const db = require("./../utils/database");

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async save() {
    try {
      const query =
        "INSERT INTO users(`name`, `email`, `password`) VALUES(?, ?, ?);";
      await db.execute(query, [this.name, this.email, this.password]);
    } catch (error) {
      console.log(error);
    }
  }

  static async authenticate(email, password) {
    let isFound = false;
    try {
      const query =
        "SELECT userId FROM users WHERE email = ? AND password = ?;";
      const [users, fields] = await db.execute(query, [email, password]);
      if (users.length == 1) {
        isFound = true;
      }
    } catch (error) {
      console.log(error);
    }
    return isFound;
  }

  static async getAllUsers() {
    const query = "SELECT userId, name, email, password FROM users;";
    const [rows, fields] = await db.execute(query);
    return rows;
  }
}

module.exports = User;
