const Product = require("../../models/product_model");
const newPrice = require("../../helper/newPrice");
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  let newProducts = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    const products = await Product.find({
      title: keywordRegex,
      status: "available",
      deleted: false,
    });
    console.log(products);
    newProducts = newPrice.newPrice(products);
  }
  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    keyword,
    products: newProducts,
  });
};
