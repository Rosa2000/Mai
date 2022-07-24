import { connectDB } from "./databaseController.mjs";
export async function createProduct(
  productName,
  SKU,
  entryPrice,
  salePrice,
  inStockValue,
  brand,
  category,
  description,
  userManual,
  URL_IMG
) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO products(productName, SKU, entryPrice, salePrice,   inStockValue, brand, category, description, user_manual, URL_IMG) VALUES(?,?,?,?, ? ,? ,? ,? ,? ,?)",
      [
        productName,
        SKU,
        entryPrice,
        salePrice,
        inStockValue,
        brand,
        category,
        description,
        userManual,
        URL_IMG,
      ],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}

export async function findProduct(SKU) {
  const db = await connectDB();
  const product = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM products WHERE SKU = ?", [SKU], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
  return product;
}
export async function findProductInfo(SKU) {
  const db = await connectDB();
  const product = await new Promise((resolve, reject) => {
    db.get(
      "SELECT productName, SKU,salePrice, brand, description, user_manual, URL_IMG FROM products WHERE SKU = ?",
      [SKU],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
  return product;
}

export async function listProduct() {
  const db = await connectDB();
  const listProduct = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM products", (err, rows) => {
      if (err) reject(err);
      resolve(
        rows.map((row) => {
          return row;
        })
      );
    });
  });
  return listProduct;
}

export async function updateProduct(
  oldSKU,
  productName,
  newSKU,
  entryPrice,
  salePrice,
  inStockValue,
  brand,
  category,
  description,
  userManual,
  URL_IMG
) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE products SET productName = ?, SKU = ?, entryPrice = ?, salePrice = ?, inStockValue = ?, brand = ?, category = ?, description = ?, user_manual = ?, URL_IMG = ?  WHERE SKU = ?",
      [
        productName,
        newSKU,
        entryPrice,
        salePrice,
        inStockValue,
        brand,
        category,
        description,
        userManual,
        URL_IMG,
        oldSKU,
      ],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}

export async function deleteProduct(SKU) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run("DELETE FROM products WHERE SKU = ?", [SKU], (err) => {
      if (err) reject(err);
      resolve(db);
    });
  });
}

export async function listProductPagination(limit, offset) {
  // console.log("LIMIT: ", limit);
  // console.log("OFFSET: ", offset);
  const db = await connectDB();
  const data = await new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM products LIMIT ? OFFSET ?",
      [limit, offset],
      (err, rows) => {
        if (err) reject(err);
        resolve(
          rows.map((row) => {
            return row;
          })
        );
      }
    );
  });
  return data;
}

export async function countProduct() {
  const db = await connectDB();
  const count = await new Promise((resolve, reject) => {
    db.get("SELECT count(SKU) as count from products", (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
  return count;
}
