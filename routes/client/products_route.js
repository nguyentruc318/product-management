const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product_controller");
router.get("/", controller.index);
// router.get("/:slug", controller.detail);
router.get("/:slugCategory", controller.category);
router.get("/detail/:slugProduct", controller.detail);
module.exports = router;
