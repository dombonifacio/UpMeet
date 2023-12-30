import { Router } from "express";
import {
  createAttendingEvents,
  createSavedEvents,
  deleteAttendingEvents,
  deleteSavedEvents,
  getEventAttendees,
  getSavedEvents,
  getSelfEvents,
} from "../controllers/eventAttendanceController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// Routes for saved events
router.post("/create_saved_events", authMiddleware, createSavedEvents);
router.get("/get_saved_events", authMiddleware, getSavedEvents);
router.delete(
  "/delete_saved/:eventId/:userId",
  authMiddleware,
  deleteSavedEvents
);

// Routes for attending/unattending, getting event attendees or events you're going to
router.post("/create_attending_events", authMiddleware, createAttendingEvents);
router.get("/get_attending_events", authMiddleware, getSelfEvents);
router.delete(
  "/delete_attending/:eventId/:userId",
  authMiddleware,
  deleteAttendingEvents
);

// Route for getting event attendees
router.get("/get_event_attendees/:eventId", authMiddleware, getEventAttendees);

export { router as eventAttendanceRouter };
