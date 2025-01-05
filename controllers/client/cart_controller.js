const Cart = require("../../models/cart_model");
const Product = require("../../models/product_model");
const newPriceHelper = require("../../helper/newPrice");
module.exports.addPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cart = await Cart.findOne({ _id: cartId });

  const existProduct = cart.products.find(
    (item) => item.product_id === productId
  );
  if (existProduct) {
    const newQuantity = existProduct.quantity + quantity;
    await Cart.updateOne(
      { _id: cartId, "products.product_id": productId },
      { $set: { "products.$.quantity": newQuantity } }
    );
  } else {
    const product = { product_id: productId, quantity: quantity };
    await Cart.updateOne({ _id: cartId }, { $push: { products: product } });
  }
  req.flash("success", "Thêm vào giỏ hàng thành công");
  res.redirect("back");
};
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({ _id: cartId });
  if (cart.products.length) {
    for (const product of cart.products) {
      const productId = product.product_id;
      const productInfo = await Product.findOne({ _id: productId });
      productInfo.priceNew = newPriceHelper.priceNewProduct(productInfo);

      product.productInfo = productInfo;
      product.totalPrice = productInfo.priceNew * product.quantity;
    }
  }
  cart.totalPrice = cart.products.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cart: cart,
  });
};
module.exports.delete = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;
  await Cart.updateOne(
    { _id: cartId },
    { $pull: { products: { product_id: productId } } }
  );
  req.flash("success", "Xóa sản phẩm thành công");
  res.redirect("back");
};
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  await Cart.updateOne(
    { _id: cartId, "products.product_id": productId },
    { $set: { "products.$.quantity": quantity } }
  );
  req.flash("success", "Cập nhật số lượng thành công");
  res.redirect("back");
};
