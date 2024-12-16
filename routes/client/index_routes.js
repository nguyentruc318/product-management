const productRouter = require("./products_route");
const homeRouter = require("./home_route");
module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/products", productRouter);
};
