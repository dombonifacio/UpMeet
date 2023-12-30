import { Request, Response, request } from "express";
import { EventModel } from "../models/eventModel";
import { IInvitation, InvitationModel } from "../models/invitationModel";
import { EventAttendanceModel } from "../models/eventAttendanceModel";
import { Types } from "mongoose";
import { UserModel } from "../models/userModel";

export const sendInvitation = async (req: Request, res: Response) => {
  const fromUserId = req.user.id;
  const { eventId, toUserId } = req.body;

  const date = new Date();
  try {
    if (!eventId || !toUserId) {
      return res.status(400).json({ error: "Bad Request. Try Again" });
    }

    // Find the event based on eventId
    const eventQuery = await EventModel.findOne({ eventId });
    const isUserGoing = await EventAttendanceModel.findOne({
      userId: fromUserId,
      eventId,
      attending: true,
    });

    if (!eventQuery || !isUserGoing) {
      return res.status(404).json({
        error:
          "You must confirm that you are going to this event first in order to invite this person",
      });
    }

    // Access the eventName and eventDate property from the event
    const eventName = eventQuery.artist
      ? eventQuery.artist
      : eventQuery.eventName;
    const eventDate = eventQuery.date;
    const dateTime = eventQuery.dateTime;
    const timezone = eventQuery.timezone;

    const event = {
      eventId,
      eventName,
      eventDate,
      dateTime,
      timezone,
    };

    const description = `Hey! Come join me at ${eventName} event on ${eventDate}. Interested?`;
    const fromUserQuery = await UserModel.findById(fromUserId);
    const toUserQuery = await UserModel.findById(toUserId);

    if (!fromUserQuery || !toUserQuery) {
      return res.status(400).json({ error: "Unable to fetch user data" });
    }
    const fromUser = {
      fromUserId: req.user.id,
      name: fromUserQuery?.name,
      image: fromUserQuery?.image,
    };

    const toUser = {
      toUserId,
      name: toUserQuery?.name,
      image: toUserQuery?.image,
    };

    const invitation = {
      fromUser,
      toUser,
      event,
      date,
      description,
      status: "pending",
    };

    const checkInvitationExist = await InvitationModel.findOne({
      "fromUser.fromUserId": fromUserId,
      "toUser.toUserId": toUserId,
      "event.eventId": eventId,
    });
    if (checkInvitationExist) {
      return res
        .status(400)
        .json({ error: "You already invited this user to this event!" });
    }

    const createInvitation = await InvitationModel.create(invitation);
    if (!createInvitation) {
      return res
        .status(400)
        .json({ error: "Failed to invite this user. Please try again" });
    }

    res.status(201).json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const acceptInvitation = async (req: Request, res: Response) => {
  try {
    // Check first if the user has any invitations
    const { eventId, fromUserId } = req.body;
    const toUserId = req.user.id;
    const getInvitation = await InvitationModel.findOne({
      "fromUser.fromUserId": fromUserId,
      "toUser.toUserId": toUserId,
      "event.eventId": eventId,
      status: "pending",
    });
    console.log(
      "from user:",
      getInvitation?.fromUser.fromUserId,
      "to user: ",
      getInvitation?.toUser.toUserId,
      "event id: ",
      getInvitation?.event.eventId
    );
    console.log(
      "event id:",
      eventId,
      "fromUserId",
      fromUserId,
      "to user id:",
      toUserId
    );
    if (!getInvitation) {
      return res
        .status(400)
        .json({ error: "Error. You were not invited to this event" });
    }

    // Check if invited person is already going to the event. If not, add them to the event attendance collection
    const checkIfAlreadyGoing = await EventAttendanceModel.findOne({
      eventId,
      userId: toUserId,
      attending: true,
    });
    if (checkIfAlreadyGoing?.attending === false) {
      //
      const createAttendEvent = await EventAttendanceModel.findByIdAndUpdate(
        { eventId, toUserId },
        { $set: { status: "attending" } }
      );
      if (!createAttendEvent) {
        return res.status(400).json({
          error: "Failed to accept this invitation. Please try again",
        });
      }
    } else if (!checkIfAlreadyGoing) {
      const eventAttendanceData = {
        eventId,
        userId: toUserId,
        attending: true,
        saved: false,
      };
      const createAttendEvent = await EventAttendanceModel.create(
        eventAttendanceData
      );
      if (!createAttendEvent) {
        return res.status(400).json({
          error:
            "Failed to accept and attend this invitation. Please try again",
        });
      }
    }

    const updateInvitation = await InvitationModel.findOneAndUpdate(
      {
        "event.eventId": eventId,
        "toUser.toUserId": toUserId,
        "fromUser.fromUserId": fromUserId,
        status: "pending",
      },
      { $set: { status: "accepted" } }
    );

    if (!updateInvitation) {
      return res
        .status(400)
        .json({ error: "Failed to accept invitation. Please try again" });
    }

    return res
      .status(200)
      .json({ message: "Successfully accepted invitation!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const declineInvitations = async (req: Request, res: Response) => {
  try {
    const { eventId, fromUserId } = req.body;
    const toUserId = req.user.id;

    const updateInvitation = await InvitationModel.findOneAndUpdate(
      {
        "event.eventId": eventId,
        "toUser.toUserId": toUserId,
        "fromUser.fromUserId": fromUserId,
        status: "pending",
      },
      { $set: { status: "declined" } }
    );

    if (!updateInvitation) {
      return res
        .status(400)
        .json({ error: "Failed to decline invitation. Please try again" });
    }

    return res
      .status(200)
      .json({ message: `You have declined this invitation.` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Call this API once user removes the notification that they have been rejected
// Or Call this API once a day has passed or event ended?
export const deleteInvitation = async (req: Request, res: Response) => {
  try {
    const toUserId = req.user.id;
    const eventId = req.params.eventId;
    const fromUserId = req.params.fromUserId;

    const deleteInvitation = await InvitationModel.findOneAndDelete({
      "toUser.toUserId": toUserId,
      "fromUser.fromUserId": fromUserId,
      "event.eventId": eventId,
    });
    if (!deleteInvitation) {
      return res
        .status(400)
        .json({ error: "Failed to decline this invitation. Please try again" });
    }

    return res.status(200).json({ message: "Invitation Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReceivedInvitations = async (req: Request, res: Response) => {
  const toUserId = req.user.id;

  // Get pending invitations that were sent to me

  try {
    const receivedInvitations = await InvitationModel.find({
      "toUser.toUserId": toUserId,
    });

    if (!receivedInvitations) {
      return res.status(400).json({
        error: "Failed to get received invitations. Try refreshing the page",
      });
    }

    return res.json(receivedInvitations);

    // In the invitation, return the whole receivedInvitations
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSentInvitations = async (req: Request, res: Response) => {
  const fromUserId = req.user.id;

  try {
    const sentInvitations = await InvitationModel.find({
      "fromUser.fromUserId": fromUserId,
    });

    if (!sentInvitations) {
      return res.status(400).json({
        error: "Failed to get sent invitations. Try refreshing the page",
      });
    }

    return res.json(sentInvitations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
