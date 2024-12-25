const express = require("express");
const path = require("path");
require("dotenv").config();
const methodOverride = require("method-override");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const app = express();
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT;
const database = require("./configs/database");
const system = require("./configs/system");
// tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
app.locals.prefix = system.prefix;
database.connect();
const route = require("./routes/client/index_routes");
const routeAdmin = require("./routes/admin/index_router");
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(CookieParser("adasdka"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});
route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
