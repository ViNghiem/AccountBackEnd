const router = require("express").Router();
const session = require('express-session');
const indexController = require("../../controllers/PublicControler/index");
const {Setcookey} = require("../../miderwhere/statistical")
const CartController = require("../../controllers/CartControler/Cartcontroler");
const Checkout = require("../../controllers/oderControler/OrderControler");


router.get("/customer/login",Setcookey,indexController.getLogin)
router.get("/categories/:slug",Setcookey,indexController.getCategory)
router.get("/product/:slug",Setcookey,indexController.getProduct)
router.get("/cart",CartController.getCart)
router.get("/checkout",Checkout.viewOrder)
router.post("/checkout",Checkout.creatOrder)
router.post("/add-cart",Setcookey,CartController.addCart)
router.get("", indexController.getIndex);
module.exports = router;  
