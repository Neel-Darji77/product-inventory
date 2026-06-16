import express from "express";

import {
    getSettings,
    updateSettings
} from "../controllers/settingController.js";

import authorize from "../middlewares/authorize.js";
import verifyToken from "../middlewares/verifyToken.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(verifyToken);

router.get(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER),
    getSettings
);

router.patch(
    "/",
    authorize(ROLES.ADMIN),
    updateSettings
);

export default router;