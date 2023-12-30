// express
import { Router } from "express";
import { getEvent } from "../controllers/eventController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/event_info/:eventId", getEvent);

export { router as eventRouter };
