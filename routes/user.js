const router = require("express").Router();
const userController = require("../controllers/Usercontroler");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/VerifyToken");

  

router.get("/all",verifyTokenAndAdmin, userController.getAllUsers);
router.get("/info", userController.getInfoUsers);
router.delete("/:id", userController.deleteUser);
router.post("/regiter", userController.registerUser)
router.get("/loginbyzalo",userController.zaloAuth)
router.post("/login", userController.loginUser);
router.get("/test",userController.getTest);
module.exports = router;  