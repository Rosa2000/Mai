import { connectDB } from "./databaseController.mjs";

export async function createService(
  service_ID,
  serviceName,
  category,
  price,
  duration,
  description
) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO services (service_ID, serviceName, category,price, duration, description) VALUES (?,?,?,?,?,?)",
      [service_ID, serviceName, category, price, duration, description],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}

export async function findService(serviceID) {
  const db = await connectDB();
  const existService = await new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM services WHERE service_ID = ?",
      [serviceID],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
  return existService;
}

export async function listService() {
  const db = await connectDB();
  const serviceList = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM services", (err, rows) => {
      if (err) reject(err);
      resolve(
        rows.map((row) => {
          return row;
        })
      );
    });
  });
  return serviceList;
}

export async function updateService(
  oldServiceID,
  newService_ID,
  serviceName,
  category,
  price,
  duration,
  description
) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE services SET service_ID = ?, serviceName = ?, category = ?, price = ?, duration = ?, description = ? WHERE service_ID = ?",
      [
        newService_ID,
        serviceName,
        category,
        price,
        duration,
        description,
        oldServiceID,
      ],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}

export async function deleteService(serviceID) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run("DELETE FROM services WHERE service_ID = ?", [serviceID], (err) => {
      if (err) reject(err);
      resolve(db);
    });
  });
}

export async function listServiceName() {
  const db = await connectDB();
  const serviceList = await new Promise((resolve, reject) => {
    db.all("SELECT serviceName, service_ID FROM services", (err, rows) => {
      if (err) reject(err);
      resolve(
        rows.map((row) => {
          return row;
        })
      );
    });
  });
  return serviceList;
}
