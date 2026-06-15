import express from "express";
import { login, getMe } from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", login);

router.get("/me", verifyToken, getMe);

export default router;