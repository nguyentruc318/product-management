const ProductCategory = require("../../models/product_category_model")
const { tree } = require("../../helper/create_tree.js");
module.exports.index = async (req, res) => {
  const productCategory = await ProductCategory.find({deleted:false})
  const newProductCategory = tree(productCategory)
  res.render("client/pages/home/index", { pageTitle: "Trang chủ",layoutProductCategory:newProductCategory });
};
