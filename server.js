const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const SignUp = require("./model/signup.model");
const Product = require("./model/product.model");
const CartItem = require("./model/cart.model");
require('dotenv').config()

//pasrsing the data
app.use(express.json());
app.use(express.urlencoded(true));

//cookie-parser
app.use(cookieParser());

//setting the view engine
//using EJS for Rendering
app.set("view engine", "ejs");
app.set("views");

//assiging routes to server
const SignupRoutes = require("./routes/signup.routes");
const sequelize = require("./database/db");
app.use(SignupRoutes);

//assiging the product routes to the server
const productRoutes=require('./routes/product.routes');
app.use(productRoutes)

const cartRoute=require('./routes/cart.routes');
const Address = require("./model/address.model");
app.use(cartRoute)

//assoscaitions
SignUp.hasMany(Product)
Product.belongsTo(SignUp)

//Here we are making connection with Signup and CArt ITEm table by this
//signup id will link to cartitem
SignUp.hasMany(CartItem); 
CartItem.belongsTo(SignUp); 

//Here we are making connection with Product and CArt ITEm table by this
//product id will link to cartitem
Product.hasMany(CartItem); 
CartItem.belongsTo(Product); 

SignUp.hasMany(Address)
Address.belongsTo(SignUp)


//integrating the MySql database with server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database not connected");
  });

sequelize
  .sync()
  .then(() => {
    console.log("Database synced, CREATED TABLE");
  })
  .catch(() => {
    console.log("Database not synced");
  });

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
