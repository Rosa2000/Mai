import { default as express } from "express";
import { authJwt } from "../../middleware/authToken.mjs";
import {
  listProductPagination,
  countProduct,
} from "../../controller/database/productDatabaseController.mjs";

export const router = express.Router();
router.get("/all-product", authJwt.authToken, async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const productList = await listProductPagination(limit, offset);
  res.status(200).json(productList);
});

router.get("/total-product", authJwt.authToken, async (req, res) => {
  const count = await countProduct();
  res.status(200).json(count);
});
