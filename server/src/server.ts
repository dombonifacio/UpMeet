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
import cors from "cors";
import cookieParser from "cookie-parser";

// Server's Port Number
const PORT = process.env.PORT || 5000;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://dominique:7Y6PutEeEnKnH7Tk@cluster0.sc5j7yq.mongodb.net/JamConDB?retryWrites=true&w=majority";

// allows us to parse cookies
app.use(cookieParser());
// allows which domains are able to make requests to a web server
const corsOptions = {
  origin: "https://up-meet.vercel.app" || "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));

// Make sure the preflight OPTIONS request is handled for all routes
app.options("*", cors(corsOptions));


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
