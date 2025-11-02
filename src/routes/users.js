import express from "express";
import { createOrUpdateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/me", authMiddleware, createOrUpdateUser);

export default router;
