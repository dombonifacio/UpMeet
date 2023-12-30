import { Request, Response, request } from "express";
import { EventModel } from "../models/eventModel";
import { EventAttendanceModel } from "../models/eventAttendanceModel";
import { UserModel } from "../models/userModel";

export const createAttendingEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    // Create the event and check if it was successful
    const createdEvent = await createEvent(req);

    if (!createdEvent) {
      return res
        .status(400)
        .json({ error: "Failed to join this event. Please try again." });
    }

    // Check if the user is already attending the event
    const existingUserAttendance = await EventAttendanceModel.findOne({
      userId,
      eventId: createdEvent, // Convert to ObjectId if valid
    });

    if (existingUserAttendance?.attending === true) {
      return res
        .status(400)
        .json({ error: "You are already going to this event." });
    } else if (existingUserAttendance?.saved === true) {
      existingUserAttendance.attending = true;
      await existingUserAttendance.save();
      return res
        .status(201)
        .json({ message: "You are now attending this event!" });
    } else {
      // If the user is not already attending, create a new attendance entry
      const newEventAttendance = {
        eventId: createdEvent, // Convert to ObjectId if valid
        userId,
        attending: true,
        saved: false,
      };

      const createEventAttendance = await EventAttendanceModel.create(
        newEventAttendance
      );

      if (createEventAttendance) {
        return res
          .status(201)
          .json({ message: "You are now attending this event!" });
      }
    }
    // If the creation of the attendance entry fails
    return res
      .status(400)
      .json({ error: "Failed to join this event. Please try again." });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error: "Server Internal Error" });
  }
};

export const deleteAttendingEvents = async (req: Request, res: Response) => {
  try {
    // Find the user's attending events
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    // Attending should be true in order for user to unattend an event
    const userEventAttendance = await EventAttendanceModel.findOne({
      eventId,
      userId,
      attending: true,
    });

    // Return error message if event is nonexistent
    if (!userEventAttendance) {
      return res.status(404).json({
        error:
          "Unable to cancel your attendance. Please check first if you are attending this event.",
      });
    }

    const isEventSaved = userEventAttendance.saved === true;

    // * If saved is set to false in eventAttendance, delete event from both event collection and eventAttendance collection
    // ! Only if the user is the only one going! Because the event is not used anymore for attendance or saved
    if (!isEventSaved) {
      const countAttendees = await EventAttendanceModel.countDocuments({
        eventId,
      });

      // Only delete event document from event collection if the user is the only one going
      // That way, unused events are deleted
      if (countAttendees === 1) {
        const deleteEvent = await EventModel.deleteOne({ eventId });

        if (!deleteEvent) {
          return res.status(404).json({
            error:
              "Unable to cancel your attendance to this event. Please try again.",
          });
        }
      }

      // If there are other people going, just delete the attendance for this user
      const deleteEventAttendance = await EventAttendanceModel.deleteOne({
        eventId,
        userId,
      });

      if (!deleteEventAttendance) {
        return res.status(404).json({
          error:
            "Unable to cancel your attendance to this event. Please try again.",
        });
      }
    }

    // If user has saved this event, do not delete event attendance. just set attending to false
    else {
      userEventAttendance.attending = false;
      await userEventAttendance.save();
    }

    return res.status(200).json({
      message: "You have cancelled going to this event.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Internal Error",
    });
  }
};

export const getEventAttendees = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;

    const eventAttendees = await getEventAttendanceInfo(req, "eventId");

    const countEventAttendees = await EventAttendanceModel.countDocuments({
      eventId,
      attending: true,
    });
    if (
      !eventAttendees ||
      eventAttendees.length === 0 ||
      countEventAttendees === 0
    ) {
      return res
        .status(200)
        .json({ error: "No users are currently going to this event." });
    } else if (eventAttendees === "ServerError") {
      return res.status(500).json({ error: "Server Internal Error" });
    }

    // Get the userId of each user in the eventAttendees
    const eventAttendeesInfoPromises = eventAttendees.map(async (user) => {
      const userDoc = await UserModel.findOne({ _id: user.userId }).select(
        "_id email name country age image"
      );
      return userDoc;
    });

    const eventAttendeesInfo = await Promise.all(eventAttendeesInfoPromises);

    return res
      .status(200)
      .json({ eventAttendeesInfo, count: countEventAttendees });
  } catch (error) {
    return res.status(500).json({ error: "Server Internal Error" });
  }
};

export const getSelfEvents = async (req: Request, res: Response) => {
  try {
    const attendingEvents = await getEventAttendanceInfo(req, "userId");

    if (attendingEvents.length === 0 || !attendingEvents) {
      return res
        .status(400)
        .json({ error: "No events found. Try attending an event!" });
    } else if (attendingEvents === "ServerError") {
      return res.status(500).json({ error: "Server Internal Error" });
    }

    // Get each ID of the user's attending events
    const eventsPromises = attendingEvents.map(async (event) => {
      // Get the events from th event collection to get the event information
      const eventDoc = await EventModel.findOne({ eventId: event.eventId });
      return eventDoc;
    });

    //
    const events = await Promise.all(eventsPromises);

    res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: "Server Internal Error" });
  }
};

