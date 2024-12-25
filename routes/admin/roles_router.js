const express = require("express")
const router = express.Router()
const roleController = require("../../controllers/admin/roles_controller")
router.get("/",roleController.index)
module.exports = router