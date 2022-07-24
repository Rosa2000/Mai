import { default as multer } from "multer";

import { approotdir } from "../approotdir.mjs";

import * as path from "path";

let imageName;
const storage = multer.diskStorage({
  destination: path.join(approotdir, "public/images/avatar"),
  filename: (req, file, cb) => {
    imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

export const uploadAvatar = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|PNG|JPG|jpeg|JPEG)$/)) {
      return cb(new Error("Please upload .png or .jpg file"));
    }
    cb(undefined, true);
  },
});
