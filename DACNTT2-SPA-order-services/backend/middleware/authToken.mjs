import { default as jwt } from "jsonwebtoken";
import { findUser } from "../controller/database/userController.mjs";
let tokenRole;
let tokenPhone;
let authToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({
      errors: [{ msg: "Token not found" }],
    });
  }
  // auth token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    const checkUserExsist = findUser(decoded.phoneNum);
    if (checkUserExsist) {
      tokenPhone = decoded.phoneNum;
      tokenRole = decoded.role;
      next();
    } else {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    // req.phone = decoded.phoneNum;
  });
};

const getRole = () => {
  return tokenRole;
};

let isAdmin = (req, res, next) => {
  if (tokenRole != "ADMIN") {
    return res.status(401).json({
      message: "NO PERMISSION!",
    });
  }
  next();
};

const getPhone = () => {
  return tokenPhone;
};

export const authJwt = {
  authToken: authToken,
  isAdmin: isAdmin,
  getPhone: getPhone,
  getRole: getRole,
};
