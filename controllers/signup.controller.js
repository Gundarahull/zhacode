const SignUp = require("../model/signup.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.TOKEN;

exports.getHomepage = (req, res) => {
  res.render("signup", { message: null });
};

exports.postSignup = async (req, res) => {
  try {
    // Check if the email already exists
    const emailAlready = await SignUp.findOne({
      where: { email: req.body.useremail },
    });
    if (emailAlready) {
      return res.render("signup", { message: "Email already exists" });
    }
    // Bcrypt the password
    const hash = await bcrypt.hash(req.body.password, 10);
    const signupdata = await SignUp.create({
      username: req.body.username,
      email: req.body.useremail,
      password: hash,
    });
    if (signupdata) {
      return res.render("signup", { message: "Successfully Signed Up" });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getLogin = (req, res) => {
  res.render("login", { message: null });
};

exports.postLogin = async (req, res) => {
  try {
    const user = await SignUp.findOne({ where: { email: req.body.useremail } });
    if (!user) {
      return res.render("login", { message: "Invalid Email or Password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.render("login", { message: "Invalid Email or Password" });
    }
    console.log("user in log", user.id);
    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.render("home",{
      name:user.username
    });
  } catch {
    console.error("Error in login:", error);
    res.status(500).send("Internal Server Error");
  }
};
