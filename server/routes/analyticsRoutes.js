import express from "express";

import { getDashboardAnalytics } from "../controllers/analyticsController.js";

import authorize from "../middlewares/authorize.js";
import verifyToken from "../middlewares/verifyToken.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get(
    "/dashboard",
    verifyToken,
    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER
    ),
    getDashboardAnalytics
);

export default router;