const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/accounts/" });
const validateAccount = require("../../validates/validate_account");
const accountController = require("../../controllers/admin/account_controller");
router.get("/", accountController.index);
router.get("/create", accountController.create);
router.post("/create", upload.single("avatar"), accountController.createPost);
router.get("/edit/:id", accountController.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  validateAccount.editPatch,
  accountController.editPatch
);
module.exports = router;
