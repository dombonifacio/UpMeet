import { Schema, Types, model } from "mongoose";

interface IEventAttendance {
  userId: Types.ObjectId;
  eventId: String;
  attending: Boolean;
  saved: Boolean;
}

const EventAttendanceSchema = new Schema<IEventAttendance>({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  eventId: { type: String, ref: "eventattendees", required: true },
  attending: { type: Boolean, required: true },
  saved: { type: Boolean, required: true },
});

export const EventAttendanceModel = model<IEventAttendance>(
  "eventAttendees",
  EventAttendanceSchema
);
