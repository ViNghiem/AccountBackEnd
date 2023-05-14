const router = require("express").Router();
const session = require('express-session');
const indexController = require("../../controllers/PublicControler/index");
const {Setcookey} = require("../../miderwhere/statistical")
const CartController = require("../../controllers/CartControler/Cartcontroler");

router.get("",Setcookey, indexController.getIndex);
router.get("/customer/login",Setcookey,indexController.getLogin)
router.get("/categories/:slug",Setcookey,indexController.getCategory)
router.get("/product/:slug",Setcookey,indexController.getProduct)
router.get("/cart",CartController.getCart)



router.post("/add-cart",Setcookey,CartController.addCart)
module.exports = router;  
