import { connectDB } from "./databaseController.mjs";

export async function createServiceOrder(dateBooking, phone, services, amount) {
  const db = await connectDB();
  const orderID = "DV" + new Date();
  await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO service_order (orderID, date_booking, customer_phone, selected_services_ID, amount) VALUES (?,?,?,?,?)",
      [orderID, dateBooking, phone, services, amount],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}

export async function listServiceOrders() {
  const db = await connectDB();
  const orderList = new Promise((resolve, reject) => {
    db.all("SELECT * from service_order", (err, rows) => {
      if (err) reject(err);
      resolve(
        rows.map((row) => {
          return row;
        })
      );
    });
  });
  return orderList;
}
