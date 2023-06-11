const express = require("express");

const { InfoController } = require("../../controllers");
const { AuthRequestMiddlewares } = require("../../middlewares")
const userRoutes = require("./user_routes")

const router = express.Router();

// /api/v1/info
router.get("/info",
    AuthRequestMiddlewares.checkAuth,
    InfoController.info);

// /api/v1/user
router.use("/user", userRoutes);

module.exports = router;
