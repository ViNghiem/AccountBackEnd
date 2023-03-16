const router = require("express").Router();
const fileController = require("../controllers/FileControler");

var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {

    let typeFlife = file.mimetype.split('/')
    cb(null, file.fieldname + '-' + Date.now()+'.'+typeFlife[1])
  }
})
var upload = multer({ storage: storage })


router.get("/imag", fileController.getFile);
router.post("/uploadphoto",upload.single('avartar'), fileController.upload);
router.get('/anh',fileController.getImages)

module.exports = router;  