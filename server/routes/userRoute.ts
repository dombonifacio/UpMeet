// express
import { Router } from "express";

// controllers
import { getUserInfo } from "../controllers/userController";

const router = Router();

router.get("/me", getUserInfo);

export { router as userRouter };
