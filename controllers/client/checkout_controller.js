const Cart = require("../../models/cart_model");
const Product = require("../../models/product_model");
const Order = require("../../models/order_model");
const newPriceHelper = require("../../helper/newPrice");
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
  res.render("client/pages/checkout/index", {
    pageTitle: "Thanh toán",
    cart,
  });
};
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await Cart.findOne({ _id: cartId });
  let products = [];
  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      price: 0,
      discountPercentage: 0,
      quantity: product.quantity,
    };
    const productInfo = await Product.findOne({ _id: product.product_id });
    objectProduct.price = productInfo.price;
    objectProduct.discountPercentage = productInfo.discountPercentage;
    products.push(objectProduct);
  }
  const objectOrder = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products,
  };
  const order = new Order(objectOrder);
  await order.save();
  await Cart.updateOne({ _id: cartId }, { $set: { products: [] } });
  res.redirect(`/checkout/success/${order._id}`);
};
module.exports.success = async (req, res) => {
  const orderId = req.params.orderId;
  const order = await Order.findOne({ _id: orderId });
  console.log(order);
  for (const product of order.products) {
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("title thumbnail");
    product.productInfo = productInfo;
    product.priceNew = newPriceHelper.priceNewProduct(product);
    product.totalPrice = product.priceNew * product.quantity;
  }
  order.totalPrice = order.products.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  res.render("client/pages/checkout/success", {
    pageTitle: "Thanh toán thành công",
    order,
  });
};
