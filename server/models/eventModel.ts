import { ObjectId, Schema, SchemaType, Types, model } from "mongoose";

interface IEvent {
  artist?: string;
  city: string;
  country: string;
  date: Date;
  eventName: string;
  genre: string[];
  guests?: string[];
  venue: string;
  images: string[];
  startTime: String;
  dateTime: Date;
  timezone: String;
  eventId: string;
}

const EventSchema = new Schema<IEvent>({
  eventId: { type: String },
  artist: { type: String },
  city: { type: String, required: [true, "This event needs a city."] },
  country: { type: String, required: [true, "This event needs a country."] },
  date: { type: Date, required: [true, "This event needs a date."] },
  eventName: {
    type: String,
    required: [true, "This event needs an event name."],
  },
  genre: { type: [], required: [true, "This event needs a genre."] },
  guests: { type: [] },
  venue: { type: String, required: [true, "This event needs a venue."] },
  images: { type: [], required: [true, "This event needs images."] },
  timezone: { type: String, required: [true, "This event needs a timezone."] },
  startTime: { type: String, required: [true, "This event needs a timezone."] },
  dateTime: { type: Date, required: [true, "This event needs a date time."] },
});

export const EventModel = model<IEvent>("events", EventSchema);
