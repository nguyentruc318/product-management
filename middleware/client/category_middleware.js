const ProductCategory = require("../../models/product_category_model");
const { tree } = require("../../helper/create_tree.js");
module.exports.categoryMiddleware = async (req, res, next) => {
  const productCategory = await ProductCategory.find({ deleted: false });
  const newProductCategory = tree(productCategory);
  res.locals.layoutProductCategory = newProductCategory;
  next();
};
