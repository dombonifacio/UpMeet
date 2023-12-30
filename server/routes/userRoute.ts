// express
import { Router } from "express";

// controllers
import { getUserInfo, updateUserImage } from "../controllers/userController";

const router = Router();

router.get("/profile", getUserInfo);
router.patch("/update_image", updateUserImage);

export { router as userRouter };
