const SignUp = require("../model/signup.model");
const secretKey =  process.env.TOKEN;;
const jwt = require("jsonwebtoken");

exports.authorize = async (req, res, next) => {
  try {
    //getting the token from the cookie
    const token = req.cookies.token;
    //decrypt the code
    const user = jwt.verify(token, secretKey);
    SignUp.findByPk(user.userId)
      .then((user) => {
        //getting the ID through it
        req.user = user; //important
        console.log("In the middleware", req.user);
        next();
      })
      .catch(() => {
        res
          .status(401)
          .send({ message: "You are not authorized to perform this action" });
      });
  } catch (err) {
    console.log(err);
  }
};
