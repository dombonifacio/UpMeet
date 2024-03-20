import { Router } from "express";
import {
  createAttendingEvents,
  deleteAttendingEvents,
  getEventAttendees,
  getSelfEvents
} from "../controllers/eventAttendanceController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, getSelfEvents)
router.post("/", authMiddleware, createAttendingEvents);
router.get("/:eventId", authMiddleware, getEventAttendees);
router.delete("/:eventId/:userId", authMiddleware, deleteAttendingEvents);

export { router as eventAttendanceRouter };
