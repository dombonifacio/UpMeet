import { Router } from "express";

// controller
import { sendInvitation } from "../controllers/invitationController";

const router = Router()

router.post("/send", sendInvitation);

export { router as invitationRouter }