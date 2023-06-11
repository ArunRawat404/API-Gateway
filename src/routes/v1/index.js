const express = require("express");

const { InfoController } = require("../../controllers");
const userRoutes = require("./user_routes")

const router = express.Router();

// /api/v1/info
router.get("/info", InfoController.info);

// /api/v1/user
router.use("/user", userRoutes);

// /api/v1/user
router.use("/user", userRoutes);

module.exports = router;
