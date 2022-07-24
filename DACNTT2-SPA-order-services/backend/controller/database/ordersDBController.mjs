import { connectDB } from "./databaseController.mjs";

export async function createOrder(phone, SKU, quantity, totalAmount) {
  const db = await connectDB();
  const time = Date.now();
  const orderID = "O" + time;
  await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO orders ( orderID, date_of_payment, customer_phone, SKU,quantity,amount) VALUES(?,?,?,?,?,?)",
      [orderID, time, phone, SKU, quantity, totalAmount],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}

export async function listOrders() {
  const db = await connectDB();
  const orderList = new Promise((resolve, reject) => {
    db.all("SELECT * from orders", (err, rows) => {
      if (err) reject(err);
      if (rows && rows.length > 0) {
        resolve(
          rows.map((row) => {
            return row;
          })
        );
      }
    });
  });
  return orderList;
}
