const router = require("express").Router();
const session = require('express-session');
const indexController = require("../../controllers/PublicControler/index");
const {Setcookey} = require("../../miderwhere/statistical")
const CartController = require("../../controllers/CartControler/Cartcontroler");
const Checkout = require("../../controllers/PublicControler/OrderControler");
const { setGlooBal } = require('../../controllers/PublicControler/Global')
const {addOrder} = require('../../controllers/OderControler/Order')
const createPayment =require('../../controllers/PublicControler/OrderControler')
const Shipping = require('../../controllers/OderControler/Shipping')

router.get("/customer/login",indexController.getLogin)
router.get("/categories/:slug",setGlooBal,indexController.getCategory)
router.get("/product/:slug",setGlooBal,indexController.getProduct)
router.get("/search",indexController.search)
router.get("/cart",setGlooBal,indexController.getCartVeiw)
router.get("/cart/action",setGlooBal,indexController.checkaction,indexController.getCartVeiw)
router.get("/cart/checkout",setGlooBal,Checkout.viewOrder)
router.post("/checkout",setGlooBal,Checkout.creatOrderMomo)
router.post("/add-cart",CartController.addCart)
router.get("",setGlooBal, indexController.getIndex);
router.post("/test",indexController.getTest)
router.get('/ordersucces',setGlooBal,Checkout.ordersucces)
router.get('/search',setGlooBal,indexController.search)
router.get('/shippingfree',Shipping.getShipping)





module.exports = router;  
