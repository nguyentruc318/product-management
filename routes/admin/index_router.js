const dashboardRoute = require("./dashboard_route.js");
const systemConfig = require("../../configs/system.js");
const authenMiddleware = require("../../middleware/admin/authen_middleware.js");
const productsRoute = require("./products_route.js");
const productCategoryRoute = require("./product_category_route.js");
const roleRoute = require("./roles_router.js");
const accountRoute = require("./account_route.js");
const authenRoute = require("./authen_route.js");
module.exports = (app) => {
  const PATH = systemConfig.prefix;
  app.use(PATH + "/dashboard", authenMiddleware.requireAuth, dashboardRoute);
  app.use(PATH + "/products", authenMiddleware.requireAuth, productsRoute);
  app.use(
    PATH + "/products-category",
    authenMiddleware.requireAuth,
    productCategoryRoute
  );
  app.use(PATH + "/roles", authenMiddleware.requireAuth, roleRoute);
  app.use(PATH + "/accounts", authenMiddleware.requireAuth, accountRoute);
  app.use(PATH + "/auth", authenRoute);
};
