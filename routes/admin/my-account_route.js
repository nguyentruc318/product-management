const express = require("express");
const router = express.Router();
const myAccountController = require("../../controllers/admin/my-account_controller")
const multer = require("multer");
const upload = multer({ dest: "public/uploads/product_category/" });
router.get("/", myAccountController.index);
router.get("/edit", myAccountController.edit);
router.patch("/edit",upload.single("avatar"),myAccountController.editPatch)
module.exports = router;
