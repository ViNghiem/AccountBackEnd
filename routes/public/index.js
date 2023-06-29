const router = require("express").Router();
const session = require('express-session');
const indexController = require("../../controllers/PublicControler/index");
const {Setcookey} = require("../../miderwhere/statistical")
const CartController = require("../../controllers/CartControler/Cartcontroler");
const Checkout = require("../../controllers/oderControler/OrderControler");
const { setGlooBal } = require('../../controllers/PublicControler/Global')

router.get("/customer/login",indexController.getLogin)
router.get("/categories/:slug",indexController.getCategory)
router.get("/product/:slug",setGlooBal,indexController.getProduct)
// router.get("",CartController.getCart)
router.get("/cart",setGlooBal,indexController.getCartVeiw)
router.get("/cart/checkout",setGlooBal,Checkout.viewOrder)
router.post("/checkout",setGlooBal,Checkout.creatOrder)
router.post("/add-cart",CartController.addCart)
router.get("",setGlooBal, indexController.getIndex);
module.exports = router;  
