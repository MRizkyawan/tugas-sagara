const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dt6swiv33",
  api_key: "818756415888781",
  api_secret: "lrmP88ouCylm8PIScHnuCWaJe1w",
});

module.exports = (fieldName) => {
  try {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "product",
        resource_type: "raw",
        public_id: (req, file) => "image - " + new Date().getTime() + path.extname(file.originalname),
      },
    });

    const upload = multer({ storage: storage }).single(fieldName);

    return (req, res, next) => {
      upload(req, res, (err) => {
        return next();
      });
    };
  } catch (error) {
      res.status(500).json({
          status : "failed",
          massage : "upload failed"
      })
  }
};
