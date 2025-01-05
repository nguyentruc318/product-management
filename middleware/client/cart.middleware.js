const Cart = require("../../models/cart_model");
module.exports.cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    const expiresTime = 1000 * 60 * 60 * 24;
    res.cookie("cartId", cart._id, {
      expires: new Date(Date.now() + expiresTime),
    });
  } else {
    const cart = await Cart.findById(req.cookies.cartId);
    cart.totalQuantity = cart.products.reduce(
      (total, item) => total + item.quantity,
      0
    );
    res.locals.miniCart = cart;
  }
  next();
};
