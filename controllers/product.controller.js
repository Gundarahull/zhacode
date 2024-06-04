const Product = require("../model/product.model");

exports.getProducts = async (req, res) => {
  console.log("in the products");
  const getProducts = await Product.findAll({
    where: { signupId: req.user.id },
  });
  if (getProducts) {
    res.render("myproducts", {
      getProducts,
    });
  }
};

// iam just adding the  random products
// iam not using any form type
// for this we can use "multer"
//for the files we can use the "CLOUDINARY to get the url for the file"

exports.postProduct = async (req, res) => {
  try {
    const { productName, productDescription, productPrice } = req.body;
    const newProduct = await Product.create({
      productName,
      productDescription,
      productPrice,
      signupId: req.user.id,
    });
    res.render("addProduct", { message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.render("addProduct", {
      message: "Failed to add product. Please try again.",
    });
  }
};

exports.addproduct = (req, res) => {
  res.render("addProduct", { message: null });
};

exports.editDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("editProduct", { product, message: null });
  } catch (error) {
    console.error("Error rendering edit product form:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { productName, productDescription, productPrice } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        // updating the  product details
        product.productName = productName;
        product.productDescription = productDescription;
        product.productPrice = productPrice;
        await product.save();
        res.redirect("/postlogin/myproducts");
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        // Delete the product
        await product.destroy();
        res.redirect("/postlogin/myproducts");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Internal Server Error");
    }
};
