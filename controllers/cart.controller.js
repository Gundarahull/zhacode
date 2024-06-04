const Address = require("../model/address.model");
const CartItem = require("../model/cart.model");

exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    // Checking if the product is already in the cart
    const existingCartItem = await CartItem.findOne({
      where: { ProductId: productId, signupId: req.user.id },
    });
    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      await CartItem.create({
        signupId: req.user.id,
        ProductId: productId,
        quantity: 1,
      });
    }
    res.redirect("/postlogin/myproducts");
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { signupId: req.user.id },
      include: "Product",
      //its like reference from the Product Table and including the Product Table for to get the product tab;e details
    });

    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.quantity * item.Product.productPrice;
    });

    res.render("cartItem", {
      cartItems,
      totalAmount,
    });
    
    //lets see on the morning session to get this
    return totalAmount
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.viewAdress = (req, res) => {
  res.render("AddAdress", { message: null });
};

exports.postAddress = async (req, res) => {
  try {
    const newAddress = await Address.create({
      name: req.body.name,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      signupId: req.user.id,
    });
    res.render("AddAdress", { message: "Address added Sucessfuly" });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



