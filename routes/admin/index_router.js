const dashboardRoute = require("./dashboard_route.js");
const systemConfig = require("../../configs/system.js");
const productsRoute = require("./products_route.js");
module.exports = (app) => {
  const PATH = systemConfig.prefix;
  app.use(PATH + "/dashboard", dashboardRoute);
  app.use(PATH + "/products", productsRoute);
};
