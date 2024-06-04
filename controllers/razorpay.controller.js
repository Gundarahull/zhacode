const Address = require("../model/address.model");
const CartItem = require("../model/cart.model");
const Product = require("../model/product.model");
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:  process.env.RAZORPAY_KEY_SECRET,
});

exports.getCheckout = async (req, res) => {
  const addresses = await Address.findAll({ where: { signupId: req.user.id } });
  res.render("checkout", { addresses });
};

exports.postCheckout = async (req, res) => {
  console.log("req.boyd", req.body);
  const address = await Address.findByPk(req.body.address);
  if (req.body.paymentMethod === "cash") {
    res.render("delievery", { address, paymentMethod: "CASH ON DELIVERY" });
  } else if (req.body.paymentMethod === "razorpay") {
    res.render("delievery", { address, paymentMethod: "Through RazorPAY" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { signupId: req.user.id },
      include: "Product",
    });

    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.quantity * item.Product.productPrice;
    });

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "order_receipt",
    };

    const order = await instance.orders.create(options);
    console.log(order);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Razorpaybuy = async (req, res) => {
  console.log(req.body);
  res.render("razorpay", { paymentMethod: "payment By  RAZORPAY" });
};
