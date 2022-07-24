import { default as express } from "express";
import { authJwt } from "../../middleware/authToken.mjs";
import { uploadProductImgs } from "../../middleware/storeProductImg.mjs";
import {
  listProduct,
  findProductInfo,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controller/database/productDatabaseController.mjs";
export const router = express.Router();

router.post(
  "/uploadProductImgs",
  authJwt.authToken,
  uploadProductImgs.array("URL_IMG", 6),
  async (req, res) => {
    const role = authJwt.getRole();
    if (role == "ADMIN" || role == "NV") {
      const reqFiles = [];
      for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(
          "http://localhost:8000/images/products/" + req.files[i].filename
        );
      }
      return res.status(200).json({
        msg: "upload success",
        URL_FILES: reqFiles,
      });
    } else {
      return res.status(401).json({ msg: "NO PERMISSION" });
    }
  }
);

router.post("/create-product", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN" || role == "NV") {
    if (req.body.entryPrice < 0 && req.body.salePrice < 0) {
      return res.status(400).json({ msg: "Giá phải lớn hơn 0" });
    }
    if (req.body.inStockValue < 0) {
      return res.status(400).json({ msg: "Số lượng kho phải lớn hơn 0" });
    }
    const product = await findProduct(req.body.SKU);

    if (product) res.status(400).json({ msg: "Mã sản phẩm đã tồn tại!" });
    else {
      await createProduct(
        req.body.productName,
        req.body.SKU,
        req.body.entryPrice,
        req.body.salePrice,
        req.body.inStockValue,
        req.body.brand,
        req.body.category,
        req.body.description,
        req.body.userManual,
        req.body.URL_IMG
      );
      return res.status(200).json({
        msg: "CREATED PRODUCT!",
      });
    }
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.get("/productlist", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN" || role == "NV") {
    const productList = await listProduct();
    return res.status(200).json(productList);
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

// router.post("/update-product", authJwt.authToken, async (req, res) => {
//   const role = authJwt.getRole();
//   if (role == "ADMIN" || role == "NV") {
//     const productData = await findProduct(req.query.SKU);
//     return res.status(200).json(productData);
//   } else {
//     return res.status(401).json({ msg: "NO PERMISSION" });
//   }
// });

router.get("/get-product-detail", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN" || role == "NV") {
    const productData = await findProduct(req.query.SKU);
    if (productData) {
      return res.status(200).json(productData);
    } else {
      return res.status(400).json({ msg: "Không tìm thấy thông tin" });
    }
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});
router.get("/get-product", authJwt.authToken, async (req, res) => {
  const productData = await findProductInfo(req.query.SKU);
  if (productData) {
    return res.status(200).json(productData);
  } else {
    return res.status(400).json({ msg: "Không tìm thấy thông tin" });
  }
});
router.post("/edit-product", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN" || role == "NV") {
    const newSKU = req.body.SKU;
    const oldSKU = req.query.SKU;
    const checkExistProduct = await findProduct(oldSKU);
    const checkNewSKUExist = await findProduct(newSKU);
    if (!checkExistProduct)
      return res.status(400).json({ msg: "Không tìm thấy sản phẩm" });

    if (newSKU == oldSKU || (newSKU != oldSKU && !checkNewSKUExist)) {
      await updateProduct(
        oldSKU,
        req.body.productName,
        newSKU,
        req.body.entryPrice,
        req.body.salePrice,
        req.body.inStockValue,
        req.body.brand,
        req.body.category,
        req.body.description,
        req.body.user_manual,
        req.body.URL_IMG
      );
      return res.status(200).json({ msg: "success" });
    } else {
      return res.status(400).json({ msg: "Mã sản phẩm không hợp lệ" });
    }
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.post("/delete", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN" || role == "NV") {
    const existProduct = await findProduct(req.query.SKU);
    if (existProduct) {
      await deleteProduct(req.query.SKU);
      return res.status(200).json({
        msg: "DELETED PRODUCT",
      });
    } else
      return res.status(400).json({
        msg: "Kiểm tra lại mã sản phẩm",
      });
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});
