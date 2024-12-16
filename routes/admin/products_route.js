const express = require("express");
const router = express.Router();
const multer = require("multer");

const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() });
const productsController = require("../../controllers/admin/products_controller");
const validate = require("../../validates/validate_product");
router.get("/", productsController.index);
router.patch("/change-status/:status/:id", productsController.changeStatus);
router.patch("/change-multi", productsController.changeMulti);
router.delete("/delete/:id", productsController.deleteItem);
router.get("/create", productsController.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  productsController.createPost
);
router.get("/edit/:id", productsController.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  productsController.editPost
);
router.get("/detail/:id", productsController.detail);
module.exports = router;
