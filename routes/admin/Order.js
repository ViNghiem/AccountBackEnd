const router = require("express").Router();
const OrderController = require("../../controllers/OderControler/Order");
var multer = require("multer");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../controllers/Authentication/VerifyToken");

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



router.get("/all",OrderController.GetAllOrder);

// router.delete("/delete",verifyTokenAndAdmin,CategoriController.deleteProduct);
// router.put("/update", CategoriController.updateProduct);

// router.post("/add", CategoriController.AddProduct);
// router.post("/create", CategoriController.CreatCategori);

router.get("/dataweek", OrderController.GetDataWeek);

module.exports = router;  