const router = require("express").Router();
const indexController = require("../controllers/indexControler/index");
router.get("", indexController.getIndex);


module.exports = router;  
