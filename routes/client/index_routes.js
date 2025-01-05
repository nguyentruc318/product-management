const productRouter = require("./products_route");
const homeRouter = require("./home_route");
const categoryMiddleware = require("../../middleware/client/category_middleware");
const searchRouter = require("./search_route");
const cartMiddleware = require("../../middleware/client/cart.middleware");
const cartRouter = require("./cart_route");
const checkoutRouter = require("./checkout_route");
const userRouter = require("./user_route");
module.exports = (app) => {
  app.use(categoryMiddleware.categoryMiddleware);
  app.use(cartMiddleware.cartId);
  app.use("/", homeRouter);
  app.use("/products", productRouter);
  app.use("/search", searchRouter);
  app.use("/cart", cartRouter);
  app.use("/checkout", checkoutRouter);
  app.use("/user", userRouter);
};
