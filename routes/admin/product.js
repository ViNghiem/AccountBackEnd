const router = require("express").Router();
const ProductController = require("../../controllers/products/ProductControler");
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



router.get("/all",verifyToken,ProductController.getAllProduct);
// router.get("/info",verifyToken, userController.getInfoUsers);
router.delete("/delete",verifyTokenAndAdmin,ProductController.deleteProduct);
router.put("/update", ProductController.updateProduct);

router.post("/add", ProductController.addProduct);

router.get("/:id", ProductController.getProduct);

module.exports = router;  
