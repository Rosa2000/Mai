import { default as express } from "express";
import { authJwt } from "../../middleware/authToken.mjs";
import {
  createService,
  deleteService,
  findService,
  listService,
  updateService,
  listServiceName,
} from "../../controller/database/servicesDBController.mjs";

export const router = express.Router();

router.post("/create", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    const existService = await findService(req.body.service_ID);
    if (!existService && req.body.duration > 0 && req.body.price > 0) {
      await createService(
        req.body.service_ID,
        req.body.serviceName,
        req.body.category,
        req.body.price,
        req.body.duration,
        req.body.description
      );
      return res.status(200).json({ msg: "CREATED SERVICE SUCCESS" });
    } else {
      res.status(400).json({ msg: "INVALID INPUT" });
    }
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.get("/", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    const serviceList = await listService();
    res.status(200).json(serviceList);
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.get("/get-service-info", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    const service = await findService(req.query.service_ID);
    if (service) {
      return res.status(200).json(service);
    } else {
      return res.status(400).json({ msg: "không tìm thấy dịch vụ" });
    }
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.post("/edit-service", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    const oldID = req.query.service_ID;
    const newID = req.body.service_ID;
    const checkServiceExist = await findService(oldID);
    const checkNewServiceExist = await findService(newID);
    if (!checkServiceExist) {
      return res.status(400).json({ msg: "Không tìm thấy dịch vụ" });
    }
    if (oldID == newID || (oldID != newID && !checkNewServiceExist)) {
      await updateService(
        oldID,
        newID,
        req.body.serviceName,
        req.body.category,
        req.body.price,
        req.body.duration,
        req.body.description
      );
      return res.status(200).json({ msg: "ĐÃ CẬP NHẬT" });
    } else {
      return res.status(400).json({ msg: "Mã dịch vụ không hợp lệ" });
    }
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.post("/delete", authJwt.authToken, async (req, res) => {
  const role = authJwt.getRole();
  if (role == "ADMIN") {
    const checkServiceExist = await findService(req.query.service_ID);
    if (checkServiceExist) {
      await deleteService(req.query.service_ID);
      return res.status(200).json({
        msg: "DELETE SERVICE",
      });
    } else {
      return res.status(400).json({
        msg: "Kiểm tra lại mã dịch vụ",
      });
    }
  } else {
    return res.status(401).json({ msg: "NO PERMISSION" });
  }
});

router.get("/get-service-name", authJwt.authToken, async (req, res) => {
  const serviceList = await listServiceName();
  res.status(200).json(serviceList);
});
