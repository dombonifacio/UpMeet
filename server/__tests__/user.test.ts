import mongoose from "mongoose";
import { UserModel } from "../models/userModel";
import { authRouter } from "../routes/authRoute";
import axios, { AxiosError, AxiosResponse } from "axios";

const express = require("express");
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

describe("User Registration", () => {
  beforeAll(async () => {
    const app = express();
    app.use(express.json());
    app.use("/api/auth", authRouter);
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  afterAll(async () => {
    try {
      // Clean up function
      const deleteUser = await UserModel.findOneAndDelete({
        email: "dummy@gmail.com",
      });
      if (!deleteUser) {
        console.log("User with email dummy@gmail.com not found.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting user:", error.message);
      }
    }
    await mongoose.disconnect();
  });

  it("CreateUser_WhenUserWithSameEmailDoesNotExist_ShouldAddNewUserToDatabase", async () => {
    const newUser = {
      email: "dummy@gmail.com",
      name: "Spongebob",
      password: "SecureP@ssword123",
      confirmPassword: "SecureP@ssword123",
      age: 30,
      country: "Canada",
      image: "",
    };

    console.log("Request Payload:", newUser);

    const response: AxiosResponse = await axios.post(
      "http://localhost:5000/api/auth/register",
      newUser
    );

    console.log(response.data, "response data");

    // Check if user is created in the database
    const findCreatedUser = await UserModel.findOne({ email: newUser.email });

    // We expect findCreatedUser to be truthy to see if the user is actually created
    expect(findCreatedUser).toBeTruthy();
  });

  it("CreateUser_WhenUserEmailAlreadyExists_ShouldNotCreateUserAndReturnStatus400", async () => {
    // Get User from the database
    const newUser = {
      email: "dummy@gmail.com",
      name: "Taylor",
      password: "taylorSwift123",
      confirmPassword: "taylorSwift123",
      age: 30,
      country: "Canada",
      image: "",
    };

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:5000/api/auth/register",
        newUser
      );

      // If the request is successful, it means the user was created when it shouldn't have been
      expect(response.status).not.toEqual(200);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        expect(error.response?.status).toEqual(400);
      }
    }
  });
});

describe("User Login", () => {
  it("LoginUser_WhenUserExistsAndProvideValidData_ShouldReturnCookieAndStatus200", async () => {
    const user = await axios.post("http://localhost:5000/api/auth/login", {
      email: "mustard@gmail.com",
      password: "Mustard20",
    });

    console.log(user.headers["set-cookie"], "cookie");
    expect(user.status).toEqual(200);

    // Add any other assertions as needed
  });
});

describe("Get User Info", () => {
  it("GetUserData_WhenUserIsNotLoggedIn_ShouldReturnUnauthorizedStatus401", async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me");

      // If the request is successful, it means the user accessed protected data without logging in
      expect(response.status).not.toEqual(200);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        expect(error.response?.status).toEqual(401);
      }
    }
  });
});
