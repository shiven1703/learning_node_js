const { getDb } = require("./../utils/database");

class User {
  constructor(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
  }

  async save() {
    try {
      const collection = getDb().collection("users");
      await collection.insertOne(this);
    } catch (error) {
      console.log(error);
    }
  }

  static async authenticate(userEmail, userPassword) {
    try {
      const collection = getDb().collection("users");
      console.log(userEmail, userPassword);
      const user = collection.findOne({ email: userEmail, password: userPassword });
      return user;

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;


