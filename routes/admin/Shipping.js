const router = require("express").Router();
const Shipping = require("../../controllers/OderControler/Shipping");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../controllers/Authentication/VerifyToken");



router.post("/addWarehauseAddress", Shipping.AddWarehauseAddress);
router.post("/udateaddress", Shipping.UpdateAddWarehauseAddress);
// router.post("/uploadphoto",fileUploader.single('file'), fileController.upload);
router.get('/warehauseaddress', Shipping.getAddWarehauseAddress)
// router.delete('/delete',verifyTokenAndAdmin,fileController.delete)
// router.delete('/deletes',verifyTokenAndAdmin,fileController.deletes)




module.exports = router;  

