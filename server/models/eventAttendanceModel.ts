import { Schema, Types, model } from "mongoose";

interface IStatus {
  attending: String;
  attended: String;
}

interface IEventAttendance {
  userId: Types.ObjectId;
  eventId: String;
  status: IStatus;
}

const EventAttendanceSchema = new Schema<IEventAttendance>({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  eventId: { type: String, ref: "eventattendees", required: true },
  status: { type: Schema.Types.Mixed, required: true },
});

export const EventAttendanceModel = model<IEventAttendance>(
  "eventAttendees",
  EventAttendanceSchema
);
