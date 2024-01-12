const express = require("express");
const router = express.Router();
const masterController = require("../../MasterData/controllers/masterController");



router.get("/api/v1/getCreateModule",masterController.getCreateModuleData);
router.get("/api/v1/getFieldType",masterController.getFieldType);
router.get("/api/v1/getProductName",masterController.getProductName);


module.exports = router;
