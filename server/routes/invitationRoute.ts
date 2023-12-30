import { Router } from "express";

// controller
import {
  acceptInvitation,
  declineInvitations,
  deleteInvitation,
  getReceivedInvitations,
  getSentInvitations,
  sendInvitation,
} from "../controllers/invitationController";

const router = Router();

// Send an invitation
router.post("/send_invitation", sendInvitation);

// Accept an invitation
router.patch("/accept_invitation", acceptInvitation);

// Decline an invitation
router.patch("/decline_invitation", declineInvitations);

// Delete an invitation
router.delete("/delete_invitation/:fromUserId/:eventId", deleteInvitation);

// Get Received Invitations
router.get("/get_received_invitations", getReceivedInvitations);

// Get Sent Invitations
router.get("/get_sent_invitations", getSentInvitations);

// // Get Received Invitations
// router.get("/received_invitations", getReceivedInvitations);
// // Get Sent Invitations
// router.get("/sent_invitations", getSentInvitations);
// // Delete an invitation
// router.delete("/delete_invitation/:id", deleteSentInvitation);
// //

// // Send an Invitation
// router.post("/send_invitation", sendInvitation);

export { router as invitationRouter };
