import { default as sqlite3 } from "sqlite3";
import * as path from "path";
import { approotdir } from "../../approotdir.mjs";

let db;
export async function connectDB() {
  if (db) return db;
  const dbPath = path.join(approotdir, "database/databases/db.sqlite3");
  await new Promise((resolve, reject) => {
    db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
  return db;
}
