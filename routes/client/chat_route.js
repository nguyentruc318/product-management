const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/client/chat_controller");
router.get("/", chatController.index);

module.exports = router;
