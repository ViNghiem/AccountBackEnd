const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "dhef1t1iu",
  api_key: "584173867866189",
  api_secret: "mHUxyykyR6S3mkK6NZH0KtCyXhk"
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ['jpg', 'png']
 
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
  