import { Schema, Types, model } from "mongoose";

// Statuses: pending, accepted, rejected

type statusTypes = "pending" | "accepted" | "declined";

export interface IInvitation {
  fromUser: {
    fromUserId: Types.ObjectId;
    name: string;
    image: string;
  };
  toUser: {
    toUserId: Types.ObjectId,
    name: string;
    image: string
  },
  event: {
    eventId: string;
    eventName: string;
    timezone: string;
    dateTime: Date;
  };
  date: Date;
  status: string; // Assuming statusTypes is a string type
  description: string;
}

const invitationSchema = new Schema<IInvitation>({
  fromUser: {
    fromUserId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    image: { type: String }
  },
  toUser: {
    toUserId: { type: Schema.Types.ObjectId, ref: "users", required: true},
    name: { type: String, required: true},
    image: { type: String}
  },
  event: { 
    eventId: { type: String, ref: "events", required: true},
    eventName: { type: String, required: true},

    timezone: { type: String, required: true},
    dateTime: { type: Date, required: true}
   },
  date: { type: Date, required: true },
  status: { type: String, required: true }, // Assuming statusTypes is a string type
  description: { type: String, required: true },
});


export const InvitationModel = model<IInvitation>(
  "invitations",
  invitationSchema
);
