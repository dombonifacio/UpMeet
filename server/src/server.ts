import express from "express";
const dotenv = require("dotenv");
const db = require("mongoose");
import { authRouter } from "../routes/authRoute";
import { userRouter } from "../routes/userRoute";

// middleware
import authMiddleware from "../middleware/authMiddleware";

import { eventAttendanceRouter } from "../routes/eventAttendanceRoute";
import { invitationRouter } from "../routes/invitationRoute";
import { eventRouter } from "../routes/eventRoute";

// allows our project to read environment variables
dotenv.config();

// creates an instance of Express application. Sets up a basic Express web server
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Server's Port Number
const PORT = process.env.PORT || 5000;

const MONGODB_URI = process.env.MONGODB_URI;

// allows us to parse cookies
app.use(cookieParser());
// allows which domains are able to make requests to a web server
app.use(
  cors({
    // don't forget the colon between base url and base port
    // listen for incoming requests in this url
    // origin: `${BASE_URL}:${BASE_PORT}`,
      origin: 'https://up-meet.vercel.app',
    // include credentials such as cookies
    credentials: true,
  })
);

// automatically parse incoming JSON  data
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", authMiddleware, userRouter);
app.use("/api/eventAttendance", authMiddleware, eventAttendanceRouter);
app.use("/api/events", authMiddleware, eventRouter);
app.use("/api/invitation", authMiddleware, invitationRouter);

// app.use('/auth', userRouter)
// connect to our Cluster0 to have access to our database
db.connect(MONGODB_URI)
  .then((res: Response) => {
    console.log("Connected to MongoDB Successfully!");
  })
  .catch((error: Error) => {
    console.log("error connecting to the database", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
