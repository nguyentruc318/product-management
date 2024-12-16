const Product = require("../../models/product_model");
module.exports.index = async (req, res) => {
  const products = await Product.find({});
  const newProducts = products.map((item) => {
    item.newPrice = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  console.log(products);
  res.render("client/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: newProducts,
  });
};
module.exports.detail = async (req, res) => {
  // res.send("ok");
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "available",
    };
    const product = await Product.findOne(find);
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect("/products");
  }
};
