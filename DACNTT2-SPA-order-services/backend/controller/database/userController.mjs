// import { default as sqlite3 } from "sqlite3";
// import * as path from "path";
// import { approotdir } from "../approotdir.mjs";

import { connectDB } from "./databaseController.mjs";

export async function createUser(phone, password, fullName, role) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users(phoneNum, password, fullName, role) VALUES(?,?,?,?)",
      [phone, password, fullName, role],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}

export async function findUser(phone) {
  const db = await connectDB();
  const user = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE phoneNum = ?", [phone], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
  return user;
}

export async function listUser() {
  const db = await connectDB();
  const users = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM users WHERE role != 'ADMIN'", (err, rows) => {
      if (err) reject(err);
      resolve(
        rows.map((row) => {
          return row;
        })
      );
    });
  });
  return users;
}

export async function updateUser(oldPhone, fullName, phoneNum, avatar, role) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET fullName = ?, phoneNum = ?  , avatar =? ,  role = ? WHERE phoneNum = ?",
      [fullName, phoneNum, avatar, role, oldPhone],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}
export async function deleteUser(phoneNum) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE phoneNum = ?", [phoneNum], (err) => {
      if (err) reject(err);
      resolve(db);
    });
  });
}

export async function changePasswordUser(phone, newPassword) {
  const db = await connectDB();
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET password = ? WHERE phoneNum =?",
      [newPassword, phone],
      (err) => {
        if (err) reject(err);
        resolve(db);
      }
    );
  });
}
