import { default as express } from "express";
import { default as bcrypt } from "bcryptjs";
import { default as jwt } from "jsonwebtoken";
import { authJwt } from "../../middleware/authToken.mjs";

import { uploadAvatar } from "../../middleware/storeAvatar.mjs";
import {
  encryptText,
  validatePhoneNumber,
} from "../../middleware/signUpHelper.mjs";

import {
  createUser,
  findUser,
  listUser,
  updateUser,
  deleteUser,
  changePasswordUser,
} from "../../controller/database/userController.mjs";

export const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await findUser(req.body.phone);
  if (user) {
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (matchPassword) {
      let token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      return res.status(200).json({
        msg: "Login success",
        phone: user.phoneNum,
        accessToken: token,
        role: user.role,
      });
    } else {
      return res.status(401).json({ msg: "INVALID PHONE OR PASSWORD" });
    }
  } else return res.status(401).json({ msg: "INVALID PHONE OR PASSWORD" });
});

router.get("/find", async (req, res) => {
  const user = await findUser(req.query.phone);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({
      msg: "INVALID INPUT",
    });
  }
});

router.get("/", authJwt.authToken, authJwt.isAdmin, async (req, res) => {
  const users = await listUser();
  return res.status(200).json(users);
});

router.post("/create", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    if (validatePhoneNumber(req.body.phone)) {
      if (req.body.password === req.body.reEnterPassword) {
        const existUser = await findUser(req.body.phone);
        if (!existUser) {
          req.body.password = await encryptText(req.body.password);
          await createUser(
            req.body.phone,
            req.body.password,
            req.body.fullName,
            req.body.role
          );
          return res.status(200).json({
            msg: "signup success",
          });
        } else {
          return res.status(401).json({
            msg: "invalid input",
          });
        }
      } else {
        res.status(401).json({ msg: "password not match" });
      }
    } else {
      return res.status(401).json({
        msg: "invalid input",
      });
    }
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.post(
  "/update",
  authJwt.authToken,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    const role = authJwt.getRole();
    if (role == "ADMIN") {
      const existUser = await findUser(req.query.phone);
      let checkNewUserExist;
      if (validatePhoneNumber(req.body.phone)) {
        checkNewUserExist = await findUser(req.body.phone);
      }
      let tmp;
      if (
        checkNewUserExist &&
        checkNewUserExist.phoneNum != existUser.phoneNum
      ) {
        tmp = true;
      } else tmp = false;

      if (existUser && !tmp) {
        if (req.file) {
          req.body.avatar =
            "http://localhost:8000/images/avatar/" + req.file.filename;
        } else {
          req.body.avatar = existUser.avatar;
        }
        await updateUser(
          req.query.phone,
          req.body.fullName,
          req.body.phone,
          req.body.avatar,
          req.body.role
        );
        return res.status(200).json({
          msg: "updated",
        });
      } else
        return res.status(401).json({
          msg: "invalid input",
        });
    } else {
      return res.status(401).json({ msg: "NO PERMISSION" });
    }
  }
);

router.post("/delete", authJwt.authToken, authJwt.isAdmin, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    const existUser = await findUser(req.query.phone);
    if (existUser) {
      await deleteUser(req.query.phone);
      return res.status(200).json({
        msg: "DELETED USER",
      });
    } else
      return res.status(401).json({
        msg: "INVALID INPUT",
      });
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.post("/changePasswordFromAdmin", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    if (req.body.reEnterNewPassword === req.body.newPassword) {
      const existUser = await findUser(req.query.phone);
      if (existUser) {
        const matchCurrentPassword = await bcrypt.compare(
          req.body.currentPassword,
          existUser.password
        );
        if (matchCurrentPassword) {
          req.body.newPassword = await encryptText(req.body.newPassword);
          await changePasswordUser(req.query.phone, req.body.newPassword);
          return res.status(200).json({
            msg: "PASSWORD CHANGED",
          });
        } else
          return res.status(401).json({
            msg: "MẬT KHẨU KHÔNG ĐÚNG",
          });
      } else
        return res.status(401).json({
          msg: "INVALID INPUT",
        });
    } else
      return res.status(401).json({
        msg: "MẬT KHẨU MỚI KHÔNG TRÙNG KHỚP",
      });
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});
