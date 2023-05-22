const router = require("express").Router();
const addressControler = require("../../controllers/adressControler");


const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../controllers/Authentication/VerifyToken");




router.get("",verifyToken,addressControler.getAll);
router.post("/add",verifyToken, addressControler.addAdress);
router.put('/update',addressControler.update)

module.exports = router;  

