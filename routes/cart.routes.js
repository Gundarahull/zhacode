const express = require("express");
const { authorize } = require("../middleware/token.middleware");
const { addToCart, getCart, viewAdress, postAddress } = require("../controllers/cart.controller");
const { getCheckout, postCheckout, createOrder, Razorpaybuy } = require("../controllers/razorpay.controller");
const router = express.Router();

router.post('/addToCart/:id',authorize,addToCart)
router.get('/cartitems',authorize,getCart)
router.get('/addAdsress',authorize,viewAdress)
router.post('/addpostAddress',authorize,postAddress)

//razorpay_Routes
router.get('/checkout',authorize,getCheckout)
router.post('/checkout',authorize,postCheckout)
router.post('/order',authorize,createOrder)
router.post('/is-order-complete',authorize,Razorpaybuy)



module.exports = router;