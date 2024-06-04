const express = require("express");
const { authorize } = require("../middleware/token.middleware");
const {
  getProducts,
  postProduct,
  addproduct,
  editDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/postlogin/myproducts", authorize, getProducts);
router.get('/postgetProduct',authorize,addproduct)
router.post('/postProduct',authorize,postProduct)
router.get('/editProduct/:id',authorize,editDetails)
router.post('/updateProduct/:id',authorize,updateProduct)
router.post('/deleteProduct/:id',authorize,deleteProduct)


module.exports = router;
