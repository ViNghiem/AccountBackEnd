const router = require("express").Router();
const fileController = require("../controllers/FileControler");
router.post("/upload", fileController.upload);
router.get("/file", fileController.getFile);

module.exports = router;  