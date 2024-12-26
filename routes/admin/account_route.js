const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/accounts/" });
const accountController = require("../../controllers/admin/account_controller")
router.get("/",accountController.index)
router.get("/create",accountController.create)
router.post("/create",upload.single("avatar"),accountController.createPost)
module.exports = router;