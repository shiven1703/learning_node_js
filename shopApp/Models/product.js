const db = require("./../utils/database");

class Product {
  constructor(productName, productDescription, price) {
    this.productName = productName;
    this.productDescription = productDescription;
    this.price = price;
  }

  async save() {
    try {
      const query =
        "INSERT INTO products(`productName`, `productDescription`, `price`) VALUES (? , ?, ?);";
      await db.execute(query, [
        this.productName,
        this.productDescription,
        this.price,
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  static async update(pid, productName, productDescription, price) {
    try {
      const query =
        "UPDATE products SET `productName` = ?, `productDescription` = ?, `price` = ? WHERE `productId` = ?;";
      await db.execute(query, [productName, productDescription, price, pid]);
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(pid) {
    try {
      const query = "DELETE FROM products WHERE `productId` = ?;";
      await db.execute(query, [pid]);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllProducts() {
    try {
      const query =
        "SELECT productId, productName, productDescription, price FROM `products`;";
      const [products, fields] = await db.execute(query);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  static async getProductById(pid) {
    try {
      const query =
        "SELECT productId, `productName`, `productDescription`, `price` FROM `products` WHERE `productId` = ?";
      const [products, fields] = await db.execute(query, [pid]);
      return products[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Product;
