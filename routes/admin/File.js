const router = require("express").Router();
const fileController = require("../../controllers/FileControler");
const fileUploader = require('../../config/configCloud');
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../controllers/Authentication/VerifyToken");

var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {

    let typeFlife = file.mimetype.split('/')
    cb(null, file.fieldname + '-' + Date.now()+'.'+typeFlife[1])
  }
})
var upload = multer({ storage: storage })








router.get("/imag", fileController.getFile);
router.post("/uploadphoto",fileUploader.single('file'), fileController.upload);
router.get('/anh',fileController.getImages)
router.delete('/delete',verifyTokenAndAdmin,fileController.delete)
router.delete('/deletes',verifyTokenAndAdmin,fileController.deletes)




module.exports = router;  

