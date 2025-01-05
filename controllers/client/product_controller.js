const Product = require("../../models/product_model");
const ProductCategory = require("../../models/product_category_model");
const newPrice = require("../../helper/newPrice");
module.exports.index = async (req, res) => {
  const products = await Product.find({});
  const newProducts = products.map((item) => {
    item.newPrice = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  // console.log(products);
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
      slug: req.params.slugProduct,
      status: "available",
    };
    const product = await Product.findOne(find);
    // console.log(product);
    if (product.product_category_id) {
      const category = await ProductCategory.findOne({
        slug: product.product_category_id,
        deleted: false,
      });
      product.category = category;
    }
    product.priceNew = newPrice.priceNewProduct(product);
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    // console.log(error);
    res.redirect("/products");
  }
};
module.exports.category = async (req, res) => {
  try {
    const slug = req.params.slugCategory;

    const category = await ProductCategory.findOne({
      slug: slug,
      deleted: false,
    });
    const getSubCategory = async (categoryId) => {
      const subCategory = await ProductCategory.find({
        parent_id: categoryId,
        status: "available",
        deleted: false,
      });
      // console.log(subCategory);
      let allSubCategory = [...subCategory];
      for (const sub of allSubCategory) {
        const child = await getSubCategory(sub.id);
        allSubCategory = allSubCategory.concat(child);
      }
      // console.log(allSubCategory);
      return allSubCategory;
    };
    const listSubCategory = await getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map((item) => item.id);
    const products = await Product.find({
      product_category_id: { $in: [category.id, ...listSubCategoryId] },
      deleted: false,
    }).sort({ position: "desc" });
    const newProductsPrice = newPrice.newPrice(products);
    res.render("client/pages/products/index", {
      pageTitle: category.title,
      products: newProductsPrice,
    });
  } catch (error) {
    res.redirect("/products");
  }
};
