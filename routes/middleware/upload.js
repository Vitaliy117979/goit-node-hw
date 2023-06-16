const multer = require("multer");
const path = require("path");
const HttpError = require("../../helpers/HttpError");

const tmpDir = path.join(__dirname, "../", "../", "tmp");
console.log(tmpDir);
const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${uniquePrefix}_${file.originalname}`;

    cb(null, newName);
  },
});

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  console.log(mimetype);
  if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
    cb(HttpError(400, "File can have only .jpg or .png extension"));
    cb(null, false);
  }
  cb(null, true);
};
const limits = {
  fileSize: 1024 * 1024,
};
const upload = multer({
  storage: multerConfig,
  fileFilter,
  limits,
});

module.exports = upload;
