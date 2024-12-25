const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/product_category/" });
const validateProductCategory = require("../../validates/validate_product_category.js");
const productCategoryController = require("../../controllers/admin/product_category_controller.js");
router.get("/", productCategoryController.index);
router.get("/create", productCategoryController.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  //   validateProductCategory.createPost,
  productCategoryController.createPost
);
router.get("/edit/:id", productCategoryController.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  productCategoryController.editPatch
);
module.exports = router;
