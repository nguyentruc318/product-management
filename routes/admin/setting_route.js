const express = require("express");
const router = express.Router();
const settingController = require("../../controllers/admin/setting_controller");
const mutler = require("multer");
const upload = mutler({ dest: "public/uploads/logos/" });
router.get("/general", settingController.general);
router.patch(
  "/general",
  upload.single("logo"),
  settingController.updateGeneral
);
module.exports = router;
