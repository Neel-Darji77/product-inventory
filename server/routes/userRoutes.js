import express from "express";

import {
    createUser,
    deleteUser,
    getUsers,
    toggleUserStatus,
    updateUserRole
} from "../controllers/userController.js";

import { ROLES } from "../constants/roles.js";

import authorize from "../middlewares/authorise.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// All user routes require authentication

router.use(verifyToken);

// Admin only routes

router.get(
    "/",
    authorize(ROLES.ADMIN),
    getUsers
);

router.post(
    "/",
    authorize(ROLES.ADMIN),
    createUser
);

router.patch(
    "/:id/role",
    authorize(ROLES.ADMIN),
    updateUserRole
);

router.patch(
    "/:id/status",
    authorize(ROLES.ADMIN),
    toggleUserStatus
);

router.delete(
    "/:id",
    authorize(ROLES.ADMIN),
    deleteUser
);

export default router;