const router = require("express").Router();
const userController = require("../../controllers/Usercontroler");
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


router.get("/account",verifyToken, userController.acount);

router.get("/all",verifyTokenAndAdmin, userController.getAllUsers);
router.get("/info",verifyToken,userController.getInfoUsers);
router.delete("/:id", userController.deleteUser);
router.post("/regiter",userController.registerUser)
router.get("/loginbyzalo",userController.zaloAuth)
router.post("/login", userController.loginUser);
router.put('/update',userController.updateProfile)
router.get("/permission",userController.permission);

module.exports = router;  
