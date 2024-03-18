import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Error } from "mongoose";
const express = require("express");

// Define a type for the user object in your JWT payload
interface User {
  // Define the properties you expect in your JWT payload
  id: ObjectId;
  username: string;
  // Add any other properties you expect in the JWT payload
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }

  const SECRET_KEY = process.env.SECRET_KEY || "";

  // particular
  // Verify and decode the JWT
  return jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.json("invalid token");
    }
    // add the decoded (payload we added) to the req property
    req.user = decoded;
    return next();
  });
};
