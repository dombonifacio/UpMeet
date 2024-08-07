import { Request, Response } from "express";

// third party
import jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs")

import { UserModel } from "../models/userModel";




// @desc   Register a User
// @route  POST /users/register
export const registerUsers = async (req: Request, res: Response) => {
  const { email, name, password, confirmPassword, age, country, image } =
    req.body;
  try {
    // check first if both passwords are the same
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    if (!email || !name || !password || !age || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Please enter the required fields." });
    }

    if (age < 16) {
      return res
        .status(400)
        .json({ error: "Required age is at least 16 to sign up." });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({ error: "Bcrypt Error" });
    }

    // Create a user then store it in the database
    const existingUser = await UserModel.findOne({ email });

    // Check if user already exists with the same email
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists. Please enter a new one." });
    }

    // Create a new user
    const newUser = {
      email: email,
      name: name,
      password: hashedPassword,
      age: age,
      country: country,
      image: image,
    };

    const createUser = await UserModel.create(newUser);

    if (createUser) {
      return res.status(201).json({ message: "Successfully registered!" });
    } else {
      return res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
  
    res.status(500).json({ error: "Server Internal Error" });
  }
};

// @desc   Login a User
// @route  POST /users/login
export const loginUsers = async (req: Request, res: Response) => {
  console.log("logging in...")
  const { email, password } = req.body;

  // Check if user exists and the password is the same
  try {
    
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        id: user._id,
        name: user.name,
      };

      // create token
      const token = jwt.sign(payload, "123", {
        expiresIn: 24 * 60 * 60 * 1000
      });

      res
        .cookie("access_token", token, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
      
        })
        .status(200)
        .json({ message: `Welcome Back, ${user.name}!`, userId: user._id });
    } else if (!user) {
      // if no user with matching email
      res.status(400).json({ error: "No user exists with such email." });
    } else {
      // user found, but password doesn't match
      res.status(400).json({ error: "Wrong Password!" });
    }
  } catch (error) {
    
    res.status(500).json({ error: "Server Internal Error" });
  }
};

export const logoutUsers = (req: Request, res: Response) => {
  console.log("logging out...");
  res.clearCookie("access_token");
  res.status(200).json({ message: "You have logged out." });
};

export const isLoggedIn = (req: Request, res: Response) => {
  // get token from user
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, "123", (err: any) => {
    if (err) {
      return res.json(false);
    }
    // if we have a token and verified successfully, return true
    return res.json(true);
  });
};
