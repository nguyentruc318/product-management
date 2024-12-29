const express = require("express");
const router = express.Router();
const authenController = require("../../controllers/admin/authen_controller");
const validateAuthen = require("../../validates/validate_authen");

router.get("/login", authenController.login);
router.post("/login", validateAuthen.loginPost, authenController.loginPost);
router.get("/logout", authenController.logout);

module.exports = router;
