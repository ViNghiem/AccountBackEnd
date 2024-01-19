const router = require("express").Router();
const Search = require("../../controllers/Search/SearchControler");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../controllers/Authentication/VerifyToken");



router.get('/products', Search.ProductSearch)




module.exports = router;  

