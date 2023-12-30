// express
import { Router } from "express";

// models
import { UserModel } from "../models/userModel";
import authMiddleware from "../middleware/authMiddleware";

// controllers
import {
  loginUsers,
  registerUsers,
  logoutUsers,
  isLoggedIn,
} from "../controllers/authController";

// const { protect } = require("../middleware/authMiddleware");

// router
const router = Router();

// responsible for registering users
router.post("/register", registerUsers);
// responsible for logging in and out users
router.post("/login", loginUsers);
router.get("/logout", logoutUsers);
router.get("/is_logged_in", isLoggedIn);

export { router as authRouter };