// @ HELPER FUNCTION
const getEventAttendanceInfo = async (req: Request, getId: string) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const getMyEventsQuery = {
      userId,
      attending: true,
    };
    const getEventAttendeesQuery = {
      eventId,
      attending: true,
    };
    const query =
      getId === "userId" ? getMyEventsQuery : getEventAttendeesQuery;

    // find first if the event exists
    const attendingEvents = await EventAttendanceModel.find(query);

    return attendingEvents;

    // if attendingEvents.length === 0 --   res.status(400).json({error: "No events found. Try attending an event!"})
    // else return attendingEvents
  } catch (error) {
    return "ServerError";
  }
};

// @ HELPER FUNCTION
// Responsible for creating an event in the events collection
const createEvent = async (req: Request) => {
  try {
    const {
      artist,
      city,
      country,
      eventName,
      genre,
      guests,
      eventId,
      images,
      time,
      date,
      dateTime,
      timezone,
      startTime,
      venue,
    } = req.body;

    // Check first if the id matches one of the eventId in the events collection
    const existingEvent = await EventModel.findOne({ eventId });

    // if event already exists in the collection, just return that eventId and do not create a new event in the events collection
    if (existingEvent) {
      return existingEvent.eventId;
    }

    const newEvent = {
      eventId: eventId,
      artist: artist,
      city: city,
      country: country,
      eventName: eventName,
      genre: genre,
      guests: guests,
      images: images,
      time: time,
      date: date,
      dateTime: dateTime,
      timezone: timezone,
      startTime: startTime,
      venue: venue,
    };

    const createEvent = await EventModel.create(newEvent);

    // Return the eventId if creating new event is successful
    if (createEvent) {
      return createEvent.eventId;
    }
    // if there is an error creating the event
    else {
      return false;
    }
  } catch (error) {
    // if error in the server
    return false;
  }
};

// ********************************** CONTROLLER FOR SAVED EVENTS BUT IN THE SAME COLLECTION **********************************
export const createSavedEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    // Create the event and check if it was successful
    const createdEvent = await createEvent(req);

    if (!createdEvent) {
      return res
        .status(400)
        .json({ error: "Failed to save this event. Please try again." });
    }

    const existingAttendanceEvent = await EventAttendanceModel.findOne({
      userId,
      eventId: createdEvent,
      attending: true,
    });

    const isSavedAlready = existingAttendanceEvent?.saved === true;

    if (isSavedAlready) {
      return res
        .status(400)
        .json({ error: "You have already saved this event." });
    } else if (existingAttendanceEvent) {
      existingAttendanceEvent.saved = true;
      await existingAttendanceEvent.save();
      return res.status(200).json({ message: "Successfully saved event!" });
    } else {
      // If event has not been saved yet or not attending yet
      const newSavedEvent = {
        eventId: createdEvent, // Convert to ObjectId if valid
        userId,
        attending: false,
        saved: true,
      };

      const createSavedEvent = await EventAttendanceModel.create(newSavedEvent);

      if (!createSavedEvent) {
        // If the creation of the attendance entry fails
        return res.status(400).json({ error: "Error saving this event." });
      }
      return res
        .status(200)
        .json({ message: "Successfully saved this event!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Internal Error" });
  }
};

export const deleteSavedEvents = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    const userEventAttendance = await EventAttendanceModel.findOne({
      eventId,
      userId,
      saved: true,
    });

    if (!userEventAttendance) {
      return res.status(404).json({
        error:
          "Unable to unsave event. Please check first if you have saved this event.",
      });
    }

    const isAttendingTrue = userEventAttendance?.attending === true;

    if (!isAttendingTrue) {
      const countAttendees = await EventAttendanceModel.countDocuments({
        eventId,
      });

      if (countAttendees === 1) {
        const deleteEvent = await EventModel.deleteOne({ eventId });

        if (!deleteEvent) {
          return res.status(404).json({
            error: "Unable to unsave event. Please try again",
          });
        }
      }
      const deleteEventAttendance = await EventAttendanceModel.deleteOne({
        eventId,
        userId,
      });

      if (!deleteEventAttendance) {
        return res.status(404).json({
          error: "Unable to unsave event. Please try again",
        });
      }

      return res.status(200).json({
        message: "You have unsaved this event.",
      });
    } else {
      userEventAttendance.saved = false;
      await userEventAttendance.save();
      return res.status(200).json({ message: "You have unsaved this event." });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Server Internal Error",
    });
  }
};

export const getSavedEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const getEventAttendanceSaved = await EventAttendanceModel.find({
      userId,
      saved: true,
    });

    if (!getEventAttendanceSaved) {
      return res.status(400).json({
        error: "You do not have any saved events. Try saving an event.",
      });
    }

    const getSavedEventsPromises = getEventAttendanceSaved.map(
      async (event) => {
        // collect each event from events collection using eventId
        const eventDoc = await EventModel.findOne({ eventId: event.eventId });
        return eventDoc;
      }
    );

    const getSavedEvents = await Promise.all(getSavedEventsPromises);

    if (!getSavedEvents) {
      return res.status(400).json({
        error: "You do not have any saved events. Try saving an event!",
      });
    }
    return res.status(200).json(getSavedEvents);
  } catch (error) {
    return res.status(500).json({ error: "Server Internal Error" });
  }
};
