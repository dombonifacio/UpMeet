import { Request, Response } from "express";
import { EventModel } from "../models/eventModel";
export const getEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const event = await EventModel.findOne({ eventId });

    if (!event) {
      return res.status(400).json({
        error: "Failed to retrieve data from the database. Please try again.",
      });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server Internal Error." });
  }
};
