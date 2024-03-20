import { Request, Response, request } from "express";
import { EventModel } from "../models/eventModel";
import { EventAttendanceModel } from "../models/eventAttendanceModel";

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
      status: "attending",
    });

    if (existingUserAttendance) {
      return res
        .status(400)
        .json({ error: "You are already going to this event." });
    }

    // If the user is not already attending, create a new attendance entry
    const newEventAttendance = {
      eventId: createdEvent, // Convert to ObjectId if valid
      userId,
      status: "attending",
    };

    const createEventAttendance = await EventAttendanceModel.create(
      newEventAttendance
    );

    if (createEventAttendance) {
      return res
        .status(201)
        .json({ message: "You are now attending to this event!" });
    }

    // If the creation of the attendance entry fails
    return res
      .status(400)
      .json({ error: "Failed to join this event. Please try again." });
  } catch (error) {
    return res.status(500).json({ error: "Server Internal Error" });
  }
};

export const deleteAttendingEvents = async (req: Request, res: Response) => {
  try {
    // Find the user's attending events
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    // Count how many people are going to a particular event
    const countAttendees = await EventAttendanceModel.countDocuments({
      eventId,
    });

    // Deleting unused events when only one cancels their attendance
    if (countAttendees === 1) {
      const deleteEvent = await EventModel.deleteOne({ eventId });
      if (!deleteEvent) {
        return res.status(404).json({
          error:
            "Bad Request. Unable to delete event from the events collection",
        });
      }
    }

    // Deleting user's attendance from eventAttendance collection
    const deleteEventAttendance = await EventAttendanceModel.deleteOne({
      eventId,
      userId,
      status: "attending",
    });

    // if a document was not deleted, there is no eventattendance matching the condition
    if (deleteEventAttendance.deletedCount === 0) {
      return res.status(404).json({
        error:
          "Cannot unjoin event. Please check if you are going to this event first.",
      });
    }
    return res
      .status(200)
      .json({ message: "You have cancelled going to this event." });
  } catch (error) {
    return res.status(500).json({ error: "Server Internal Error" });
  }
};

export const getEventAttendees = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;

    const eventAttendees = await getEventAttendanceInfo(req, "eventId");

    const countEventAttendees = await EventAttendanceModel.countDocuments({
      eventId,
      status: "attending",
    });
    if (
      !eventAttendees ||
      eventAttendees.length === 0 ||
      countEventAttendees === 0
    ) {
      return res
        .status(200)
        .json({ error: "Failed to retrieve data from the database." });
    } else if (eventAttendees === "ServerError") {
      return res.status(500).json({ error: "Server Internal Error" });
    }

    return res.status(200).json({ eventAttendees, count: countEventAttendees });
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
      status: "attending",
    };
    const getEventAttendeesQuery = {
      eventId,
      status: "attending",
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
      id,
      images,
      time,
      date,
      dateTime,
      timezone,
      startTime,
      venue,
    } = req.body;

    // We store this event information in the events collection

    // Check first if the id matches one of the eventId in the events collection
    const existingEvent = await EventModel.findOne({ eventId: id });

    // if event already exists in the collection, just return that eventId and do not create a new event in the events collection
    if (existingEvent) {
      return existingEvent.eventId;
    }

    const newEvent = {
      eventId: id,
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
