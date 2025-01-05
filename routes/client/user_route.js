const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user_controller");
const validate = require("../../validates/client/user_validate");
router.get("/register", controller.register);
router.post("/register", validate.registerPost, controller.registerPost);
router.get("/login", controller.login);
module.exports = router;
