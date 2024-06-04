const express = require("express");
const { getHomepage, postSignup, getLogin, postLogin } = require("../controllers/signup.controller");
const { authorize } = require("../middleware/token.middleware");
const router = express.Router();

router.get("/", getHomepage);
router.post("/signupPost", postSignup);

router.get('/login',getLogin)
router.post('/postLogin',postLogin,authorize)

module.exports = router;
