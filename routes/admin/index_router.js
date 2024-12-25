const dashboardRoute = require("./dashboard_route.js");
const systemConfig = require("../../configs/system.js");
const productsRoute = require("./products_route.js");
const productCategoryRoute = require("./product_category_route.js");
const roleRoute = require("./roles_router.js")
module.exports = (app) => {
  const PATH = systemConfig.prefix;
  app.use(PATH + "/dashboard", dashboardRoute);
  app.use(PATH + "/products", productsRoute);
  app.use(PATH + "/products-category", productCategoryRoute);
  app.use(PATH + "/roles",roleRoute)
};
