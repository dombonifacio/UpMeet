import mongoose from "mongoose";
import { UserModel } from "../models/userModel";
import { authRouter } from "../routes/authRoute";
import axios, { AxiosError, AxiosResponse } from "axios";

const express = require("express");
import dotenv from "dotenv";
import { eventAttendanceRouter } from "../routes/eventAttendanceRoute";

dotenv.config();

describe("Event Attendance", () => {
  beforeAll(async () => {
    const app = express();
    app.use(express.json());
    app.use("/api/eventAttendance", eventAttendanceRouter);
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
  it("GoToEvent_WhenNotLoggedIn_ShouldReturn401Status", async () => {
    try {
      const event = {
        id: "1",
        artist: "Justin Bieber",
        city: "Vancouver",
        country: "Canada",
        date: "2023/11/04",
        eventName: "PURPOSE",
        genre: ["pop"],
        images: ["lkasfklasm"],
        time: "1:48am",
        startTime: "19:00:00",
        timezone: "Canada/Vancouver",
        dateTime: "2022-11-25T23:00:00.000+00:00",
        venue: "rogers arena",
      };

      const response = await axios.post(
        "http://localhost:5000/api/eventAttendance",
        event
      );

      // If the request is successful, it means the user accessed protected data without logging in
      expect(response.status).not.toEqual(200);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        expect(error.response?.status).toEqual(401);
      }
    }
  });
});
