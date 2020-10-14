const db = require("./../utils/database");

class Cart {
  static async addProduct(productId) {
    try {
      const query = "INSERT INTO cart(`productId`, `qty`) VALUES(?, ?);";
      await db.execute(query, [productId, 1]);
    } catch (error) {
      console.log(error);
    }
  }

  static async removeProductFromCart(productId) {
    try {
      const query = "DELETE FROM cart WHERE productId = ? LIMIT 1";
      await db.execute(query, [productId]);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllProductsFromCart() {
    const cartProducts = { products: [], total: 0.0 };
    try {
      const query =
        "SELECT products.productName, cart.productId, COUNT(qty) AS `qty`, products.price FROM cart INNER JOIN products ON cart.productId = products.productId GROUP BY cart.productID;";
      const [rows, fields] = await db.execute(query);
      if (rows.length > 0) {
        cartProducts.products = rows;
        rows.forEach((row) => {
          cartProducts.total =
            cartProducts.total +
            Number.parseFloat(row.price) * Number.parseFloat(row.qty);
        });
      }
    } catch (error) {
      console.log(error);
    }
    return cartProducts;
  }
}

module.exports = Cart;
