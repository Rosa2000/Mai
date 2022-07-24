import { default as express } from "express";
import { authJwt } from "../../middleware/authToken.mjs";
import { findProduct } from "../../controller/database/productDatabaseController.mjs";
import {
  createOrder,
  listOrders,
} from "../../controller/database/ordersDBController.mjs";

import {
  createServiceOrder,
  listServiceOrders,
} from "../../controller/database/serviceOrderDBController.mjs";

export const router = express.Router();

router.post("/create", authJwt.authToken, async (req, res) => {
  const SKU = req.body.SKU;
  const phone = authJwt.getPhone();
  const checkProductExist = await findProduct(SKU);
  const totalAmount = req.body.quantity * checkProductExist.salePrice;

  if ((checkProductExist, req.body.quantity > 0)) {
    await createOrder(phone, SKU, req.body.quantity, totalAmount);
    return res.status(200).json({ msg: "CREATED ORDER SUCCESSFULLY!" });
  } else {
    return res.status(400).json({ msg: "CREATED ORDER FAIL" });
  }
});

router.get("/", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    const orderList = await listOrders();
    return res.status(200).json(orderList);
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

// router.post("/create-service-order", authJwt.authToken, async (req,res) => {
//   const
// })
