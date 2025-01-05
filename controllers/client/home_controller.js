const Product = require("../../models/product_model.js");
const newPrice = require("../../helper/newPrice.js");
module.exports.index = async (req, res) => {
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "available",
  });
  // console.log(productsFeatured);
  const newProductsFeatured = productsFeatured.map((item) => {
    item.newPrice = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  const newProducts = await Product.find({
    deleted: false,
    status: "available",
  })
    .sort({ position: "desc" })
    .limit(3);
  const newProductsPrice = newPrice.newPrice(newProducts);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    products: newProductsPrice,
  });
};
// hiển thị sản phẩm mới nhất
